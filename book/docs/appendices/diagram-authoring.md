---
title: Diagram Authoring
type: appendix
level: not-applicable
template: reference
status: draft
last_reviewed: '2026-05-31'
difficulty: beginner
maturity: not-applicable
tags:
  - diagrams
  - authoring
  - schemas
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Diagram Authoring

Diagrams in the atlas should be source-controlled as structured YAML and rendered into static assets.

## Policy

- Edit diagram sources in `book/data/diagrams/*.yml`.
- Validate diagram YAML against `book/schemas/diagram.schema.json`.
- Generate SVG assets with `npm run generate:diagrams`.
- Use generated SVG files from `book/static/img/diagrams/` in pages.
- Keep generated Mermaid files in `book/static/diagrams/` when a simple flowchart view is useful for review.
- Do not hand-edit generated SVG or Mermaid outputs.

## When to add a diagram

Prefer a diagram when the page explains:

- taxonomy or category boundaries;
- dependency chains between assumptions, primitives, proof systems, protocols, and systems;
- protocol flows with multiple participants or public artifacts;
- composition paths where a component contributes only one narrow guarantee;
- failure modes caused by metadata, setup, trust, or omitted checks.

## Source format

Each YAML file defines:

- a stable `id`;
- a human-readable `title` and `description`;
- a grid layout;
- typed nodes with labels, details, and positions;
- directed edges;
- output paths for generated SVG and optional Mermaid.

Example:

```yaml
id: example-flow
title: "Example flow"
description: A short explanation for readers and screen readers.
layout:
  width: 960
  height: 480
  columns: 3
  rows: 2
  node_width: 244
  node_height: 72
outputs:
  svg: static/img/diagrams/example-flow.svg
  mermaid: static/diagrams/example-flow.mmd
nodes:
  - id: input
    label: Input
    detail: Public data
    kind: actor
    column: 1
    row: 1
  - id: proof
    label: Proof
    detail: Verifiable artifact
    kind: proof
    column: 2
    row: 1
edges:
  - from: input
    to: proof
```

## Current diagram sources

- `book/data/diagrams/assumption-stack.yml`
- `book/data/diagrams/nullifier-flow.yml`
- `book/data/diagrams/private-voting-composition.yml`
- `book/data/diagrams/taxonomy-flow.yml`
- `book/data/diagrams/zero-knowledge-proof-flow.yml`
