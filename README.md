# The Cryptographic Atlas

A practical map of modern cryptographic primitives, protocols, guarantees, and design patterns.

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

The Docusaurus book lives in `docs/`. Reusable concept metadata lives in `data/concept-cards/`. Website components live in `src/components/`.

## Local development

```bash
npm install
npm run start
npm run build
```

## Contributing

Contributions should improve conceptual clarity, threat-model precision, assumptions, failure modes, examples, diagrams, or references. See `CONTRIBUTING.md` and `AGENTS.md` before adding new concept pages.

## License

Book content is licensed under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).

Website source code is intended to be licensed under MIT unless otherwise specified. A TODO remains to split code and content licensing if the project needs stricter separation.

## Safety note

Cryptographic systems fail when guarantees are overstated, assumptions are hidden, metadata leaks are ignored, or components are composed outside their threat model. This atlas is meant to help readers reason about those risks, not bypass expert review.

## Next steps

- Add verified citations.
- Add diagrams for the taxonomy.
- Add concept-card rendering from YAML.
- Add French translation.
- Add more case studies.
- Add comparison matrices.
- Add glossary backlinks.
