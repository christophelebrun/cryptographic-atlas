#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv/dist/2020');

const root = path.resolve(__dirname, '..');
const docsDir = path.join(root, 'docs');
const schemasDir = path.join(root, 'schemas');
const dataDir = path.join(root, 'data');

const ajv = new Ajv({allErrors: true, strict: false});

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const validators = {
  doc: ajv.compile(loadJson(path.join(schemasDir, 'doc-frontmatter.schema.json'))),
  conceptCard: ajv.compile(loadJson(path.join(schemasDir, 'concept-card.schema.json'))),
  references: ajv.compile(loadJson(path.join(schemasDir, 'references.schema.json'))),
  relationships: ajv.compile(loadJson(path.join(schemasDir, 'relationships.schema.json'))),
  comparisonMatrix: ajv.compile(loadJson(path.join(schemasDir, 'comparison-matrix.schema.json'))),
  instances: ajv.compile(loadJson(path.join(schemasDir, 'instances.schema.json'))),
  sourceFreshness: ajv.compile(loadJson(path.join(schemasDir, 'source-freshness.schema.json'))),
  diagram: ajv.compile(loadJson(path.join(schemasDir, 'diagram.schema.json'))),
};

const conceptCardAliases = {
  'anonymous-credentials': 'anonymous-credential',
  'digital-signatures': 'digital-signature',
  'hash-functions': 'hash-function',
  mixnets: 'mixnet',
  nullifiers: 'nullifier',
  'pedersen-commitments': 'pedersen-commitment',
  'range-proofs': 'range-proof',
  'secure-aggregation': 'secure-aggregation',
  'secret-sharing': 'secret-sharing',
  'zero-knowledge-proofs': 'zero-knowledge-proof',
};

const conceptSections = [
  'One-sentence intuition',
  'Where it sits in the taxonomy',
  'Problem it solves',
  'Mental model',
  'Minimal example',
  'Security properties',
  'What it does not provide',
  'Assumptions',
  'Post-quantum posture',
  'Confidence model',
  'Common constructions',
  'Use cases',
  'Composition patterns',
  'Failure modes and anti-patterns',
  'Maturity and deployment',
  'Related concepts',
  'Further reading',
];

const protocolSections = [
  'Goal',
  'Participants',
  'Inputs and outputs',
  'Building blocks',
  'Security goals',
  'Non-goals',
  'Threat model',
  'Protocol sketch',
  'Trust assumptions',
  'Post-quantum posture',
  'Confidence model',
  'Metadata leaks',
  'Failure modes',
  'Variants',
  'Where it is used',
  'Further reading',
];

const caseStudySections = [
  'Overview',
  'Goals',
  'Non-goals',
  ['Building blocks', 'Possible building blocks'],
  ['Metadata leaks', 'Privacy leaks'],
  'Post-quantum posture',
  'Confidence model',
  'Failure modes',
  'Related concepts',
  'Further reading',
];

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

function relative(file) {
  return path.relative(root, file);
}

function parseMarkdown(file) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return {frontmatter: null, body: text};
  }
  return {
    frontmatter: yaml.load(match[1]) || {},
    body: text.slice(match[0].length),
  };
}

function parseYaml(file) {
  return yaml.load(fs.readFileSync(file, 'utf8'));
}

function safeBookPath(relativePath) {
  if (path.isAbsolute(relativePath) || relativePath.includes('..')) {
    return null;
  }
  const resolved = path.resolve(root, relativePath);
  return resolved.startsWith(root + path.sep) ? resolved : null;
}

function headings(body) {
  return new Set([...body.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim()));
}

function hasSection(sectionSet, expected) {
  if (Array.isArray(expected)) {
    return expected.some((section) => sectionSet.has(section));
  }
  return sectionSet.has(expected);
}

function sectionName(expected) {
  return Array.isArray(expected) ? expected.join(' or ') : expected;
}

function formatAjvErrors(validate) {
  return (validate.errors || [])
    .map((error) => {
      const location = error.instancePath || '/';
      return `${location} ${error.message}`;
    })
    .join('; ');
}

