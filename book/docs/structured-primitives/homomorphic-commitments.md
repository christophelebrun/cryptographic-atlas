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

## Use cases

- Confidential sums.
- Private tallying.
- Range proof systems.

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

## Concrete schemes and families

| Scheme | Homomorphic shape | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| Pedersen commitments | Additive over committed values | Confidential amounts, private tallying, range proofs | Mature and efficient, but quantum-vulnerable and generator setup-sensitive. |
| Pedersen vector commitments | Linear relations over committed vectors | Inner-product proofs and multi-value commitments | Requires independent generators or a sound generator-derivation process. |
| KZG commitments | Polynomial openings and linear combinations | Rollups, data availability, succinct polynomial proofs | Compact but pairing-based and usually setup-dependent. |
| Inner-product-argument commitments | Vector and polynomial commitments | Bulletproof-style systems and transparent-ish vector commitments | Avoids pairing setup in common forms, but proof sizes and verification costs differ. |
| Merkle commitments | Set/list commitment via hashes | Membership proofs and sparse state commitments | Not algebraically homomorphic, but often used as the hash-based alternative when homomorphism is not required. |

## Failure modes and anti-patterns

Homomorphism can let invalid values cancel or wrap unless the protocol adds range proofs and clear arithmetic domains.

## Further reading

- Pedersen, [Non-Interactive and Information-Theoretic Secure Verifiable Secret Sharing](https://doi.org/10.1007/3-540-46766-1_9).
- [Pedersen commitments](/docs/primitives/pedersen-commitments)
