---
title: Multi-Party Computation
type: protocol
level: protocol
template: protocol
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - mpc
post_quantum_posture: depends
confidence_model:
  type: mixed
source_review:
  window_months: 6
  next_review_due: '2026-12-04'
  notes: Re-check MPC protocol families, MP-SPDZ, EMP, FRESCO, threshold signing, and private analytics implementation guidance.
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
- Oblivious pseudorandom functions in some specialized protocols.
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

## Concrete protocol families

| Family | Common setting | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| Yao garbled circuits | Two-party computation | Boolean-circuit MPC | Often efficient for two parties; oblivious transfer and malicious-security upgrades matter. |
| GMW | Multi-party Boolean circuits | General MPC with interactive rounds | Round complexity and network latency can dominate. |
| BGW | Honest-majority arithmetic MPC | Information-theoretic MPC in suitable settings | Requires honest majority and synchronous-style assumptions. |
| SPDZ-style protocols | Preprocessed arithmetic MPC | Dishonest-majority computation with offline preprocessing | Preprocessing generation and MAC checks are part of the confidence model. |
| MASCOT / OT-extension preprocessing | Practical malicious-secure preprocessing | Generating correlated randomness for SPDZ-like protocols | Relies on oblivious transfer and implementation-specific security choices. |
| Threshold signing protocols | FROST, threshold ECDSA, threshold BLS | Specialized MPC for signing | The signing protocol inherits both MPC threshold assumptions and signature-scheme assumptions. |

## Where it is used

- Threshold custody.
- Private analytics.
- Auctions.
- Collaborative risk scoring.
- Private set intersection variants.

See also [Private Set Intersection](/docs/protocols/private-set-intersection), which can be built from MPC techniques or from more specialized protocol families.

## Further reading

- Canetti, [Universally Composable Security; A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067).
- Keller, [MP-SPDZ: A Versatile Framework for Multi-Party Computation](https://doi.org/10.1145/3372297.3417872).
- EMP toolkit contributors, [EMP toolkit](https://github.com/emp-toolkit).
- FRESCO contributors, [FRESCO documentation](https://fresco.readthedocs.io/en/latest/intro.html).
- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
