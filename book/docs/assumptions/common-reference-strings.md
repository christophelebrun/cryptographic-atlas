---
title: Common Reference Strings
type: assumption
level: assumption
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - setup
  - crs
  - proof-systems
post_quantum_posture: depends
confidence_model:
  type: trusted-setup
---

# Common Reference Strings

## One-sentence intuition

A common reference string is public setup data that parties use to run or verify a cryptographic protocol.

## Where it sits in the taxonomy

- Level: assumption or setup substrate.
- Parent category: [Trusted Setup](/docs/assumptions/trusted-setup).
- Related concepts: [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments), [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs).

## Problem it solves

Some proof systems and commitments need shared public parameters before proving begins. A CRS gives provers and verifiers common data, but it can also introduce setup trust.

## Mental model

The CRS is the public measuring device. Everyone can use it, but if someone secretly calibrated it with a hidden trapdoor, they may be able to fake measurements.

## Minimal example

A Groth16 circuit has a proving key and verification key derived from setup. If toxic waste from setup survives, an attacker may create false proofs for that circuit.

## Security properties

- Shared public parameters for proving and verification.
- Sometimes universal or updatable setup across circuits.
- Sometimes transparent setup with no toxic waste, depending on the system.

## What it does not provide

- Correct setup by itself.
- Toxic-waste destruction unless the ceremony guarantees it.
- Post-quantum security by default.
- Correct circuit or statement design.

## Assumptions

- Setup participants followed the ceremony rules.
- At least one honest participant destroyed secret contribution in multi-party ceremonies when required.
- Verifiers use the correct CRS or verification key for the statement.
- Public parameters are authenticated and versioned.

## Post-quantum posture

Depends on the proof system and commitment scheme. A transparent CRS can avoid toxic waste but may still rely on assumptions whose post-quantum posture varies.

## Confidence model

Confidence may come from trusted-setup, one-honest-party setup ceremonies, public-verifiability of ceremony transcripts, or transparent parameter generation.

## Common constructions

- Circuit-specific CRS.
- Universal structured reference strings.
- Updatable setup ceremonies.
- Transparent public randomness and hash-based parameters.

## Use cases

- Pairing-based SNARKs.
- KZG commitments.
- Verifiable computation.
- ZK-rollup verifier keys.

## Composition patterns

CRS data must be bound into proofs, verification keys, application versions, and migration procedures. A verifier should never silently accept proofs under an unexpected CRS.

## Failure modes and anti-patterns

- Toxic waste retained by setup participants.
- Verifying proofs under the wrong verification key.
- Losing ceremony transcripts.
- Treating universal setup as universally safe.
- Omitting CRS version from protocol metadata.

## Maturity and deployment

Mature but sensitive. Setup-dependent systems are deployed, but setup transparency and ceremony auditability remain central to confidence.

## Related concepts

- [Trusted Setup](/docs/assumptions/trusted-setup)
- [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments)
- [Transcript Binding](/docs/design-patterns/transcript-binding)

## Further reading

- [Groth, "On the Size of Pairing-Based Non-interactive Arguments"](https://www.iacr.org/archive/eurocrypt2016/96650272/96650272.pdf).
- [Bowe, Gabizon, and Miers, "Scalable Multi-party Computation for zk-SNARK Parameters"](https://eprint.iacr.org/2017/1050).
- [Kate, Zaverucha, and Goldberg, "Constant-Size Commitments to Polynomials and Their Applications"](https://doi.org/10.1007/978-3-642-17373-8_11).
