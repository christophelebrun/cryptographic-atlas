---
title: Structured Primitives Overview
type: primitive
level: structured-primitive
template: overview
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - structured-primitives
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Structured Primitives Overview

Structured primitives add algebraic, access-control, timing, or delegation structure to basic cryptographic building blocks.

## Examples

- Homomorphic commitments preserve arithmetic relationships.
- Homomorphic encryption computes on encrypted values.
- Threshold cryptography distributes authority across parties.
- Functional encryption reveals only an approved function of encrypted data.
- Verifiable delay functions make computation take sequential time.
- [Polynomial commitments](/docs/structured-primitives/polynomial-commitments) and [vector commitments](/docs/structured-primitives/vector-commitments) bind larger algebraic or indexed objects.
- [Verifiable random functions](/docs/structured-primitives/verifiable-random-functions) produce publicly verifiable pseudorandom outputs.
- [Blind signatures](/docs/structured-primitives/blind-signatures) authorize hidden messages.
- [Verifiable encryption](/docs/structured-primitives/verifiable-encryption) encrypts while proving a statement about the plaintext.
- [E-cash primitives](/docs/structured-primitives/e-cash-primitives) support private issuance, spending, and double-spend handling.

## Safety note

The extra structure is useful because it exposes controlled relationships. The same structure can create surprising failure modes if the protocol forgets to constrain inputs or metadata.

See [Advanced Structured Primitives](/docs/structured-primitives/advanced-structured-primitives), [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments), [Vector Commitments](/docs/structured-primitives/vector-commitments), [Blind Signatures](/docs/structured-primitives/blind-signatures), [Verifiable Random Functions](/docs/structured-primitives/verifiable-random-functions), [Verifiable Encryption](/docs/structured-primitives/verifiable-encryption), and [E-cash Primitives](/docs/structured-primitives/e-cash-primitives).
