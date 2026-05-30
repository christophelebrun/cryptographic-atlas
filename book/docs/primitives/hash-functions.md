---
title: Hash Functions
type: primitive
level: basic-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
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

- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
- Grover, "A Fast Quantum Mechanical Algorithm for Database Search."
