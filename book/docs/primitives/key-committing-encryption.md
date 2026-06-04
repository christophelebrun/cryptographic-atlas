---
title: Key-Committing Encryption
type: primitive
level: basic-primitive
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - authenticated-encryption
  - committing-encryption
  - misuse-resistance
post_quantum_posture: depends
confidence_model:
  type: mathematical-assumption
---

# Key-Committing Encryption

## One-sentence intuition

Key-committing encryption makes it hard for one ciphertext to validate under multiple different keys.

## Where it sits in the taxonomy

- Level: basic primitive or scheme property.
- Parent category: [Authenticated Encryption](/docs/primitives/authenticated-encryption).
- Related concepts: [Secure Messaging](/docs/case-studies/secure-messaging), [Transcript Binding](/docs/design-patterns/transcript-binding).

## Problem it solves

Some systems need to know which key a ciphertext is valid under. Ordinary authenticated encryption may allow ambiguous ciphertexts in unusual multi-key settings, which can matter for abuse reporting, message franking, or disputed-key workflows.

## Mental model

The ciphertext carries a cryptographic fingerprint of the key relationship. A valid opening should commit to one key context rather than being plausibly valid under several.

## Minimal example

A messaging system encrypts a reportable message. Later, a moderation flow needs evidence that the ciphertext corresponds to the reported key context, not a different key chosen after the fact.

## Security properties

- Ciphertext validity is bound to a key or key commitment.
- Reduces key ambiguity in multi-key systems.
- Can support accountability or message-franking workflows when composed carefully.

## What it does not provide

- Public attribution by itself.
- Sender identity without authentication.
- Deniability unless the full protocol is designed for it.
- Safety for arbitrary AEAD schemes.

## Assumptions

- The concrete encryption construction has a proved committing property.
- Associated data binds the recipient, protocol, version, and message context.
- Key generation and key identifiers are not attacker-confusable.

## Post-quantum posture

Depends on the underlying encryption, authentication, and any public-key layer around it. Symmetric-only committing designs can be plausible with conservative parameters.

## Confidence model

Confidence comes from mathematical-assumption or symmetric-key security, proof of the committing property, and careful context binding.

## Common constructions

- Committing authenticated encryption.
- Message franking constructions.
- Deterministic authenticated-encryption components in limited contexts.

## Use cases

- Secure messaging abuse reporting.
- Multi-recipient encryption with disputed keys.
- Systems where ciphertext/key ambiguity is a security problem.

## Composition patterns

Key-committing encryption is often combined with transcript binding, sender authentication, audit logs, or moderation workflows. It should not be swapped into a protocol without checking deniability and privacy goals.

## Failure modes and anti-patterns

- Treating ordinary AEAD as key-committing.
- Omitting associated-data context.
- Confusing key commitment with a digital signature.
- Breaking deniability expectations in messaging systems.

## Maturity and deployment

Emerging. The motivation is deployed in secure-messaging designs, but exact scheme properties are specialized and require expert review.

## Related concepts

- [Authenticated Encryption](/docs/primitives/authenticated-encryption)
- [Secure Messaging](/docs/case-studies/secure-messaging)
- [Transcript Binding](/docs/design-patterns/transcript-binding)

## Further reading

- [Grubbs et al., "Message Franking via Committing Authenticated Encryption"](https://eprint.iacr.org/2017/664).
- [Rogaway and Shrimpton, "Deterministic Authenticated-Encryption"](https://www.cs.ucdavis.edu/~rogaway/papers/keywrap.html).
- [RFC 8452: AES-GCM-SIV](https://www.rfc-editor.org/rfc/rfc8452).
