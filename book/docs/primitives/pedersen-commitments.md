---
title: Pedersen Commitments
type: primitive
level: structured-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - commitments
  - homomorphic-commitments
  - discrete-logarithm
post_quantum_posture: vulnerable
confidence_model:
  type: mathematical-assumption
---

# Pedersen Commitments

## One-sentence intuition

A Pedersen commitment hides a value while preserving additive structure.

## Where it sits in the taxonomy

- Level: structured primitive
- Parent category: commitments
- Related concepts: commitments, homomorphic commitments, range proofs

## Problem it solves

Pedersen commitments let a system commit to numeric values and later use algebraic relationships between commitments. This is useful when a protocol needs to keep values hidden while proving or aggregating relationships about them.

## Mental model

The commitment mixes the message with a private random mask. Observers see a group element that looks randomized, while the committer can later reveal both the value and the mask.

## Minimal example

A common notation is:

$$
C = g^m h^r
$$

Here `m` is the message, `r` is randomness, and `g` and `h` are group generators. The opening is `m, r`.

The additive structure appears when two commitments are combined:

$$
C_1 \cdot C_2 = g^{m_1 + m_2}h^{r_1 + r_2}
$$

Inline notation also works: $C = g^m h^r$.

## Security properties

- Hiding: if `r` is random and secret, the commitment hides `m`.
- Binding: under discrete logarithm assumptions, a committer should not be able to open one commitment to two different messages.
- Additive homomorphism: multiplying commitments corresponds to adding their committed values.

## What it does not provide

- Authentication.
- Proof that `m` is in an allowed range.
- Protection if randomness is reused, predictable, or revealed.
- Binding if the discrete logarithm relationship between `g` and `h` is known to the committer.

## Assumptions

Pedersen commitments depend on a suitable group where discrete logarithms are hard and on safe generation of independent generators. The randomness must be sampled correctly and kept secret until opening.

## Post-quantum posture

Vulnerable. Standard Pedersen commitments rely on discrete-logarithm hardness, so they should not be treated as post-quantum commitments.

## Confidence model

Confidence comes from the group assumption, independent public generator setup, and correct randomness. Binding can fail if a party knows the discrete-logarithm relation between the generators. Hiding can fail if randomness is reused, predictable, or revealed.

## Common constructions

Pedersen commitments are usually instantiated in elliptic curve or finite-field groups. Concrete deployments must choose parameters and libraries carefully.

## Concrete instantiations

| Instantiation | Common setting | Key differences and cautions |
| --- | --- | --- |
| Elliptic-curve Pedersen commitments | Confidential transactions, range proofs, ZK protocols | Efficient and common; curve choice, generator derivation, and subgroup handling matter. |
| Finite-field Pedersen commitments | Older protocols and threshold/verifiable secret sharing | Same discrete-logarithm posture, but parameter sizes and subgroup checks differ. |
| Pedersen vector commitments | Commit to several values with independent generators | Useful for proving linear relations; binding depends on no party knowing generator relations. |
| Bulletproof-style commitments | Range proofs and confidential amounts | Often built over Pedersen commitments; range proofs are needed to prevent overflow or negative-value attacks. |

## Use cases

- Confidential transactions.
- Range proofs.
- Private tallying.
- Commitments inside zero-knowledge proof systems.

## Composition patterns

Pedersen commitments are often paired with range proofs to show that hidden values are non-negative or within a bound. They can also support private tallying because commitments to individual votes can be combined into a commitment to the total.

## Failure modes and anti-patterns

- Bad randomness can reveal values or allow linkage.
- Reusing randomness across commitments can leak relationships between messages.
- Unknown generator setup can break binding if a party knows the relation between generators.
- Homomorphism can be dangerous if a protocol forgets to constrain values with range proofs.

## Maturity and deployment

Pedersen commitments are mature but should be used through well-reviewed libraries and protocol designs.

## Related concepts

- [Commitments](/docs/primitives/commitments)
- [Range proofs](/docs/proof-systems/range-proofs)
- [Private aggregation](/docs/design-patterns/private-aggregation)

## Further reading

- Pedersen, "Non-Interactive and Information-Theoretic Secure Verifiable Secret Sharing."
- Bünz et al., "Bulletproofs: Short Proofs for Confidential Transactions and More."
