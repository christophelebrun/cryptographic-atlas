---
title: Authenticated Encryption
type: primitive
level: basic-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: deployed
tags:
  - encryption
  - authentication
  - aead
post_quantum_posture: plausible
confidence_model:
  type: mathematical-assumption
---

# Authenticated Encryption

## One-sentence intuition

Authenticated encryption protects a message's confidentiality and lets the receiver reject modified ciphertexts.

## Where it sits in the taxonomy

- Level: basic primitive.
- Parent category: symmetric cryptography.
- Related concepts: [Symmetric encryption](/docs/primitives/symmetric-encryption), [Message authentication codes](/docs/primitives/message-authentication-codes), [Randomness and nonces](/docs/primitives/randomness-and-nonces).

## Problem it solves

Many systems need both secrecy and tamper detection. Encrypting without authentication can allow an attacker to modify ciphertexts and learn from error behavior, while authenticating the plaintext separately can fail if the composition order, keys, or associated context are wrong.

Authenticated encryption gives applications a single interface for "encrypt this plaintext, authenticate this public context, and reject invalid ciphertexts."

## Mental model

Think of a sealed envelope with a tamper-evident seal. The inside of the envelope is hidden. The label on the outside may remain visible, but the seal binds that label to the hidden contents so an attacker cannot swap either one without detection.

## Minimal example

A protocol sends:

- plaintext: `transfer 10 tokens`;
- associated data: `chain_id=1, protocol=v2, sender=alice`;
- nonce: a value that must be unique for the key.

The receiver decrypts only if the ciphertext, tag, associated data, key, and nonce all verify together. If the associated data changes to `chain_id=2`, verification fails even though the associated data was never encrypted.

## Security properties

- Confidentiality of the plaintext under the scheme's chosen security notion.
- Integrity of the ciphertext and plaintext.
- Authenticity under the symmetric key: only someone with the key should produce ciphertexts that verify.
- Associated-data integrity: public context is authenticated even though it is not encrypted.

## What it does not provide

- Non-repudiation or public verifiability.
- Sender identity when several parties share the same key.
- Protection from nonce reuse unless the specific scheme is misuse-resistant.
- Hiding of associated data, message length, timing, or traffic patterns.
- Post-compromise protection after the symmetric key is exposed.

## Assumptions

The key must remain secret, nonces must satisfy the scheme's exact uniqueness or randomness rule, associated data must include the full protocol context that needs binding, and implementations must reject invalid tags before releasing plaintext.

## Post-quantum posture

Plausible when instantiated with symmetric-key algorithms using appropriate key and tag lengths. Quantum search reduces effective brute-force margins, so parameter choices still matter. The surrounding key-establishment or signature layer may be quantum-vulnerable even if the authenticated-encryption algorithm is not.

## Confidence model

Confidence comes from the symmetric-key assumption, correct nonce management, unambiguous associated-data encoding, and implementations that do not leak plaintext or tag-check behavior through side channels.

## Common constructions

| Construction | Typical use | Caution |
| --- | --- | --- |
| AES-GCM | Network protocols and hardware-accelerated platforms | Catastrophic nonce reuse under one key. |
| ChaCha20-Poly1305 | Software-oriented secure channels | Nonce uniqueness is still required. |
| XChaCha20-Poly1305 | Systems that want larger random nonces | Widely used, but not every protocol registry includes it. |
| AES-GCM-SIV / AES-SIV | Misuse-resistant encryption | More forgiving of nonce mistakes, but still has limits and different performance. |
| AES-CCM | Constrained and wireless protocols | Nonce formatting and length choices are easy to get wrong. |

## Use cases

- TLS record protection.
- Encrypted application messages.
- File and backup encryption.
- Token sealing.
- Encrypted database fields where context must be bound as associated data.

## Composition patterns

Authenticated encryption is commonly fed by a [key derivation function](/docs/primitives/key-derivation-functions), uses [randomness and nonces](/docs/primitives/randomness-and-nonces), and appears inside secure-channel protocols. It often binds transcript hashes, version numbers, identities, or domain separators as associated data.

## Failure modes and anti-patterns

- Reusing a nonce with AES-GCM or ChaCha20-Poly1305 under the same key.
- Decrypting or parsing plaintext before tag verification succeeds.
- Leaving protocol version, sender, recipient, or purpose outside associated data.
- Mixing encrypted values from different protocols because encodings are not domain-separated.
- Treating authenticated encryption as a signature.
- Using AES-CBC or AES-CTR without a correct authentication layer.

## Maturity and deployment

Widely deployed. Authenticated encryption with associated data (AEAD) is the default interface in modern secure-channel and application-message designs, but incorrect nonce handling remains a common implementation risk.

## Related concepts

- [Symmetric encryption](/docs/primitives/symmetric-encryption)
- [Message authentication codes](/docs/primitives/message-authentication-codes)
- [Randomness and nonces](/docs/primitives/randomness-and-nonces)
- [Key derivation functions](/docs/primitives/key-derivation-functions)
- [Metadata leakage](/docs/appendices/metadata-leakage)

## Further reading

- RFC 5116, [An Interface and Algorithms for Authenticated Encryption](https://www.rfc-editor.org/rfc/rfc5116).
- RFC 8439, [ChaCha20 and Poly1305 for IETF Protocols](https://www.rfc-editor.org/rfc/rfc8439).
- Rogaway, [Authenticated-Encryption with Associated-Data](https://web.cs.ucdavis.edu/~rogaway/papers/ad.pdf).
- NIST SP 800-38D, [Recommendation for Block Cipher Modes of Operation: GCM and GMAC](https://csrc.nist.gov/pubs/sp/800/38/d/final).
