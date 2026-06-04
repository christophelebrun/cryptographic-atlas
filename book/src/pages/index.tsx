import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import ConceptCardGallery from '../components/ConceptCardGallery';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="The Cryptographic Atlas"
      description="A practical map of modern cryptographic primitives, protocols, guarantees, and design patterns.">
      <main>
        <section className="atlasHero">
          <div className="container">
            <div className="atlasHero__mark" aria-hidden="true">
              CA
            </div>
            <Heading as="h1" className="atlasHero__title">
              The Cryptographic Atlas
            </Heading>
            <p className="atlasHero__subtitle">
              A practical map of modern cryptographic primitives, protocols,
              guarantees, and design patterns.
            </p>
            <p className="atlasHero__mission">
              A design-oriented atlas for understanding cryptographic building
              blocks, their assumptions, their limits, and the risks that appear
              when they are composed into systems.
            </p>
            <div className="atlasHero__actions">
              <Link className="button button--primary button--lg" to="/docs/intro">
                Start reading
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/taxonomy/overview">
                Taxonomy
              </Link>
            </div>
          </div>
        </section>

        <section className="atlasNotice">
          <div className="container">
            <strong>Educational use only.</strong> This book is not production
            cryptography guidance and does not replace expert protocol review.
            Content was generated and revised with AI agents; verify technical
            claims against cited sources before relying on them.
          </div>
        </section>

        <ConceptCardGallery />
      </main>
    </Layout>
  );
}
