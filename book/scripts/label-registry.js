const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function lookupKey(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-');
}

function fallbackCanonicalId(value) {
  return lookupKey(value).replace(/-/g, '_') || 'unknown';
}

function fallbackDisplayLabel(value) {
  const normalized = String(value ?? 'unknown')
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase();
  return normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : 'Unknown';
}

function prepareLabelRegistry(registry) {
  const defaultLocale = registry.default_locale || registry.defaultLocale || 'en';
  const namespaces = registry.namespaces || {};
  const lookups = {};

  for (const [namespace, entries] of Object.entries(namespaces)) {
    const lookup = new Map();
    lookups[namespace] = lookup;

    for (const [id, entry] of Object.entries(entries || {})) {
      const aliases = new Set([id, id.replace(/_/g, '-'), ...(entry.aliases || [])]);
      for (const alias of aliases) {
        const key = lookupKey(alias);
        if (!key) continue;
        const existing = lookup.get(key);
        if (existing && existing !== id) {
          throw new Error(`Label alias "${alias}" maps to both "${existing}" and "${id}" in namespace "${namespace}"`);
        }
        lookup.set(key, id);
      }
    }
  }

  return {
    ...registry,
    defaultLocale,
    lookups,
  };
}

function loadLabelRegistry(root = path.resolve(__dirname, '..')) {
  const labelsFile = path.join(root, 'data', 'labels.yml');
  return prepareLabelRegistry(yaml.load(fs.readFileSync(labelsFile, 'utf8')) || {});
}

function canonicalLabelId(registry, namespace, value) {
  const prepared = registry.lookups ? registry : prepareLabelRegistry(registry);
  return prepared.lookups[namespace]?.get(lookupKey(value)) || fallbackCanonicalId(value);
}

function labelEntry(registry, namespace, value) {
  const prepared = registry.lookups ? registry : prepareLabelRegistry(registry);
  const id = canonicalLabelId(prepared, namespace, value);
  return prepared.namespaces?.[namespace]?.[id];
}

function displayLabel(registry, namespace, value, locale) {
  const prepared = registry.lookups ? registry : prepareLabelRegistry(registry);
  const resolvedLocale = locale || prepared.defaultLocale || 'en';
  const entry = labelEntry(prepared, namespace, value);
  return (
    entry?.labels?.[resolvedLocale] ||
    entry?.labels?.[prepared.defaultLocale] ||
    entry?.labels?.en ||
    fallbackDisplayLabel(value)
  );
}

function hasLabel(registry, namespace, value) {
  const prepared = registry.lookups ? registry : prepareLabelRegistry(registry);
  return prepared.lookups[namespace]?.has(lookupKey(value)) || false;
}

function registryForClient(registry) {
  const prepared = registry.lookups ? registry : prepareLabelRegistry(registry);
  return {
    version: prepared.version,
    defaultLocale: prepared.defaultLocale,
    locales: prepared.locales || [prepared.defaultLocale],
    namespaces: prepared.namespaces || {},
  };
}

module.exports = {
  canonicalLabelId,
  displayLabel,
  fallbackDisplayLabel,
  hasLabel,
  loadLabelRegistry,
  lookupKey,
  prepareLabelRegistry,
  registryForClient,
};
