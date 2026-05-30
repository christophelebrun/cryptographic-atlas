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
};

const conceptSections = [
  'One-sentence intuition',
  ['What it does not provide', 'What ZKPs do not provide'],
  ['Assumptions', 'Trust assumptions'],
  'Post-quantum posture',
  'Confidence model',
  ['Failure modes and anti-patterns', 'Failure modes'],
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

for (const file of walk(path.join(dataDir, 'concept-cards'), (item) => item.endsWith('.yml'))) {
  const card = parseYaml(file);
  validateObject(file, card, validators.conceptCard);
  if ((card.references || []).includes('TODO')) {
    errors.push(`${relative(file)}: concept card references must use reference IDs, not TODO`);
  }
}

const referencesFile = path.join(dataDir, 'references.yml');
if (fs.existsSync(referencesFile)) {
  const references = parseYaml(referencesFile);
  validateObject(referencesFile, references, validators.references);
  const ids = new Set();
  for (const reference of references.references || []) {
    if (ids.has(reference.id)) errors.push(`${relative(referencesFile)}: duplicate reference id "${reference.id}"`);
    ids.add(reference.id);
  }
} else {
  errors.push('data/references.yml: missing references registry');
}

const relationshipsFile = path.join(dataDir, 'relationships.yml');
if (fs.existsSync(relationshipsFile)) {
  validateObject(relationshipsFile, parseYaml(relationshipsFile), validators.relationships);
} else {
  errors.push('data/relationships.yml: missing relationship registry');
}

for (const file of walk(path.join(dataDir, 'comparison-matrices'), (item) => item.endsWith('.yml'))) {
  validateObject(file, parseYaml(file), validators.comparisonMatrix);
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
