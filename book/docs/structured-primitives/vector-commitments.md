---
title: Vector Commitments
type: primitive
level: structured-primitive
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - commitments
  - vector-commitments
  - authenticated-data-structures
post_quantum_posture: depends
confidence_model:
  type: depends
---

# Vector Commitments

## One-sentence intuition

A vector commitment binds a party to an indexed list of values while allowing compact proofs about individual positions.

## Where it sits in the taxonomy

- Level: structured primitive.
- Parent category: commitments and authenticated data structures.
- Related concepts: [Commitments](/docs/primitives/commitments), [Accumulators and Merkle Trees](/docs/structured-primitives/accumulators-and-merkle-trees), [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments).

## Problem it solves

Systems often need a short public commitment to a large indexed state, plus proofs that a particular index contains a particular value. Downloading or verifying the whole vector is too expensive.

## Mental model

The commitment is a signed table of contents for a large table. An opening proof shows that one row has a claimed value without publishing every row.

## Minimal example

A server commits to balances `[10, 0, 7, 3]`. Later it proves that index `2` contains `7` against the same commitment. A verifier checks the proof without receiving the full vector.

## Security properties

- Binding to indexed values.
- Compact openings for selected indices.
- Sometimes efficient updates and update proofs.
- Sometimes non-membership or zero-value proofs, depending on construction.

## What it does not provide

- Privacy of vector values unless hiding is added.
- Freshness without an authenticated root or version.
- Efficient updates in every construction.
- Correct index semantics unless encodings are unambiguous.

## Assumptions

- Merkle-style vector commitments rely on hash collision resistance.
- RSA or pairing-based accumulators rely on their respective algebraic assumptions.
- KZG or polynomial-based vector commitments inherit setup and pairing assumptions.
- Dynamic update systems require consistent witness-update rules.

## Post-quantum posture

Depends on the construction. Hash-based Merkle commitments are plausible with conservative hashes. RSA, pairing, and elliptic-curve-based vector commitments are quantum-vulnerable unless replaced by post-quantum alternatives.

## Confidence model

Confidence comes from mathematical-assumption or hash-function security, public-verifiability of openings, and operational control over roots, versions, and update rules.

## Common constructions

- Merkle trees and sparse Merkle trees.
- RSA accumulators.
- Pairing-based accumulators.
- KZG or polynomial-commitment-backed vector commitments.

## Use cases

- Transparency logs.
- Membership and non-membership proofs.
- Stateless client designs.
- Rollup and blockchain state commitments.
- Revocation lists and credential status sets.

## Composition patterns

Vector commitments are often composed with signatures over roots, zero-knowledge proofs over openings, accumulators for membership, and update logs for freshness.

## Failure modes and anti-patterns

- Accepting stale roots.
- Ambiguous leaf encoding or index encoding.
- Forgetting to bind tree depth, domain, or version.
- Mishandling update witnesses.
- Assuming inclusion proof privacy when paths or indices are public.

## Maturity and deployment

Mature but construction-specific. Merkle commitments are widely deployed. More compact algebraic vector commitments are specialized and carry stronger setup or assumption caveats.

## Related concepts

- [Accumulators and Merkle Trees](/docs/structured-primitives/accumulators-and-merkle-trees)
- [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments)
- [Membership Proofs](/docs/proof-systems/membership-proofs)
- [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation)

## Further reading

- [Catalano and Fiore, "Vector Commitments and Their Applications"](https://eprint.iacr.org/2011/495).
- [Merkle, "A Digital Signature Based on a Conventional Encryption Function"](https://doi.org/10.1007/3-540-48184-2_32).
- [Kate, Zaverucha, and Goldberg, "Constant-Size Commitments to Polynomials and Their Applications"](https://doi.org/10.1007/978-3-642-17373-8_11).
