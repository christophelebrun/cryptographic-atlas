---
title: Pairings
type: assumption
level: mathematical-assumption
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: advanced
maturity: mature
tags:
  - assumptions
  - pairings
  - elliptic-curves
post_quantum_posture: vulnerable
confidence_model:
  type: mathematical-assumption
---

# Pairings

## One-sentence intuition

A pairing is a special map between algebraic groups that lets hidden exponent relationships become publicly checkable.

## Where it sits in the taxonomy

- Level: mathematical assumption or substrate
- Parent category: assumptions
- Related concepts: SNARKs, anonymous credentials, signatures, trusted setup

## Problem it solves

Pairings enable compact checks of multiplicative relationships in exponents. This is useful for short signatures, identity-based encryption, polynomial commitments, and many succinct proof systems.

## Mental model

A pairing acts like a structured calculator for exponent relationships: it can check that two independently formed group elements contain matching hidden exponent products without revealing those exponents.

## Minimal example

At a high level, a bilinear pairing has a relation like:

$$
e(g^a, h^b) = e(g, h)^{ab}
$$

This bilinearity is powerful, but it comes with specialized assumptions and parameter choices.

## Security properties

- Supports compact verification of algebraic relations.
- Enables succinct proof systems and short signature schemes under pairing-specific assumptions.

## What it does not provide

- Post-quantum security.
- General-purpose privacy.
- Safety without careful curve and subgroup choices.

## Assumptions

Pairing-based systems rely on elliptic-curve group assumptions, pairing-specific hardness assumptions, subgroup checks, and sometimes trusted setup or structured reference strings.

## Post-quantum posture

Vulnerable. Common pairings are built from elliptic-curve groups whose discrete logarithm problems are broken by Shor's algorithm.

## Confidence model

Confidence comes from mathematical-assumption hardness, curve selection, subgroup validation, setup correctness where required, and careful implementation.

## Common constructions

- Pairing-based SNARKs.
- BLS-style signatures.
- Identity-based encryption.
- Polynomial commitments.

## Concrete curves and schemes

| Family or scheme | Common examples | Where it appears | Key differences and cautions |
| --- | --- | --- | --- |
| Pairing-friendly curves | BLS12-381, BN254 | SNARKs, BLS signatures, KZG commitments | Quantum-vulnerable; curve security level and subgroup checks are not interchangeable. |
| BLS signatures | BLS signature variants over pairing-friendly curves | Aggregatable signatures, threshold signatures | Compact aggregation, but domain separation and rogue-key defenses matter. |
| KZG commitments | KZG polynomial commitments | Rollups, data availability, polynomial openings | Very compact openings; relies on pairings and usually a structured reference string. |
| Groth16-style SNARKs | Pairing-based succinct proofs | ZK circuits with very small proofs | Often circuit-specific trusted setup; posture inherits pairing vulnerability. |
| Identity-based encryption | Boneh-Franklin-style systems | Specialized key-management models | Key generator trust is central, not an implementation detail. |

## Use cases

- Succinct proof verification.
- Aggregatable signatures.
- Anonymous credential schemes.
- Verifiable shuffles and commitments in specialized protocols.

## Composition patterns

Pairings are often composed with trusted setup, commitments, zero-knowledge proof statements, and public verification. The setup and subgroup model must be part of the protocol description.

## Failure modes and anti-patterns

- Missing subgroup checks.
- Using weak or obsolete curves.
- Hiding trusted setup assumptions behind a "succinct proof" label.
- Treating pairing-based succinctness as post-quantum.

## Maturity and deployment

Mature but specialized. Pairing-based systems are deployed, but they require expert parameter and implementation review.

## Related concepts

- [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs)
- [Anonymous credentials](/docs/protocols/anonymous-credentials)
- [Trusted setup](/docs/assumptions/trusted-setup)

## Further reading

- Boneh and Franklin, [Identity-Based Encryption from the Weil Pairing](https://doi.org/10.1007/3-540-44647-8_13).
- Groth, [On the Size of Pairing-Based Non-interactive Arguments](https://eprint.iacr.org/2016/260).
- Shor, [Algorithms for Quantum Computation; Discrete Logarithms and Factoring](https://doi.org/10.1109/SFCS.1994.365700).
