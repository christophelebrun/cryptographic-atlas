---
title: Make Receipts Useless
type: pattern
level: design-pattern
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: advanced
maturity: emerging
tags:
  - coercion-resistance
  - voting
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Make Receipts Useless

## One-sentence intuition

This pattern tries to stop users from proving to a coercer how they acted.

## Where it sits in the taxonomy

- Level: design-pattern
- Parent category: design-pattern
- Related concepts: [Coercion-Resistant Voting](/docs/systems-and-applications/coercion-resistant-voting), [Electronic Voting](/docs/protocols/e-voting), [Mixnets](/docs/protocols/mixnets)

## Problem it solves

Some protocols fail if participants can later prove how they acted to a coercer, buyer, or outside observer. Receipt-freeness patterns try to remove or weaken that proof while preserving enough verifiability for the system to accept legitimate actions.

## Mental model

Think of a voting booth where any receipt a voter brings outside can be plausibly faked or superseded.

## Minimal example

A voting system lets a voter cast again so an earlier coerced vote and its receipt no longer prove the final counted choice.

## Security properties

- receipt freeness
- coercion resistance
- deniability

## What it does not provide

- Protection against all real-world coercion.
- Safety on compromised devices.
- A simple add-on to ordinary privacy systems.

## Assumptions

The system must define the coercion model, control what public evidence is created, and account for user interfaces, logs, screenshots, credential recovery, and repeated participation.

## Post-quantum posture

Not applicable to the pattern by itself. Concrete posture depends on the voting, credential, encryption, proof, and tallying mechanisms used.

## Confidence model

Confidence usually combines public verifiability for tally integrity with protocol features that make user-held evidence deniable, fakeable, revocable, or superseded by later actions.

## Common constructions

### Common approaches

- Deniable or fakeable transcripts.
- Re-voting where only the last vote counts.
- Controlled credential recovery or revocation.
- Mixnets or tallying designs that avoid public vote receipts.

### Concrete compositions

| Composition | Typical role | Main caution |
| --- | --- | --- |
| Re-voting with last vote counts | Reducing value of early coerced receipts | Does not help if coercion happens after the final opportunity to vote. |
| Fakeable credential or transcript | Let users simulate evidence for any choice | Hard to make convincing without weakening auditability. |
| Mixnet tallying without per-voter receipts | Hide ballot-to-voter linkage | Device compromise or check-in metadata can still create receipts. |
| Coercion-resistant credential recovery | Let voters invalidate coerced credentials | Registration and recovery channels become part of the threat model. |

## Use cases

- coercion resistant voting
- private signaling
- sensitive choice systems

## Composition patterns

- Receipt-freeness must include operational artifacts such as logs and screenshots.
- Ballot secrecy alone is weaker than coercion resistance.

Common adjacent concepts: [Coercion-Resistant Voting](/docs/systems-and-applications/coercion-resistant-voting), [Electronic Voting](/docs/protocols/e-voting), [Mixnets](/docs/protocols/mixnets).

## Failure modes and anti-patterns

- User interfaces expose receipts.
- Logs or screenshots become proofs.
- Coercers demand credentials before the action.
- Small groups make choices inferable from outcomes.

## Maturity and deployment

Classified as emerging. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: expert-only. Parameter sensitivity: high.

## Related concepts

- [Coercion-Resistant Voting](/docs/systems-and-applications/coercion-resistant-voting)
- [Electronic Voting](/docs/protocols/e-voting)
- [Mixnets](/docs/protocols/mixnets)

## Further reading

- [Electronic voting](/docs/protocols/e-voting)
- [Coercion-resistant voting](/docs/systems-and-applications/coercion-resistant-voting)
