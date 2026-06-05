---
title: Folding Schemes
type: primitive
level: proof-system
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: advanced
maturity: research
tags:
  - folding
  - recursion
  - proof-systems
post_quantum_posture: depends
confidence_model:
  type: depends
---

# Folding Schemes

## One-sentence intuition

Folding schemes combine multiple proof instances into a smaller accumulated instance that can be checked later.

## Where it sits in the taxonomy

- Level: proof-system component.
- Parent category: recursion and incremental verifiable computation.
- Related concepts: [Recursive Proofs](/docs/proof-systems/recursive-proofs), [Sumcheck](/docs/proof-systems/sumcheck), [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments).

## Problem it solves

Recursive proofs can be expensive if every step verifies a full proof inside another proof. Folding accumulates claims more directly for long-running computations.

## Mental model

Instead of carrying a stack of receipts, each new receipt is folded into a running balance that is finalized later.

## Minimal example

A prover repeatedly folds computation steps into an accumulator. At the end, the prover produces a final proof that the accumulated relation is valid.

## Security properties

- Incremental compression of repeated claims.
- Support for streaming or long-running computations.
- Potentially cheaper recursion than proving a full verifier each step.

## What it does not provide

- A universal replacement for SNARKs or STARKs.
- Mature, interchangeable assumptions across schemes.
- Correctness if the folded relation is wrong.

## Assumptions

- The commitment scheme and folding relation are sound.
- Accumulators are finalized correctly.
- Fiat-Shamir transcripts bind each step and public input.

## Post-quantum posture

Depends on commitments and proof-system choices. Many known efficient constructions use elliptic-curve assumptions and are quantum-vulnerable.

## Confidence model

Confidence is construction-specific and comes from mathematical assumptions, transcript binding, and public-verifiability of the final proof.

## Common constructions

- Nova-style folding.
- Halo-style accumulation.
- Incrementally verifiable computation frameworks.

## Use cases

- Recursive proving.
- Long-running computation proofs.
- Rollup aggregation.

## Composition patterns

Folding schemes compose with arithmetization, polynomial commitments, sumcheck-style protocols, and final proof systems.

## Failure modes and anti-patterns

- Treating research performance claims as deployed maturity.
- Finalizing the wrong accumulator.
- Omitting public inputs from the folded relation.
- Reusing challenges across contexts.

## Maturity and deployment

Research-stage to emerging. The area is fast-moving and should be reviewed frequently.

## Related concepts

- [Recursive Proofs](/docs/proof-systems/recursive-proofs)
- [ZK Rollups](/docs/systems-and-applications/zk-rollups)
- [Transcript Binding](/docs/design-patterns/transcript-binding)

## Further reading

- [Bowe, Grigg, and Hopwood, "Halo"](https://eprint.iacr.org/2019/1021).
- [Kothapalli, Setty, and Tzialla, "Nova"](https://eprint.iacr.org/2021/370).
