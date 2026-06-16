---
title: Polynomial Commitments
type: primitive
level: structured-primitive
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
  - commitments
  - proof-systems
  - polynomial-commitments
post_quantum_posture: depends
confidence_model:
  type: depends
---

# Polynomial Commitments

## One-sentence intuition

A polynomial commitment binds a prover to a polynomial while allowing short proofs about selected evaluations of that polynomial.

## Where it sits in the taxonomy

- Level: structured primitive.
- Parent category: commitments and proof-system components.
- Related concepts: [Commitments](/docs/primitives/commitments), [Vector Commitments](/docs/structured-primitives/vector-commitments), [Proof-System Components](/docs/proof-systems/proof-system-components), [ZK Rollups](/docs/systems-and-applications/zk-rollups).

## Problem it solves

Many proof systems need a prover to commit to a large witness polynomial and later prove that the committed polynomial evaluates to a claimed value at verifier-chosen points. Without a commitment scheme, the verifier would need too much witness data or would have no binding handle on the prover's claims.

## Mental model

Think of the commitment as a sealed description of a curve. Later, the prover can reveal and prove the height of the curve at selected x-coordinates without publishing the entire curve.

## Minimal example

A prover commits to a polynomial `f`. The verifier asks for `f(z)`. The prover returns `y` plus an opening proof. The verifier checks that the same committed polynomial really satisfies `f(z) = y`.

## Security properties

- Binding to one polynomial or low-degree object.
- Compact evaluation openings.
- Batch verification in many schemes.
- Sometimes hiding, if the scheme includes blinding.

## What it does not provide

- A complete proof system by itself.
- Zero knowledge unless hiding and protocol-level protections are added.
- Transparent setup in all constructions.
- Correct arithmetization of the program being proven.

## Assumptions

- KZG commitments rely on pairings and structured reference strings.
- Inner-product commitments rely on discrete-logarithm assumptions.
- FRI-style polynomial commitment layers rely on hash functions, coding theory, and soundness parameters.
- Fiat-Shamir transformations require transcript binding when made non-interactive.

## Post-quantum posture

Depends on the construction. KZG and inner-product-argument commitments are quantum-vulnerable because they rely on pairings or discrete logarithms. FRI-style hash-based constructions are often treated as plausibly post-quantum when parameters and hashes are conservative.

## Confidence model

Confidence may come from mathematical-assumption, trusted-setup, public-verifiability, or transparent hash-based soundness. The verifier must check the commitment, evaluation point, claimed value, proof, and transcript context together.

## Common constructions

- KZG commitments.
- Inner-product-argument commitments.
- FRI-style commitments.
- Pedersen-style vector or polynomial encodings in smaller protocols.

## Use cases

- SNARKs and STARKs.
- Data availability commitments.
- ZK rollups.
- Verifiable computation.
- Batched opening proofs.

## Composition patterns

Polynomial commitments are composed with arithmetization, Fiat-Shamir transcripts, lookup arguments, sumcheck, and recursive proof systems. The commitment binds algebraic objects; the proof system defines what those objects mean.

## Failure modes and anti-patterns

- Verifying an opening for the wrong polynomial, domain, or evaluation point.
- Reusing structured setup with unclear toxic-waste assumptions.
- Omitting public inputs from the transcript.
- Treating a hiding commitment as hiding all metadata.
- Confusing a polynomial commitment with an ordinary hash commitment.

## Maturity and deployment

Mature but specialized. KZG is deployed in proof systems and data-availability contexts. FRI-style commitments are deployed in STARK-style systems. Recursive and folding-heavy uses are still fast-moving.

## Related concepts

- [Commitments](/docs/primitives/commitments)
- [Vector Commitments](/docs/structured-primitives/vector-commitments)
- [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs)
- [ZK Rollups](/docs/systems-and-applications/zk-rollups)

## Further reading

- [Kate, Zaverucha, and Goldberg, "Constant-Size Commitments to Polynomials and Their Applications"](https://doi.org/10.1007/978-3-642-17373-8_11).
- [Ben-Sasson et al., "Fast Reed-Solomon Interactive Oracle Proofs of Proximity"](https://eprint.iacr.org/2017/602).
- [Bowe, Grigg, and Hopwood, "Halo"](https://eprint.iacr.org/2019/1021).
