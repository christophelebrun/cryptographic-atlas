# Contributing

The Cryptographic Atlas welcomes careful educational contributions.

## Editorial standards

- State the taxonomy level of each concept.
- Separate security goals, assumptions, primitives, protocols, systems, and design patterns.
- Include what the concept does not provide.
- Include trust assumptions, metadata leaks, and failure modes.
- Mark uncertain claims with TODO instead of inventing citations.
- Avoid production deployment advice unless it points to established, audited libraries and clearly states the threat model.

## New concept pages

Use the templates in `AGENTS.md`. Major concepts should also receive a YAML concept card in `book/data/concept-cards/`.

## Diagrams

Diagram YAML in `book/data/diagrams/` is the editable source. Generated SVG and Mermaid outputs should be produced with `npm run generate:diagrams` from the `book/` directory and should not be hand-edited.

Add a diagram when it clarifies taxonomy boundaries, assumption dependencies, protocol flows, composition risks, lifecycle steps, or failure modes that are hard to scan in prose.

## Local checks

```bash
cd book
npm install
npm run generate:diagrams
npm run generate:pdf
npm run validate:content
npm run build
```

Regenerate the PDF when documentation content, diagrams, sidebars, or print styling changes.

## License

By contributing, you agree that educational content is licensed under CC BY-SA 4.0 and website source code is intended to be licensed under MIT unless otherwise specified.
