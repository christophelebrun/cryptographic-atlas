---
title: Make Receipts Useless
type: pattern
level: design-pattern
template: concept
status: draft
last_reviewed: '2026-05-30'
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

## Problem it solves

Some systems need more than privacy from observers. They need to prevent a participant from producing convincing evidence of their own action.

## Common approaches

- Deniable or fakeable transcripts.
- Re-voting where only the last vote counts.
- Controlled credential recovery or revocation.
- Mixnets or tallying designs that avoid public vote receipts.

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

## Failure modes

- User interfaces expose receipts.
- Logs or screenshots become proofs.
- Coercers demand credentials before the action.
- Small groups make choices inferable from outcomes.

## Further reading

- [Electronic voting](/docs/protocols/e-voting)
- [Coercion-resistant voting](/docs/case-studies/coercion-resistant-voting)
