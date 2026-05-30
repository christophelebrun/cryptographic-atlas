---
title: Timelock and VDFs
type: primitive
level: structured-primitive
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: emerging
tags:
  - timelock
  - vdf
---

# Timelock and VDFs

## One-sentence intuition

Timelock tools and verifiable delay functions (VDFs) make information or outputs depend on the passage of sequential computation time.

## What VDFs provide

- A result that is slow to compute.
- A proof that is fast to verify, depending on the construction.

## What they do not provide

- Wall-clock fairness in every network setting.
- Protection against specialized hardware unless modeled.
- Confidentiality by themselves.

## Use cases

- Randomness beacons.
- Delayed reveal.
- Leader election protocols.

## Failure modes

- Underestimating hardware advantage.
- Confusing sequential work with trusted time.
- Ignoring denial-of-service and availability.

## Further reading

- TODO: Add verified references for VDF constructions and timelock encryption.
