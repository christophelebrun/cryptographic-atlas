---
title: Homomorphic Commitments
type: primitive
level: structured-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - commitments
  - homomorphic
post_quantum_posture: vulnerable
confidence_model:
  type: mathematical-assumption
---

# Homomorphic Commitments

## One-sentence intuition

A homomorphic commitment lets commitments be combined in ways that correspond to operations on the hidden values.

## Where it sits in the taxonomy

- Level: structured-primitive
- Parent category: commitment
- Related concepts: [Pedersen Commitments](/docs/primitives/pedersen-commitments), [Commitments](/docs/primitives/commitments), [Private Aggregation](/docs/design-patterns/private-aggregation)

## Problem it solves

This page explains the problem behind the concept: Commitments can be combined so their hidden values combine in a matching way. It separates the guarantee from the assumptions, missing guarantees, and composition risks that decide whether the idea is useful in a real system.

## Mental model

Think of sealed numbers that can be added while still sealed, with the result opening consistently.

## Minimal example

Two committed balances can be added to produce a commitment to the total, then a proof checks the total without opening each balance.

## Security properties

- hiding
- binding
- additive structure

## What it does not provide

- Proof that hidden values are in a valid range.
- Authentication.
- Protection against maliciously crafted commitments without additional checks.

## Assumptions

The commitment scheme must retain its hiding and binding properties under the allowed homomorphic operation, and the surrounding protocol must define the arithmetic domain being committed to.

## Post-quantum posture

Depends on the construction. Pedersen-style homomorphic commitments are quantum-vulnerable because they rely on discrete logarithms. Other commitment families need separate classification.

## Confidence model

Confidence comes from the commitment binding and hiding assumptions plus explicit constraints on the hidden arithmetic domain. Homomorphic structure is useful only when invalid values are ruled out elsewhere.

## Common constructions

### Concrete schemes and families

| Scheme | Homomorphic shape | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| Pedersen commitments | Additive over committed values | Confidential amounts, private tallying, range proofs | Mature and efficient, but quantum-vulnerable and generator setup-sensitive. |
| Pedersen vector commitments | Linear relations over committed vectors | Inner-product proofs and multi-value commitments | Requires independent generators or a sound generator-derivation process. |
| KZG commitments | Polynomial openings and linear combinations | Rollups, data availability, succinct polynomial proofs | Compact but pairing-based and usually setup-dependent. |
| Inner-product-argument commitments | Vector and polynomial commitments | Bulletproof-style systems and transparent-ish vector commitments | Avoids pairing setup in common forms, but proof sizes and verification costs differ. |
| Merkle commitments | Set/list commitment via hashes | Membership proofs and sparse state commitments | Not algebraically homomorphic, but often used as the hash-based alternative when homomorphism is not required. |

## Use cases

- Confidential sums.
- Private tallying.
- Range proof systems.

## Composition patterns

- Homomorphic arithmetic can wrap or cancel invalid values.
- Range proofs or validity proofs are usually needed.

Common adjacent concepts: [Pedersen Commitments](/docs/primitives/pedersen-commitments), [Commitments](/docs/primitives/commitments), [Private Aggregation](/docs/design-patterns/private-aggregation).

## Failure modes and anti-patterns

Homomorphism can let invalid values cancel or wrap unless the protocol adds range proofs and clear arithmetic domains.

## Maturity and deployment

Classified as mature. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: high. Parameter sensitivity: high.

## Related concepts

- [Pedersen Commitments](/docs/primitives/pedersen-commitments)
- [Commitments](/docs/primitives/commitments)
- [Private Aggregation](/docs/design-patterns/private-aggregation)

## Further reading

- Pedersen, [Non-Interactive and Information-Theoretic Secure Verifiable Secret Sharing](https://doi.org/10.1007/3-540-46766-1_9).
- [Pedersen commitments](/docs/primitives/pedersen-commitments)
