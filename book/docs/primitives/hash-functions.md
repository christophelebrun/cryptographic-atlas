---
title: Hash Functions
type: primitive
level: basic-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: deployed
tags:
  - hashes
post_quantum_posture: plausible
confidence_model:
  type: mathematical-assumption
---

# Hash Functions

## One-sentence intuition

A cryptographic hash function maps data to a fixed-length digest in a way that should resist finding collisions or reversing the digest.

## Security properties

- Preimage resistance.
- Second-preimage resistance.
- Collision resistance.

## What it does not provide

- Encryption.
- Authentication unless used in a construction such as a MAC.
- Hiding for low-entropy secrets without careful salting or keying.

## Use cases

- Commitments.
- Merkle trees.
- Content addressing.
- Transcript binding in protocols.

## Concrete algorithms and schemes

| Family | Examples | Where readers usually see it | Key differences and cautions |
| --- | --- | --- | --- |
| SHA-2 | SHA-256, SHA-384, SHA-512 | General-purpose hashing, signatures, Merkle trees, protocol transcripts | Conservative deployed default; choose output length for the security target and domain-separate protocol roles. |
| SHA-3 and SHAKE | SHA3-256, SHA3-512, SHAKE128, SHAKE256 | Hashing, extendable-output functions, post-quantum schemes | Sponge-based design; SHAKE outputs variable length, so the output length is a security parameter. |
| BLAKE family | BLAKE2, BLAKE3 | File integrity, application protocols, high-throughput hashing | Fast and widely used in software; check whether the exact variant is standardized or ecosystem-specific. |
| ZK-friendly hashes | Poseidon, Rescue, MiMC, Griffin | Zero-knowledge circuits and proof systems | Optimized for arithmetic circuits, not a drop-in replacement for general-purpose hashing unless the full protocol expects that choice. |
| Legacy or broken hashes | SHA-1, MD5 | Old protocols, compatibility checks, forensic context | Collision resistance is broken or deprecated; include only to explain legacy risk, not for new designs. |

## Assumptions

The chosen hash function must be within its intended security lifetime, outputs must be long enough for the security target, and protocols must use clear domain separation when the same function is reused in different roles.

## Post-quantum posture

Plausible with appropriate output lengths and parameters. Hash functions are often used as post-quantum building blocks, but the security target must account for quantum search speedups.

## Confidence model

Confidence comes from public algorithm scrutiny, parameter choice, domain separation, and correct use. Hashing a low-entropy secret is not enough to make it hidden.

## Failure modes and anti-patterns

- Hashing passwords without a password-hashing scheme.
- Treating a hash of a small secret as hidden.
- Using obsolete or broken hash functions.

## Further reading

- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
- Grover, [A Fast Quantum Mechanical Algorithm for Database Search](https://doi.org/10.1145/237814.237866).
- NIST FIPS 180-4, [Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final).
- NIST FIPS 202, [SHA-3 Standard](https://csrc.nist.gov/pubs/fips/202/final).
