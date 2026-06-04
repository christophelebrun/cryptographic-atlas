import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import MaturityBadge, {type Maturity} from './MaturityBadge';

export type ConceptCardItem = {
  label: string;
  href?: string;
};

export type ConceptCardData = {
  id: string;
  name: string;
  category: string;
  level: string;
  pageLink?: string;
  shortIntuition: string;
  maturity: Maturity;
  securityGoals: ConceptCardItem[];
  doesNotProvide: ConceptCardItem[];
  postQuantumPosture: string;
  postQuantumPostureLink?: string;
  confidenceModelType: string;
  confidenceModelLink?: string;
  implementationRisk: string;
  implementationRiskLink?: string;
  metadataLeaks: ConceptCardItem[];
};

function LinkedItem({item}: {item: ConceptCardItem}): JSX.Element {
  if (!item.href) return <>{item.label}</>;
  return <Link to={item.href}>{item.label}</Link>;
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && Boolean(target.closest('a, button, input, select, textarea'));
}

export default function ConceptCard({
  name,
  category,
  level,
  pageLink,
  shortIntuition,
  maturity,
  securityGoals,
  doesNotProvide,
  postQuantumPosture,
  postQuantumPostureLink,
  confidenceModelType,
  confidenceModelLink,
  implementationRisk,
  implementationRiskLink,
  metadataLeaks,
}: ConceptCardData): JSX.Element {
  const resolvedPageLink = useBaseUrl(pageLink ?? '/');
  const openPage = () => {
    if (pageLink) window.location.assign(resolvedPageLink);
  };

  return (
    <article
      className={pageLink ? 'conceptCard conceptCard--linked' : 'conceptCard'}
      onClick={(event) => {
        if (!pageLink || isInteractiveTarget(event.target)) return;
        openPage();
      }}
      onKeyDown={(event) => {
        if (!pageLink || isInteractiveTarget(event.target)) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openPage();
        }
      }}
      role={pageLink ? 'link' : undefined}
      tabIndex={pageLink ? 0 : undefined}>
      <header className="conceptCard__header">
        <div>
          <h3>{pageLink ? <Link to={pageLink}>{name}</Link> : name}</h3>
          <p>
            {category} · {level}
          </p>
        </div>
        <MaturityBadge maturity={maturity} />
      </header>
      <p>{shortIntuition}</p>
      <dl className="conceptCard__metadata">
        <div>
          <dt>PQ posture</dt>
          <dd>
            {postQuantumPostureLink ? (
              <Link to={postQuantumPostureLink}>{postQuantumPosture}</Link>
            ) : (
              postQuantumPosture
            )}
          </dd>
        </div>
        <div>
          <dt>Confidence</dt>
          <dd>
            {confidenceModelLink ? (
              <Link to={confidenceModelLink}>{confidenceModelType}</Link>
            ) : (
              confidenceModelType
            )}
          </dd>
        </div>
        <div>
          <dt>Implementation risk</dt>
          <dd>
            {implementationRiskLink ? (
              <Link to={implementationRiskLink}>{implementationRisk}</Link>
            ) : (
              implementationRisk
            )}
          </dd>
        </div>
      </dl>
      <div className="conceptCard__grid">
        <section>
          <h4>Security goals</h4>
          <ul>
            {securityGoals.map((goal) => (
              <li key={goal.label}>
                <LinkedItem item={goal} />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h4>Does not provide</h4>
          <ul>
            {doesNotProvide.map((missingGuarantee) => (
              <li key={missingGuarantee.label}>
                <LinkedItem item={missingGuarantee} />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h4>Metadata leaks</h4>
          <ul>
            {metadataLeaks.map((leak) => (
              <li key={leak.label}>
                <LinkedItem item={leak} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
