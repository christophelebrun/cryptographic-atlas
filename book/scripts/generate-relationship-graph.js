#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const {canonicalLabelId, displayLabel, loadLabelRegistry} = require('./label-registry');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const docsDir = path.join(root, 'docs');
const conceptCardsDir = path.join(dataDir, 'concept-cards');
const relationshipsFile = path.join(dataDir, 'relationships.yml');
const instancesFile = path.join(dataDir, 'instances.yml');
const markdownOutputFile = path.join(root, 'docs', 'appendices', 'generated-relationship-graph.md');
const jsonOutputFile = path.join(root, 'static', 'data', 'relationship-graph.json');
const labelRegistry = loadLabelRegistry(root);

function walk(dir, predicate) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(file, predicate));
    else if (predicate(file)) out.push(file);
  }
  return out.sort();
}

function parseYaml(file) {
  return yaml.load(fs.readFileSync(file, 'utf8'));
}

function parseMarkdownFrontmatter(file) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  return match ? yaml.load(match[1]) || {} : {};
}

function escapeCell(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, '<br />');
}

function relationLabel(relation) {
  return displayLabel(labelRegistry, 'relations', relation);
}

function labeledNodeFields(levelNamespace, level, categoryNamespace, category) {
  return {
    level_id: canonicalLabelId(labelRegistry, levelNamespace, level),
    display_level: displayLabel(labelRegistry, levelNamespace, level),
    category_id: canonicalLabelId(labelRegistry, categoryNamespace, category),
    display_category: displayLabel(labelRegistry, categoryNamespace, category),
  };
}

function loadNodes() {
  const nodes = new Map();

  for (const file of walk(conceptCardsDir, (item) => item.endsWith('.yml'))) {
    const card = parseYaml(file);
    nodes.set(card.id, {
      id: card.id,
      label: card.name,
      kind: 'concept-card',
      level: card.level,
      category: card.category,
      ...labeledNodeFields('levels', card.level, 'categories', card.category),
      source: path.relative(root, file),
    });
  }

  const instances = parseYaml(instancesFile).instances || [];
  for (const instance of instances) {
    nodes.set(instance.id, {
      id: instance.id,
      label: instance.name,
      kind: 'instance',
      level: instance.taxonomy_level,
      category: instance.kind,
      ...labeledNodeFields('levels', instance.taxonomy_level, 'categories', instance.kind),
      source: 'data/instances.yml',
    });
  }

  for (const file of walk(docsDir, (item) => item.endsWith('.md') || item.endsWith('.mdx'))) {
    const slug = path.basename(file, path.extname(file));
    const frontmatter = parseMarkdownFrontmatter(file);
    if (!nodes.has(slug)) {
      nodes.set(slug, {
        id: slug,
        label: frontmatter.title || slug,
        kind: 'page',
        level: frontmatter.level || 'not-applicable',
        category: frontmatter.type || 'page',
        ...labeledNodeFields('levels', frontmatter.level || 'not-applicable', 'doc_types', frontmatter.type || 'page'),
        source: path.relative(root, file),
      });
    }
  }

  return nodes;
}

function nodeLabel(nodes, id) {
  return nodes.get(id)?.label || id;
}

function buildGraph() {
  const nodes = loadNodes();
  const relationships = parseYaml(relationshipsFile).relationships || [];
  const referencedIds = new Set();
  const edges = relationships.map((relationship) => {
    referencedIds.add(relationship.source);
    referencedIds.add(relationship.target);
    return {
      source: relationship.source,
      relation: relationship.relation,
      target: relationship.target,
      notes: relationship.notes || '',
    };
  });

  const graphNodes = [...referencedIds]
    .map((id) => nodes.get(id) || {id, label: id, kind: 'unknown', level: 'unknown', category: 'unknown', source: ''})
    .sort((a, b) => a.id.localeCompare(b.id));

  const adjacency = {};
  const reverseAdjacency = {};
  const byRelation = {};

  for (const edge of edges) {
    adjacency[edge.source] ||= [];
    adjacency[edge.source].push({relation: edge.relation, target: edge.target, notes: edge.notes});

    reverseAdjacency[edge.target] ||= [];
    reverseAdjacency[edge.target].push({relation: edge.relation, source: edge.source, notes: edge.notes});

    byRelation[edge.relation] ||= [];
    byRelation[edge.relation].push(edge);
  }

  for (const list of Object.values(adjacency)) list.sort((a, b) => `${a.relation}:${a.target}`.localeCompare(`${b.relation}:${b.target}`));
  for (const list of Object.values(reverseAdjacency)) list.sort((a, b) => `${a.relation}:${a.source}`.localeCompare(`${b.relation}:${b.source}`));
  for (const list of Object.values(byRelation)) list.sort((a, b) => `${a.source}:${a.target}`.localeCompare(`${b.source}:${b.target}`));

  return {
    schema_version: 1,
    generated_from: ['book/data/relationships.yml', 'book/data/concept-cards/*.yml', 'book/data/instances.yml', 'book/docs/**/*.md'],
    node_count: graphNodes.length,
    edge_count: edges.length,
    nodes: graphNodes,
    edges,
    adjacency,
    reverse_adjacency: reverseAdjacency,
    by_relation: byRelation,
  };
}

