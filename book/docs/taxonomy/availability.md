---
title: Availability
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
  - availability
post_quantum_posture: not-applicable
confidence_model:
  type: mixed
---

# Availability

## One-sentence intuition

Availability means the system can provide its intended service when honest users need it.

## Where it sits in the taxonomy

- Level: security goal.
- Parent category: security goals.
- Related concepts: [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography), [Secure Channels](/docs/protocols/secure-channels), [Censorship Resistance](/docs/taxonomy/censorship-resistance), [Key Rotation and Migration](/docs/design-patterns/key-rotation-and-migration).

## Problem it solves

Availability addresses denial of service, unavailable keys, stalled committees, missing data, and operational failure. Many cryptographic systems preserve confidentiality or integrity while still failing users because the service cannot respond.

## Mental model

Availability is enough working paths. A threshold, replica set, data-availability layer, or recovery plan is useful only if enough independent parts remain reachable and authorized.

## Minimal example

A threshold-signing wallet uses a 3-of-5 committee. It remains available if two signers are offline, but fails if three are offline, compromised, censored, or stuck behind the same provider outage.

## Security properties

- Honest users can complete the intended workflow within the required time.
- The system tolerates the stated number of failures or unavailable parties.
- Recovery paths exist for key loss, rotation, or partial outage.
- Availability assumptions are explicit rather than hidden behind "decentralized" language.

## What it does not provide

- Confidentiality, integrity, or privacy by itself.
- Protection against every denial-of-service attack.
- Censorship resistance unless inclusion paths are also addressed.
- Correctness if an unavailable component later returns bad data.

## Assumptions

- Quorum, replication, network, and storage assumptions match the deployment.
- Operators, committees, or clients are sufficiently independent.
- Recovery procedures are tested.
- Users know what happens during partial failure.

## Post-quantum posture

Not applicable to the goal itself. Availability inherits posture from the protocols, signatures, encryption, and migration systems that keep service paths usable.

## Confidence model

Confidence is usually mixed: threshold assumptions, honest-majority or t-of-n models, operational controls, network availability, and client recovery all matter.

## Common constructions

- Replication and failover.
- Threshold signatures or decryption.
- Data availability sampling and erasure coding.
- Key backup and recovery.
- Rate limiting and denial-of-service controls.

## Use cases

- Secure messaging delivery.
- Wallet recovery.
- Threshold custody.
- Rollup data availability.
- Revocation and status-check systems.

## Composition patterns

Availability often composes with [Censorship Resistance](/docs/taxonomy/censorship-resistance), [Key Rotation and Migration](/docs/design-patterns/key-rotation-and-migration), and operational monitoring.

## Failure modes and anti-patterns

- A threshold committee whose members share the same cloud, jurisdiction, or operator.
- Revocation or status checks that fail closed without a plan.
- Data that is committed but not actually retrievable.
- Recovery keys that are never tested.

## Maturity and deployment

Widely deployed as an operational security goal, but strongly system-specific.

## Related concepts

- [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography)
- [Censorship Resistance](/docs/taxonomy/censorship-resistance)
- [Key Rotation and Migration](/docs/design-patterns/key-rotation-and-migration)

## Further reading

- Canetti, [Universally Composable Security; A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067).
- RFC 9420, [The Messaging Layer Security Protocol](https://www.rfc-editor.org/rfc/rfc9420).
