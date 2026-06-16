---
title: Primitive Engineering Concepts
type: primitive
level: basic-primitive
template: overview
status: needs-review
coverage_depth: routing-overview
last_reviewed: '2026-06-04'
review:
  structural:
    status: needs-review
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: intermediate
maturity: not-applicable
tags:
  - primitives
  - engineering
  - misuse-resistance
post_quantum_posture: depends
confidence_model:
  type: depends
---

# Primitive Engineering Concepts

This page is now a routing overview for recurring engineering risks around keys, passwords, nonces, and symmetric-key abstractions.

## Classification matrix

| Concept | Level | Typical role | Maturity |
| --- | --- | --- | --- |
| Pseudorandom functions (PRFs) | basic primitive | Keyed deterministic function that looks random without the key | mature |
| Pseudorandom permutations (PRPs) | basic primitive | Keyed reversible permutation, often block-cipher-like | mature |
| [Password hashing](/docs/primitives/password-hashing) | basic primitive / storage pattern | Slows offline guessing of low-entropy secrets | widely deployed |
| Nonce-misuse-resistant encryption | basic primitive / scheme family | Reduces damage from accidental nonce reuse | mature but specialized |
| [Key-committing encryption](/docs/primitives/key-committing-encryption) | basic primitive / scheme property | Binds ciphertext validity to one key or key commitment | emerging |

## Pseudorandom functions

A pseudorandom function is a keyed deterministic function whose outputs should be indistinguishable from random to parties that do not know the key.

Security properties:

- Pseudorandom output under a secret key.
- Deterministic repeatability for the same key and input.
- Keyed domain separation when used through labeled inputs or KDF contexts.

What it does not provide:

- Public verifiability.
- Confidentiality of inputs.
- Safe password storage by itself.
- Protection if one key is reused across unrelated domains.

Assumptions and failure modes:

- The PRF construction must remain secure and the key must remain secret.
- Failures include missing domain separation, using raw hashes as PRFs, and exposing outputs for low-entropy inputs without rate limits.

## Pseudorandom permutations

A pseudorandom permutation is a keyed, invertible permutation that should look random to parties without the key. Block ciphers such as AES are commonly modeled as PRPs or strong PRPs in many designs.

Security properties:

- Reversible keyed transformation on fixed-size blocks.
- Pseudorandom behavior under chosen-input models, depending on the construction.
- Useful substrate for modes of operation.

What it does not provide:

- Variable-length encryption by itself.
- Authentication.
- Safe handling of repeated blocks without a mode.

Assumptions and failure modes:

- The block cipher or permutation must be used through a reviewed mode.
- Failures include using ECB mode, designing custom modes, and ignoring block-size limits.

## Password hashing

Password hashing stores a verifier for a low-entropy secret in a way that makes offline guessing more expensive.

Security properties:

- Per-password salt prevents shared precomputation.
- Work factors slow guessing.
- Memory-hard designs raise the cost of parallel hardware attacks.

What it does not provide:

- High entropy if the password is weak.
- Protection after a successful online guess.
- Password-authenticated key exchange by itself.
- Recovery or revocation policy.

Assumptions and failure modes:

- Parameters must match current hardware and risk tolerance.
- Failures include unsalted hashes, fast hashes such as raw SHA-256 for password storage, weak reset flows, and logging passwords before hashing.

## Nonce-misuse-resistant encryption

Nonce-misuse-resistant encryption reduces the damage caused by accidental nonce reuse. Synthetic-IV constructions such as AES-SIV and AES-GCM-SIV are common examples.

Security properties:

- Confidentiality and integrity with less catastrophic behavior under repeated nonces.
- Deterministic or synthetic-IV operation depending on the scheme.
- Associated-data binding when the scheme supports AEAD.

What it does not provide:

- A license to ignore nonce design.
- Protection from key compromise.
- Hiding of equality when deterministic encryption is used on repeated plaintext/context pairs.

Assumptions and failure modes:

- The construction must be a reviewed misuse-resistant scheme, not an ad hoc patch around a nonce-based mode.
- Failures include confusing misuse resistance with full misuse immunity and leaking repeated plaintext equality.

## Key-committing encryption

Key-committing encryption makes it hard for a ciphertext to decrypt or authenticate successfully under more than one key. This matters in group messaging, abuse reporting, and systems where ciphertexts may be presented under disputed keys.

Security properties:

- Ciphertext validity is bound to a key or key commitment.
- Reduces ambiguity about which key produced or decrypts a ciphertext.
- Can support accountability or message-franking designs.

What it does not provide:

- Public attribution by itself.
- Sender identity without authentication.
- Deniability unless the surrounding protocol is designed for it.
- Automatic safety for all AEAD schemes.

Assumptions and failure modes:

- The committing property must be proved for the concrete encryption construction.
- Failures include using a non-committing AEAD where key ambiguity matters, omitting associated-data context, and treating key commitment as a signature.

## Post-quantum posture

PRFs, PRPs, password hashing, and misuse-resistant symmetric encryption are generally plausible with conservative parameters. Key-committing encryption inherits posture from the underlying symmetric scheme and any public-key or signature layer around it.

## Confidence model

Confidence comes from mathematical-assumption or symmetric-key security, parameter selection, implementation review, and correct operational handling of keys, salts, nonces, and associated data.

## Related concepts

- [Hash Functions](/docs/primitives/hash-functions)
- [Authenticated Encryption](/docs/primitives/authenticated-encryption)
- [Key Derivation Functions](/docs/primitives/key-derivation-functions)
- [Password Hashing](/docs/primitives/password-hashing)
- [Key-Committing Encryption](/docs/primitives/key-committing-encryption)
- [Randomness and Nonces](/docs/primitives/randomness-and-nonces)
- [Secure Channels](/docs/protocols/secure-channels)

## Further reading

- Boneh and Shoup, ["A Graduate Course in Applied Cryptography"](https://toc.cryptobook.us/).
- RFC 9106, ["Argon2 Memory-Hard Function for Password Hashing and Proof-of-Work Applications"](https://www.rfc-editor.org/rfc/rfc9106).
- RFC 8452, ["AES-GCM-SIV: Nonce Misuse-Resistant Authenticated Encryption"](https://www.rfc-editor.org/rfc/rfc8452).
- Rogaway and Shrimpton, ["Deterministic Authenticated-Encryption"](https://web.cs.ucdavis.edu/~rogaway/papers/keywrap.pdf).
- Grubbs et al., ["Message Franking via Committing Authenticated Encryption"](https://eprint.iacr.org/2017/664).
