---
title: Non-Repudiation
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
  - non-repudiation
post_quantum_posture: not-applicable
confidence_model:
  type: mixed
---

# Non-Repudiation

## One-sentence intuition

Non-repudiation means evidence is intended to make later denial of an action unconvincing under a stated process.

## Where it sits in the taxonomy

- Level: security goal.
- Parent category: security goals.
- Related concepts: [Digital Signatures](/docs/primitives/digital-signatures), [Authenticity](/docs/taxonomy/authenticity), [Accountability](/docs/taxonomy/accountability), [Deniability](/docs/taxonomy/deniability).

## Problem it solves

Non-repudiation addresses later denial. A recipient, auditor, or dispute process may need evidence that a particular key, certificate, device, or role authorized a message or transaction.

## Mental model

Non-repudiation is a signed receipt plus context. The signature is only useful if the process can explain who controlled the key, what was signed, when it was signed, and whether the key was valid.

## Minimal example

A software release is signed with a release key whose certificate and timestamp are logged. Later, verifiers can check whether the artifact was signed by the release process that was authorized at that time.

## Security properties

- Evidence binds an action to a signing key, role, or credential.
- The signed statement includes the relevant context.
- Key validity and revocation status can be checked for the relevant time.
- The dispute process accepts the evidence model.

## What it does not provide

- Proof that a specific human was at the keyboard.
- Protection against key compromise.
- Deniability.
- Legal effect without operational and legal context.

## Assumptions

- Private keys are controlled by the accountable party or process.
- Certificates, key directories, or trust anchors are valid.
- Revocation and timestamp evidence are retained.
- The signed message is unambiguous and context-bound.

## Post-quantum posture

Not applicable to the goal itself. Non-repudiation inherits posture from the signature scheme, timestamping, certificate system, and long-term archival policy.

## Confidence model

Confidence is mixed: mathematical-assumption, trusted-issuer, operational audit, timestamping, and legal-process assumptions often combine.

## Common constructions

- Digital signatures.
- Certificate chains and public-key infrastructure.
- Timestamping and transparency logs.
- Signed audit records.
- Hardware-backed signing policies.

## Use cases

- Software release signing.
- Contract and document signing.
- Financial transaction authorization.
- Administrative approvals.
- Public statements by organizations.

## Composition patterns

Non-repudiation often composes with [Authenticity](/docs/taxonomy/authenticity), [Integrity](/docs/taxonomy/integrity), [Transcript Binding](/docs/design-patterns/transcript-binding), and [Key Rotation and Migration](/docs/design-patterns/key-rotation-and-migration).

## Failure modes and anti-patterns

- Signing ambiguous bytes without human-readable context.
- Ignoring certificate expiration, revocation, or key compromise.
- Assuming digital signatures automatically create legal non-repudiation.
- Using non-repudiating signatures where deniability is a requirement.

## Maturity and deployment

Widely deployed, especially around signatures and public-key infrastructure, but the goal is operational and legal as much as cryptographic.

## Related concepts

- [Digital Signatures](/docs/primitives/digital-signatures)
- [Accountability](/docs/taxonomy/accountability)
- [Deniability](/docs/taxonomy/deniability)

## Further reading

- NIST, [FIPS 186-5: Digital Signature Standard](https://csrc.nist.gov/pubs/fips/186-5/final).
- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
