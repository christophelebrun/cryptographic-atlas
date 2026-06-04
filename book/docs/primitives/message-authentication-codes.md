---
title: Message Authentication Codes
type: primitive
level: basic-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: deployed
tags:
  - mac
  - authentication
  - integrity
post_quantum_posture: plausible
confidence_model:
  type: mathematical-assumption
---

# Message Authentication Codes

## One-sentence intuition

A message authentication code (MAC) lets parties sharing a secret key detect forged or modified messages.

## Where it sits in the taxonomy

- Level: basic-primitive
- Parent category: authentication
- Related concepts: [Symmetric Encryption](/docs/primitives/symmetric-encryption), [Key Derivation Functions](/docs/primitives/key-derivation-functions), Digital Signature

## Problem it solves

This page explains the problem behind the concept: A shared secret key lets parties detect forged or modified messages. It separates the guarantee from the assumptions, missing guarantees, and composition risks that decide whether the idea is useful in a real system.

## Mental model

Think of a tamper-evident tag that only people with the shared secret can create or verify.

## Minimal example

An API request carries HMAC(key, method || path || body); the server recomputes it before accepting the request.

## Security properties

- Message integrity.
- Symmetric-key authenticity between parties that share the key.

## What it does not provide

- Public verifiability.
- Non-repudiation.
- Confidentiality.
- Protection if all verifiers share the same signing key and one is compromised.

## Assumptions

The MAC key must remain secret, message encoding must be unambiguous, and verifiers must bind the tag to the right protocol context and replay rules.

## Post-quantum posture

Plausible for standard MAC constructions with appropriate key and tag sizes. The surrounding key-exchange or provisioning layer may still be quantum-vulnerable.

## Confidence model

Confidence comes from symmetric key secrecy, unforgeability of the MAC construction, and replay protection in the surrounding protocol.

## Common constructions

### Concrete algorithms and schemes

| Scheme | Built from | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| HMAC-SHA-256 / HMAC-SHA-512 | Hash function | General-purpose MAC and KDF component | Mature and conservative; key separation and unambiguous message encoding still matter. |
| CMAC-AES | AES block cipher | MACs in AES-centered systems | Avoids naive CBC-MAC pitfalls when used as specified. |
| GMAC | GCM authentication component | Authentication when AES-GCM infrastructure is already present | Requires nonce discipline; misuse can break authenticity. |
| Poly1305 | One-time MAC, commonly paired with ChaCha20 | AEAD internals such as ChaCha20-Poly1305 | Requires one-time keys derived correctly; do not reuse Poly1305 keys directly. |
| KMAC | SHA-3/cSHAKE family | SHA-3-based keyed hashing | Useful where SHA-3 primitives are already part of the design. |
| CBC-MAC | Block cipher | Narrow legacy setting | Unsafe when copied outside its fixed-length, single-key assumptions. |

## Use cases

- Authenticated APIs.
- Protocol transcript authentication.
- Authenticated encryption internals.

When confidentiality and integrity are both required for ciphertexts, prefer a reviewed [authenticated-encryption](/docs/primitives/authenticated-encryption) scheme over designing a custom encryption-plus-MAC composition.

## Composition patterns

- MAC keys should be separated by role and protocol.
- A MAC is not a digital signature.

Common adjacent concepts: [Symmetric Encryption](/docs/primitives/symmetric-encryption), [Key Derivation Functions](/docs/primitives/key-derivation-functions), Digital Signature.

## Failure modes and anti-patterns

- Reusing one MAC key across unrelated protocols without domain separation.
- Comparing tags with timing leaks.
- Treating a MAC as a digital signature that third parties can verify.

## Maturity and deployment

Classified as deployed. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: medium. Parameter sensitivity: medium.

## Related concepts

- [Symmetric Encryption](/docs/primitives/symmetric-encryption)
- [Key Derivation Functions](/docs/primitives/key-derivation-functions)
- Digital Signature

## Further reading

- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
- Katz and Lindell, [Introduction to Modern Cryptography](https://www.cs.umd.edu/~jkatz/imc.html).
- NIST SP 800-38B, [Recommendation for Block Cipher Modes of Operation: The CMAC Mode for Authentication](https://csrc.nist.gov/pubs/sp/800/38/b/upd1/final).
