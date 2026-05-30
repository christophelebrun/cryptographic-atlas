---
title: Hash Functions
type: primitive
level: basic-primitive
status: draft
last_reviewed: 2026-05-30
difficulty: beginner
maturity: deployed
tags:
  - hashes
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

## Failure modes

- Hashing passwords without a password-hashing scheme.
- Treating a hash of a small secret as hidden.
- Using obsolete or broken hash functions.

## Further reading

- TODO: Add verified references for cryptographic hash functions.
