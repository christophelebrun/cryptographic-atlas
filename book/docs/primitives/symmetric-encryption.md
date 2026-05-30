---
title: Symmetric Encryption
type: primitive
level: basic-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: beginner
maturity: deployed
tags:
  - encryption
  - symmetric
post_quantum_posture: plausible
confidence_model:
  type: mathematical-assumption
---

# Symmetric Encryption

## One-sentence intuition

Symmetric encryption uses the same secret key to encrypt and decrypt data.

## Security properties

- Confidentiality under the chosen attack model.
- Efficient protection for bulk data when used through a safe mode or authenticated-encryption construction.

## What it does not provide

- Key agreement or key distribution.
- Authentication unless combined with a message authentication code or authenticated encryption.
- Metadata privacy for sizes, timing, or access patterns.

## Assumptions

The key must remain secret, nonces or initialization vectors must follow the scheme rules, and the encryption mode must match the threat model. Raw block ciphers should not be used as complete encryption schemes.

## Post-quantum posture

Plausible with appropriate key sizes and conservative parameters. Quantum search affects security margins, so symmetric-key migration often increases key sizes rather than replacing the primitive family.

## Confidence model

Confidence comes from secret-key control, public scrutiny of the algorithm, correct nonce handling, and authenticated use when active attackers can modify ciphertexts.

## Use cases

- Bulk data encryption.
- Encrypted backups.
- The data-encryption part of hybrid encryption.

## Failure modes and anti-patterns

- Reusing nonces in modes that require uniqueness.
- Using encryption without authentication.
- Designing a custom mode around a block cipher or stream cipher.

## Further reading

- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
- Katz and Lindell, "Introduction to Modern Cryptography."
