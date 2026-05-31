#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv = require('ajv/dist/2020');

const root = path.resolve(__dirname, '..');
const diagramsDir = path.join(root, 'data', 'diagrams');
const schemaFile = path.join(root, 'schemas', 'diagram.schema.json');

const palette = {
  default: {fill: '#f8fbfb', stroke: '#9fb3b6'},
  goal: {fill: '#ecfdf5', stroke: '#76a98d'},
  assumption: {fill: '#eff6ff', stroke: '#82a9d9'},
  primitive: {fill: '#f8fbfb', stroke: '#9fb3b6'},
  structured: {fill: '#fff7ed', stroke: '#f59e0b'},
  proof: {fill: '#f5f3ff', stroke: '#a78bfa'},
  protocol: {fill: '#f0f9ff', stroke: '#60a5fa'},
  system: {fill: '#f8fafc', stroke: '#94a3b8'},
  pattern: {fill: '#fefce8', stroke: '#d9b84f'},
  actor: {fill: '#f8fafc', stroke: '#64748b'},
  setup: {fill: '#fff7ed', stroke: '#fb923c'},
  warning: {fill: '#fff7ed', stroke: '#fb923c'},
  metadata: {fill: '#fff1f2', stroke: '#fb7185'},
  output: {fill: '#f0fdf4', stroke: '#4ade80'},
};

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function loadYaml(file) {
  return yaml.load(fs.readFileSync(file, 'utf8'));
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeMermaid(value) {
  return String(value).replace(/"/g, '\\"');
}

function normalizeDetails(detail) {
  if (!detail) return [];
  return Array.isArray(detail) ? detail : [detail];
}

function wrapText(value, maxChars) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function safeOutputPath(relativeOutput) {
  if (path.isAbsolute(relativeOutput) || relativeOutput.includes('..')) {
    throw new Error(`Unsafe diagram output path: ${relativeOutput}`);
  }
  const resolved = path.resolve(root, relativeOutput);
  if (!resolved.startsWith(root + path.sep)) {
    throw new Error(`Diagram output escapes book root: ${relativeOutput}`);
  }
  return resolved;
}

function positionNodes(diagram) {
  const layout = diagram.layout;
  const margin = layout.margin ?? 48;
  const top = layout.top ?? 110;
  const columnGap = layout.column_gap ?? 58;
  const rowGap = layout.row_gap ?? 42;
  const defaultWidth = layout.node_width;
  const defaultHeight = layout.node_height;

  const byId = new Map();
  for (const node of diagram.nodes) {
    if (byId.has(node.id)) {
      throw new Error(`${diagram.id}: duplicate node id "${node.id}"`);
    }

    const width = node.width ?? defaultWidth;
    const height = node.height ?? defaultHeight;
    const x = margin + (node.column - 1) * (defaultWidth + columnGap);
    const y = top + (node.row - 1) * (defaultHeight + rowGap);

    if (node.column > layout.columns || node.row > layout.rows) {
      throw new Error(`${diagram.id}: node "${node.id}" is outside the declared grid`);
    }

    if (x + width + margin > layout.width || y + height + margin > layout.height) {
      throw new Error(`${diagram.id}: node "${node.id}" does not fit inside the SVG viewBox`);
    }

    byId.set(node.id, {...node, x, y, width, height, kind: node.kind ?? 'default'});
  }

  for (const edge of diagram.edges) {
    if (!byId.has(edge.from)) throw new Error(`${diagram.id}: unknown edge source "${edge.from}"`);
    if (!byId.has(edge.to)) throw new Error(`${diagram.id}: unknown edge target "${edge.to}"`);
  }

  return byId;
}

function automaticAnchor(from, to, source) {
  const dx = to.x + to.width / 2 - (from.x + from.width / 2);
  const dy = to.y + to.height / 2 - (from.y + from.height / 2);

  if (Math.abs(dx) >= Math.abs(dy)) {
    if (source) return dx >= 0 ? 'right' : 'left';
    return dx >= 0 ? 'left' : 'right';
  }

  if (source) return dy >= 0 ? 'bottom' : 'top';
  return dy >= 0 ? 'top' : 'bottom';
}

function anchorPoint(node, anchor) {
  switch (anchor) {
    case 'top':
      return {x: node.x + node.width / 2, y: node.y};
    case 'right':
      return {x: node.x + node.width, y: node.y + node.height / 2};
    case 'bottom':
      return {x: node.x + node.width / 2, y: node.y + node.height};
    case 'left':
      return {x: node.x, y: node.y + node.height / 2};
    default:
      throw new Error(`Unsupported anchor "${anchor}"`);
  }
}

function edgePath(edge, nodes) {
  const from = nodes.get(edge.from);
  const to = nodes.get(edge.to);
  const fromAnchor = edge.from_anchor && edge.from_anchor !== 'auto' ? edge.from_anchor : automaticAnchor(from, to, true);
  const toAnchor = edge.to_anchor && edge.to_anchor !== 'auto' ? edge.to_anchor : automaticAnchor(from, to, false);
  const start = anchorPoint(from, fromAnchor);
  const end = anchorPoint(to, toAnchor);

  if (Math.abs(start.x - end.x) < 1) {
    return {
      path: `M${start.x} ${start.y} V${end.y}`,
      label: {x: start.x + 10, y: (start.y + end.y) / 2 - 8},
    };
  }

  if (Math.abs(start.y - end.y) < 1) {
    return {
      path: `M${start.x} ${start.y} H${end.x}`,
      label: {x: (start.x + end.x) / 2, y: start.y - 10},
    };
  }

  const midX = (start.x + end.x) / 2;
  return {
    path: `M${start.x} ${start.y} C${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`,
    label: {x: midX, y: (start.y + end.y) / 2 - 8},
  };
}

function renderNode(node) {
  const colors = palette[node.kind] ?? palette.default;
  const labelLines = wrapText(node.label, Math.max(12, Math.floor(node.width / 11))).slice(0, 2);
  const detailLines = normalizeDetails(node.detail)
    .flatMap((line) => wrapText(line, Math.max(16, Math.floor(node.width / 8))))
    .slice(0, 3);
  const labelStart = node.y + (labelLines.length > 1 ? 24 : 31);
  const detailStart = labelStart + labelLines.length * 19 + 2;
  const labelText = labelLines
    .map((line, index) => `<text x="${node.x + 22}" y="${labelStart + index * 19}" class="label">${escapeXml(line)}</text>`)
    .join('\n');
  const detailText = detailLines
    .map((line, index) => `<text x="${node.x + 22}" y="${detailStart + index * 17}" class="small">${escapeXml(line)}</text>`)
    .join('\n');

  return [
    `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" rx="8" class="box" fill="${colors.fill}" stroke="${colors.stroke}" />`,
    labelText,
    detailText,
  ]
    .filter(Boolean)
    .join('\n');
}

function renderSvg(diagram) {
  const nodes = positionNodes(diagram);
  const arrowId = `${diagram.id}-arrow`;
  const edgeMarkup = diagram.edges
    .map((edge) => {
      const rendered = edgePath(edge, nodes);
      const className = edge.kind === 'warning' ? 'line warning-line' : 'line';
      const label = edge.label
        ? `<text x="${rendered.label.x}" y="${rendered.label.y}" class="edge-label">${escapeXml(edge.label)}</text>`
        : '';
      return `<path d="${rendered.path}" class="${className}" marker-end="url(#${arrowId})" />${label ? `\n${label}` : ''}`;
    })
    .join('\n');
  const nodeMarkup = [...nodes.values()].map(renderNode).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${diagram.layout.width} ${diagram.layout.height}" role="img" aria-labelledby="${diagram.id}-title ${diagram.id}-desc" data-diagram-id="${diagram.id}">
  <!-- Generated by scripts/generate-diagrams.js. Do not edit directly; edit book/data/diagrams/${diagram.id}.yml instead. -->
  <title id="${diagram.id}-title">${escapeXml(diagram.title)}</title>
  <desc id="${diagram.id}-desc">${escapeXml(diagram.description)}</desc>
  <defs>
    <marker id="${arrowId}" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#2f4a4f" />
    </marker>
    <style>
      .box { stroke-width: 2; }
      .label { font: 600 16px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #152024; }
      .small { font: 13px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #526166; }
      .line { stroke: #2f4a4f; stroke-width: 2.5; fill: none; }
      .warning-line { stroke: #b45309; }
      .edge-label { font: 12px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #526166; text-anchor: middle; }
    </style>
  </defs>
  <rect width="${diagram.layout.width}" height="${diagram.layout.height}" fill="#ffffff" />
  <text x="${diagram.layout.margin ?? 48}" y="44" class="label">${escapeXml(diagram.title)}</text>
  <text x="${diagram.layout.margin ?? 48}" y="68" class="small">${escapeXml(diagram.description)}</text>
${edgeMarkup}
${nodeMarkup}
</svg>
`;
}

function mermaidId(id) {
  return `n_${id.replace(/[^a-zA-Z0-9_]/g, '_')}`;
}

function renderMermaid(diagram) {
  const direction = diagram.layout.mermaid_direction ?? 'LR';
  const nodes = diagram.nodes
    .map((node) => {
      const detail = normalizeDetails(node.detail).join('<br/>');
      const label = detail ? `${node.label}<br/>${detail}` : node.label;
      return `  ${mermaidId(node.id)}["${escapeMermaid(label)}"]`;
    })
    .join('\n');
  const edges = diagram.edges
    .map((edge) => {
      const label = edge.label ? `|${escapeMermaid(edge.label)}|` : '';
      return `  ${mermaidId(edge.from)} -->${label} ${mermaidId(edge.to)}`;
    })
    .join('\n');

  return `%% Generated by scripts/generate-diagrams.js. Do not edit directly; edit book/data/diagrams/${diagram.id}.yml instead.
flowchart ${direction}
${nodes}
${edges}
`;
}

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, content);
}

function main() {
  const ajv = new Ajv({allErrors: true, strict: false});
  const validate = ajv.compile(loadJson(schemaFile));
  const files = fs
    .readdirSync(diagramsDir)
    .filter((file) => file.endsWith('.yml'))
    .sort();
  const seenIds = new Set();

  for (const file of files) {
    const sourceFile = path.join(diagramsDir, file);
    const diagram = loadYaml(sourceFile);

    if (!validate(diagram)) {
      const details = validate.errors
        .map((error) => `${error.instancePath || '/'} ${error.message}`)
        .join('; ');
      throw new Error(`${path.relative(root, sourceFile)}: ${details}`);
    }

    if (seenIds.has(diagram.id)) {
      throw new Error(`Duplicate diagram id "${diagram.id}"`);
    }
    seenIds.add(diagram.id);

    const svgFile = safeOutputPath(diagram.outputs.svg);
    writeFile(svgFile, renderSvg(diagram));

    if (diagram.outputs.mermaid) {
      const mermaidFile = safeOutputPath(diagram.outputs.mermaid);
      writeFile(mermaidFile, renderMermaid(diagram));
    }
  }

  console.log(`Generated ${files.length} diagrams from ${path.relative(root, diagramsDir)}.`);
}

main();
