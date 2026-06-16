#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const root = path.resolve(__dirname, '..');
const cardsDir = path.join(root, 'data', 'concept-cards');
const docsDir = path.join(root, 'docs');
const outputFile = path.join(root, 'src', 'generated', 'conceptCards.ts');
const docFrontmatterByRoute = new Map();

const manualDocLinks = {
  'anonymous-credential': '/docs/protocols/anonymous-credentials',
  'digital-signature': '/docs/primitives/digital-signatures',
  'hash-function': '/docs/primitives/hash-functions',
  'membership-proof': '/docs/proof-systems/membership-proofs',
  mpc: '/docs/protocols/mpc',
  nullifier: '/docs/protocols/nullifiers',
  'pedersen-commitment': '/docs/primitives/pedersen-commitments',
  'range-proof': '/docs/proof-systems/range-proofs',
  vdf: '/docs/structured-primitives/timelock-and-vdfs',
  'zero-knowledge-proof': '/docs/proof-systems/zero-knowledge-proofs',
};

const commonTopicLinks = {
  authenticity: '/docs/taxonomy/security-goals',
  confidentiality: '/docs/taxonomy/security-goals',
  integrity: '/docs/taxonomy/security-goals',
  privacy: '/docs/taxonomy/security-goals',
  'access-patterns': '/docs/appendices/metadata-leakage',
  context: '/docs/appendices/metadata-leakage',
  'gas-funding': '/docs/appendices/metadata-leakage',
  identity: '/docs/appendices/metadata-leakage',
  'message-count': '/docs/appendices/metadata-leakage',
  'network-metadata': '/docs/appendices/metadata-leakage',
  'network-anonymity': '/docs/appendices/metadata-leakage',
  output: '/docs/appendices/metadata-leakage',
  participation: '/docs/appendices/metadata-leakage',
  'proof-timing': '/docs/appendices/metadata-leakage',
  'public-inputs': '/docs/appendices/metadata-leakage',
  size: '/docs/appendices/metadata-leakage',
  timing: '/docs/appendices/metadata-leakage',
};

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

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function singularSlug(value) {
  if (value.endsWith('s') && !value.endsWith('ss')) return value.slice(0, -1);
  return value;
}

function parseMarkdown(file) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  return {
    frontmatter: match ? yaml.load(match[1]) || {} : {},
    body: match ? text.slice(match[0].length) : text,
  };
}

function docRoute(file) {
  const parts = path.relative(docsDir, file).replace(/\.mdx?$/, '').split(path.sep);
  if (parts.length > 1 && parts[parts.length - 1] === parts[parts.length - 2]) {
    parts.pop();
  }
  return `/docs/${parts.join('/')}`;
}

function addLink(map, key, href) {
  const normalized = slug(key);
  if (normalized && !map.has(normalized)) map.set(normalized, href);
}

function buildDocLinks() {
  const links = new Map();

  for (const file of walk(docsDir, (item) => item.endsWith('.md') || item.endsWith('.mdx'))) {
    const route = docRoute(file);
    const parsed = parseMarkdown(file);
    const basename = path.basename(file, path.extname(file));
    docFrontmatterByRoute.set(route, parsed.frontmatter);

    addLink(links, basename, route);
    addLink(links, singularSlug(slug(basename)), route);
    if (parsed.frontmatter.title) {
      const titleSlug = slug(parsed.frontmatter.title);
      addLink(links, titleSlug, route);
      addLink(links, singularSlug(titleSlug), route);
    }
  }

  for (const [key, href] of Object.entries(manualDocLinks)) {
    addLink(links, key, href);
  }

  return links;
}

