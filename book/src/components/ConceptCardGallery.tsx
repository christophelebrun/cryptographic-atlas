import React from 'react';
import ConceptCard from './ConceptCard';
import conceptCards from '../generated/conceptCards';

export default function ConceptCardGallery(): JSX.Element {
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
        <div className="conceptGallery__grid">
          {conceptCards.map((card) => (
            <ConceptCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
