---
title: Coercion-Resistant Voting
type: system
level: system
template: case-study
status: current
last_reviewed: '2026-06-04'
difficulty: advanced
maturity: emerging
tags:
  - voting
  - coercion-resistance
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Coercion-Resistant Voting

## Overview

Coercion-resistant voting aims to prevent a voter from proving how they voted, even if a coercer pressures them.

## Goals

- Ballot secrecy.
- Receipt-freeness.
- Resistance to forced abstention or forced choice, depending on the model.
- Verifiable tallying.

## Non-goals

- Solving all physical coercion.
- Protecting compromised voter devices by cryptography alone.
- Simple deployment.

## Building blocks

- Anonymous credentials.
- Re-voting or credential recovery.
- Mixnets or homomorphic tallying.
- Zero-knowledge proofs.
- Careful user experience and operational procedures.

## Concrete composition options

| Requirement | Concrete options | Main caution |
| --- | --- | --- |
| Eligibility | Anonymous credentials, recovery credentials, private registration lists | Registration can itself create coercion and tracking channels. |
| Ballot privacy | Mixnet tallying, homomorphic tallying, threshold decryption | The tally style changes trustee and metadata assumptions. |
| Receipt resistance | Re-voting, fakeable transcripts, credential invalidation | Must match the coercion timing model. |
| Validity and audit | ZK ballot-validity proofs, public bulletin board, verifiable shuffles | Public audit data must not become a voter-held receipt. |
| Trustee model | Threshold trustees, distributed key generation, public ceremony | Trustee collusion and key loss are system-level failures. |

## Privacy leaks

Timing, small groups, device compromise, and social pressure can defeat formal privacy claims.

## Post-quantum posture

Depends on voter authentication, credentials, ballot encryption, proof systems, mixnets or tallying, signatures, and trustee key management. Coercion resistance is a system property and does not receive a single post-quantum label unless every cryptographic layer is classified.

## Confidence model

Confidence usually combines public verifiability, threshold trustees, trusted eligibility processes, client-side secrecy, and operational controls that make receipts unavailable, fakeable, or superseded by later actions.

## Maturity warning

Coercion resistance is a demanding system property. Treat any simple claim of coercion resistance with skepticism unless the threat model is precise.

## Failure modes

- The voter interface creates a receipt.
- Device compromise observes or changes the vote.
- Coercers demand credentials before voting.
- Small groups or public tallies make votes inferable.
- Re-voting or recovery rules are too hard for real voters to use.

## Related concepts

- [Electronic voting](/docs/protocols/e-voting)
- [Make receipts useless](/docs/design-patterns/make-receipts-useless)
- [Mixnets](/docs/protocols/mixnets)

## Further reading

- Benaloh, [Verifiable Secret-Ballot Elections](https://www.microsoft.com/en-us/research/publication/verifiable-secret-ballot-elections/).
- [Electronic voting](/docs/protocols/e-voting)
