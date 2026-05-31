---
title: Functional Encryption
type: primitive
level: structured-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
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

## Problem it solves

It aims to make decryption rights more precise. A party might learn an aggregate, classification, or score without learning each input.

## What it does not provide

- General practicality for all functions.
- Simple deployment.
- Protection against outputs that are themselves revealing.
- A substitute for access-control design.

## Assumptions

Assumptions are scheme-specific and often include a setup or key authority that issues function keys correctly. The system also assumes that the allowed function and repeated query pattern do not leak more than intended.

## Maturity and deployment

Functional encryption remains largely research-stage for many general forms. Specialized forms may be more practical.

## Post-quantum posture

Depends on the concrete construction. Functional encryption is a broad research area; posture should be classified per scheme and parameter set, not for the category as a whole.

## Confidence model

Confidence often depends on a key authority or setup process that issues function keys. Even if the cryptography works, the allowed function can leak sensitive information, and repeated function outputs can become an inference channel.

## Concrete schemes and subfamilies

| Family | What the function key reveals | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| Identity-based encryption | Messages for a named identity | Key-management systems with a private-key generator | The authority can derive user keys, so issuer trust is central. |
| Attribute-based encryption | Decryption under an access policy or attribute set | Fine-grained encrypted access control | Policy privacy, revocation, and key abuse are system problems. |
| Inner-product functional encryption | Inner product or linear score | Private analytics and research prototypes | More specialized and practical than general FE, but still leakage-sensitive. |
| Predicate encryption | Whether encrypted attributes satisfy a predicate | Search and policy checks | The revealed predicate result can still leak sensitive information. |
| General functional encryption | Arbitrary functions in principle | Research-stage access to computed outputs | Mostly theoretical or highly specialized; do not present as deployable general access control. |

## Failure modes and anti-patterns

- Issuing function keys that reveal too much.
- Ignoring leakage from repeated function outputs.
- Treating research-stage general functional encryption as a deployable access-control layer.

## Further reading

- Boneh, Sahai, and Waters, "Functional Encryption: Definitions and Challenges."
