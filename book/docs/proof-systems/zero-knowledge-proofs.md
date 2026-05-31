---
title: Zero-Knowledge Proofs
type: primitive
level: proof-system
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: beginner
maturity: mature
tags:
  - zero-knowledge
  - proof-systems
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Zero-Knowledge Proofs

## One-sentence intuition

A zero-knowledge proof lets one party prove that a statement is true without revealing the secret information that makes it true.

## Where it sits in the taxonomy

- Level: proof system
- Parent category: proof systems
- Related concepts: SNARKs, STARKs, Bulletproofs, range proofs, membership proofs

## Problem it solves

Zero-knowledge proofs (ZKPs) are useful when a verifier needs confidence in a claim but should not learn the private witness behind the claim.

![Zero-knowledge proof flow](/img/diagrams/zero-knowledge-proof-flow.svg)

## Statement vs witness

The statement is the public claim being proven. The witness is the private information that makes the statement true.

Many proof systems can be read as proving that there exists a private witness `w` such that a public relation accepts the public statement `x`:

$$
\exists w : R(x, w) = 1
$$

The verifier should learn that this relation is satisfied, not the witness itself.

Examples:

| Statement | Witness |
| --- | --- |
| This commitment contains a number between 0 and 100 | The committed number and randomness |
| I know a credential signed by an issuer | The credential and secret key |
| This encrypted vote is one of the allowed choices | The plaintext vote and encryption randomness |

## Core properties

- Completeness: honest proofs for true statements verify.
- Soundness: false statements should not verify except with negligible probability.
- Zero-knowledge: the proof should not reveal the witness beyond the truth of the statement.

## What ZKPs do

- Prove membership in a set without revealing which member, depending on the construction.
- Prove that a hidden value is in a valid range.
- Prove that a vote, transaction, or credential use follows specified rules.
- Reduce trust in validators who would otherwise need to inspect private data.

## What ZKPs do not provide

- Encryption of arbitrary data.
- Network anonymity.
- Protection against metadata leaks.
- A complete protocol by themselves.
- Safety if the statement being proven is the wrong statement.
- Protection against a compromised witness.

## Family vs concrete proof systems

"Zero-knowledge proof" is a broad family. SNARKs, STARKs, and Bulletproofs are concrete proof-system families with different trade-offs in proof size, verifier cost, prover cost, setup assumptions, post-quantum posture, and implementation maturity.

## Concrete proof-system families

| Family or scheme | Setup model | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| Sigma protocols | Often interactive or Fiat-Shamir transformed | Knowledge proofs and identification-style protocols | Simple building blocks; transcript binding controls non-interactive security. |
| Groth16 | Circuit-specific trusted setup | Very small proofs and fast verification | Pairing-based and quantum-vulnerable; setup is tied to the circuit. |
| PLONK-style systems | Often universal/updatable setup | General-purpose SNARK proving stacks | More flexible setup than Groth16-style systems, but assumptions and arithmetization choices vary. |
| STARKs | Transparent setup | Scalable transparent proofs | Usually hash-based and plausibly post-quantum; proofs are larger than many SNARKs. |
| Bulletproofs | No trusted setup in common forms | Range proofs and inner-product statements | Discrete-logarithm based and quantum-vulnerable; verification cost grows with statement size. |
| Folding and accumulation systems | Varies by construction | Recursive proofs and incremental verifiable computation | Maturity and assumptions are construction-specific; do not treat all folding schemes as interchangeable. |

## Minimal examples

- Membership: prove a secret appears in a committed list without revealing which entry.
- Valid vote: prove an encrypted ballot encodes one allowed choice.
- Range proof: prove a hidden amount is non-negative and below a limit.

## Assumptions

Assumptions vary by proof system. Some systems require trusted setup, some rely on hash functions, some rely on elliptic curve assumptions, and some are designed around transparent setup.

## Post-quantum posture

Depends on the proof system. Hash-based transparent systems such as many STARK-style systems are commonly treated as plausibly post-quantum, while many pairing-based SNARKs and discrete-logarithm-based range proofs are quantum-vulnerable.

## Confidence model

Confidence comes from three layers: the proof-system assumptions, the correctness of the statement being proven, and the setup model. A proof can verify correctly while still proving the wrong statement for the application.

## Failure modes and anti-patterns

- Proving a weak statement that does not match the system's real security goal.
- Ignoring public inputs that leak identity or linkage.
- Reusing witnesses, nullifiers, or randomness in linkable ways.
- Treating a proof system as a complete privacy protocol.
- Deploying research-stage proving systems without expert review.

## Maturity and deployment

ZKPs are a mature field, but concrete systems vary from widely deployed to research-stage. Maturity must be evaluated per construction and implementation.

## Related concepts

- [Range proofs](/docs/proof-systems/range-proofs)
- [Membership proofs](/docs/proof-systems/membership-proofs)
- [Nullifiers](/docs/protocols/nullifiers)

## Further reading

- Goldwasser, Micali, and Rackoff, "The Knowledge Complexity of Interactive Proof Systems."
- Ben-Sasson et al., "Scalable, transparent, and post-quantum secure computational integrity."
- Bünz et al., "Bulletproofs: Short Proofs for Confidential Transactions and More."
