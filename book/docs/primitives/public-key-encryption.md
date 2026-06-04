---
title: Public-Key Encryption
type: primitive
level: basic-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: deployed
tags:
  - encryption
  - confidentiality
post_quantum_posture: depends
confidence_model:
  type: mathematical-assumption
---

# Public-Key Encryption

## One-sentence intuition

Public-key encryption lets anyone encrypt to a public key while only the private key holder can decrypt.

## Where it sits in the taxonomy

- Level: basic-primitive
- Parent category: encryption
- Related concepts: [Homomorphic Encryption](/docs/structured-primitives/homomorphic-encryption), [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography), [Electronic Voting](/docs/protocols/e-voting)

## Problem it solves

This page explains the problem behind the concept: Anyone can encrypt to a public key, but only the private key holder can decrypt. It separates the guarantee from the assumptions, missing guarantees, and composition risks that decide whether the idea is useful in a real system.

## Mental model

Think of a mailbox with a public slot and a private key: anyone can put a message in, but only the owner can open it.

## Minimal example

A sender uses a recipient public key to encapsulate a fresh data-encryption key, then encrypts the message with authenticated encryption.

## Security properties

- Confidentiality of plaintexts under the chosen security model.
- Sometimes sender anonymity or ciphertext unlinkability, depending on the construction and context.

## What it does not provide

- Sender authentication.
- Message validity beyond successful decryption.
- Protection against metadata leaks.
- Safety if keys are misbound to identities.

## Assumptions

The scheme must meet the intended security notion, public keys must be authenticated, private keys must remain secret, and encryption must be used through a safe scheme or hybrid construction rather than raw textbook operations.

## Post-quantum posture

Depends on the scheme. RSA and elliptic-curve public-key encryption or key agreement are quantum-vulnerable. Post-quantum key encapsulation mechanisms such as ML-KEM are designed for migration, but protocol integration still matters.

## Confidence model

Confidence comes from key authenticity, correct encryption or encapsulation, secure private-key handling, and the recipient's ability to decrypt. If the public key is bound to the wrong party, confidentiality can fail even when the encryption algorithm is sound.

## Common constructions

### Concrete algorithms and schemes

| Scheme or suite | Typical role | Key differences and cautions |
| --- | --- | --- |
| RSA-OAEP | Legacy public-key encryption and hybrid encryption | Quantum-vulnerable; safe padding is mandatory and raw RSA is not encryption. |
| HPKE | Standard hybrid public-key encryption framework | Composes KEM, KDF, and AEAD choices; security depends on authenticated public keys and mode selection. |
| ECIES-style schemes | Hybrid encryption over elliptic-curve key agreement | Quantum-vulnerable and variant-heavy; interoperability and authentication details vary. |
| Integrated encryption in protocols | TLS 1.3, Signal-style sessions, Noise patterns | Public-key operations establish keys; application data is protected with symmetric encryption. |
| Post-quantum KEM-based hybrids | ML-KEM plus AEAD through a key schedule | Plausibly post-quantum at the KEM layer; ciphertext size, failure behavior, and authentication still matter. |
| Legacy RSA encryption | RSAES-PKCS1-v1_5 | Compatibility only; historically fragile against padding-oracle mistakes. |

## Use cases

- Secure messaging.
- Hybrid encryption.
- Encrypted ballots.
- Key exchange support, depending on the protocol.

## Composition patterns

- Encryption must be combined with authentication or proofs when validity matters.
- Hybrid constructions need correct key encapsulation and data encapsulation.

Common adjacent concepts: [Homomorphic Encryption](/docs/structured-primitives/homomorphic-encryption), [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography), [Electronic Voting](/docs/protocols/e-voting).

## Failure modes and anti-patterns

- Using raw textbook encryption instead of authenticated, padded, or hybrid constructions.
- Forgetting key authentication.
- Treating encrypted data as valid without additional checks or proofs.

## Maturity and deployment

Classified as deployed. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: high. Parameter sensitivity: high.

## Related concepts

- [Homomorphic Encryption](/docs/structured-primitives/homomorphic-encryption)
- [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography)
- [Electronic Voting](/docs/protocols/e-voting)

## Further reading

- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
- NIST FIPS 203, [Module-Lattice-Based Key-Encapsulation Mechanism Standard](https://csrc.nist.gov/pubs/fips/203/final).
