import React, {useMemo, useState} from 'react';
import ConceptCard from './ConceptCard';
import conceptCards from '../generated/conceptCards';

type FilterState = {
  query: string;
  category: string;
  level: string;
  maturity: string;
  postQuantumPosture: string;
  implementationRisk: string;
  structuralReview: string;
  sourceReview: string;
  expertReview: string;
};

type FilterKey = keyof FilterState;
type FilterOption = {
  value: string;
  label: string;
  count: number;
};
type LevelSection = {
  id: string;
  levels: string[];
  title: string;
  description: string;
};

const allValue = 'all';
const initialSectionLimit = 6;

const levelSections: LevelSection[] = [
  {
    id: 'security-goals',
    levels: ['security-goal'],
    title: 'Security Goals',
    description: 'Start with the property a system is trying to provide.',
  },
  {
    id: 'assumptions-and-substrates',
    levels: ['mathematical-assumption', 'assumption'],
    title: 'Assumptions and Substrates',
    description: 'Check the hardness, model, setup, and substrate assumptions underneath a construction.',
  },
  {
    id: 'basic-primitives',
    levels: ['basic-primitive'],
    title: 'Basic Primitives',
    description: 'Core building blocks such as encryption, signatures, commitments, and hashes.',
  },
  {
    id: 'structured-primitives',
    levels: ['structured-primitive'],
    title: 'Structured Primitives',
    description: 'Higher-level primitives that add structure, thresholds, homomorphism, or verifiability.',
  },
  {
    id: 'proof-systems',
    levels: ['proof-system'],
    title: 'Proof Systems',
    description: 'Proof families and components used to verify statements without redoing all the work.',
  },
  {
    id: 'protocols',
    levels: ['protocol'],
    title: 'Protocols',
    description: 'Interactive constructions where participants, messages, and threat models matter.',
  },
  {
    id: 'systems-and-applications',
    levels: ['system'],
    title: 'Systems and Applications',
    description: 'End-to-end compositions where product, network, wallet, governance, and metadata risks appear.',
  },
  {
    id: 'design-patterns',
    levels: ['design-pattern'],
    title: 'Design Patterns',
    description: 'Reusable composition patterns and operational moves that show up across systems.',
  },
];

const initialFilters: FilterState = {
  query: '',
  category: allValue,
  level: allValue,
  maturity: allValue,
  postQuantumPosture: allValue,
  implementationRisk: allValue,
  structuralReview: allValue,
  sourceReview: allValue,
  expertReview: allValue,
};

function humanize(value: unknown): string {
  return String(value ?? 'unknown')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalized(value: unknown): string {
  return String(value ?? '').toLowerCase();
}

function optionValues(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? '').trim()).filter(Boolean);
  }
  if (value instanceof Set) {
    return Array.from(value).map((item) => String(item ?? '').trim()).filter(Boolean);
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    const option = String(value).trim();
    return option ? [option] : [];
  }
  return [];
}

