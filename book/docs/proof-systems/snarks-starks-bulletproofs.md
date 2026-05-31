---
title: SNARKs, STARKs, and Bulletproofs
type: primitive
level: proof-system
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: emerging
tags:
  - snarks
  - starks
  - bulletproofs
post_quantum_posture: depends
confidence_model:
  type: depends
---

# SNARKs, STARKs, and Bulletproofs

## One-sentence intuition

SNARKs, STARKs, and Bulletproofs are families of proof systems that package zero-knowledge or succinct verification with different costs and assumptions.

## Comparison snapshot

| Family | Common strengths | Common trade-offs |
| --- | --- | --- |
| SNARKs | Small proofs and fast verification | Some constructions need trusted setup or pairing assumptions |
| STARKs | Transparent setup and hash-based assumptions | Larger proofs and heavier verification than many SNARKs |
| Bulletproofs | No trusted setup and useful range proofs | Verification can be heavier for large statements |

## Concrete systems and families

| System or family | Category | Setup model | Common use | Main caution |
| --- | --- | --- | --- | --- |
| Groth16 | Pairing-based SNARK | Circuit-specific trusted setup | Very small proofs in deployed ZK systems | Setup and circuit specificity dominate confidence. |
| PLONK-style systems | Polynomial-commitment SNARK | Often universal or updatable setup | General-purpose circuits and rollups | Exact assumptions depend on the commitment scheme and transcript design. |
| Marlin / Sonic-style systems | Universal-setup SNARK family | Universal structured setup | General circuits with reusable setup | Setup is reusable but still a setup assumption. |
| STARKs | Transparent proof system | Transparent | Scalable computation proofs | Larger proofs; hash and FRI parameters are security-critical. |
| FRI / DEEP-FRI | Low-degree testing component | Transparent | STARK-style proof systems | It is a component, not the full application statement. |
| Bulletproofs | Inner-product proof system | No trusted setup in common forms | Range proofs and confidential transactions | Discrete-logarithm based and quantum-vulnerable. |
| Halo / Nova-style systems | Accumulation or folding families | Varies | Recursive and incremental proofs | Rapidly evolving; maturity is implementation-specific. |

## Post-quantum posture

Depends on the family and construction. Many deployed pairing-based SNARKs are quantum-vulnerable. STARK-style systems are often treated as plausibly post-quantum when instantiated with appropriate hash functions. Bulletproof-style systems are usually discrete-logarithm based and therefore quantum-vulnerable.

## Confidence model

Confidence comes from the proof-system assumptions, setup model, and statement design. Pairing-based SNARKs may require trusted or universal setup. STARK-style systems are usually transparent. Bulletproof-style systems avoid trusted setup but still rely on discrete-logarithm assumptions.

## What it does not provide

- A correct statement automatically.
- Metadata privacy.
- Protection against implementation bugs.
- A complete protocol.

## Assumptions

Assumptions are family-specific: pairing-based SNARKs often depend on elliptic-curve and setup assumptions, STARK-style systems typically depend on hash choices and transparent protocols, and Bulletproof-style systems usually depend on discrete-logarithm assumptions.

## Failure modes and anti-patterns

- Choosing a proof family based only on proof size.
- Treating trusted setup, transparent setup, and universal setup as interchangeable.
- Proving a statement that omits important public inputs.
- Ignoring prover cost, verification cost, and implementation maturity.

## Further reading

- Ben-Sasson et al., "Scalable, transparent, and post-quantum secure computational integrity."
- Bünz et al., "Bulletproofs: Short Proofs for Confidential Transactions and More."
- Goldwasser, Micali, and Rackoff, "The Knowledge Complexity of Interactive Proof Systems."
