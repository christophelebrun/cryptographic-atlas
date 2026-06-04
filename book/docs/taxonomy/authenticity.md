---
title: Authenticity
type: taxonomy
level: security-goal
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - security-goals
  - authenticity
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Authenticity

## One-sentence intuition

Authenticity means data or actions are bound to the expected actor, key, role, or authority.

## Where it sits in the taxonomy

- Level: security goal.
- Parent category: security goals.
- Related concepts: [Digital Signatures](/docs/primitives/digital-signatures), [Message Authentication Codes](/docs/primitives/message-authentication-codes), [Secure Channels](/docs/protocols/secure-channels), [Anonymous Credentials](/docs/protocols/anonymous-credentials).

## Problem it solves

Authenticity addresses impersonation and misbinding: a system needs to know whether a message, key, credential, proof, or action came from the intended authority or participant.

## Mental model

Authenticity is a checked origin label. The label is useful only if the key, credential, or trust anchor behind it is itself authentic.

## Minimal example

A TLS server signs or otherwise authenticates the handshake. The client accepts the channel only if the certificate chain and hostname match the server it intended to contact.

## Security properties

- Messages or actions are tied to an authorized key, role, or issuer.
- Unknown-key-share and key-misbinding attacks are rejected when transcript binding is correct.
- The verifier can distinguish authorized origin from unauthenticated data.

## What it does not provide

- Confidentiality.
- Truth of the signed statement.
- Human intent or non-compromise of the signing key.
- Privacy unless the authentication mechanism is privacy-preserving.

## Assumptions

- Verification keys, trust anchors, issuer keys, or shared keys are authentic.
- The authenticated statement includes the intended context.
- Key compromise, delegation, and revocation are handled by policy.

## Post-quantum posture

Not applicable to the goal itself. Classical RSA, finite-field, and elliptic-curve authentication schemes are quantum-vulnerable; post-quantum authenticity depends on the concrete signature or MAC construction.

## Confidence model

Confidence depends on public-verifiability, shared-key secrecy, trusted issuers, client-side secrets, and operational key-management controls.

## Common constructions

- Digital signatures and certificate chains.
- MACs in symmetric protocols.
- Authenticated key exchange.
- Anonymous credentials and selective-disclosure presentations.

## Use cases

- Server authentication.
- Software signing.
- Credential issuance.
- Governance authorization.
- Protocol participant authentication.

## Composition patterns

Authenticity usually needs [Integrity](/docs/taxonomy/integrity), [Transcript Binding](/docs/design-patterns/transcript-binding), revocation policy, and key rotation.

## Failure modes and anti-patterns

- Signing ambiguous or incomplete bytes.
- Accepting a key for the wrong identity.
- Treating possession of a key as proof of human intent.
- Ignoring issuer revocation or key rotation.

## Maturity and deployment

Widely deployed, but the trust model varies sharply across PKI, pinned keys, shared keys, and issuer-based systems.

## Related concepts

- [Digital Signatures](/docs/primitives/digital-signatures)
- [Secure Channels](/docs/protocols/secure-channels)
- [Anonymous Credentials](/docs/protocols/anonymous-credentials)

## Further reading

- RFC 8446, [The Transport Layer Security Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446).
- NIST FIPS 186-5, [Digital Signature Standard](https://csrc.nist.gov/pubs/fips/186-5/final).
- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
