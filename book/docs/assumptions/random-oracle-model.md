---
title: Random Oracle Model
type: assumption
level: mathematical-assumption
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: mature
tags:
  - assumptions
  - random-oracle-model
  - hashing
post_quantum_posture: not-applicable
confidence_model:
  type: mathematical-assumption
---

# Random Oracle Model

## One-sentence intuition

The random oracle model treats a hash function as an ideal public random function inside a security proof.

## Where it sits in the taxonomy

- Level: mathematical assumption or model
- Parent category: assumptions
- Related concepts: hash functions, Fiat-Shamir transforms, zero-knowledge proofs

## Problem it solves

The model lets designers prove security for efficient protocols that use hash functions as if every new query returned an independent random value.

## Mental model

Imagine a public notebook that answers every new input with a fresh random-looking output and always repeats the same answer for the same input.

## Minimal example

A protocol proof may analyze calls to an ideal oracle:

$$
y \leftarrow \mathcal{H}(x)
$$

In implementation, the oracle is replaced with a concrete hash function such as SHA-2, SHA-3, or a proof-system-specific hash.

## Security properties

- Supports security arguments for many practical hash-based transforms.
- Helps model Fiat-Shamir-style challenge generation.

## What it does not provide

- A guarantee that any concrete hash exactly behaves like a random oracle.
- Protection against bad domain separation.
- A substitute for checking the implemented statement or protocol context.

## Assumptions

The proof assumes ideal random-oracle behavior. The implementation assumes the chosen hash function and domain separation are good enough for the intended security target.

## Post-quantum posture

Not applicable to the model itself. Concrete hash functions can be plausibly post-quantum with adequate output lengths, while the protocol's surrounding assumptions may not be.

## Confidence model

Confidence comes from the proof model, conservative hash selection, domain separation, and awareness that the model is idealized.

## Common constructions

- Fiat-Shamir transforms.
- Hash-and-sign style designs.
- Non-interactive proof systems.
- Hash-based commitments and nullifiers.

## Concrete instantiations

| Concrete choice | Typical role | Key differences and cautions |
| --- | --- | --- |
| SHA-256 / SHA-512 | General random-oracle-like hashing in protocols | Conservative deployed choices, but domain labels and transcript encodings are still required. |
| SHA3 and SHAKE | Random-oracle-like hashing and extendable output | Variable output from SHAKE must be treated as a parameter, not an afterthought. |
| Hash-to-curve suites | Mapping arbitrary strings into elliptic-curve groups | Needs standardized encodings; ad hoc mappings can bias outputs or break proofs. |
| Poseidon / Rescue / MiMC | Proof-system-specific hashes in circuits | Chosen for circuit efficiency; the security argument is tied to the proof-system context. |
| Fiat-Shamir transcripts | Challenge derivation for non-interactive proofs | Transcript encoding must bind statements, public inputs, protocol version, and domain. |

## Use cases

- Security proofs for practical protocols.
- Challenge derivation.
- Transcript binding.

## Composition patterns

Random-oracle-model arguments often appear with zero-knowledge proofs, signatures, commitments, and protocol transcripts. The same hash function should be domain-separated across roles.

## Failure modes and anti-patterns

- Treating a random-oracle proof as an implementation proof for every hash.
- Reusing transcript encodings ambiguously.
- Omitting domain labels.
- Confusing the model with a concrete primitive.

## Maturity and deployment

Mature as a proof model, but idealized. It should be named explicitly when a construction relies on it.

## Related concepts

- [Hash functions](/docs/primitives/hash-functions)
- [Zero-knowledge proofs](/docs/proof-systems/zero-knowledge-proofs)
- [Commitments](/docs/primitives/commitments)

## Further reading

- Bellare and Rogaway, "Random Oracles are Practical; A Paradigm for Designing Efficient Protocols."
- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
