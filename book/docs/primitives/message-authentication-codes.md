---
title: Message Authentication Codes
type: primitive
level: basic-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
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

## Use cases

- Authenticated APIs.
- Protocol transcript authentication.
- Authenticated encryption internals.

## Concrete algorithms and schemes

| Scheme | Built from | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| HMAC-SHA-256 / HMAC-SHA-512 | Hash function | General-purpose MAC and KDF component | Mature and conservative; key separation and unambiguous message encoding still matter. |
| CMAC-AES | AES block cipher | MACs in AES-centered systems | Avoids naive CBC-MAC pitfalls when used as specified. |
| GMAC | GCM authentication component | Authentication when AES-GCM infrastructure is already present | Requires nonce discipline; misuse can break authenticity. |
| Poly1305 | One-time MAC, commonly paired with ChaCha20 | AEAD internals such as ChaCha20-Poly1305 | Requires one-time keys derived correctly; do not reuse Poly1305 keys directly. |
| KMAC | SHA-3/cSHAKE family | SHA-3-based keyed hashing | Useful where SHA-3 primitives are already part of the design. |
| CBC-MAC | Block cipher | Narrow legacy setting | Unsafe when copied outside its fixed-length, single-key assumptions. |

## Failure modes and anti-patterns

- Reusing one MAC key across unrelated protocols without domain separation.
- Comparing tags with timing leaks.
- Treating a MAC as a digital signature that third parties can verify.

## Further reading

- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
- Katz and Lindell, "Introduction to Modern Cryptography."
- NIST SP 800-38B, "Recommendation for Block Cipher Modes of Operation: The CMAC Mode for Authentication."
