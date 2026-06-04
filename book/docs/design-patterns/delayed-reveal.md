---
title: Delayed Reveal
type: pattern
level: design-pattern
template: concept
status: current
last_reviewed: '2026-06-04'
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

## Concrete compositions

| Composition | Typical role | Main caution |
| --- | --- | --- |
| Hash commit-reveal | Lotteries, auctions, simple delayed disclosure | Weak randomness reveals low-entropy committed values. |
| Pedersen commit-reveal | Numeric hidden values with later opening | Quantum-vulnerable; randomness and generator setup matter. |
| Timelock puzzle reveal | Delay without relying only on a human opener | Delay assumptions and hardware advantage must be modeled. |
| VDF-assisted reveal | Publicly verifiable delayed output | VDF setup and denial-of-service handling are part of the design. |

## Failure modes

- Selective aborts.
- Weak randomness in commitments.
- Ambiguous opening formats.
- No rule for missed deadlines.

## Further reading

- [Commitments](/docs/primitives/commitments)
- [Timelocks and VDFs](/docs/structured-primitives/timelock-and-vdfs)
