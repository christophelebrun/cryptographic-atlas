# The Cryptographic Atlas

A practical map of modern cryptographic primitives, protocols, guarantees, and design patterns.

Website target: https://christophelebrun.github.io/cryptographic-atlas/

## What this project is

The Cryptographic Atlas is a living online book for technically literate readers who want to understand modern cryptographic building blocks and how they relate to systems.

It is educational. The goal is to clarify concepts, assumptions, trade-offs, failure modes, and composition risks.

## What this project is not

This project is not a source of production-ready cryptographic implementations or deployment recipes. It does not teach readers how to invent new cryptography, and it should not be used as a substitute for expert review.

Do not design or deploy custom cryptographic protocols without qualified cryptographic and security review.

## Audience

The intended audience includes software engineers, blockchain builders, security architects, technical founders, students, applied cryptography beginners, and product designers working with privacy-preserving systems.

## Core taxonomy

The book organizes concepts across eight levels:

1. Security goals
2. Mathematical assumptions and substrates
3. Basic primitives
4. Structured or advanced primitives
5. Proof systems
6. Protocols
7. Systems and applications
8. Design patterns

## Repository structure

The Docusaurus book app lives in `book/`. Book pages live in `book/docs/`, reusable concept metadata lives in `book/data/concept-cards/`, and website components live in `book/src/components/`.

Repository-level planning and maintenance files can stay outside the book app. For example, the initialization prompt remains at the repository root.

Concept cards are YAML metadata files in `book/data/concept-cards/`. They support generated concept-card rendering, comparison tables, and machine-readable concept summaries.

## Local development

```bash
cd book
npm install
npm run start
npm run validate:content
npm run build
```

For local search testing, use the production build:

```bash
cd book
npm run build
npm run serve
```

## Math and search

The book supports inline and block math through KaTeX:

```markdown
Inline: $C = g^m h^r$

Block:
$$
C = g^m h^r
$$
```

The site also includes a local search index. Search works in the statically built site, so use `npm run build` followed by `npm run serve` when testing search locally.

## Surfaced properties

Major concept pages and concept cards should surface:

- post-quantum posture;
- confidence model or trust distribution;
- maturity;
- assumptions;
- setup requirements;
- composition risks;
- what the concept does not provide.

Concept cards also track implementation risk, metadata leakage, auditability, parameter sensitivity, revocation/update story, and operational failure modes.

## Content validation

Content schemas live in `book/schemas/`. Run:

```bash
cd book
npm run validate:content
```

The validator checks document frontmatter, page template sections, concept-card YAML, structured references, relationship data, and comparison matrices.

## Contributing

Contributions should improve conceptual clarity, threat-model precision, assumptions, failure modes, examples, diagrams, or references. See `CONTRIBUTING.md` and `AGENTS.md` before adding new concept pages.

## License

Book content is licensed under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).

Website source code is intended to be licensed under MIT unless otherwise specified. Track code/content license separation explicitly if the project needs stricter boundaries later.

## Safety note

Cryptographic systems fail when guarantees are overstated, assumptions are hidden, metadata leaks are ignored, or components are composed outside their threat model. This atlas is meant to help readers reason about those risks, not bypass expert review.

## Next steps

- Add more case studies.
- Add deeper assumption/substrate pages for newer or specialized assumptions.
- Add generated rendering for comparison-matrix YAML.
- Add more case studies and system walkthroughs.
