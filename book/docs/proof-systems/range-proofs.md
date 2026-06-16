---
title: Range Proofs
type: primitive
level: proof-system
template: concept
status: current
last_reviewed: '2026-06-04'
review:
  structural:
    status: current
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: intermediate
maturity: mature
tags:
  - range-proofs
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Range Proofs

## One-sentence intuition

A range proof shows that a hidden value lies within an allowed interval.

## Where it sits in the taxonomy

- Level: proof-system
- Parent category: proof-system
- Related concepts: [Pedersen Commitments](/docs/primitives/pedersen-commitments), [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs), [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs)

## Problem it solves

Hidden values can be invalid. In private payments, a value may need to be non-negative. In voting, a ballot may need to be one of a small set of choices.

The typical statement is that a hidden value lies in a public interval:

$$
m \in [0, 2^k - 1]
$$

When the value is inside a commitment, the proof should be bound to that exact commitment:

$$
C = \operatorname{Commit}(m; r)
$$

## Mental model

Think of proving a sealed number is between two bounds without revealing the number.

## Minimal example

A private payment proves the committed amount is non-negative and below 2^64 without revealing the amount.

## Security properties

- value validity
- soundness
- zero knowledge depending on construction

## What it does not provide

- Authentication.
- Correct tallying by itself.
- Protection against metadata leaks.
- A guarantee that the range was the right policy choice.

## Assumptions

The proof system must be sound, the proof must be bound to the exact commitment or ciphertext, and the range must be encoded without field wraparound or overflow ambiguity.

## Post-quantum posture

Depends on the proof system and commitment scheme. Bulletproof-style range proofs are usually discrete-logarithm based and quantum-vulnerable; hash-based or STARK-style approaches may be plausibly post-quantum if the full construction supports the required statement.

## Confidence model

Confidence comes from public verification of the range statement, the soundness of the proof system, and correct binding to the commitment or ciphertext being constrained.

## Common constructions

### Concrete schemes and families

| Scheme or family | Commitment/proof base | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| Bulletproof range proofs | Pedersen commitments plus inner-product arguments | Confidential transactions and hidden balances | No trusted setup in common forms, but discrete-logarithm based and quantum-vulnerable. |
| Boudot-style interval proofs | Integer commitments | Earlier range-proof constructions | Useful historically; parameter and efficiency trade-offs differ from Bulletproofs. |
| SNARK-based range proofs | Groth16, PLONK-style systems | Validity proofs inside larger circuits | Compact verification, but setup and statement correctness matter. |
| STARK-based range checks | STARK constraints and lookups | Transparent proof systems | Plausibly post-quantum when the full stack is; proof size and constraint design matter. |
| Lookup-based range checks | Plookup-style tables or custom lookup arguments | Modern circuit systems | Efficient for bounded values, but table binding and field encoding must be explicit. |

## Use cases

- Confidential transactions.
- Private voting.
- Rate limits.
- Private statistics.

## Composition patterns

- The proved interval must match the application policy.
- Arithmetic domains and overflows must be explicit.

Common adjacent concepts: [Pedersen Commitments](/docs/primitives/pedersen-commitments), [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs), [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs).

## Failure modes and anti-patterns

- Proving the wrong bound.
- Ignoring overflow or field wraparound.
- Failing to bind the proof to the correct commitment or context.

## Maturity and deployment

Classified as mature. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: expert-only. Parameter sensitivity: high.

## Related concepts

- [Pedersen Commitments](/docs/primitives/pedersen-commitments)
- [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs)
- [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs)

## Further reading

- Bünz et al., [Bulletproofs: Short Proofs for Confidential Transactions and More](https://eprint.iacr.org/2017/1066).
- Boudot, [Efficient Proofs that a Committed Number Lies in an Interval](https://doi.org/10.1007/3-540-46588-8_13).
