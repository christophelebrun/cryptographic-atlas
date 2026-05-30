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

Use the templates in `AGENTS.md`. Major concepts should also receive a YAML concept card in `data/concept-cards/`.

## Local checks

```bash
npm install
npm run build
```

## License

By contributing, you agree that educational content is licensed under CC BY-SA 4.0 and website source code is intended to be licensed under MIT unless otherwise specified.
