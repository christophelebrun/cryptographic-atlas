---
title: Blind Signatures
type: primitive
level: structured-primitive
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
difficulty: intermediate
maturity: mature
tags:
  - blind-signatures
  - credentials
  - privacy
post_quantum_posture: depends
confidence_model:
  type: mathematical-assumption
---

# Blind Signatures

## One-sentence intuition

A blind signature lets a signer authorize a message without seeing the exact message being signed.

## Where it sits in the taxonomy

- Level: structured primitive.
- Parent category: [Digital Signatures](/docs/primitives/digital-signatures).
- Related concepts: [Anonymous Tokens](/docs/protocols/anonymous-tokens), [Blind-Signature Credentials](/docs/protocols/blind-signature-credentials), [Private Payments](/docs/systems-and-applications/private-payments).

## Problem it solves

Issuers often need to authorize tokens, credentials, or coins without being able to link issuance to later presentation or redemption.

## Mental model

The user puts a message in a cryptographic envelope. The signer stamps the envelope. The user removes the envelope and keeps a valid signature on the hidden message.

## Minimal example

A rate limiter issues one blind-signed token to a client. Later the client redeems the signed token, and the issuer can verify authenticity without directly linking redemption to issuance.

## Security properties

- Blindness: the signer should not learn the signed message.
- Unforgeability: users should not obtain more valid signatures than authorized.
- Public or issuer-side verification, depending on the scheme.

## What it does not provide

- Revocation by itself.
- Double-spend prevention.
- Network anonymity.
- Attribute privacy unless composed with a credential presentation protocol.

## Assumptions

- The underlying signature assumption holds.
- The blinding protocol is implemented correctly.
- Issuance policy limits over-issuance.
- Presentation and transport metadata do not re-link users.

## Post-quantum posture

Depends on the signature scheme. RSA and elliptic-curve blind signatures are quantum-vulnerable; post-quantum blind signatures are less mature.

## Confidence model

Confidence comes from mathematical-assumption security, signer key protection, issuance policy, and metadata controls around issuance and redemption.

## Common constructions

- Chaumian RSA blind signatures.
- Partially blind signatures.
- Blind signatures inside Privacy Pass-style token systems.

## Use cases

- Anonymous tokens.
- E-cash and private payments.
- Credential issuance.
- Privacy-preserving rate limits.

## Composition patterns

Blind signatures are often composed with issuance policy, token redemption logs, revocation mechanisms, and transport privacy. Blindness at the primitive layer does not automatically survive system metadata.

## Failure modes and anti-patterns

- Unique issuance metadata.
- Redemption timing linkage.
- No rate limits.
- Treating blind signatures as complete anonymous credentials.

## Maturity and deployment

Mature but specialized. Blind signatures are standardized in some forms and deployed in token systems, but privacy depends heavily on system integration.

## Related concepts

- [Anonymous Tokens](/docs/protocols/anonymous-tokens)
- [Blind-Signature Credentials](/docs/protocols/blind-signature-credentials)
- [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation)

## Further reading

- [Chaum, "Blind Signatures for Untraceable Payments"](https://doi.org/10.1007/978-1-4757-0602-4_18).
- [RFC 9474: RSA Blind Signatures](https://www.rfc-editor.org/rfc/rfc9474).
- [RFC 9576: The Privacy Pass Architecture](https://www.rfc-editor.org/rfc/rfc9576).