function renderEdgeTable(title, description, edges, nodes) {
  const rows = [
    `## ${title}`,
    '',
    description,
    '',
    '| Source | Relation | Target | Notes |',
    '| --- | --- | --- | --- |',
  ];

  for (const edge of edges) {
    rows.push(`| ${escapeCell(nodeLabel(nodes, edge.source))} | ${escapeCell(relationLabel(edge.relation))} | ${escapeCell(nodeLabel(nodes, edge.target))} | ${escapeCell(edge.notes)} |`);
  }

  rows.push('');
  return rows.join('\n');
}

function renderAdjacency(graph, nodeMap) {
  const rows = [
    '## Adjacency Index',
    '',
    'Outgoing edges grouped by source. This table is useful when reviewing what a concept, concrete scheme, or page depends on or composes with.',
    '',
    '| Source | Outgoing relationships |',
    '| --- | --- |',
  ];

  for (const source of Object.keys(graph.adjacency).sort()) {
    const outgoing = graph.adjacency[source]
      .map((edge) => `${relationLabel(edge.relation)} -> ${nodeLabel(nodeMap, edge.target)}`)
      .join('<br />');
    rows.push(`| ${escapeCell(nodeLabel(nodeMap, source))} | ${escapeCell(outgoing)} |`);
  }

  rows.push('');
  return rows.join('\n');
}

function renderMarkdown(graph) {
  const nodeMap = new Map(graph.nodes.map((node) => [node.id, node]));
  const dependencyEdges = graph.edges.filter((edge) => ['requires', 'uses'].includes(edge.relation));
  const breakRelations = [
    'breaks-if',
    'breaks-if-missing',
    'breaks-if-misused',
    'weakens-if',
    'inherits-risk-from',
    'unsafe-instance-of',
  ];
  const breakEdges = graph.edges.filter((edge) => breakRelations.includes(edge.relation));
  const compositionEdges = graph.edges.filter((edge) => ['commonly-composed-with', 'composes-with', 'implements-pattern', 'used-in'].includes(edge.relation));

  return [
    '---',
    'title: Generated Relationship Graph',
    'type: appendix',
    'level: not-applicable',
    'template: reference',
    'status: current',
    "last_reviewed: '2026-06-04'",
    'review:',
    '  structural:',
    '    status: current',
    "    last_reviewed: '2026-06-04'",
    '  sources:',
    '    status: current',
    "    last_reviewed: '2026-06-04'",
    '  expert:',
    '    status: not-reviewed',
    '    last_reviewed: null',
    '    reviewer: null',
    'difficulty: intermediate',
    'maturity: not-applicable',
    'tags:',
    '  - relationships',
    '  - graph',
    '  - generated',
    'post_quantum_posture: not-applicable',
    'confidence_model:',
    '  type: not-applicable',
    '---',
    '',
    '# Generated Relationship Graph',
    '',
    'This page is generated from `book/data/relationships.yml`. Edit the YAML relationship data, concept cards, and instance registry rather than this Markdown file.',
    '',
    `Machine-readable snapshot: [relationship-graph.json](/data/relationship-graph.json).`,
    '',
    `Graph size: ${graph.node_count} referenced nodes and ${graph.edge_count} directed edges.`,
    '',
    renderEdgeTable('Direct Dependencies', '`requires` and `uses` edges show dependencies that should be reviewed before changing a concept, protocol, system, or concrete instance.', dependencyEdges, nodeMap),
    renderEdgeTable(
      'Break Conditions and Inherited Risks',
      '`breaks-if`, `breaks-if-missing`, `breaks-if-misused`, `weakens-if`, `inherits-risk-from`, and `unsafe-instance-of` edges show conditions that can defeat or materially weaken a guarantee.',
      breakEdges,
      nodeMap,
    ),
    renderEdgeTable('Composition and Usage', '`commonly-composed-with`, `composes-with`, `implements-pattern`, and `used-in` edges show common composition paths and placement relationships.', compositionEdges, nodeMap),
    renderAdjacency(graph, nodeMap),
  ].join('\n');
}

function main() {
  const graph = buildGraph();
  fs.mkdirSync(path.dirname(jsonOutputFile), {recursive: true});
  fs.writeFileSync(jsonOutputFile, `${JSON.stringify(graph, null, 2)}\n`);
  fs.writeFileSync(markdownOutputFile, renderMarkdown(graph));
  console.log(`Generated ${path.relative(root, markdownOutputFile)} and ${path.relative(root, jsonOutputFile)} from ${graph.edge_count} relationships.`);
}

main();
