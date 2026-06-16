import labelRegistry from '../generated/labels';

type LabelEntry = {
  labels: Record<string, string>;
  aliases?: readonly unknown[];
};

type LabelRegistry = {
  defaultLocale: string;
  namespaces: Record<string, Record<string, LabelEntry>>;
};

const registry = labelRegistry as LabelRegistry;
const lookups = new Map<string, Map<string, string>>();

function lookupKey(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-');
}

function fallbackCanonicalId(value: unknown): string {
  return lookupKey(value).replace(/-/g, '_') || 'unknown';
}

function fallbackDisplayLabel(value: unknown): string {
  const normalized = String(value ?? 'unknown')
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase();
  return normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : 'Unknown';
}

function lookupNamespace(namespace: string): Map<string, string> {
  const cached = lookups.get(namespace);
  if (cached) return cached;

  const entries = registry.namespaces[namespace] ?? {};
  const lookup = new Map<string, string>();

  for (const [id, entry] of Object.entries(entries)) {
    for (const alias of new Set<unknown>([id, id.replace(/_/g, '-'), ...(entry.aliases ?? [])])) {
      const key = lookupKey(alias);
      if (key) lookup.set(key, id);
    }
  }

  lookups.set(namespace, lookup);
  return lookup;
}

export function canonicalLabelId(namespace: string, value: unknown): string {
  return lookupNamespace(namespace).get(lookupKey(value)) ?? fallbackCanonicalId(value);
}

export function displayLabel(namespace: string, value: unknown, locale = registry.defaultLocale): string {
  const id = canonicalLabelId(namespace, value);
  const entry = registry.namespaces[namespace]?.[id];
  return entry?.labels[locale] ?? entry?.labels[registry.defaultLocale] ?? entry?.labels.en ?? fallbackDisplayLabel(value);
}
