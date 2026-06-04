---
title: ZK Rollups
type: system
level: system
template: case-study
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: advanced
maturity: emerging
tags:
  - zk-rollups
  - validity-proofs
  - blockchains
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# ZK Rollups

## Overview

ZK rollups use succinct validity proofs to convince verifiers that a batch of state transitions was applied correctly. In many deployed systems, "ZK" means validity proof, not necessarily transaction privacy.

![ZK-rollup data flow](/img/diagrams/zk-rollup-data-flow.svg)

## Goals

- Verify many state transitions with low verifier cost.
- Preserve the base chain's ability to reject invalid state updates.
- Reduce on-chain execution work.
- Sometimes provide privacy when transaction data or witnesses are hidden.

## Non-goals

- Data availability by itself.
- Decentralized sequencing or proving by default.
- Privacy unless the rollup explicitly hides inputs, outputs, and metadata.
- Correctness of application logic outside the proven transition.
- Protection from governance or upgrade-key misuse.

## Building blocks

- Arithmetization of the state-transition function.
- Polynomial commitments or FRI-style commitment layers.
- SNARKs, STARKs, or recursive proof systems.
- Public inputs for old state root, new state root, batch data, and verifier keys.
- Data availability mechanism.
- Sequencer, prover, and verifier contracts or services.

## Metadata leaks

- Batch timing and ordering.
- Public transaction data unless privacy is part of the design.
- Sequencer behavior and censorship patterns.
- Prover timing, fees, and failed-batch behavior.
- Bridge deposits and withdrawals.

## Post-quantum posture

Depends on the proof system and surrounding stack. Pairing-based SNARK rollups are quantum-vulnerable. STARK-style systems based on hashes and FRI are often treated as plausibly post-quantum with conservative parameters, but signatures, bridges, upgrade keys, and data-availability commitments may remain vulnerable.

## Confidence model

Confidence is mixed: public-verifiability for validity proofs, mathematical-assumption or transparent soundness for the proof system, operational trust in sequencers and provers, and governance trust in upgrade mechanisms.

## Failure modes

- Proving a transition relation that does not match intended application logic.
- Verifying a proof against the wrong verifier key or public inputs.
- Data unavailable even though the validity proof verifies.
- Centralized sequencer censorship.
- Trusted setup compromise for setup-dependent proof systems.
- Bridges or upgrade keys bypassing the proof system.

## Related concepts

- [Proof-System Components](/docs/proof-systems/proof-system-components)
- [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments)
- [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs)
- [Transcript Binding](/docs/design-patterns/transcript-binding)
- [Private Payments](/docs/case-studies/private-payments)

## Further reading

- [Ben-Sasson et al., "Scalable, transparent, and post-quantum secure computational integrity"](https://eprint.iacr.org/2018/046).
- [Kate, Zaverucha, and Goldberg, "Constant-Size Commitments to Polynomials and Their Applications"](https://doi.org/10.1007/978-3-642-17373-8_11).
- [Groth, "On the Size of Pairing-Based Non-interactive Arguments"](https://www.iacr.org/archive/eurocrypt2016/96650272/96650272.pdf).
- [Ben-Sasson et al., "Fast Reed-Solomon Interactive Oracle Proofs of Proximity"](https://eprint.iacr.org/2017/602).
