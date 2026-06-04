---
title: Privacy-Preserving Revocation
type: pattern
level: design-pattern
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - revocation
  - credentials
  - privacy
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Privacy-Preserving Revocation

## One-sentence intuition

Privacy-preserving revocation lets verifiers reject revoked credentials, keys, or tokens without making every status check a tracking event.

## Where it sits in the taxonomy

- Level: design pattern.
- Parent category: operational cryptography and credential systems.
- Related concepts: [Anonymous Credentials](/docs/protocols/anonymous-credentials), [Vector Commitments](/docs/structured-primitives/vector-commitments), [Accumulators and Merkle Trees](/docs/structured-primitives/accumulators-and-merkle-trees).

## Problem it solves

Systems need a way to stop accepting compromised, expired, or abusive credentials. Naive online status checks can reveal every presentation to the issuer or status service.

![Privacy-preserving revocation](/img/diagrams/privacy-preserving-revocation.svg)

## Mental model

The holder proves "my credential is not on the revoked list" against a public status commitment, without asking the issuer about this exact presentation.

## Minimal example

An issuer publishes a signed accumulator or status-list root. A holder presents a credential plus a proof that its revocation handle is not revoked under the current root. The verifier checks the root freshness and proof locally.

## Security properties

- Revoked items fail verification.
- Non-revoked holders avoid unnecessary issuer callbacks.
- Status evidence is bound to a version or time.
- Verifiers can check revocation under a stated freshness policy.

## What it does not provide

- Perfect privacy when revocation sets are tiny.
- Recovery from issuer abuse.
- Non-transferability by itself.
- Protection from verifier collusion, timing linkage, or rare attributes.

## Assumptions

- The revocation root, list, accumulator, or status commitment is authentic and fresh enough.
- Holders can obtain and update witnesses without revealing presentations.
- Verifiers enforce freshness and reject stale status evidence.
- Revocation identifiers are not stable cross-context trackers unless intentionally disclosed.

## Post-quantum posture

Depends on the construction. Hash-based status lists and Merkle proofs can be plausible with conservative hashes. Pairing, RSA, or elliptic-curve accumulators are quantum-vulnerable unless replaced by post-quantum alternatives.

## Confidence model

Confidence is mixed: trusted-issuer for revocation decisions, public-verifiability for signed status commitments, client-side-secret for holder binding, and operational audit for publication cadence and witness updates.

## Common constructions

- Signed status lists.
- Bitstring status lists.
- Dynamic accumulators.
- Merkle or sparse-Merkle revocation sets.
- Zero-knowledge non-revocation proofs.

## Use cases

- Anonymous credentials.
- Verifiable credentials and identity wallets.
- Access tokens.
- Private payments and e-cash.
- Device or key compromise handling.

## Composition patterns

Privacy-preserving revocation is composed with issuer signatures, holder binding, vector commitments or accumulators, freshness policies, and sometimes ZK proofs that hide the revocation handle.

## Failure modes and anti-patterns

- Online status checks that reveal every presentation.
- Tiny revocation sets that identify holders.
- Stale accumulators or status lists.
- Stable revocation identifiers reused across contexts.
- Witness update services that log holder activity.

## Maturity and deployment

Emerging. Status lists are deployed in credential ecosystems, while stronger accumulator and zero-knowledge revocation designs are specialized and harder to operate.

## Related concepts

- [Anonymous Credentials](/docs/protocols/anonymous-credentials)
- [Vector Commitments](/docs/structured-primitives/vector-commitments)
- [Metadata Leakage](/docs/appendices/metadata-leakage)
- [Privacy-Preserving Identity Wallets](/docs/case-studies/additional-systems#privacy-preserving-identity-wallets)

## Further reading

- [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model/).
- [Camenisch and Lysyanskaya, "An Efficient System for Non-transferable Anonymous Credentials"](https://doi.org/10.1007/3-540-44987-6_7).
- [Catalano and Fiore, "Vector Commitments and Their Applications"](https://eprint.iacr.org/2011/495).
- [RFC 9576: The Privacy Pass Architecture](https://www.rfc-editor.org/rfc/rfc9576).
