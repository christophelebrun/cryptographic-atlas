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

## Concrete algorithms and schemes

| Scheme or mode | Primitive family | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| AES-GCM | AES block cipher plus Galois/Counter Mode | Authenticated encryption for network protocols and storage | Very common and hardware-accelerated; nonce reuse is catastrophic. |
| ChaCha20-Poly1305 | Stream cipher plus MAC | Authenticated encryption in software and mobile environments | Often faster without AES hardware; nonces must still be unique per key. |
| XChaCha20-Poly1305 | Extended-nonce ChaCha20-Poly1305 variant | Applications that want random nonces with a larger nonce space | Useful engineering shape, but check ecosystem support and protocol compatibility. |
| AES-GCM-SIV / AES-SIV | Misuse-resistant authenticated encryption | Systems where accidental nonce reuse is a realistic risk | More forgiving of nonce mistakes, but not a license to ignore nonce design. |
| AES-CBC plus MAC | Legacy composition | Older protocols and compatibility layers | Only safe with correct encrypt-then-MAC composition and padding handling; avoid for new designs when AEAD is available. |
| AES-ECB | Raw block-cipher mode | Legacy anti-pattern | Reveals repeated plaintext blocks and should not be used for protecting structured data. |

## Failure modes and anti-patterns

- Reusing nonces in modes that require uniqueness.
- Using encryption without authentication.
- Designing a custom mode around a block cipher or stream cipher.

## Further reading

- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
- Katz and Lindell, "Introduction to Modern Cryptography."
- NIST FIPS 197, "Advanced Encryption Standard."
- RFC 8439, "ChaCha20 and Poly1305 for IETF Protocols."
