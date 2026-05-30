---
title: Composability
type: taxonomy
level: taxonomy
template: overview
status: draft
last_reviewed: '2026-05-30'
difficulty: beginner
maturity: not-applicable
tags:
  - composability
  - failure-modes
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Composability

Cryptographic tools do not compose automatically. Each primitive or protocol comes with a specific interface, adversary model, setup assumption, and leakage profile.

![Composition flow for private voting](/img/composition-flow.svg)

## One-sentence intuition

A component can keep its promise and still leave the larger system insecure if the system needs a different promise.

## Common composition mistakes

| Mistake | Why it fails |
| --- | --- |
| Encryption does not prove validity | A ciphertext can hide an invalid value unless the system also proves the plaintext is well formed. |
| Commitments do not authenticate users | A commitment binds someone to a value, but it does not say who that someone is. |
| Zero-knowledge proofs do not hide metadata | A proof can hide a witness while network timing, account history, or reused identifiers remain linkable. |
| Threshold cryptography is not trustlessness | Threshold schemes replace one trusted party with assumptions about a group, quorum, setup, and key management. |
| Anonymous credentials do not automatically prevent coercion | A user may still be pressured to reveal secrets, show a transcript, or vote under observation. |

## What to check

- Are all security goals stated separately?
- Does each component provide exactly the property being claimed?
- Are identities, timestamps, network addresses, and repeated identifiers handled?
- Does setup require a trusted party, ceremony, or honest majority?
- Are invalid inputs rejected without exposing private values?
- Can a malicious participant force aborts, denial of service, or selective failures?

## Failure pattern

A system often fails at the boundary between components. For example, a private voting design may encrypt ballots but forget to prove that each encrypted ballot encodes a valid choice. The tally remains private, but a malicious voter may submit malformed data.

## Safer framing

Instead of saying "this system is secure," say:

> Under these assumptions, against this adversary, this component contributes this property, while these leaks and non-goals remain.

## Further reading

- Canetti, "Universally Composable Security; A New Paradigm for Cryptographic Protocols."
- Katz and Lindell, "Introduction to Modern Cryptography."
