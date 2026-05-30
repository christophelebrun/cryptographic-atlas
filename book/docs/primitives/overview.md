---
title: Basic Primitives Overview
type: primitive
level: basic-primitive
template: overview
status: draft
last_reviewed: '2026-05-30'
difficulty: beginner
maturity: not-applicable
tags:
  - primitives
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Basic Primitives Overview

Basic primitives provide narrow cryptographic guarantees. They are not complete systems.

## Examples

- Hash functions compress data into fixed-length digests.
- Symmetric encryption protects bulk data under a shared secret key.
- Message authentication codes authenticate messages with a shared secret key.
- Key derivation functions separate keys by context.
- Randomness and nonces provide freshness or uniqueness where schemes require it.
- Commitments bind a party to a hidden value.
- Digital signatures authenticate messages.
- Public-key encryption lets a sender encrypt to a recipient's public key.
- Key encapsulation and exchange establish shared secret material.
- Secret sharing splits a secret across multiple shares.

## Reading rule

For each primitive, ask what it guarantees, what it assumes, what it does not provide, and what breaks when it is composed incorrectly.
