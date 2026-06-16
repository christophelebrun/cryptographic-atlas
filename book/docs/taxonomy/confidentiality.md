---
title: Confidentiality
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
  - confidentiality
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Confidentiality

## One-sentence intuition

Confidentiality means unauthorized parties should not learn the protected content.

## Where it sits in the taxonomy

- Level: security goal.
- Parent category: security goals.
- Related concepts: [Symmetric Encryption](/docs/primitives/symmetric-encryption), [Public-Key Encryption](/docs/primitives/public-key-encryption), [Authenticated Encryption](/docs/primitives/authenticated-encryption), [Secure Channels](/docs/protocols/secure-channels).

## Problem it solves

Confidentiality addresses the risk that messages, stored data, credentials, keys, or transaction contents are readable by observers who should not see them.

## Mental model

Think of confidentiality as controlling who can open an envelope. The envelope may still reveal sender, recipient, size, timing, and delivery route.

## Minimal example

A client sends a request over TLS 1.3. A passive network observer can see that a connection happened, but should not learn the HTTP request body if the endpoint and protocol assumptions hold.

## Security properties

- Plaintext should remain hidden from parties outside the authorized set.
- In a channel, session data should remain confidential under the negotiated key schedule.
- For storage, ciphertext should not reveal plaintext beyond accepted leakage such as length or access pattern.

## What it does not provide

- Integrity or authenticity unless combined with authentication.
- Anonymity, unlinkability, or traffic-analysis resistance.
- Protection after endpoint compromise.
- Protection from authorized recipients disclosing plaintext.

## Assumptions

- Encryption keys remain secret and are generated with adequate entropy.
- The encryption scheme and parameters match the threat model.
- Nonces, randomness, and associated data are handled correctly.
- Access control and key-management layers do not hand plaintext or keys to the wrong party.

## Post-quantum posture

Not applicable to the goal itself. Symmetric confidentiality can be plausible with conservative parameters, while RSA, finite-field, and elliptic-curve key establishment are quantum-vulnerable unless migrated or hybridized.

## Confidence model

Confidence depends on mathematical-assumption or symmetric-key security, endpoint key custody, implementation review, and operational controls around plaintext handling.

## Common constructions

- Authenticated encryption with associated data.
- Public-key encryption or hybrid public key encryption.
- Secure-channel protocols.
- Storage encryption with key wrapping and access controls.

## Use cases

- Protecting messages in transit.
- Encrypting stored records.
- Hiding private transaction data before reveal.
- Keeping credential attributes hidden until disclosure.

## Composition patterns

Confidentiality is commonly combined with [Integrity](/docs/taxonomy/integrity), [Authenticity](/docs/taxonomy/authenticity), [Transcript Binding](/docs/design-patterns/transcript-binding), and [Domain Separation](/docs/design-patterns/domain-separation).

## Failure modes and anti-patterns

- Using unauthenticated encryption.
- Reusing nonces in nonce-sensitive modes.
- Logging plaintext before encryption.
- Treating encryption as metadata privacy.
- Keeping decryption keys in the same trust boundary as ciphertext.

## Maturity and deployment

Widely deployed as a goal, but achieved only through concrete schemes and operational controls.

## Related concepts

- [Authenticated Encryption](/docs/primitives/authenticated-encryption)
- [Key Encapsulation and Exchange](/docs/primitives/key-encapsulation-and-exchange)
- [Secure Channels](/docs/protocols/secure-channels)
- [Metadata Leakage](/docs/appendices/metadata-leakage)

## Further reading

- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
- Katz and Lindell, [Introduction to Modern Cryptography](https://www.cs.umd.edu/~jkatz/imc.html).
- RFC 5116, [An Interface and Algorithms for Authenticated Encryption](https://www.rfc-editor.org/rfc/rfc5116).
