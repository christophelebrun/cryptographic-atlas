---
title: Private Aggregation
type: pattern
level: design-pattern
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
  - aggregation
  - privacy
  - voting
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Private Aggregation

## One-sentence intuition

Private aggregation reveals a combined result without revealing each participant's individual value.

## Where it sits in the taxonomy

- Level: design-pattern
- Parent category: design-pattern
- Related concepts: [Secure Aggregation](/docs/protocols/secure-aggregation), [Homomorphic Encryption](/docs/structured-primitives/homomorphic-encryption), [MPC](/docs/protocols/mpc)

## Problem it solves

Applications often need totals or statistics without collecting each participant's raw value. Private aggregation focuses on revealing only the combined result and managing what the aggregate, failures, and side channels still leak.

## Mental model

Think of private aggregation as a narrow building block whose guarantee must be composed with the rest of the system.

## Minimal example

A system uses private aggregation for one explicit role and handles authentication, metadata, and operational policy separately.

In a private poll, each voter submits an encrypted vote. The system combines encrypted votes and decrypts only the final tally.

If participant `i` holds a private value $x_i$, the system may reveal only the aggregate:

$$
T = \sum_{i=1}^{n} x_i
$$

The privacy goal is to reveal $T$ without revealing the individual values $x_1, \ldots, x_n$.

## Security properties

- Individual input privacy, under the chosen model.
- Aggregate correctness, if inputs are valid and the protocol completes.
- Limited disclosure of the final aggregate.

## What it does not provide

- Privacy for very small groups.
- Protection against differencing attacks across repeated queries.
- Proof that inputs are valid unless validity checks are added.
- Protection against metadata leaks.
- Coercion resistance in voting contexts.

## Assumptions

Assumptions vary by construction: encryption keys, threshold decryption, honest-majority assumptions, dropout handling, authenticated participants, and zero-knowledge proofs for input validity may all be required.

## Post-quantum posture

Not applicable to the pattern by itself. The posture is inherited from the aggregation mechanism, authentication, proof system, transport, and key-management layers.

## Confidence model

Confidence may come from threshold decryption, non-colluding helper servers, honest-majority MPC, or public verification of encrypted inputs. The page for a concrete design should state which model is being used.

## Common constructions

### Approaches

| Approach | Useful when | Main risk |
| --- | --- | --- |
| Homomorphic encryption | A public aggregator should combine ciphertexts | Key management and invalid inputs |
| Homomorphic commitments | Values need binding plus additive structure | Requires proofs that values are valid |
| Multi-party computation (MPC) | No single party should see inputs | Assumptions about parties and availability |
| Secure aggregation | Many clients report statistics | Dropout, malicious clients, and small groups |

### Concrete compositions

| Composition | Typical role | Main caution |
| --- | --- | --- |
| Paillier-style or additive homomorphic encryption tally | Simple encrypted sums in legacy or specialized systems | Quantum-vulnerable and key-management-heavy; validity proofs are still required. |
| Lattice HE tally | Post-quantum-oriented encrypted aggregation | Parameter choice and output leakage dominate practical risk. |
| Bonawitz-style secure aggregation | Federated learning and telemetry | Dropout handling, cohort size, and malicious updates are the main failure points. |
| Prio-style private telemetry | Aggregate statistics with validity checks | Requires a validation mechanism so clients cannot poison aggregates. |
| MPC-based aggregation | Multi-server or multi-party analytics | Collusion threshold and abort behavior must be explicit. |

## Use cases

- Voting and polling.
- Private telemetry.
- Private statistics.
- Federated analytics.
- Confidential financial sums.

## Composition patterns

Private aggregation is often combined with range proofs, membership proofs, rate limits, threshold decryption, or differential privacy.

## Failure modes and anti-patterns

- Aggregates over tiny groups reveal individuals.
- Repeated aggregates allow differencing attacks.
- Malicious users submit invalid or extreme values.
- A decryptor quorum can collude or lose keys.
- Metadata reveals who participated and when.

A differencing attack appears when two aggregates differ by one participant:

$$
x_j = T(S \cup \{j\}) - T(S)
$$

This is why query design, cohort size, and repeated releases matter.

## Maturity and deployment

The pattern is mature, but concrete systems range from well deployed to experimental depending on scale, threat model, and implementation.

## Related concepts

- [Homomorphic encryption](/docs/structured-primitives/homomorphic-encryption)
- [Secure aggregation](/docs/protocols/secure-aggregation)
- [Private set intersection](/docs/protocols/private-set-intersection)
- [Private DAO voting](/docs/systems-and-applications/private-dao-voting)

## Further reading

- Bonawitz et al., [Practical Secure Aggregation for Privacy-Preserving Machine Learning](https://research.google/pubs/practical-secure-aggregation-for-privacy-preserving-machine-learning/).
- Gentry, [Fully Homomorphic Encryption Using Ideal Lattices](https://doi.org/10.1145/1536414.1536440).
- Benaloh, [Verifiable Secret-Ballot Elections](https://www.microsoft.com/en-us/research/publication/verifiable-secret-ballot-elections/).
