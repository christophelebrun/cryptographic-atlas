---
title: FRI
type: primitive
level: proof-system
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
review:
  structural:
    status: current
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: advanced
maturity: deployed
tags:
  - fri
  - starks
  - proof-systems
post_quantum_posture: plausible
confidence_model:
  type: public-verifiability
---

# FRI

## One-sentence intuition

FRI proves that a committed function is close to a low-degree polynomial using repeated folding and random queries.

## Where it sits in the taxonomy

- Level: proof-system component.
- Parent category: [Proof-System Components](/docs/proof-systems/proof-system-components).
- Related concepts: [STARKs](/docs/proof-systems/snarks-starks-bulletproofs), [ZK Rollups](/docs/systems-and-applications/zk-rollups), [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments).

## Problem it solves

Transparent proof systems need a way to convince verifiers that a large evaluated trace has low-degree structure without checking every point.

## Mental model

FRI repeatedly compresses a long table into smaller tables. Random checks make it hard for a high-degree table to keep pretending to be low-degree.

## Minimal example

A prover commits to evaluations of a polynomial-like trace. The verifier samples positions across folded layers and checks consistency until the final object is small enough to inspect.

## Security properties

- Low-degree proximity testing.
- Transparent setup in common constructions.
- Scalable verification when paired with suitable commitments and parameters.

## What it does not provide

- Zero knowledge by itself.
- Correct arithmetization.
- Small proofs in every parameter regime.
- Security if hash, field, or query parameters are weak.

## Assumptions

- Field size, blowup factor, query count, and hash security match the target soundness.
- Fiat-Shamir transcript binding is correct for non-interactive proofs.
- Commitment layers bind each evaluation layer.

## Post-quantum posture

Plausible when instantiated with conservative hashes and parameters. The posture comes from hash security, coding-theoretic soundness, and implementation choices.

## Confidence model

Confidence comes from public-verifiability, transparent parameters, soundness analysis, and transcript binding.

## Common constructions

- STARK-style low-degree testing.
- DEEP-FRI-style refinements.
- FRI-backed polynomial commitment layers.

## Use cases

- STARK proof systems.
- Validity proofs.
- ZK rollups with transparent proving.

## Composition patterns

FRI is composed with arithmetization, Merkle commitments, Fiat-Shamir transcripts, and sometimes recursion or proof aggregation.

## Failure modes and anti-patterns

- Weak query counts.
- Bad domain or field choices.
- Treating low-degree proximity as program correctness.
- Missing transcript binding.

## Maturity and deployment

Deployed in STARK-style systems, but parameters and performance engineering are specialized.

## Related concepts

- [Proof-System Components](/docs/proof-systems/proof-system-components)
- [Arithmetization](/docs/proof-systems/arithmetization)
- [ZK Rollups](/docs/systems-and-applications/zk-rollups)

## Further reading

- [Ben-Sasson et al., "Fast Reed-Solomon Interactive Oracle Proofs of Proximity"](https://eprint.iacr.org/2017/602).
- [Ben-Sasson et al., "Scalable, transparent, and post-quantum secure computational integrity"](https://eprint.iacr.org/2018/046).
