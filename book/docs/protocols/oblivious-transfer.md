---
title: Oblivious Transfer
type: protocol
level: protocol
template: protocol
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - oblivious-transfer
  - mpc
  - privacy
post_quantum_posture: depends
confidence_model:
  type: mathematical-assumption
---

# Oblivious Transfer

## Goal

Let a receiver obtain one selected message from a sender while the sender does not learn which message was selected and the receiver learns nothing about the unselected messages.

## Participants

- Sender with two or more candidate messages.
- Receiver with a private selection.
- Optional setup, correlation generator, or base-OT functionality in efficient extensions.

## Inputs and outputs

Inputs:

- Sender messages.
- Receiver choice index or selection bit.
- Security parameters and protocol mode.
- Optional authenticated channel and base OT material.

Outputs:

- Receiver obtains only the selected message.
- Sender learns no selection information beyond allowed leakage.
- Failure if checks, authentication, or consistency tests fail.

## Building blocks

- Public-key encryption or key exchange for base OT.
- OT extension for many cheap OTs from fewer expensive base OTs.
- Hash functions, commitments, correlation checks, and authenticated channels.
- Sometimes OPRFs, MPC preprocessing, or correlated randomness.

## Security goals

- Receiver choice privacy.
- Sender message privacy for unchosen messages.
- Correctness under the specified adversary model.
- Consistency against malicious parties when the protocol includes malicious-security checks.

## Non-goals

- Hiding that the parties interacted.
- Fairness or guaranteed delivery.
- General multi-party computation by itself.
- Output privacy after the receiver uses the selected message elsewhere.

## Threat model

OT can be defined against semi-honest or malicious adversaries. Semi-honest security assumes parties follow the protocol but try to infer extra information. Malicious security allows arbitrary deviations and requires extra consistency checks. Using a semi-honest OT where malicious behavior is possible is a common system-level error.

## Protocol sketch

1. The receiver encodes a private choice into public-key or correlation material.
2. The sender uses that material to mask each candidate message.
3. Only the receiver's selected branch can be unmasked.
4. In extension protocols, a small number of base OTs bootstrap many derived OTs.
5. Malicious-secure variants add checks that parties used consistent choices and correlations.

## Trust assumptions

- The selected OT construction matches the adversary model.
- Channels authenticate participants.
- Base OTs and extension seeds are generated correctly.
- Correlation checks are not skipped when malicious security is required.

## Post-quantum posture

Depends on the construction. Many deployed base OTs use classical public-key assumptions such as elliptic-curve or finite-field discrete logarithms and are quantum-vulnerable. OT extension mostly uses symmetric primitives after setup, but the base OT and authentication layers determine the overall posture.

## Confidence model

Confidence comes from mathematical assumptions, authenticated channels, and adversary-model alignment. Some systems also rely on one-honest-party or honest-majority assumptions when OT is embedded in larger MPC protocols.

## Metadata leaks

- Participation, timing, and message sizes.
- Number of OTs and batch structure.
- Abort behavior that may reveal malformed inputs or failed checks.

## Failure modes

- Using semi-honest OT in malicious environments.
- Skipping correlation checks in OT extension.
- Failing to authenticate channels.
- Reusing seeds, choices, or setup material across domains.
- Treating OT as a complete privacy-preserving computation protocol.

## Variants

- 1-out-of-2 OT and 1-out-of-n OT.
- Random OT and correlated OT.
- Base OT and OT extension.
- Semi-honest, covert, and malicious-secure OT.
- Post-quantum candidate OTs from lattice or code assumptions.

## Where it is used

- MPC.
- Private set intersection.
- Garbled circuits.
- Secure function evaluation.
- Preprocessing for private computation systems.

## Further reading

- [Rabin, "How to Exchange Secrets with Oblivious Transfer"](https://eprint.iacr.org/2005/187).
- [Canetti, "Universally Composable Security"](https://eprint.iacr.org/2000/067).
- [Boneh and Shoup, "A Graduate Course in Applied Cryptography"](https://toc.cryptobook.us/).
