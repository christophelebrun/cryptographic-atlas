import React from 'react';
import MaturityBadge, {type Maturity} from './MaturityBadge';

export type ConceptCardProps = {
  name: string;
  category: string;
  level: string;
  shortIntuition: string;
  maturity: Maturity;
  securityGoals: string[];
  doesNotProvide: string[];
};

export default function ConceptCard({
  name,
  category,
  level,
  shortIntuition,
  maturity,
  securityGoals,
  doesNotProvide,
}: ConceptCardProps): JSX.Element {
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
      </div>
    </article>
  );
}
