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
  categoryId: string;
  categoryLabel: string;
  level: string;
  levelId: string;
  levelLabel: string;
  pageLink?: string;
  shortIntuition: string;
  maturity: Maturity;
  maturityId: string;
  maturityLabel: string;
  securityGoals: ConceptCardItem[];
  doesNotProvide: ConceptCardItem[];
  postQuantumPosture: string;
  postQuantumPostureId: string;
  postQuantumPostureLabel: string;
  postQuantumPostureLink?: string;
  confidenceModelType: string;
  confidenceModelId: string;
  confidenceModelLabel: string;
  confidenceModelLink?: string;
  implementationRisk: string;
  implementationRiskId: string;
  implementationRiskLabel: string;
  implementationRiskLink?: string;
  requiresTrustedSetup: boolean | string;
  requiresTrustedSetupId: string;
  requiresTrustedSetupLabel: string;
  auditability: string;
  auditabilityId: string;
  auditabilityLabel: string;
  parameterSensitivity: string;
  parameterSensitivityId: string;
  parameterSensitivityLabel: string;
  compositionRisks: ConceptCardItem[];
  metadataLeaks: ConceptCardItem[];
  review?: {
    structural?: ReviewDimension;
    sources?: ReviewDimension;
    expert?: ReviewDimension;
  };
};

export type ReviewDimension = {
  status: string;
  statusId?: string;
  statusLabel?: string;
  lastReviewed?: string | null;
  nextReviewDue?: string | null;
  reviewer?: string | null;
};

function LinkedItem({item}: {item: ConceptCardItem}): JSX.Element {
  if (!item.href) return <>{item.label}</>;
  return <Link to={item.href}>{item.label}</Link>;
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && Boolean(target.closest('a, button, input, select, textarea'));
}

function humanize(value: string | boolean | null | undefined): string {
  if (value === true) return 'yes';
  if (value === false) return 'no';
  if (value == null) return 'unknown';
  return String(value).replace(/-/g, ' ');
}

export default function ConceptCard({
  name,
  category,
  categoryLabel = category,
  level,
  levelLabel = level,
  pageLink,
  shortIntuition,
  maturity,
  securityGoals,
  doesNotProvide,
  postQuantumPosture,
  postQuantumPostureLabel = postQuantumPosture,
  postQuantumPostureLink,
  confidenceModelType,
  confidenceModelLabel = confidenceModelType,
  confidenceModelLink,
  implementationRisk,
  implementationRiskLabel = implementationRisk,
  implementationRiskLink,
  auditability,
  auditabilityLabel = humanize(auditability),
  review,
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
            {categoryLabel} · {levelLabel}
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
              <Link to={postQuantumPostureLink}>{postQuantumPostureLabel}</Link>
            ) : (
              postQuantumPostureLabel
            )}
          </dd>
        </div>
        <div>
          <dt>Confidence</dt>
          <dd>
            {confidenceModelLink ? (
              <Link to={confidenceModelLink}>{confidenceModelLabel}</Link>
            ) : (
              confidenceModelLabel
            )}
          </dd>
        </div>
        <div>
          <dt>Implementation risk</dt>
          <dd>
            {implementationRiskLink ? (
              <Link to={implementationRiskLink}>{implementationRiskLabel}</Link>
            ) : (
              implementationRiskLabel
            )}
          </dd>
        </div>
        <div>
          <dt>Auditability</dt>
          <dd>{auditabilityLabel}</dd>
        </div>
        <div>
          <dt>Review</dt>
          <dd>
            Structural {review?.structural?.statusLabel ?? humanize(review?.structural?.status)} · Sources{' '}
            {review?.sources?.statusLabel ?? humanize(review?.sources?.status)} · Expert{' '}
            {review?.expert?.statusLabel ?? humanize(review?.expert?.status)}
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
