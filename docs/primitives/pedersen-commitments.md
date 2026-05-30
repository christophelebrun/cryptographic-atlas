---
title: Pedersen Commitments
type: primitive
level: structured-primitive
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: mature
tags:
  - commitments
  - homomorphic-commitments
  - discrete-logarithm
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

```text
C = g^m h^r
```

Here `m` is the message, `r` is randomness, and `g` and `h` are group generators. The opening is `m, r`.

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

## Common constructions

Pedersen commitments are usually instantiated in elliptic curve or finite-field groups. Concrete deployments must choose parameters and libraries carefully.

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

- TODO: Add verified references for Pedersen commitments and confidential transaction usage.
