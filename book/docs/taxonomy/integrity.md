---
title: Integrity
type: taxonomy
level: security-goal
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
review:
  structural:
    status: current
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: beginner
maturity: not-applicable
tags:
  - security-goals
  - integrity
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Integrity

## One-sentence intuition

Integrity means unauthorized changes should be detected.

## Where it sits in the taxonomy

- Level: security goal.
- Parent category: security goals.
- Related concepts: [Message Authentication Codes](/docs/primitives/message-authentication-codes), [Digital Signatures](/docs/primitives/digital-signatures), [Authenticated Encryption](/docs/primitives/authenticated-encryption), [Commitments](/docs/primitives/commitments).

## Problem it solves

Integrity addresses tampering: a message, record, proof, commitment, or state root should not be silently modified after it is produced.

## Mental model

Integrity is a tamper-evident seal. It does not say who applied the seal unless authenticity is also part of the design.

## Minimal example

An API webhook includes an HMAC over the request body. If an attacker changes the body without the MAC key, verification should fail.

## Security properties

- Unauthorized modifications are detected.
- The verifier can reject malformed or altered data.
- Integrity can cover context through associated data or transcript fields.

## What it does not provide

- Confidentiality.
- Public verifiability unless a signature or public proof is used.
- Human intent or semantic correctness.
- Freshness unless nonces, counters, timestamps, or state are included.

## Assumptions

- The verifier checks the integrity tag, signature, commitment opening, or proof before trusting data.
- The verified bytes include all security-critical context.
- Keys and verification parameters are authentic.

## Post-quantum posture

Not applicable to the goal itself. MAC- and hash-based integrity can be plausible with suitable parameters. Signature-based integrity depends on the signature scheme.

## Confidence model

Confidence depends on keyed or public-verifiability assumptions, authentic verification keys, complete context binding, and parser/state-machine correctness.

## Common constructions

- Message authentication codes.
- Digital signatures.
- Authenticated encryption.
- Merkle roots and authenticated data structures.
- Commitments and proof-system transcripts.

## Use cases

- Detecting message tampering.
- Protecting software updates.
- Binding rollup state roots to batch data.
- Checking credential or token claims.

## Composition patterns

Integrity is commonly paired with [Authenticity](/docs/taxonomy/authenticity), [Transcript Binding](/docs/design-patterns/transcript-binding), and [Domain Separation](/docs/design-patterns/domain-separation).

## Failure modes and anti-patterns

- Verifying a tag over only part of the message.
- Parsing before verification.
- Omitting version, algorithm, identity, or public-input fields.
- Treating a checksum as cryptographic integrity.

## Maturity and deployment

Widely deployed as a goal through MACs, signatures, AEAD, and authenticated data structures.

## Related concepts

- [Message Authentication Codes](/docs/primitives/message-authentication-codes)
- [Digital Signatures](/docs/primitives/digital-signatures)
- [Transcript Binding](/docs/design-patterns/transcript-binding)

## Further reading

- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
- Katz and Lindell, [Introduction to Modern Cryptography](https://www.cs.umd.edu/~jkatz/imc.html).
- RFC 5116, [An Interface and Algorithms for Authenticated Encryption](https://www.rfc-editor.org/rfc/rfc5116).
