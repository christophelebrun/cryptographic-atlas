---
title: Key Encapsulation and Exchange
type: primitive
level: basic-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
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

## Use cases

- Hybrid public-key encryption.
- Transport security handshakes.
- Secure messaging session setup.

## Failure modes and anti-patterns

- Establishing a key with an unauthenticated attacker.
- Failing to bind the transcript, identities, and algorithm choices into derived keys.
- Reusing ephemeral secrets where freshness is required.

## Further reading

- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
- NIST FIPS 203, "Module-Lattice-Based Key-Encapsulation Mechanism Standard."
