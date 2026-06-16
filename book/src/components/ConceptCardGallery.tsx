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

const allValue = 'all';

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

function uniqueValues(values: string[]): string[] {
  return [...new Set(values.filter(Boolean).map(String))].sort((a, b) => humanize(a).localeCompare(humanize(b)));
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
  options: string[];
  onChange: (id: FilterKey, value: string) => void;
}): JSX.Element {
  return (
    <label className="conceptFilters__field" htmlFor={`concept-filter-${id}`}>
      <span>{label}</span>
      <select id={`concept-filter-${id}`} value={value} onChange={(event) => onChange(id, event.target.value)}>
        <option value={allValue}>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {humanize(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ConceptCardGallery(): JSX.Element {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filterOptions = useMemo(
    () => ({
      category: uniqueValues(conceptCards.map((card) => card.category)),
      level: uniqueValues(conceptCards.map((card) => card.level)),
      maturity: uniqueValues(conceptCards.map((card) => card.maturity)),
      postQuantumPosture: uniqueValues(conceptCards.map((card) => card.postQuantumPosture)),
      implementationRisk: uniqueValues(conceptCards.map((card) => card.implementationRisk)),
      structuralReview: uniqueValues(conceptCards.map((card) => reviewStatus(card, 'structural'))),
      sourceReview: uniqueValues(conceptCards.map((card) => reviewStatus(card, 'sources'))),
      expertReview: uniqueValues(conceptCards.map((card) => reviewStatus(card, 'expert'))),
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
          <SelectFilter id="level" label="Level" value={filters.level} options={filterOptions.level} onChange={updateFilter} />
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
        <div className="conceptGallery__grid">
          {filteredCards.map((card) => (
            <ConceptCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
