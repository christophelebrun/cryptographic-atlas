---
title: Multi-Party Computation
type: protocol
level: protocol
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: mature
tags:
  - mpc
---

# Multi-Party Computation

## Goal

Multi-party computation (MPC) lets parties jointly compute a function over their inputs while keeping those inputs private under a stated adversary model.

## Participants

Multiple parties with private inputs. Some protocols also use dealers or preprocessing parties.

## Inputs and outputs

Each party supplies an input. The protocol reveals an output to designated parties.

## Building blocks

- Secret sharing.
- Oblivious transfer.
- Commitments.
- Zero-knowledge proofs, in malicious-secure settings.

## Security goals

- Input privacy.
- Correctness.
- Sometimes fairness or guaranteed output delivery.

## Non-goals

- Hiding the output.
- Preventing inference from the output.
- Simplicity of deployment.

## Threat model

MPC protocols differ for semi-honest, malicious, honest-majority, dishonest-majority, synchronous, and asynchronous settings.

## Protocol sketch

Parties encode or share inputs, evaluate a circuit or arithmetic computation collaboratively, then reconstruct the allowed output.

## Trust assumptions

Assumptions include corruption thresholds, network model, setup, and whether preprocessing is trusted or verifiable.

## Post-quantum posture

Depends on the protocol and its building blocks. Information-theoretic MPC variants can avoid public-key assumptions in some settings, while many practical protocols rely on signatures, oblivious transfer, commitments, or channels whose posture must be checked separately.

## Confidence model

Confidence is model-specific: honest-majority, dishonest-majority, threshold, semi-honest, or malicious. The page for a concrete MPC protocol should state the maximum corrupt set it tolerates and what happens on abort.

## Metadata leaks

Participation, timing, circuit shape, aborts, and output values can leak information.

## Failure modes

- Selecting a protocol for the wrong adversary model.
- Revealing too much through outputs.
- Ignoring aborts or fairness.
- Weak authentication between parties.

## Variants

- Secret-sharing-based MPC.
- Garbled circuits.
- MPC with preprocessing.
- Threshold signing as a specialized use case.

## Where it is used

- Threshold custody.
- Private analytics.
- Auctions.
- Collaborative risk scoring.

## Further reading

- TODO: Add verified references for MPC models and constructions.
