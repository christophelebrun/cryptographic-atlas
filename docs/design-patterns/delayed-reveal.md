---
title: Delayed Reveal
type: pattern
level: design-pattern
status: draft
last_reviewed: 2026-05-30
difficulty: beginner
maturity: mature
tags:
  - delayed-reveal
  - commitments
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

## Failure modes

- Selective aborts.
- Weak randomness in commitments.
- Ambiguous opening formats.
- No rule for missed deadlines.

## Further reading

- TODO: Add verified references for commit-reveal protocols and timelock tools.