function buildOptions<T>(cards: T[], getter: (card: T) => unknown): FilterOption[] {
  const counts = new Map<string, number>();

  for (const card of cards) {
    for (const value of optionValues(getter(card))) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([value, count]) => ({value, label: humanize(value), count}))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function reviewStatus(card: (typeof conceptCards)[number], dimension: 'structural' | 'sources' | 'expert'): string {
  return card.review?.[dimension]?.status ?? 'unknown';
}

function matchesFilter(actual: string, expected: string): boolean {
  return expected === allValue || actual === expected;
}

function cardHaystack(card: (typeof conceptCards)[number]): string {
  return [
    card.name,
    card.category,
    card.level,
    card.shortIntuition,
    card.maturity,
    card.postQuantumPosture,
    card.confidenceModelType,
    card.implementationRisk,
    card.auditability,
    card.parameterSensitivity,
    ...card.securityGoals.map((item) => item.label),
    ...card.doesNotProvide.map((item) => item.label),
    ...card.compositionRisks.map((item) => item.label),
    ...card.metadataLeaks.map((item) => item.label),
  ]
    .map(normalized)
    .join(' ');
}

function SelectFilter({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: FilterKey;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (id: FilterKey, value: string) => void;
}): JSX.Element {
  return (
    <label className="conceptFilters__field" htmlFor={`concept-filter-${id}`}>
      <span>{label}</span>
      <select id={`concept-filter-${id}`} value={value} onChange={(event) => onChange(id, event.target.value)}>
        <option value={allValue}>All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} ({option.count})
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ConceptCardGallery(): JSX.Element {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const filterOptions = useMemo(
    () => ({
      category: buildOptions(conceptCards, (card) => card.category),
      level: buildOptions(conceptCards, (card) => card.level),
      maturity: buildOptions(conceptCards, (card) => card.maturity),
      postQuantumPosture: buildOptions(conceptCards, (card) => card.postQuantumPosture),
      implementationRisk: buildOptions(conceptCards, (card) => card.implementationRisk),
      structuralReview: buildOptions(conceptCards, (card) => reviewStatus(card, 'structural')),
      sourceReview: buildOptions(conceptCards, (card) => reviewStatus(card, 'sources')),
      expertReview: buildOptions(conceptCards, (card) => reviewStatus(card, 'expert')),
    }),
    [],
  );

  const filteredCards = useMemo(() => {
    const query = normalized(filters.query).trim();

    return conceptCards.filter((card) => {
      if (query && !cardHaystack(card).includes(query)) return false;
      if (!matchesFilter(card.category, filters.category)) return false;
      if (!matchesFilter(card.level, filters.level)) return false;
      if (!matchesFilter(card.maturity, filters.maturity)) return false;
      if (!matchesFilter(card.postQuantumPosture, filters.postQuantumPosture)) return false;
      if (!matchesFilter(card.implementationRisk, filters.implementationRisk)) return false;
      if (!matchesFilter(reviewStatus(card, 'structural'), filters.structuralReview)) return false;
      if (!matchesFilter(reviewStatus(card, 'sources'), filters.sourceReview)) return false;
      if (!matchesFilter(reviewStatus(card, 'expert'), filters.expertReview)) return false;
      return true;
    });
  }, [filters]);

  const updateFilter = (id: FilterKey, value: string) => {
    setFilters((current) => ({...current, [id]: value}));
  };

  const resetFilters = () => setFilters(initialFilters);
  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => value !== initialFilters[key as FilterKey],
  ).length;
  const groupedCards = useMemo(
    () =>
      levelSections
        .map((section) => ({
          ...section,
          cards: filteredCards.filter((card) => section.levels.includes(card.level)),
        }))
        .filter((section) => section.cards.length > 0),
    [filteredCards],
  );
  const toggleSection = (sectionId: string) => {
    setExpandedSections((current) => ({...current, [sectionId]: !current[sectionId]}));
  };

  return (
    <section className="conceptGallery">
      <div className="container">
        <div className="conceptGallery__header">
          <h2>Concept Cards ({conceptCards.length})</h2>
          <p>
            Machine-readable summaries surface guarantees, non-goals, posture,
            confidence model, and implementation risk.
          </p>
        </div>
        <div className="conceptFilters" aria-label="Concept card filters">
          <label className="conceptFilters__field conceptFilters__field--search" htmlFor="concept-filter-query">
            <span>Search cards</span>
            <input
              id="concept-filter-query"
              type="search"
              value={filters.query}
              placeholder="Try ZK, metadata, trusted setup..."
              onChange={(event) => updateFilter('query', event.target.value)}
            />
          </label>
          <SelectFilter
            id="category"
            label="Category"
            value={filters.category}
            options={filterOptions.category}
            onChange={updateFilter}
          />
          <SelectFilter
            id="level"
            label="Level"
            value={filters.level}
            options={filterOptions.level}
            onChange={updateFilter}
          />
          <SelectFilter
            id="maturity"
            label="Maturity"
            value={filters.maturity}
            options={filterOptions.maturity}
            onChange={updateFilter}
          />
          <SelectFilter
            id="postQuantumPosture"
            label="PQ posture"
            value={filters.postQuantumPosture}
            options={filterOptions.postQuantumPosture}
            onChange={updateFilter}
          />
          <SelectFilter
            id="implementationRisk"
            label="Implementation risk"
            value={filters.implementationRisk}
            options={filterOptions.implementationRisk}
            onChange={updateFilter}
          />
          <SelectFilter
            id="structuralReview"
            label="Structural review"
            value={filters.structuralReview}
            options={filterOptions.structuralReview}
            onChange={updateFilter}
          />
          <SelectFilter
            id="sourceReview"
            label="Source review"
            value={filters.sourceReview}
            options={filterOptions.sourceReview}
            onChange={updateFilter}
          />
          <SelectFilter
            id="expertReview"
            label="Expert review"
            value={filters.expertReview}
            options={filterOptions.expertReview}
            onChange={updateFilter}
          />
          <div className="conceptFilters__summary" aria-live="polite">
            Showing {filteredCards.length} of {conceptCards.length} cards.
            {activeFilterCount > 0 ? (
              <button type="button" onClick={resetFilters}>
                Reset filters
              </button>
            ) : null}
          </div>
        </div>
        {groupedCards.length === 0 ? (
          <p className="conceptGallery__empty">No concept cards match the current filters.</p>
        ) : (
          <div className="conceptGallery__sections">
            {groupedCards.map((section) => {
              const expanded = Boolean(expandedSections[section.id]);
              const visibleCards = expanded ? section.cards : section.cards.slice(0, initialSectionLimit);
              const hiddenCount = section.cards.length - visibleCards.length;

              return (
                <section className="conceptSection" key={section.id}>
                  <div className="conceptSection__header">
                    <div>
                      <h3>{section.title}</h3>
                      <p>{section.description}</p>
                    </div>
                    <span>{section.cards.length} cards</span>
                  </div>
                  <div className="conceptGallery__grid">
                    {visibleCards.map((card) => (
                      <ConceptCard key={card.id} {...card} />
                    ))}
                  </div>
                  {hiddenCount > 0 || expanded ? (
                    <button className="conceptSection__toggle" type="button" onClick={() => toggleSection(section.id)}>
                      {expanded ? 'Show fewer' : `Show ${hiddenCount} more`}
                    </button>
                  ) : null}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
