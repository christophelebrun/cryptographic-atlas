import React, {useMemo, useState} from 'react';
import ConceptCard from './ConceptCard';
import conceptCards from '../generated/conceptCards';
import {canonicalLabelId, displayLabel} from '../utils/labels';

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
type OptionInput = {
  value: string;
  label: string;
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
    levels: ['security_goal'],
    title: 'Security Goals',
    description: 'Start with the property a system is trying to provide.',
  },
  {
    id: 'assumptions-and-substrates',
    levels: ['mathematical_assumption'],
    title: 'Assumptions and Substrates',
    description: 'Check the hardness, model, setup, and substrate assumptions underneath a construction.',
  },
  {
    id: 'basic-primitives',
    levels: ['basic_primitive'],
    title: 'Basic Primitives',
    description: 'Core building blocks such as encryption, signatures, commitments, and hashes.',
  },
  {
    id: 'structured-primitives',
    levels: ['structured_primitive'],
    title: 'Structured Primitives',
    description: 'Higher-level primitives that add structure, thresholds, homomorphism, or verifiability.',
  },
  {
    id: 'proof-systems',
    levels: ['proof_system'],
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
    levels: ['design_pattern'],
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

function normalized(value: unknown): string {
  return String(value ?? '').toLowerCase();
}

function optionInputs(value: OptionInput | OptionInput[] | null | undefined): OptionInput[] {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).filter((option) => option.value && option.label);
}

function buildOptions<T>(cards: T[], getter: (card: T) => OptionInput | OptionInput[]): FilterOption[] {
  const options = new Map<string, FilterOption>();

  for (const card of cards) {
    for (const option of optionInputs(getter(card))) {
      const current = options.get(option.value);
      if (current) current.count += 1;
      else options.set(option.value, {...option, count: 1});
    }
  }

  return Array.from(options.values()).sort((a, b) => a.label.localeCompare(b.label));
}

function reviewStatus(card: (typeof conceptCards)[number], dimension: 'structural' | 'sources' | 'expert'): string {
  return card.review?.[dimension]?.status ?? 'unknown';
}

function reviewStatusId(card: (typeof conceptCards)[number], dimension: 'structural' | 'sources' | 'expert'): string {
  return card.review?.[dimension]?.statusId ?? canonicalLabelId('review_statuses', reviewStatus(card, dimension));
}

function reviewStatusLabel(card: (typeof conceptCards)[number], dimension: 'structural' | 'sources' | 'expert'): string {
  const status = reviewStatus(card, dimension);
  return card.review?.[dimension]?.statusLabel ?? displayLabel('review_statuses', status);
}

function matchesFilter(actual: string, expected: string): boolean {
  return expected === allValue || actual === expected;
}

function cardHaystack(card: (typeof conceptCards)[number]): string {
  return [
    card.name,
    card.category,
    card.categoryLabel,
    card.level,
    card.levelLabel,
    card.shortIntuition,
    card.maturity,
    card.maturityLabel,
    card.postQuantumPosture,
    card.postQuantumPostureLabel,
    card.confidenceModelType,
    card.confidenceModelLabel,
    card.implementationRisk,
    card.implementationRiskLabel,
    card.auditability,
    card.auditabilityLabel,
    card.parameterSensitivity,
    card.parameterSensitivityLabel,
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
      category: buildOptions(conceptCards, (card) => ({value: card.categoryId, label: card.categoryLabel})),
      level: buildOptions(conceptCards, (card) => ({value: card.levelId, label: card.levelLabel})),
      maturity: buildOptions(conceptCards, (card) => ({value: card.maturityId, label: card.maturityLabel})),
      postQuantumPosture: buildOptions(conceptCards, (card) => ({
        value: card.postQuantumPostureId,
        label: card.postQuantumPostureLabel,
      })),
      implementationRisk: buildOptions(conceptCards, (card) => ({
        value: card.implementationRiskId,
        label: card.implementationRiskLabel,
      })),
      structuralReview: buildOptions(conceptCards, (card) => ({
        value: reviewStatusId(card, 'structural'),
        label: reviewStatusLabel(card, 'structural'),
      })),
      sourceReview: buildOptions(conceptCards, (card) => ({
        value: reviewStatusId(card, 'sources'),
        label: reviewStatusLabel(card, 'sources'),
      })),
      expertReview: buildOptions(conceptCards, (card) => ({
        value: reviewStatusId(card, 'expert'),
        label: reviewStatusLabel(card, 'expert'),
      })),
    }),
    [],
  );

  const filteredCards = useMemo(() => {
    const query = normalized(filters.query).trim();

    return conceptCards.filter((card) => {
      if (query && !cardHaystack(card).includes(query)) return false;
      if (!matchesFilter(card.categoryId, filters.category)) return false;
      if (!matchesFilter(card.levelId, filters.level)) return false;
      if (!matchesFilter(card.maturityId, filters.maturity)) return false;
      if (!matchesFilter(card.postQuantumPostureId, filters.postQuantumPosture)) return false;
      if (!matchesFilter(card.implementationRiskId, filters.implementationRisk)) return false;
      if (!matchesFilter(reviewStatusId(card, 'structural'), filters.structuralReview)) return false;
      if (!matchesFilter(reviewStatusId(card, 'sources'), filters.sourceReview)) return false;
      if (!matchesFilter(reviewStatusId(card, 'expert'), filters.expertReview)) return false;
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
          cards: filteredCards.filter((card) => section.levels.includes(card.levelId)),
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
