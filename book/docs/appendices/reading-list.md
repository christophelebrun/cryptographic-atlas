---
title: Source Policy and Topic References
type: appendix
level: not-applicable
template: reference
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - references
  - sources
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Source Policy and Topic References

The atlas does not maintain a single canonical reading list for all readers. References should be topic-dependent: each concept, protocol, pattern, and case study should include a `Further reading` section close to the claims it supports.

The structured source registry is `book/data/references.yml`. Concept cards and concrete instances refer to sources by registry ID so the book can later expose source filters, freshness checks, and dependency maps.

## Editorial rule

- Put beginner-friendly orientation in the page body.
- Put source-backed technical depth in the page's `Further reading` section.
- Prefer online references with stable URLs.
- Prefer standards, peer-reviewed papers, recognized preprints, textbooks, and official documentation.
- Do not invent citations.
- Mark uncertain or fast-moving claims with a verification TODO instead of presenting them as settled.

## Machine-readable references

The structured registry records:

- reference ID;
- title, authors, year, source type, URL, and optional DOI;
- `used_by` topics.

The content validator checks that every concept-card reference and concrete-instance reference points to a known registry ID.

## Topic-local examples

- [Secure Channels](/docs/protocols/secure-channels#further-reading) links to TLS 1.3, HPKE, Noise, and Signal specifications.
- [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments#further-reading) links to KZG, FRI, and Halo references.
- [Private Payments](/docs/systems-and-applications/private-payments#further-reading) links to e-cash and Zerocash sources.
- [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation#further-reading) links to credential and vector-commitment sources.

## Maintenance rule

When a topic is updated, update its local `Further reading` section and the structured reference registry together. If a source is useful only for one page, it still belongs in the registry when a concept card or concrete instance needs to cite it by ID.
