---
title: Private Aggregation
type: pattern
level: design-pattern
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: mature
tags:
  - aggregation
  - privacy
  - voting
---

# Private Aggregation

## One-sentence intuition

Private aggregation reveals a combined result without revealing each participant's individual value.

## Where it sits in the taxonomy

- Level: design pattern
- Parent category: design patterns
- Related concepts: homomorphic encryption, homomorphic commitments, MPC, secure aggregation

## Problem it solves

Many systems need aggregate information: a vote total, a usage statistic, a risk score, or a sum of measurements. Private aggregation tries to compute that aggregate while keeping each input hidden.

## Mental model

Participants place values into sealed envelopes that can be combined. The system opens only the total, not the individual envelopes.

## Minimal example

In a private poll, each voter submits an encrypted vote. The system combines encrypted votes and decrypts only the final tally.

## Approaches

| Approach | Useful when | Main risk |
| --- | --- | --- |
| Homomorphic encryption | A public aggregator should combine ciphertexts | Key management and invalid inputs |
| Homomorphic commitments | Values need binding plus additive structure | Requires proofs that values are valid |
| Multi-party computation (MPC) | No single party should see inputs | Assumptions about parties and availability |
| Secure aggregation | Many clients report statistics | Dropout, malicious clients, and small groups |

## Security properties

- Individual input privacy, under the chosen model.
- Aggregate correctness, if inputs are valid and the protocol completes.
- Limited disclosure of the final aggregate.

## What it does not provide

- Privacy for very small groups.
- Protection against differencing attacks across repeated queries.
- Proof that inputs are valid unless validity checks are added.
- Protection against metadata leaks.
- Coercion resistance in voting contexts.

## Assumptions

Assumptions vary by construction: encryption keys, threshold decryption, honest-majority assumptions, dropout handling, authenticated participants, and zero-knowledge proofs for input validity may all be required.

## Use cases

- Voting and polling.
- Private telemetry.
- Private statistics.
- Federated analytics.
- Confidential financial sums.

## Composition patterns

Private aggregation is often combined with range proofs, membership proofs, rate limits, threshold decryption, or differential privacy.

## Failure modes and anti-patterns

- Aggregates over tiny groups reveal individuals.
- Repeated aggregates allow differencing attacks.
- Malicious users submit invalid or extreme values.
- A decryptor quorum can collude or lose keys.
- Metadata reveals who participated and when.

## Maturity and deployment

The pattern is mature, but concrete systems range from well deployed to experimental depending on scale, threat model, and implementation.

## Related concepts

- [Homomorphic encryption](/docs/structured-primitives/homomorphic-encryption)
- [Secure aggregation](/docs/protocols/secure-aggregation)
- [Private DAO voting](/docs/case-studies/private-dao-voting)

## Further reading

- TODO: Add verified references for secure aggregation, private tallying, and differential privacy.
