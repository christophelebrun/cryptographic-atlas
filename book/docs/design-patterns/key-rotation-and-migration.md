---
title: Key Rotation and Migration
type: pattern
level: design-pattern
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - key-rotation
  - migration
  - post-quantum
post_quantum_posture: not-applicable
confidence_model:
  type: mixed
source_review:
  window_months: 6
  next_review_due: '2026-12-04'
  notes: Re-check cryptographic inventory, PQC migration, hybrid deployment, and vendor/tooling guidance.
---

# Key Rotation and Migration

## One-sentence intuition

Key rotation and migration replace keys, parameters, or algorithms while preserving continuity and limiting compromise impact.

## Where it sits in the taxonomy

- Level: design pattern.
- Parent category: operational cryptography.
- Related concepts: [Post-Quantum Posture](/docs/appendices/post-quantum-posture), [Domain Separation](/docs/design-patterns/domain-separation), [Secure Channels](/docs/protocols/secure-channels).

## Problem it solves

Keys expire, leak, age, or become tied to algorithms that need replacement. Systems need a controlled path to move forward without silently breaking trust.

## Mental model

Migration is a signed bridge from old trust to new trust. Rotation defines when and how traffic moves over that bridge.

## Minimal example

A service signs a new public key with an old trusted key, publishes an activation time, and rejects old signatures after a deprecation window.

## Security properties

- Limits exposure from old keys.
- Enables algorithm migration.
- Supports revocation and deprecation.
- Preserves trust continuity when authenticated correctly.

## What it does not provide

- Recovery of already exposed data.
- User recovery by itself.
- Trust continuity without authentic migration records.
- Protection if old and new keys are both compromised.

## Assumptions

- Old trust roots are still trustworthy during migration.
- Versioning and domain separation are explicit.
- Rollback and downgrade are rejected.
- Operators can inventory cryptographic dependencies.

## Post-quantum posture

Not applicable to the pattern itself. It is central to post-quantum transition because systems need crypto agility, hybrid deployment, and deprecation plans.

## Confidence model

Confidence is mixed: operational audit for key lifecycle, public-verifiability for signed migration records, and client-side-secret for private-key custody.

## Common constructions

- Key epochs.
- Signed key-transition records.
- Hybrid key exchange.
- Certificate rotation and revocation.
- Re-encryption with authenticated metadata.

## Use cases

- Certificate rotation.
- Post-quantum migration.
- Credential issuer key updates.
- Storage re-encryption.

## Composition patterns

Rotation composes with transcript binding, domain separation, audit logs, and client update policy. Every consumer must know which keys are valid for which purpose and time.

## Failure modes and anti-patterns

- Accepting old and new keys indefinitely.
- Downgrade to legacy algorithms.
- Re-encryption without authenticating metadata.
- Losing historical verification.

## Maturity and deployment

Mature operational pattern, but failures are common because migration spans code, policy, clients, and archives.

## Related concepts

- [Post-Quantum Posture](/docs/appendices/post-quantum-posture)
- [Secure Channels](/docs/protocols/secure-channels)
- [Domain Separation](/docs/design-patterns/domain-separation)

## Further reading

- [NIST SP 800-57 Part 1 Revision 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final).
- [NIST NCCoE Migration to Post-Quantum Cryptography](https://www.nccoe.nist.gov/applied-cryptography/migration-to-pqc).
