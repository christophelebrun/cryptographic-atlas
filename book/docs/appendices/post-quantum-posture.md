---
title: Post-Quantum Posture
type: appendix
level: not-applicable
template: reference
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: not-applicable
tags:
  - post-quantum
  - quantum-resistance
  - assumptions
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Post-Quantum Posture

Post-quantum posture describes how a primitive, protocol, or system is expected to behave against an adversary with a large cryptographically relevant quantum computer.

This label is not a deployment recommendation. It is an editorial signal that tells the reader which parts of a design are likely to need replacement or closer review during post-quantum migration.

## Labels

| Label | Meaning |
| --- | --- |
| vulnerable | The usual construction is broken or seriously weakened by known quantum algorithms. |
| plausible | The construction family is commonly treated as a post-quantum candidate, assuming appropriate parameters and implementation. |
| depends | The posture depends on the concrete instantiation, parameter set, or supporting primitives. |
| unknown | The posture is not established enough for this atlas to classify it. |
| not-applicable | The page describes a goal, pattern, or organizational model rather than a cryptographic construction. |

## Quick matrix

| Concept family | Working posture | Notes |
| --- | --- | --- |
| Hash functions | plausible | Depends on output length and security target. |
| Symmetric encryption and MACs | plausible | Depends on key sizes and concrete security margins. |
| RSA and finite-field discrete logarithm | vulnerable | Affects RSA encryption, RSA signatures, and related assumptions. |
| Elliptic-curve discrete logarithm | vulnerable | Affects ECDSA, EdDSA, Schnorr-style signatures, and many commitments. |
| Pedersen commitments | vulnerable | Usually discrete-logarithm based. |
| Pairing-based SNARKs | vulnerable | Pairings rely on elliptic-curve discrete-logarithm style assumptions. |
| STARK-style proof systems | plausible | Often hash-based and transparent, but the full system still depends on parameters and hash choices. |
| Bulletproof-style range proofs | vulnerable | Usually discrete-logarithm based. |
| Lattice-based encryption and FHE | plausible | Depends on scheme, parameters, and implementation. |
| Functional encryption | depends | The posture is scheme-specific and often research-stage. |
| Secret sharing core | plausible | Information-theoretic sharing can be post-quantum, while authentication and transport layers may not be. |
| Nullifiers | depends | Usually hash-based, but the surrounding credential or proof system may not be post-quantum. |
| VDFs and timelocks | depends | Many constructions rely on assumptions whose post-quantum posture is construction-specific. |
| Design patterns | not-applicable | The pattern inherits posture from the primitives and protocols used. |

## How to use this label

When a page says "depends," ask:

- Which concrete scheme is being used?
- Which mathematical assumption does it rely on?
- Is any setup, signature, encryption, or proof layer quantum-vulnerable?
- Are parameters sized for a post-quantum security target?
- Is the claim backed by a standard, peer-reviewed analysis, or only by early research?

## Current standards context

NIST has approved initial post-quantum standards for key encapsulation and signatures: ML-KEM, ML-DSA, and SLH-DSA. This atlas should still classify broad concepts conservatively, because a concept such as "signature" or "encryption" can be instantiated with either quantum-vulnerable or post-quantum schemes.

## Further reading

- NIST: [Post-Quantum Cryptography FIPS Approved](https://csrc.nist.gov/News/2024/postquantum-cryptography-fips-approved)
- NIST NCCoE: [Frequently Asked Questions about Post-Quantum Cryptography](https://pages.nist.gov/nccoe-migration-post-quantum-cryptography/)
- Shor, "Algorithms for Quantum Computation; Discrete Logarithms and Factoring."
- Grover, "A Fast Quantum Mechanical Algorithm for Database Search."
- NIST FIPS 203, FIPS 204, and FIPS 205.
