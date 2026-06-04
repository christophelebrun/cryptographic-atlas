---
title: Design Patterns Overview
type: pattern
level: design-pattern
template: overview
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - design-patterns
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Design Patterns Overview

Design patterns are recurring ways to compose cryptographic tools into system behavior.

## Examples

- Anonymous membership proves eligibility without naming the user.
- Anti-double-use nullifiers prevent repeated anonymous actions.
- Private aggregation reveals totals without exposing individual values.
- Delayed reveal separates commitment time from opening time.
- Reveal only a function limits disclosure to a computed output.
- Make receipts useless reduces coercion and vote-buying risk.
- Operational patterns bind context, manage revocation, rotate keys, and prevent cross-protocol confusion.

## Reading rule

A pattern is not a complete protocol. Treat it as a design shape that still needs assumptions, threat models, and implementation review.

See [Operational Design Patterns](/docs/design-patterns/operational-design-patterns).