const errors = [];
const warnings = [];
const majorDocCardIds = new Set();
const docIds = new Set();
const instanceIds = new Set();

function validateObject(file, data, validate) {
  if (!validate(data)) {
    errors.push(`${relative(file)}: ${formatAjvErrors(validate)}`);
  }
}

for (const file of walk(docsDir, (item) => item.endsWith('.md') || item.endsWith('.mdx'))) {
  const parsed = parseMarkdown(file);
  if (!parsed.frontmatter) {
    errors.push(`${relative(file)}: missing frontmatter`);
    continue;
  }

  validateObject(file, parsed.frontmatter, validators.doc);

  const pageHeadings = headings(parsed.body);
  const template = parsed.frontmatter.template;
  docIds.add(path.basename(file, path.extname(file)));
  if (['concept', 'protocol', 'case-study'].includes(template)) {
    const slug = path.basename(file, path.extname(file));
    majorDocCardIds.add(conceptCardAliases[slug] || slug);
  }
  const required =
    template === 'concept'
      ? conceptSections
      : template === 'protocol'
        ? protocolSections
        : template === 'case-study'
          ? caseStudySections
          : [];

  for (const section of required) {
    if (!hasSection(pageHeadings, section)) {
      errors.push(`${relative(file)}: missing section "${sectionName(section)}"`);
    }
  }

  if (/TODO: Add verified references|-\s+TODO\b/.test(parsed.body)) {
    warnings.push(`${relative(file)}: still contains reference TODOs`);
  }
}

const conceptCardIds = new Set();
const conceptCardReferences = [];
for (const file of walk(path.join(dataDir, 'concept-cards'), (item) => item.endsWith('.yml'))) {
  const card = parseYaml(file);
  validateObject(file, card, validators.conceptCard);
  if (conceptCardIds.has(card.id)) errors.push(`${relative(file)}: duplicate concept card id "${card.id}"`);
  conceptCardIds.add(card.id);
  for (const reference of card.references || []) {
    conceptCardReferences.push({file, reference});
  }
  if ((card.references || []).includes('TODO')) {
    errors.push(`${relative(file)}: concept card references must use reference IDs, not TODO`);
  }
}

for (const requiredCardId of majorDocCardIds) {
  if (!conceptCardIds.has(requiredCardId)) {
    errors.push(`data/concept-cards: missing concept card for major page id "${requiredCardId}"`);
  }
}

const referencesFile = path.join(dataDir, 'references.yml');
let referenceIds = new Set();
if (fs.existsSync(referencesFile)) {
  const references = parseYaml(referencesFile);
  validateObject(referencesFile, references, validators.references);
  const ids = new Set();
  for (const reference of references.references || []) {
    if (ids.has(reference.id)) errors.push(`${relative(referencesFile)}: duplicate reference id "${reference.id}"`);
    ids.add(reference.id);
  }
  referenceIds = ids;
} else {
  errors.push('data/references.yml: missing references registry');
}

for (const {file, reference} of conceptCardReferences) {
  if (!referenceIds.has(reference)) {
    errors.push(`${relative(file)}: unknown reference id "${reference}"`);
  }
}

const sourceFreshnessFile = path.join(dataDir, 'source-freshness.yml');
if (fs.existsSync(sourceFreshnessFile)) {
  const freshness = parseYaml(sourceFreshnessFile);
  validateObject(sourceFreshnessFile, freshness, validators.sourceFreshness);
  const clusterIds = new Set();
  for (const cluster of freshness.clusters || []) {
    if (clusterIds.has(cluster.id)) errors.push(`${relative(sourceFreshnessFile)}: duplicate cluster id "${cluster.id}"`);
    clusterIds.add(cluster.id);
    for (const reference of cluster.reference_ids || []) {
      if (!referenceIds.has(reference)) {
        errors.push(`${relative(sourceFreshnessFile)}: cluster "${cluster.id}" references unknown reference "${reference}"`);
      }
    }
  }
} else {
  errors.push('data/source-freshness.yml: missing source freshness registry');
}

