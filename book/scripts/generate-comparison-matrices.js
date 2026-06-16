#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const root = path.resolve(__dirname, '..');
const matricesDir = path.join(root, 'data', 'comparison-matrices');
const outputFile = path.join(root, 'docs', 'appendices', 'generated-comparison-matrices.md');

function humanize(value) {
  return String(value)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function escapeCell(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, '<br />');
}

function renderMatrix(matrix) {
  const columns = ['concept', ...matrix.columns];
  const header = `| ${columns.map(humanize).join(' | ')} |`;
  const separator = `| ${columns.map(() => '---').join(' | ')} |`;
  const rows = matrix.rows.map((row) => {
    const values = [row.concept, ...matrix.columns.map((column) => row.values[column])];
    return `| ${values.map(escapeCell).join(' | ')} |`;
  });

  return [
    `## ${matrix.title}`,
    '',
    matrix.description || '',
    '',
    header,
    separator,
    ...rows,
    '',
    `Source: \`book/data/comparison-matrices/${matrix.id}.yml\`.`,
    '',
  ].join('\n');
}

function main() {
  const files = fs
    .readdirSync(matricesDir)
    .filter((file) => file.endsWith('.yml'))
    .sort();

  const matrices = files.map((file) => yaml.load(fs.readFileSync(path.join(matricesDir, file), 'utf8')));
  const body = [
    '---',
    'title: Generated Comparison Matrices',
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
    'difficulty: beginner',
    'maturity: not-applicable',
    'tags:',
    '  - comparisons',
    '  - generated',
    'post_quantum_posture: not-applicable',
    'confidence_model:',
    '  type: not-applicable',
    '---',
    '',
    '# Generated Comparison Matrices',
    '',
    'This page is generated from `book/data/comparison-matrices/*.yml`. Edit the YAML data, not this Markdown file.',
    '',
    ...matrices.map(renderMatrix),
  ].join('\n');

  fs.writeFileSync(outputFile, body);
  console.log(`Generated ${path.relative(root, outputFile)} from ${files.length} comparison matrices.`);
}

main();
