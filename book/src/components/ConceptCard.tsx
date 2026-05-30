import React from 'react';
import MaturityBadge, {type Maturity} from './MaturityBadge';

export type ConceptCardData = {
  id: string;
  name: string;
  category: string;
  level: string;
  shortIntuition: string;
  maturity: Maturity;
  securityGoals: string[];
  doesNotProvide: string[];
  postQuantumPosture: string;
  confidenceModelType: string;
  implementationRisk: string;
  metadataLeaks: string[];
};

export default function ConceptCard({
  name,
  category,
  level,
  shortIntuition,
  maturity,
  securityGoals,
  doesNotProvide,
  postQuantumPosture,
  confidenceModelType,
  implementationRisk,
  metadataLeaks,
}: ConceptCardData): JSX.Element {
  return (
    <article className="conceptCard">
      <header className="conceptCard__header">
        <div>
          <h3>{name}</h3>
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
          <dd>{postQuantumPosture}</dd>
        </div>
        <div>
          <dt>Confidence</dt>
          <dd>{confidenceModelType}</dd>
        </div>
        <div>
          <dt>Implementation risk</dt>
          <dd>{implementationRisk}</dd>
        </div>
      </dl>
      <div className="conceptCard__grid">
        <section>
          <h4>Security goals</h4>
          <ul>
            {securityGoals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4>Does not provide</h4>
          <ul>
            {doesNotProvide.map((missingGuarantee) => (
              <li key={missingGuarantee}>{missingGuarantee}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4>Metadata leaks</h4>
          <ul>
            {metadataLeaks.map((leak) => (
              <li key={leak}>{leak}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
