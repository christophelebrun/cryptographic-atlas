---
title: Confidentiality
type: taxonomy
level: security-goal
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-10-27'
review:
  structural:
    status: current
    last_reviewed: '2026-10-27'
  sources:
    status: current
    last_reviewed: '2026-10-27'
    next_review_due: '2027-04-27'
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

Confidentiality keeps protected content from parties who are not allowed to read it. [Boneh and Shoup, Part I][book].

## Where it sits in the taxonomy

- Level: security goal (level 1).
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Integrity](/docs/taxonomy/integrity), [Anonymity](/docs/taxonomy/anonymity), [Authenticated Encryption](/docs/primitives/authenticated-encryption).

## Problem it solves

Alice wants to send Bob a private message across a network that other people can observe. Encryption can hide the message content from those observers; it does not decide whether Bob should be trusted with it. The security model must specify what attackers can observe and whether they can also alter traffic. [Boneh and Shoup, Parts I-II][book].

## Mental model

Think of an opaque envelope: it hides the letter but may leave its address, size, and delivery time visible. The analogy describes content secrecy, not anonymous delivery.

## Minimal example

Alice sends a form to Bob's website using Transport Layer Security (TLS) 1.3. With authenticated setup and uncompromised endpoints, a network observer cannot read the protected application data. Bob's server can read it, and the observer can still see traffic patterns. TLS ends at its endpoints; an intermediary that terminates TLS is an endpoint too. [RFC 8446, §1, §2, and Appendix E][tls].

## Security properties

For an encryption scheme, ask which messages an attacker can distinguish, with what capabilities and allowed leakage. Authenticated encryption with associated data (AEAD) adds tamper detection; the associated data is authenticated but **not encrypted**. [Boneh and Shoup, Parts I-II][book]; [RFC 5116, §2][aead].

## What it does not provide

- Sender anonymity, unlinkability, or concealment of all sizes and timing.
- Integrity from encryption alone; it must be part of the scheme or protocol.
- Protection of plaintext copied by a recipient, malware, or a log.

These boundaries follow the separation between encryption security and application or traffic-analysis risks. [Boneh and Shoup][book]; [RFC 8446, Appendix E][tls].

## Assumptions

Keep keys secret, generate them correctly, and follow the scheme's nonce and usage limits. A **nonce** is a per-encryption input; many schemes require it to be unique for a given key. The application must also limit who can request decryption or receive plaintext. [RFC 5116, §§2-3 and §5][aead].

## Post-quantum posture

**Not applicable to the goal.** Concrete protection depends on encryption and key establishment. NIST identifies classical public-key cryptography as a quantum migration concern and has standardized ML-KEM for key establishment. Replacing that component does not address endpoint leaks. [NIST post-quantum project][pqc]; [FIPS 203][kem].

## Confidence model

**Mathematical-assumption + client-side-secret:** the scheme must resist the modeled attacker, and every endpoint that sees plaintext or keys must protect them. An encrypted database is not protected from an application that is authorized to decrypt it. [Boneh and Shoup][book].

## Common constructions

[Symmetric encryption](/docs/primitives/symmetric-encryption) and [public-key encryption](/docs/primitives/public-key-encryption) are primitives. [Secure channels](/docs/protocols/secure-channels) are protocols combining encryption, authentication, and key establishment. AEAD is a standard way to combine content secrecy and integrity. [RFC 5116][aead]; [RFC 8446][tls].

## Use cases

Private network traffic and encrypted records are common uses. In both cases, identify where decryption happens and which parties can obtain its output. [Boneh and Shoup][book].

## Composition patterns

Pair confidentiality with [Authenticity](/docs/taxonomy/authenticity) to establish the intended peer, and with [Forward Secrecy](/docs/taxonomy/forward-secrecy) if later key theft should not expose past traffic. These are separate requirements in a channel design. [RFC 8446, Appendix E][tls].

## Failure modes and anti-patterns

:::warning Encryption can fail outside the cipher
Reusing a nonce in a scheme such as AES-GCM can break confidentiality and authentication. Plaintext logging, incorrect peer authentication, and exposed decryption keys can bypass otherwise sound encryption. Use established protocols and audited implementations; this page is not an implementation recipe. [RFC 5116, §5.1.1][aead]; [RFC 8446, Appendix E][tls].
:::

## Maturity and deployment

**Widely deployed mechanisms:** AEAD and TLS 1.3 are standardized. This describes the mechanisms, not a maturity rating for the abstract goal or an endorsement of every configuration. [RFC 5116][aead]; [RFC 8446][tls].

## Related concepts

- [Authenticated Encryption](/docs/primitives/authenticated-encryption)
- [Secure Channels](/docs/protocols/secure-channels)
- [Metadata Leakage](/docs/appendices/metadata-leakage)

## Further reading

- [Boneh and Shoup, A Graduate Course in Applied Cryptography][book], Parts I-II - encryption security models.
- [RFC 5116][aead], §§2-3 and §5 - authenticated encryption and nonce requirements.
- [RFC 8446][tls], Appendix E - TLS guarantees and limits.
- [FIPS 203][kem] - ML-KEM, a key-establishment building block.

[book]: https://toc.cryptobook.us/
[aead]: https://www.rfc-editor.org/rfc/rfc5116
[tls]: https://www.rfc-editor.org/rfc/rfc8446
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
[kem]: https://csrc.nist.gov/pubs/fips/203/final
