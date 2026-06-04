---
title: Trusted Setup
type: assumption
level: mathematical-assumption
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - assumptions
  - trusted-setup
  - proof-systems
post_quantum_posture: depends
confidence_model:
  type: trusted-setup
---

# Trusted Setup

## One-sentence intuition

Trusted setup is a parameter-generation process whose hidden secrets must be destroyed or never known for the resulting system to be sound or private.

## Where it sits in the taxonomy

- Level: setup or trust assumption
- Parent category: assumptions
- Related concepts: SNARKs, pairings, common reference strings, public verifiability

## Problem it solves

Some efficient proof systems and commitments need structured public parameters. A setup process creates those parameters, but the security model must say what hidden setup material could break the system if retained.

## Mental model

Think of forging a lock with a temporary master key. The lock can be public, but the temporary master key must be destroyed; otherwise whoever keeps it may forge openings or proofs.

## Minimal example

A setup ceremony may output public parameters:

$$
\mathsf{pp} \leftarrow \operatorname{Setup}(\lambda)
$$

The dangerous part is any hidden trapdoor or toxic waste used to create $\mathsf{pp}$.

## Security properties

- Enables compact or efficient proof systems in some families.
- Can support public verification if setup assumptions hold.

## What it does not provide

- Trustlessness.
- Protection if all ceremony participants collude or the trapdoor remains.
- A guarantee that the statement being proven is correct.

## Assumptions

The setup ceremony, transcript, randomness contributions, and software environment must match the construction's assumptions. Multi-party ceremonies often rely on at least one honest participant destroying their secret contribution.

## Post-quantum posture

Depends on the construction. Many trusted-setup systems are pairing-based and quantum-vulnerable; the setup model itself is a trust assumption rather than a post-quantum primitive.

## Confidence model

Confidence comes from trusted-setup or one-honest-party ceremony assumptions, transcript auditability, implementation review, and public verification of parameters.

## Common constructions

- Structured reference strings.
- Powers-of-tau style ceremonies.
- Circuit-specific or universal SNARK setup.
- Multi-party parameter-generation ceremonies.

## Concrete setup patterns

| Setup pattern | Common examples | Key differences and cautions |
| --- | --- | --- |
| Circuit-specific setup | Groth16-style circuits | Small proofs, but every circuit may need its own setup assumptions. |
| Universal structured setup | Powers-of-tau, PLONK-style SRS reuse | Can support many circuits up to parameter limits; toxic waste and transcript audit remain central. |
| Transparent setup | STARK-style systems, many Bulletproof-style systems | Avoids trusted toxic waste, but still has parameters and implementation assumptions. |
| Updatable ceremonies | Multi-party SRS updates | Often rely on at least one honest contribution; update verification must be public. |
| Application-specific parameters | KZG commitments, accumulator parameters | Reusing parameters outside their intended scope can invalidate the confidence model. |

## Use cases

- Pairing-based SNARKs.
- Polynomial commitments.
- Some anonymous credential or accumulator systems.

## Composition patterns

Trusted setup is commonly combined with public verifiability: anyone can verify proofs after setup, but only if the setup assumptions are accepted.

## Failure modes and anti-patterns

- Hiding the setup assumption from users.
- Losing ceremony transcripts.
- Treating "multi-party setup" as equivalent to no setup.
- Reusing parameters outside their intended scope.

## Maturity and deployment

Mature but specialized. Setup ceremonies are deployed in some proof-system ecosystems, but they remain a major confidence-model component.

## Related concepts

- [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs)
- [Pairings](/docs/assumptions/pairings)
- [Confidence models](/docs/appendices/confidence-models)

## Further reading

- Groth, "On the Size of Pairing-Based Non-interactive Arguments."
- Bowe, Gabizon, and Miers, "Scalable Multi-party Computation for zk-SNARK Parameters in the Random Beacon Model."
