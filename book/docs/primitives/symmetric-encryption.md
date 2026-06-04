---
title: Symmetric Encryption
type: primitive
level: basic-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
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

## Where it sits in the taxonomy

- Level: basic-primitive
- Parent category: encryption
- Related concepts: [Message Authentication Codes](/docs/primitives/message-authentication-codes), [Key Derivation Functions](/docs/primitives/key-derivation-functions), [Public-Key Encryption](/docs/primitives/public-key-encryption)

## Problem it solves

This page explains the problem behind the concept: One shared secret key encrypts and decrypts data. It separates the guarantee from the assumptions, missing guarantees, and composition risks that decide whether the idea is useful in a real system.

## Mental model

Think of a locked box where the same secret key locks and unlocks the contents.

## Minimal example

A backup tool encrypts a local archive with a secret key before uploading it to storage.

## Security properties

- Confidentiality under the chosen attack model.
- Efficient protection for bulk data when used through a safe mode or authenticated-encryption construction.

For most new protocol designs, the safer interface is [authenticated encryption](/docs/primitives/authenticated-encryption), not bare encryption.

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

## Common constructions

### Concrete algorithms and schemes

| Scheme or mode | Primitive family | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| AES-GCM | AES block cipher plus Galois/Counter Mode | Authenticated encryption for network protocols and storage | Very common and hardware-accelerated; nonce reuse is catastrophic. |
| ChaCha20-Poly1305 | Stream cipher plus MAC | Authenticated encryption in software and mobile environments | Often faster without AES hardware; nonces must still be unique per key. |
| XChaCha20-Poly1305 | Extended-nonce ChaCha20-Poly1305 variant | Applications that want random nonces with a larger nonce space | Useful engineering shape, but check ecosystem support and protocol compatibility. |
| AES-GCM-SIV / AES-SIV | Misuse-resistant authenticated encryption | Systems where accidental nonce reuse is a realistic risk | More forgiving of nonce mistakes, but not a license to ignore nonce design. |
| AES-CBC plus MAC | Legacy composition | Older protocols and compatibility layers | Only safe with correct encrypt-then-MAC composition and padding handling; avoid for new designs when AEAD is available. |
| AES-ECB | Raw block-cipher mode | Legacy anti-pattern | Reveals repeated plaintext blocks and should not be used for protecting structured data. |

## Use cases

- Bulk data encryption.
- Encrypted backups.
- The data-encryption part of hybrid encryption.

## Composition patterns

- Symmetric encryption often needs authenticated encryption.
- Key establishment must be handled separately.

Common adjacent concepts: [Message Authentication Codes](/docs/primitives/message-authentication-codes), [Key Derivation Functions](/docs/primitives/key-derivation-functions), [Public-Key Encryption](/docs/primitives/public-key-encryption).

## Failure modes and anti-patterns

- Reusing nonces in modes that require uniqueness.
- Using encryption without authentication.
- Designing a custom mode around a block cipher or stream cipher.

## Maturity and deployment

Classified as deployed. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: high. Parameter sensitivity: medium.

## Related concepts

- [Message Authentication Codes](/docs/primitives/message-authentication-codes)
- [Key Derivation Functions](/docs/primitives/key-derivation-functions)
- [Public-Key Encryption](/docs/primitives/public-key-encryption)

## Further reading

- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
- Katz and Lindell, [Introduction to Modern Cryptography](https://www.cs.umd.edu/~jkatz/imc.html).
- NIST FIPS 197, [Advanced Encryption Standard](https://csrc.nist.gov/pubs/fips/197/final).
- RFC 5116, [An Interface and Algorithms for Authenticated Encryption](https://www.rfc-editor.org/rfc/rfc5116).
- RFC 8439, [ChaCha20 and Poly1305 for IETF Protocols](https://www.rfc-editor.org/rfc/rfc8439).
