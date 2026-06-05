---
title: Censorship Resistance
type: taxonomy
level: security-goal
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: not-applicable
tags:
  - security-goals
  - censorship-resistance
post_quantum_posture: not-applicable
confidence_model:
  type: mixed
---

# Censorship Resistance

## One-sentence intuition

Censorship resistance means valid actions cannot be selectively blocked beyond the system's stated tolerance.

## Where it sits in the taxonomy

- Level: security goal.
- Parent category: security goals.
- Related concepts: [Availability](/docs/taxonomy/availability), [Encrypted Mempools](/docs/systems-and-applications/encrypted-mempools), [Private Payments](/docs/systems-and-applications/private-payments), [Mixnets](/docs/protocols/mixnets).

## Problem it solves

Censorship resistance addresses selective exclusion. A system may be available in general while still preventing particular users, transactions, messages, or votes from being included.

## Mental model

Censorship resistance is an inclusion path with adversarial operators. The user needs at least one route that the censor cannot block without exceeding the model's failure threshold or being detected.

## Minimal example

A blockchain inclusion-list design lets a proposer commit to transactions that the next proposer must include if they remain valid. This is an attempt to reduce selective exclusion by making censorship visible or protocol-invalid.

## Security properties

- Valid submissions have a defined path to inclusion.
- The adversary's ability to exclude users is bounded or detectable.
- Fallback paths exist when ordinary relays, sequencers, or operators censor.
- Inclusion rules are clear enough to verify.

## What it does not provide

- Payload privacy by itself.
- Fast confirmation under every network attack.
- Protection against all denial-of-service attacks.
- Fair ordering unless ordering rules are also specified.

## Assumptions

- At least one inclusion path is honest, available, or publicly accountable.
- The network can propagate submissions to that path.
- Protocol rules distinguish invalid submissions from censored valid submissions.
- Users can afford the fallback route's latency and cost.

## Post-quantum posture

Not applicable to the goal itself. Censorship resistance inherits posture from signatures, channels, commitments, threshold encryption, and consensus mechanisms used in the system.

## Confidence model

Confidence is mixed: it may depend on honest-majority consensus, non-collusion, public-verifiability, external timing, or economic incentives.

## Common constructions

- Inclusion lists.
- Public mempools and alternative relays.
- Encrypted mempools with delayed reveal.
- Mixnets and private submission channels.
- Fraud proofs or public censorship evidence.

## Use cases

- Blockchain transaction inclusion.
- Private payments.
- Governance and voting.
- Messaging systems under hostile routing.
- Rollup sequencer fallback.

## Composition patterns

Censorship resistance often composes with [Availability](/docs/taxonomy/availability), [Delayed Reveal](/docs/design-patterns/delayed-reveal), [Encrypted Mempools](/docs/systems-and-applications/encrypted-mempools), and public auditability.

## Failure modes and anti-patterns

- Calling a system censorship-resistant because many parties exist, without analyzing collusion or routing.
- Hiding transaction contents while leaving sender, fee, or timing enough to censor.
- No fallback when the preferred relay or sequencer refuses service.
- Inclusion rules that are impossible for users to verify.

## Maturity and deployment

Emerging and system-specific. The goal is central in blockchains and messaging, but concrete mechanisms vary in maturity.

## Related concepts

- [Availability](/docs/taxonomy/availability)
- [Encrypted Mempools](/docs/systems-and-applications/encrypted-mempools)
- [Private Payments](/docs/systems-and-applications/private-payments)

## Further reading

- Daian et al., [Flash Boys 2.0](https://arxiv.org/abs/1904.05234).
- Ethereum Improvement Proposals, [EIP-7547: Inclusion lists](https://eips.ethereum.org/EIPS/eip-7547).
