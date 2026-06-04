---
title: Key Encapsulation and Exchange
type: primitive
level: basic-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: deployed
tags:
  - key-exchange
  - kem
  - public-key
post_quantum_posture: depends
confidence_model:
  type: mathematical-assumption
---

# Key Encapsulation and Exchange

## One-sentence intuition

Key encapsulation and key exchange let parties establish shared secret material over an insecure channel.

## Where it sits in the taxonomy

- Level: basic-primitive
- Parent category: key-management
- Related concepts: [Public-Key Encryption](/docs/primitives/public-key-encryption), [Key Derivation Functions](/docs/primitives/key-derivation-functions), [Lattices](/docs/assumptions/lattices)

## Problem it solves

This page explains the problem behind the concept: Parties establish shared secret material over an insecure channel. It separates the guarantee from the assumptions, missing guarantees, and composition risks that decide whether the idea is useful in a real system.

## Mental model

Think of two parties creating the same fresh secret in public while outsiders cannot compute it.

## Minimal example

A sender encapsulates to a recipient public key, both derive the same shared secret, and a KDF turns it into an encryption key.

## Security properties

- Shared secret establishment.
- Forward secrecy in protocols designed for ephemeral secrets.
- Authentication when combined with signatures, certificates, pre-shared keys, or authenticated transcripts.

## What it does not provide

- Entity authentication by itself.
- Application-data encryption without a subsequent key schedule and encryption layer.
- Metadata privacy for who talked to whom and when.

## Assumptions

The scheme-specific hardness assumption must hold, public keys or identities must be authenticated when authentication is required, and derived keys must be bound to the full transcript.

## Post-quantum posture

Depends on the concrete mechanism. Diffie-Hellman and elliptic-curve Diffie-Hellman are quantum-vulnerable, while standardized post-quantum KEMs such as ML-KEM are designed for migration.

## Confidence model

Confidence comes from the key-establishment assumption, authentication binding, fresh ephemeral secret handling, and correct derivation of application keys from the shared secret.

## Common constructions

### Concrete algorithms and schemes

| Mechanism | Family | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| X25519 | Elliptic-curve Diffie-Hellman | Modern key agreement in protocols and libraries | Quantum-vulnerable; usually simple and robust when used through established libraries. |
| X448 | Elliptic-curve Diffie-Hellman | Higher-security-margin key agreement | Quantum-vulnerable; less widely deployed than X25519. |
| P-256 ECDH | Elliptic-curve Diffie-Hellman | TLS and standards-oriented environments | Quantum-vulnerable; point validation and library correctness matter. |
| FFDHE | Finite-field Diffie-Hellman groups | Compatibility and standards profiles | Quantum-vulnerable; use reviewed safe-prime groups, not ad hoc parameters. |
| ML-KEM | Module-lattice KEM | Post-quantum key encapsulation | Plausibly post-quantum; protocol designers must handle larger keys and ciphertexts. |
| HQC | Code-based KEM selected for ongoing NIST standardization | Backup or alternative post-quantum KEM family | Selected by NIST in 2025 for future standardization; not a finalized FIPS standard as of this review. |
| HPKE KEM suites | KEM plus KDF plus AEAD framework | Hybrid encryption and application protocols | HPKE is a composition framework; the selected KEM determines posture. |
| Hybrid classical/PQ exchange | Classical ECDH plus ML-KEM or similar | Migration period key establishment | Reduces single-assumption risk, but transcript binding and failure handling must be explicit. |

## Use cases

- Hybrid public-key encryption.
- Transport security handshakes.
- Secure messaging session setup.

## Composition patterns

- Key exchange must feed a KDF and authenticated transcript.
- Hybrid post-quantum migration must define combiner behavior.

Common adjacent concepts: [Public-Key Encryption](/docs/primitives/public-key-encryption), [Key Derivation Functions](/docs/primitives/key-derivation-functions), [Lattices](/docs/assumptions/lattices).

## Failure modes and anti-patterns

- Establishing a key with an unauthenticated attacker.
- Failing to bind the transcript, identities, and algorithm choices into derived keys.
- Reusing ephemeral secrets where freshness is required.

## Maturity and deployment

Classified as deployed. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: expert-only. Parameter sensitivity: high.

## Related concepts

- [Public-Key Encryption](/docs/primitives/public-key-encryption)
- [Key Derivation Functions](/docs/primitives/key-derivation-functions)
- [Lattices](/docs/assumptions/lattices)

## Further reading

- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
- NIST FIPS 203, [Module-Lattice-Based Key-Encapsulation Mechanism Standard](https://csrc.nist.gov/pubs/fips/203/final).
- NIST, [NIST Selects HQC as Fifth Algorithm for Post-Quantum Encryption](https://www.nist.gov/news-events/news/2025/03/nist-selects-hqc-fifth-algorithm-post-quantum-encryption).
