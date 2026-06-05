---
title: Anonymity
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
  - anonymity
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Anonymity

## One-sentence intuition

Anonymity means a subject is hidden among a set of plausible subjects.

## Where it sits in the taxonomy

- Level: security goal.
- Parent category: security goals.
- Related concepts: [Mixnets](/docs/protocols/mixnets), [Anonymous Credentials](/docs/protocols/anonymous-credentials), [Anonymous Membership](/docs/design-patterns/anonymous-membership), [Metadata Leakage](/docs/appendices/metadata-leakage).

## Problem it solves

Anonymity addresses identification: an observer should not be able to tell which person, key, account, or member performed an action within the stated anonymity set.

## Mental model

Anonymity is crowd cover. It depends on who else is in the crowd, whether their behavior is similar, and what side channels reveal.

## Minimal example

A voter proves membership in an eligible voter set without revealing which voter they are. The anonymity set is the set of eligible voters whose behavior remains plausible under the observer's view.

## Security properties

- The actor should be indistinguishable from other members of an anonymity set.
- The anonymity set and adversary observations must be stated explicitly.
- Protocol-level anonymity can coexist with public validity checks.

## What it does not provide

- Confidentiality of message contents.
- Unlinkability across repeated actions.
- Network anonymity unless the network layer is in scope.
- Protection from rare attributes, timing, or side information.

## Assumptions

- The anonymity set is large and behaviorally plausible.
- Issuers, verifiers, relays, or ledger observers do not collude beyond the stated model.
- Metadata is minimized or modeled.
- Credentials, nullifiers, or proofs do not include stable identifiers.

## Post-quantum posture

Not applicable to the goal itself. The cryptographic systems used to realize anonymity inherit posture from signatures, proofs, commitments, accumulators, and channels.

## Confidence model

Confidence may rely on one-honest-party, trusted-issuer, non-collusion, public-verifiability, or client-side-secret assumptions depending on the anonymity mechanism.

## Common constructions

- Mixnets.
- Anonymous credentials.
- Ring or group-style proofs.
- Anonymous membership proofs.
- Private payment note systems.

## Use cases

- Private voting.
- Anonymous access control.
- Private payments.
- Whistleblowing and messaging systems.

## Composition patterns

Anonymity is often paired with [Unlinkability](/docs/taxonomy/unlinkability), nullifiers, privacy-preserving revocation, and metadata minimization.

## Failure modes and anti-patterns

- Small or inactive anonymity sets.
- Unique amounts, timestamps, or attributes.
- Issuer-verifier collusion.
- Network identifiers linking the action back to a user.
- Treating a ZKP as anonymity without modeling metadata.

## Maturity and deployment

Mature as a goal, but concrete deployment confidence varies widely by system and adversary model.

## Related concepts

- [Anonymous Credentials](/docs/protocols/anonymous-credentials)
- [Mixnets](/docs/protocols/mixnets)
- [Private Payments](/docs/systems-and-applications/private-payments)

## Further reading

- Chaum, [Untraceable Electronic Mail, Return Addresses, and Digital Pseudonyms](https://doi.org/10.1145/358549.358563).
- Camenisch and Lysyanskaya, [An Efficient System for Non-transferable Anonymous Credentials with Optional Anonymity Revocation](https://doi.org/10.1007/3-540-44987-6_7).
- [Metadata Leakage](/docs/appendices/metadata-leakage).
