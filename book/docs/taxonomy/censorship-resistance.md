---
title: Censorship Resistance
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

Censorship resistance limits an adversary's ability to selectively prevent a valid submission from reaching its intended destination or being included, under stated network and operator assumptions. Inclusion-list designs illustrate this system-level goal. [EIP-7805][focil].

## Where it sits in the taxonomy

- Level: security goal (level 1), applied to protocols and systems.
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Availability](/docs/taxonomy/availability), [Encrypted Mempools](/docs/systems-and-applications/encrypted-mempools), [Delayed Reveal](/docs/design-patterns/delayed-reveal).

## Problem it solves

A service can work for most users while one operator blocks Alice. Censorship resistance asks what Alice can do then: reach another operator, use an enforced inclusion path, or obtain evidence of exclusion. **Detecting censorship and overcoming it are separate guarantees.** [EIP-7805, Motivation and Security Considerations][focil].

## Mental model

Think of a delivery service with an adversarial gatekeeper. Another entrance helps only if Alice can reach it and the operator controlling final delivery cannot simply ignore it.

## Minimal example

In the **draft** Fork-choice enforced Inclusion Lists (FOCIL) proposal, a validator committee distributes transaction inclusion lists. Attesters check whether a proposed block satisfies their stored lists before voting for it. Conditions still include propagation deadlines, transaction validity, and available block capacity. This illustrates a proposed mechanism, not a claim about deployed Ethereum behavior. Status checked **27 October 2026**. [EIP-7805, Specification and Security Considerations][focil].

## Security properties

A concrete claim should state the valid submissions covered, the maximum exclusion delay if any, tolerated censor control, network conditions, and the enforced consequence of exclusion. FOCIL's conditions demonstrate why “every valid transaction is immediately included” would be too strong. [EIP-7805, Rationale and Security Considerations][focil].

## What it does not provide

- Payload confidentiality, sender anonymity, or fair transaction ordering.
- Inclusion of invalid submissions or submissions outside fee and capacity rules.
- Progress when an adversary can indefinitely block every usable network path.
- Inclusion merely because refusal can later be proved.

FOCIL deliberately leaves transaction placement within a block unconstrained and uses conditional inclusion rules. [EIP-7805, Core Properties][focil].

## Assumptions

Users must reach the required participants before relevant deadlines. Enough participants must follow the inclusion rules, and the underlying consensus must remain live. An “honest or accountable” operator is not enough by itself: accountability needs an effective enforcement or alternative delivery path. [EIP-7805, Consensus Liveness and Core Properties][focil].

## Post-quantum posture

**Not applicable to the goal.** A concrete design depends on authentication, consensus, and any encryption it uses. Quantum-resistant payload encryption alone does not protect a consensus system whose authentication can be forged. [EIP-7805, validation rules][focil]; [NIST post-quantum project][pqc].

## Confidence model

**Mixed:** reachable honest participants, consensus fault thresholds, and external timing conditions may all matter. FOCIL describes a one-honest-member inclusion-list assumption alongside consensus and propagation requirements; that is not one honest participant for the entire system. [EIP-7805, Core Properties and Consensus Liveness][focil].

## Common constructions

Alternative submission routes and enforced inclusion lists address access or inclusion. Encrypted submissions address what an operator can inspect before ordering; visible sender, fee, or timing can still enable selection. Encryption and fairness therefore need separate arguments. [EIP-7805][focil]; [Daian et al., Flash Boys 2.0][flash].

## Use cases

Blockchain transaction admission and sequencer bypass are representative requirements. For any fallback, specify the actual path, delay, fee, and party that must process it; the label “decentralized” is insufficient. [EIP-7805, Motivation][focil].

## Composition patterns

Combine with [Availability](/docs/taxonomy/availability), a stated ordering policy, and [Auditability](/docs/taxonomy/auditability) where exclusion evidence is feasible. Content secrecy can reduce some selection opportunities while adding decryption availability requirements. [Flash Boys 2.0][flash]; [EIP-7805, Security Considerations][focil].

## Failure modes and anti-patterns

:::warning A proposal is not a deployed guarantee
As checked on **27 October 2026**, EIP-7805 is marked **Draft** and the older EIP-7547 is marked **Stagnant**. Do not cite either as evidence that a live network enforces its rules. Also distinguish intentional exclusion from delay, invalidity, or capacity limits before claiming proof of censorship. [EIP-7805][focil]; [EIP-7547][older].
:::

## Maturity and deployment

**System-specific; emerging mechanisms:** the inclusion-list proposals cited here are not final specifications. Assess a particular network's deployed rules, assumptions, and reachable fallback paths separately. [EIP-7805][focil]; [EIP-7547][older].

## Related concepts

- [Availability](/docs/taxonomy/availability)
- [Encrypted Mempools](/docs/systems-and-applications/encrypted-mempools)
- [Private Payments](/docs/systems-and-applications/private-payments)

## Further reading

- [EIP-7805: Fork-choice enforced Inclusion Lists][focil] - draft mechanism; read its conditional inclusion and liveness assumptions.
- [EIP-7547: Inclusion lists][older] - stagnant earlier proposal, retained as historical context.
- [Daian et al., Flash Boys 2.0][flash] (IEEE S&P 2020; preprint 2019) - transaction ordering and extraction incentives, not a proof of inclusion guarantees.

[focil]: https://eips.ethereum.org/EIPS/eip-7805
[older]: https://eips.ethereum.org/EIPS/eip-7547
[flash]: https://arxiv.org/abs/1904.05234
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
