---
title: Functional Encryption
type: primitive
level: structured-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
review:
  structural:
    status: current
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: advanced
maturity: research
tags:
  - functional-encryption
  - encryption
post_quantum_posture: depends
confidence_model:
  type: trusted-issuer
---

# Functional Encryption

## One-sentence intuition

Functional encryption lets a key reveal only a specific function of encrypted data, rather than the full plaintext.

## Where it sits in the taxonomy

- Level: structured-primitive
- Parent category: encryption
- Related concepts: [Homomorphic Encryption](/docs/structured-primitives/homomorphic-encryption), [Reveal Only a Function](/docs/design-patterns/reveal-only-a-function), [Private Aggregation](/docs/design-patterns/private-aggregation)

## Problem it solves

Sometimes a data holder wants another party to learn only a permitted computation over encrypted data, not the underlying plaintext. Functional encryption captures that goal with restricted decryption keys, at the cost of strong assumptions and careful function design.

## Mental model

Think of giving someone a key that opens only one computed view of encrypted data, not the raw data.

## Minimal example

An analyst receives a function key that reveals a risk score over encrypted records, not the underlying records.

## Security properties

- controlled disclosure
- confidentiality
- least privilege decryption

## What it does not provide

- General practicality for all functions.
- Simple deployment.
- Protection against outputs that are themselves revealing.
- A substitute for access-control design.

## Assumptions

Assumptions are scheme-specific and often include a setup or key authority that issues function keys correctly. The system also assumes that the allowed function and repeated query pattern do not leak more than intended.

## Post-quantum posture

Depends on the concrete construction. Functional encryption is a broad research area; posture should be classified per scheme and parameter set, not for the category as a whole.

## Confidence model

Confidence often depends on a key authority or setup process that issues function keys. Even if the cryptography works, the allowed function can leak sensitive information, and repeated function outputs can become an inference channel.

## Common constructions

Common constructions vary by concrete scheme and deployment context. Use the concrete scheme or composition tables on this page to check the exact assumptions, setup model, and implementation risk.

## Use cases

- restricted analytics
- private classification
- reveal only a function

## Composition patterns

- The allowed function output may reveal more than intended.
- Repeated function queries can leak inputs.
- Key authority trust can dominate the privacy model.

Common adjacent concepts: [Homomorphic Encryption](/docs/structured-primitives/homomorphic-encryption), [Reveal Only a Function](/docs/design-patterns/reveal-only-a-function), [Private Aggregation](/docs/design-patterns/private-aggregation).

## Failure modes and anti-patterns

- Issuing function keys that reveal too much.
- Ignoring leakage from repeated function outputs.
- Treating research-stage general functional encryption as a deployable access-control layer.

## Maturity and deployment

Functional encryption remains largely research-stage for many general forms. Specialized forms may be more practical.

## Related concepts

- [Homomorphic Encryption](/docs/structured-primitives/homomorphic-encryption)
- [Reveal Only a Function](/docs/design-patterns/reveal-only-a-function)
- [Private Aggregation](/docs/design-patterns/private-aggregation)

## Further reading

- Boneh, Sahai, and Waters, [Functional Encryption: Definitions and Challenges](https://eprint.iacr.org/2010/543).
