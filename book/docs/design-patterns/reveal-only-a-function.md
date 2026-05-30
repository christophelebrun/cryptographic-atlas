---
title: Reveal Only a Function
type: pattern
level: design-pattern
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: emerging
tags:
  - minimal-disclosure
  - functional-encryption
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Reveal Only a Function

## One-sentence intuition

Reveal only a function means exposing a computed result while keeping the underlying inputs hidden.

## Common building blocks

- Homomorphic encryption.
- Functional encryption.
- Multi-party computation.
- Zero-knowledge proofs for input validity.

## What it does not provide

- Protection if the function output is too revealing.
- Privacy across repeated queries without leakage analysis.
- Correctness unless inputs and computation are verified.

## Assumptions

The allowed function must be chosen carefully, repeated queries must be controlled, and the underlying primitive or protocol must enforce that only the intended function result is revealed.

## Post-quantum posture

Not applicable to the pattern by itself. A concrete system inherits posture from functional encryption, homomorphic encryption, multi-party computation, proof systems, and authentication.

## Confidence model

Confidence depends on the mechanism: a key authority for functional encryption, threshold or honest-party assumptions for multi-party computation, or mathematical assumptions and key control for homomorphic encryption.

## Failure modes

- Differencing attacks across multiple outputs.
- Functions that encode private values directly.
- Missing access control around who can ask which function.

## Further reading

- [Functional encryption](/docs/structured-primitives/functional-encryption)
- [Multi-party computation](/docs/protocols/mpc)
