---
title: Authenticity
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
  - authenticity
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Authenticity

## One-sentence intuition

Authenticity gives you evidence that data or a peer corresponds to the origin you expected. [RFC 4949, authentication entries][glossary].

## Where it sits in the taxonomy

- Level: security goal (level 1).
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Integrity](/docs/taxonomy/integrity), [Digital Signatures](/docs/primitives/digital-signatures), [Anonymous Credentials](/docs/protocols/anonymous-credentials).

## Problem it solves

A message can be perfectly intact and still come from an impostor. Authentication establishes an origin or peer under a trust model. **Authorization** is the separate decision about what that party may do. Recognizing a key does not automatically grant it permission. [RFC 4949, authentication and authorization][glossary].

## Mental model

Think of checking a badge against a trusted directory. A badge with a convincing design is not enough; the issuer, holder, and purpose must match what you intended to check.

## Minimal example

In a certificate-authenticated TLS 1.3 connection, the server proves possession of a certificate's private key. The client must validate the certificate and match the service identity to the site it meant to contact. A valid certificate for a different site is insufficient. TLS also supports pre-shared-key authentication, which has a different trust model. [RFC 8446, §§2 and 4.4][tls]; [RFC 9525][identity].

## Security properties

Distinguish **data-origin authentication** (“which key or party produced this data?”) from **peer authentication** (“who is participating in this session?”). Peer authentication needs freshness and session context; an old signed message alone does not establish a live peer. [RFC 4949][glossary]; [RFC 8446, Appendix E.1][tls].

## What it does not provide

- Confidentiality or anonymity by default.
- Truth of a signed statement.
- Proof that a key holder is authorized for a particular operation.
- Proof of human intent, or that a device has not been compromised.

A signature verifies against a key and message; identity, authorization, and key custody require additional evidence and policy. [FIPS 186-5][dss]; [RFC 4949][glossary].

## Assumptions

Obtain authentic verification keys or shared secrets, check the intended identity, and bind the protocol context to the authenticated data. Define how keys become trusted, how delegation works, and how compromise or revocation changes acceptance. [RFC 8446, §4.4][tls]; [RFC 9525][identity].

## Post-quantum posture

**Not applicable to the goal.** RSA and elliptic-curve signatures face quantum attacks. NIST's standardized post-quantum alternatives include ML-DSA and SLH-DSA. A deployment also needs compatible certificates, protocols, and trust anchors. [NIST post-quantum project][pqc].

## Confidence model

**Public-verifiability + trusted-issuer** for certificate-based signatures; **client-side-secret** for shared-key authentication. Key pinning uses a different initial trust path. In every case, ask who established the key-to-party binding. [Boneh and Shoup][book]; [RFC 9525][identity].

## Common constructions

Digital signatures and MACs are primitives; authenticated key exchange and certificate validation belong to protocols. Anonymous credential protocols can authenticate an attribute or eligibility without revealing a civil identity. [Boneh and Shoup][book]; [Camenisch and Lysyanskaya][credentials].

## Use cases

Authenticating websites, verifying release artifacts, and accepting issuer-backed credentials all require the verifier to know which authority it intended to trust. [RFC 8446][tls]; [FIPS 186-5][dss]; [Camenisch and Lysyanskaya][credentials].

## Composition patterns

Pair authentication with [Integrity](/docs/taxonomy/integrity), [Transcript Binding](/docs/design-patterns/transcript-binding), and application authorization. Include the operation and audience in the authenticated context so that evidence for one purpose is not accepted for another. [RFC 8446, §4.4.3][tls]; [Boneh and Shoup][book].

## Failure modes and anti-patterns

:::warning A valid signature can answer the wrong question
Accepting any valid key, skipping service-identity checks, or verifying bytes that omit the recipient can authenticate the wrong party or action. A stolen authorized key can also produce valid evidence. Authentication must include identity, context, and compromise handling. [RFC 9525][identity]; [FIPS 186-5][dss].
:::

## Maturity and deployment

**Widely deployed mechanisms:** signatures, MACs, and authenticated TLS. The trust model and key lifecycle still determine what an application may infer. [Boneh and Shoup][book]; [RFC 8446][tls].

## Related concepts

- [Secure Channels](/docs/protocols/secure-channels)
- [Non-Repudiation](/docs/taxonomy/non-repudiation)
- [Key Rotation and Migration](/docs/design-patterns/key-rotation-and-migration)

## Further reading

- [RFC 4949][glossary] - authentication versus authorization.
- [RFC 8446][tls], §4.4 - TLS authentication.
- [RFC 9525: Service Identity in TLS][identity] - matching the intended service; supersedes RFC 6125.
- [FIPS 186-5: Digital Signature Standard][dss] - signature capabilities and limits.

[glossary]: https://www.rfc-editor.org/rfc/rfc4949
[tls]: https://www.rfc-editor.org/rfc/rfc8446
[identity]: https://www.rfc-editor.org/rfc/rfc9525
[dss]: https://csrc.nist.gov/pubs/fips/186-5/final
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
[book]: https://toc.cryptobook.us/
[credentials]: https://cs.brown.edu/people/alysyans/papers/cl01a.pdf