function buildGlossaryLinks() {
  const links = new Map();
  const glossaryFile = path.join(docsDir, 'glossary', 'glossary.md');
  if (!fs.existsSync(glossaryFile)) return links;

  const route = docRoute(glossaryFile);
  const {body} = parseMarkdown(glossaryFile);
  for (const match of body.matchAll(/^##\s+(.+)$/gm)) {
    const headingSlug = slug(match[1]);
    addLink(links, headingSlug, `${route}#${headingSlug}`);
  }

  return links;
}

const docLinks = buildDocLinks();
const glossaryLinks = buildGlossaryLinks();

function linkForLabel(value) {
  const normalized = slug(value);
  if (docLinks.has(normalized)) return docLinks.get(normalized);
  if (glossaryLinks.has(normalized)) return glossaryLinks.get(normalized);
  if (commonTopicLinks[normalized]) return commonTopicLinks[normalized];

  for (const [topic, href] of glossaryLinks) {
    if (normalized.includes(topic)) return href;
  }

  for (const [topic, href] of Object.entries(commonTopicLinks)) {
    if (normalized.includes(topic)) return href;
  }

  return undefined;
}

function linkedItems(values) {
  return values.map((label) => {
    const href = linkForLabel(label);
    return href ? {label, href} : {label};
  });
}

function dateString(value) {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function normalizeReviewDimension(dimension, fallbackStatus, fallbackDate) {
  if (!dimension) {
    return {
      status: fallbackStatus,
      lastReviewed: fallbackDate,
    };
  }

  return {
    status: dimension.status || fallbackStatus,
    lastReviewed: dateString(dimension.last_reviewed) || fallbackDate,
    nextReviewDue: dateString(dimension.next_review_due),
    reviewer: dimension.reviewer || null,
  };
}

function reviewForPage(pageLink) {
  const frontmatter = docFrontmatterByRoute.get(pageLink);
  if (!frontmatter) {
    return {
      structural: {status: 'unknown', lastReviewed: null},
      sources: {status: 'unknown', lastReviewed: null},
      expert: {status: 'unknown', lastReviewed: null, reviewer: null},
    };
  }

  const fallbackStatus = frontmatter.status || 'needs-review';
  const fallbackDate = dateString(frontmatter.last_reviewed);

  return {
    structural: normalizeReviewDimension(frontmatter.review?.structural, fallbackStatus, fallbackDate),
    sources: normalizeReviewDimension(frontmatter.review?.sources, fallbackStatus, fallbackDate),
    expert: normalizeReviewDimension(frontmatter.review?.expert, 'not-reviewed', null),
  };
}

function toCamelCard(card) {
  const pageLink = linkForLabel(card.id);

  return {
    id: card.id,
    name: card.name,
    category: card.category,
    level: card.level,
    pageLink,
    shortIntuition: card.short_intuition,
    maturity: card.maturity,
    securityGoals: linkedItems(card.security_goals),
    doesNotProvide: linkedItems(card.does_not_provide),
    postQuantumPosture: card.post_quantum_posture,
    postQuantumPostureLink: '/docs/appendices/post-quantum-posture',
    confidenceModelType: card.confidence_model.type,
    confidenceModelLink: '/docs/appendices/confidence-models',
    implementationRisk: card.implementation_risk,
    requiresTrustedSetup: card.requires_trusted_setup,
    auditability: card.auditability,
    parameterSensitivity: card.parameter_sensitivity,
    compositionRisks: linkedItems(card.composition_risks),
    metadataLeaks: linkedItems(card.metadata_leaks),
    review: reviewForPage(pageLink),
  };
}

const cards = fs
  .readdirSync(cardsDir)
  .filter((file) => file.endsWith('.yml'))
  .sort()
  .map((file) => yaml.load(fs.readFileSync(path.join(cardsDir, file), 'utf8')))
  .map(toCamelCard)
  .sort((a, b) => a.name.localeCompare(b.name));

fs.mkdirSync(path.dirname(outputFile), {recursive: true});
fs.writeFileSync(
  outputFile,
  `// This file is generated by scripts/generate-concept-card-data.js.\n` +
    `// Do not edit it directly; edit book/data/concept-cards/*.yml instead.\n\n` +
    `import type {ConceptCardData} from '../components/ConceptCard';\n\n` +
    `const conceptCards: ConceptCardData[] = ${JSON.stringify(cards, null, 2)};\n\n` +
    `export default conceptCards;\n`,
);

console.log(`Generated ${path.relative(root, outputFile)} from ${cards.length} concept cards.`);
