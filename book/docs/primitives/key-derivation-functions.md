---
title: Key Derivation Functions
type: primitive
level: basic-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: deployed
tags:
  - kdf
  - key-management
post_quantum_posture: plausible
confidence_model:
  type: mathematical-assumption
---

# Key Derivation Functions

## One-sentence intuition

A key derivation function (KDF) turns shared secret material into context-specific cryptographic keys.

## Where it sits in the taxonomy

- Level: basic-primitive
- Parent category: key-management
- Related concepts: [Symmetric Encryption](/docs/primitives/symmetric-encryption), [Key Encapsulation and Exchange](/docs/primitives/key-encapsulation-and-exchange), [Message Authentication Codes](/docs/primitives/message-authentication-codes)

## Problem it solves

Raw shared secrets are rarely safe to use directly as application keys. Key derivation functions (KDFs) extract and expand secret material into separate context-bound keys so different purposes do not accidentally share the same cryptographic state.

## Mental model

Think of a key schedule that turns one master secret into separate labeled keys for separate jobs.

## Minimal example

TLS derives separate client-write and server-write traffic keys from one handshake secret and transcript labels.

## Security properties

- Key separation between contexts.
- Pseudorandom derived keys when the input secret has enough entropy.
- Binding to protocol labels, salts, and transcript context when used correctly.

## What it does not provide

- Entropy that was not present in the input.
- Password hardening unless the KDF is specifically designed for passwords.
- Agreement that the input secret is authentic.

## Assumptions

The input secret must have adequate entropy for the use case, salts and labels must be chosen correctly, and each derived key must have a clearly separated purpose.

## Post-quantum posture

Plausible for hash-based KDFs with appropriate parameters. The posture of the key-establishment step that produced the input secret must be classified separately.

## Confidence model

Confidence comes from entropy in the input material, domain separation in the KDF inputs, and disciplined key lifecycle management.

## Common constructions

### Concrete algorithms and schemes

| Scheme | Main input shape | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| HKDF | High-entropy shared secret plus salt and info labels | Session key schedules and protocol key separation | Fast KDF; not a password-hashing scheme. |
| PBKDF2 | Password plus salt and iteration count | Legacy password-based key derivation | Widely deployed, but easier to accelerate than modern memory-hard schemes. |
| scrypt | Password plus salt and memory/cost parameters | Password hashing and key derivation | Adds memory cost; parameters must match attacker hardware assumptions. |
| Argon2id | Password plus salt and memory/time/parallelism parameters | Password storage and password-derived keys | Modern memory-hard default when available; parameters need operational tuning. |
| NIST counter-mode KDFs | Shared secret plus labels and context | Key management in NIST-profiled systems | Good for structured key derivation when labels and context are explicit. |

## Use cases

- Deriving encryption and MAC keys from a shared secret.
- Session-key schedules.
- Context-separated keys for protocols.

## Composition patterns

- KDF context must bind protocol transcripts and algorithm choices.
- Passwords need password-hashing schemes, not only fast KDFs.

Common adjacent concepts: [Symmetric Encryption](/docs/primitives/symmetric-encryption), [Key Encapsulation and Exchange](/docs/primitives/key-encapsulation-and-exchange), [Message Authentication Codes](/docs/primitives/message-authentication-codes).

## Failure modes and anti-patterns

- Reusing one derived key for multiple purposes.
- Feeding low-entropy passwords into a fast KDF.
- Omitting transcript or domain labels, which can create cross-protocol key reuse.

## Maturity and deployment

Classified as deployed. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: medium. Parameter sensitivity: medium.

## Related concepts

- [Symmetric Encryption](/docs/primitives/symmetric-encryption)
- [Key Encapsulation and Exchange](/docs/primitives/key-encapsulation-and-exchange)
- [Message Authentication Codes](/docs/primitives/message-authentication-codes)

## Further reading

- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
- Katz and Lindell, [Introduction to Modern Cryptography](https://www.cs.umd.edu/~jkatz/imc.html).
- RFC 5869, [HMAC-based Extract-and-Expand Key Derivation Function](https://www.rfc-editor.org/rfc/rfc5869).
