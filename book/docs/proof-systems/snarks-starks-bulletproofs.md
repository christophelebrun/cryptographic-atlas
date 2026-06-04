---
title: SNARKs, STARKs, and Bulletproofs
type: primitive
level: proof-system
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - snarks
  - starks
  - bulletproofs
post_quantum_posture: depends
confidence_model:
  type: depends
source_review:
  window_months: 6
  next_review_due: '2026-12-04'
  notes: Re-check proof-system family sources, implementation stacks, setup posture, and deployed rollup proving systems.
---

# SNARKs, STARKs, and Bulletproofs

## One-sentence intuition

SNARKs, STARKs, and Bulletproofs are families of proof systems that package zero-knowledge or succinct verification with different costs and assumptions.

## Where it sits in the taxonomy

- Level: proof-system
- Parent category: proof-system-family
- Related concepts: [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs), [Range Proofs](/docs/proof-systems/range-proofs), [Trusted Setup](/docs/assumptions/trusted-setup)

## Problem it solves

This page explains the problem behind the concept: Proof-system families that trade setup, proof size, verifier cost, and assumptions differently. It separates the guarantee from the assumptions, missing guarantees, and composition risks that decide whether the idea is useful in a real system.

## Mental model

Think of different proof-system toolchains that compress confidence in a computation with different setup, size, and cost trade-offs.

## Minimal example

A rollup may use a SNARK for small verifier cost, while a transparency-focused system may use a STARK to avoid trusted setup.

## Security properties

- succinct verification
- soundness
- zero knowledge depending on mode

## What it does not provide

- A correct statement automatically.
- Metadata privacy.
- Protection against implementation bugs.
- A complete protocol.

## Assumptions

Assumptions are family-specific: pairing-based SNARKs often depend on elliptic-curve and setup assumptions, STARK-style systems typically depend on hash choices and transparent protocols, and Bulletproof-style systems usually depend on discrete-logarithm assumptions.

## Post-quantum posture

Depends on the family and construction. Many deployed pairing-based SNARKs are quantum-vulnerable. STARK-style systems are often treated as plausibly post-quantum when instantiated with appropriate hash functions. Bulletproof-style systems are usually discrete-logarithm based and therefore quantum-vulnerable.

## Confidence model

Confidence comes from the proof-system assumptions, setup model, and statement design. Pairing-based SNARKs may require trusted or universal setup. STARK-style systems are usually transparent. Bulletproof-style systems avoid trusted setup but still rely on discrete-logarithm assumptions.

## Common constructions

### Concrete systems and families

| System or family | Category | Setup model | Common use | Main caution |
| --- | --- | --- | --- | --- |
| Groth16 | Pairing-based SNARK | Circuit-specific trusted setup | Very small proofs in deployed ZK systems | Setup and circuit specificity dominate confidence. |
| PLONK-style systems | Polynomial-commitment SNARK | Often universal or updatable setup | General-purpose circuits and rollups | Exact assumptions depend on the commitment scheme and transcript design. |
| Marlin / Sonic-style systems | Universal-setup SNARK family | Universal structured setup | General circuits with reusable setup | Setup is reusable but still a setup assumption. |
| STARKs | Transparent proof system | Transparent | Scalable computation proofs | Larger proofs; hash and FRI parameters are security-critical. |
| FRI / DEEP-FRI | Low-degree testing component | Transparent | STARK-style proof systems | It is a component, not the full application statement. |
| Bulletproofs | Inner-product proof system | No trusted setup in common forms | Range proofs and confidential transactions | Discrete-logarithm based and quantum-vulnerable. |
| Halo / Nova-style systems | Accumulation or folding families | Varies | Recursive and incremental proofs | Rapidly evolving; maturity is implementation-specific. |

### Comparison snapshot

| Family | Common strengths | Common trade-offs |
| --- | --- | --- |
| SNARKs | Small proofs and fast verification | Some constructions need trusted setup or pairing assumptions |
| STARKs | Transparent setup and hash-based assumptions | Larger proofs and heavier verification than many SNARKs |
| Bulletproofs | No trusted setup and useful range proofs | Verification can be heavier for large statements |

## Use cases

- zk rollups
- private transactions
- verifiable computation

## Composition patterns

- Proof-family choice changes the whole confidence model.
- Public inputs can reveal identity or linkage.

Common adjacent concepts: [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs), [Range Proofs](/docs/proof-systems/range-proofs), [Trusted Setup](/docs/assumptions/trusted-setup).

## Failure modes and anti-patterns

- Choosing a proof family based only on proof size.
- Treating trusted setup, transparent setup, and universal setup as interchangeable.
- Proving a statement that omits important public inputs.
- Ignoring prover cost, verification cost, and implementation maturity.

## Maturity and deployment

Classified as emerging. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: expert-only. Parameter sensitivity: high.

## Source-depth notes

The families in this page should be read through their concrete construction papers, not only through umbrella terms. Groth16, PLONK, STARK/FRI systems, Bulletproofs, Halo, Nova, lookup arguments, and arithmetization each move assumptions into different places: setup, pairings, hashes, transcript binding, field choice, or circuit correctness.

## Related concepts

- [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs)
- [Range Proofs](/docs/proof-systems/range-proofs)
- [Trusted Setup](/docs/assumptions/trusted-setup)

## Further reading

- Goldwasser, Micali, and Rackoff, [The Knowledge Complexity of Interactive Proof Systems](https://doi.org/10.1137/0218012).
- Groth, [On the Size of Pairing-Based Non-interactive Arguments](https://eprint.iacr.org/2016/260).
- Ben-Sasson et al., [Scalable, transparent, and post-quantum secure computational integrity](https://eprint.iacr.org/2018/046).
- Ben-Sasson et al., [Fast Reed-Solomon Interactive Oracle Proofs of Proximity](https://eccc.weizmann.ac.il/report/2017/134/).
- Bünz et al., [Bulletproofs: Short Proofs for Confidential Transactions and More](https://eprint.iacr.org/2017/1066).
- Gabizon, Williamson, and Ciobotaru, [PLONK](https://eprint.iacr.org/2019/953).
- Bowe, Grigg, and Hopwood, [Halo](https://eprint.iacr.org/2019/1021).
- Kothapalli, Setty, and Tzialla, [Nova](https://eprint.iacr.org/2021/370).
- Gabizon and Williamson, [Plookup](https://eprint.iacr.org/2020/315).
- Electric Coin Company, [The halo2 Book](https://zcash.github.io/halo2/).
- Consensys, [gnark documentation](https://docs.gnark.consensys.io/).
- arkworks contributors, [arkworks ecosystem](https://github.com/arkworks-rs).
- iden3, [Circom documentation](https://docs.circom.io/).