const instancesFile = path.join(dataDir, 'instances.yml');
if (fs.existsSync(instancesFile)) {
  const instancesData = parseYaml(instancesFile);
  validateObject(instancesFile, instancesData, validators.instances);
  for (const instance of instancesData.instances || []) {
    if (instanceIds.has(instance.id)) errors.push(`${relative(instancesFile)}: duplicate instance id "${instance.id}"`);
    instanceIds.add(instance.id);

    for (const parent of instance.instance_of || []) {
      if (!conceptCardIds.has(parent)) {
        errors.push(`${relative(instancesFile)}: instance "${instance.id}" references unknown parent concept "${parent}"`);
      }
    }

    for (const reference of instance.references || []) {
      if (!referenceIds.has(reference)) {
        errors.push(`${relative(instancesFile)}: instance "${instance.id}" references unknown reference "${reference}"`);
      }
    }
  }
} else {
  errors.push('data/instances.yml: missing concrete instance registry');
}

const relationshipsFile = path.join(dataDir, 'relationships.yml');
if (fs.existsSync(relationshipsFile)) {
  const relationshipsData = parseYaml(relationshipsFile);
  validateObject(relationshipsFile, relationshipsData, validators.relationships);
  const relationshipIds = new Set([...conceptCardIds, ...instanceIds, ...docIds]);
  for (const [alias, canonical] of Object.entries(conceptCardAliases)) {
    relationshipIds.add(alias);
    relationshipIds.add(canonical);
  }
  for (const relationship of relationshipsData.relationships || []) {
    if (!relationshipIds.has(relationship.source)) {
      errors.push(`${relative(relationshipsFile)}: relationship source "${relationship.source}" is not a known concept card, alias, instance, or document`);
    }
    if (!relationshipIds.has(relationship.target)) {
      errors.push(`${relative(relationshipsFile)}: relationship target "${relationship.target}" is not a known concept card, alias, instance, or document`);
    }
  }
} else {
  errors.push('data/relationships.yml: missing relationship registry');
}

for (const file of walk(path.join(dataDir, 'comparison-matrices'), (item) => item.endsWith('.yml'))) {
  validateObject(file, parseYaml(file), validators.comparisonMatrix);
}

const diagramIds = new Set();
for (const file of walk(path.join(dataDir, 'diagrams'), (item) => item.endsWith('.yml'))) {
  const diagram = parseYaml(file);
  validateObject(file, diagram, validators.diagram);

  if (!diagram || !diagram.id || !diagram.outputs) continue;
  if (diagramIds.has(diagram.id)) errors.push(`${relative(file)}: duplicate diagram id "${diagram.id}"`);
  diagramIds.add(diagram.id);

  const nodeIds = new Set();
  for (const node of diagram.nodes || []) {
    if (nodeIds.has(node.id)) errors.push(`${relative(file)}: duplicate diagram node id "${node.id}"`);
    nodeIds.add(node.id);
    if (diagram.layout && node.column > diagram.layout.columns) {
      errors.push(`${relative(file)}: node "${node.id}" column is outside the declared grid`);
    }
    if (diagram.layout && node.row > diagram.layout.rows) {
      errors.push(`${relative(file)}: node "${node.id}" row is outside the declared grid`);
    }
  }

  for (const edge of diagram.edges || []) {
    if (!nodeIds.has(edge.from)) errors.push(`${relative(file)}: edge references unknown source "${edge.from}"`);
    if (!nodeIds.has(edge.to)) errors.push(`${relative(file)}: edge references unknown target "${edge.to}"`);
  }

  for (const [kind, output] of Object.entries(diagram.outputs)) {
    const outputFile = safeBookPath(output);
    if (!outputFile) {
      errors.push(`${relative(file)}: unsafe ${kind} output path "${output}"`);
    } else if (!fs.existsSync(outputFile)) {
      errors.push(`${relative(file)}: missing generated ${kind} output "${output}"`);
    }
  }
}

if (warnings.length > 0) {
  console.warn('Content warnings:');
  for (const warning of warnings) console.warn(`  - ${warning}`);
}

if (errors.length > 0) {
  console.error('Content validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log('Content validation passed.');
