---
title: Unlinkability
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
  - unlinkability
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Unlinkability

## One-sentence intuition

Unlinkability means observers should not be able to tell that two actions came from the same subject.

## Where it sits in the taxonomy

- Level: security goal.
- Parent category: security goals.
- Related concepts: [Anonymity](/docs/taxonomy/anonymity), [Anonymous Tokens](/docs/protocols/anonymous-tokens), [Blind Signatures](/docs/structured-primitives/blind-signatures), [Nullifiers](/docs/protocols/nullifiers).

## Problem it solves

Unlinkability addresses correlation over time: even when actions are valid, observers should not be able to build a stable profile unless the protocol intentionally exposes one.

## Mental model

Unlinkability is changing coats between visits. It fails if shoes, timing, payment amount, or route still identify the same person.

## Minimal example

A user redeems an anonymous token. The verifier can check that the token is valid, but should not learn which issuance event produced it under the token protocol's model.

## Security properties

- Issuance and redemption should not be linkable by cryptographic values.
- Multiple presentations should not share stable identifiers unless intentionally scoped.
- Any deliberate link tag, such as a nullifier, must be context-bound.

## What it does not provide

- Anonymity if the anonymity set is tiny.
- Network privacy.
- Protection from timing, device, wallet, or account metadata.
- Double-use prevention unless nullifiers or spent-token sets are added.

## Assumptions

- Blinding, proof randomization, or credential presentation works as specified.
- Transport, browser, wallet, and ledger metadata are controlled or modeled.
- Issuers and verifiers do not collude outside the stated model.
- Context labels prevent cross-context link tags.

## Post-quantum posture

Not applicable to the goal itself. It inherits posture from blind signatures, credentials, OPRFs, proofs, commitments, and transport layers.

## Confidence model

Confidence commonly depends on trusted-issuer, non-collusion, client-side-secret, public-verifiability, or mathematical-assumption models.

## Common constructions

- Blind signatures.
- Anonymous credentials.
- OPRF-issued tokens.
- Randomized zero-knowledge presentations.
- Context-bound nullifiers.

## Use cases

- Anonymous tokens.
- Selective-disclosure credentials.
- Private voting.
- Private payment notes.

## Composition patterns

Unlinkability is often combined with [Anonymity](/docs/taxonomy/anonymity), [Domain Separation](/docs/design-patterns/domain-separation), anti-double-use nullifiers, and privacy-preserving revocation.

## Failure modes and anti-patterns

- Reusing a nullifier context across applications.
- Unique issuance or redemption timing.
- Revealing rare attributes.
- Stable wallet identifiers or account cookies.
- Confusing unlinkability with non-transferability.

## Maturity and deployment

Mature as a goal, but deployed strength is usually system-specific and metadata-limited.

## Related concepts

- [Anonymous Tokens](/docs/protocols/anonymous-tokens)
- [Blind-Signature Credentials](/docs/protocols/blind-signature-credentials)
- [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation)

## Further reading

- RFC 9576, [The Privacy Pass Architecture](https://www.rfc-editor.org/rfc/rfc9576).
- Chaum, [Blind Signatures for Untraceable Payments](https://www.chaum.com/publications/Chaum-blind-signatures.PDF).
- Camenisch and Lysyanskaya, [An Efficient System for Non-transferable Anonymous Credentials with Optional Anonymity Revocation](https://doi.org/10.1007/3-540-44987-6_7).
