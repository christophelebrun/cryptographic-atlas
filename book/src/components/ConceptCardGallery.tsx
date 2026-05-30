import React from 'react';
import ConceptCard from './ConceptCard';
import conceptCards from '../generated/conceptCards';

export default function ConceptCardGallery(): JSX.Element {
  const featuredCards = conceptCards.slice(0, 6);

  return (
    <section className="conceptGallery">
      <div className="container">
        <div className="conceptGallery__header">
          <h2>Concept Cards</h2>
          <p>
            Machine-readable summaries surface guarantees, non-goals, posture,
            confidence model, and implementation risk.
          </p>
        </div>
        <div className="conceptGallery__grid">
          {featuredCards.map((card) => (
            <ConceptCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
