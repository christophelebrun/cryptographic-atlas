---
title: Delayed Reveal
type: pattern
level: design-pattern
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: beginner
maturity: mature
tags:
  - delayed-reveal
  - commitments
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Delayed Reveal

## One-sentence intuition

Delayed reveal fixes information at one time and discloses it later.

## Common building blocks

- Commitments.
- Timelocks or VDFs.
- Public bulletin boards.
- Opening deadlines and dispute rules.

## What it does not provide

- Confidentiality after opening.
- Fairness if parties can abort without penalty.
- Authentication unless submissions are bound to identities or credentials.

## Assumptions

The commitment or delay mechanism must bind the initial value, opening rules must be unambiguous, and the system must define what happens when a party refuses or misses the reveal phase.

## Post-quantum posture

Not applicable to the pattern by itself. A concrete design inherits posture from its commitments, timelocks, signatures, and public bulletin board.

## Confidence model

Confidence may come from mathematical binding, public-verifiability of openings, or external-timing assumptions when VDFs or timelocks are used.

## Failure modes

- Selective aborts.
- Weak randomness in commitments.
- Ambiguous opening formats.
- No rule for missed deadlines.

## Further reading

- [Commitments](/docs/primitives/commitments)
- [Timelocks and VDFs](/docs/structured-primitives/timelock-and-vdfs)
