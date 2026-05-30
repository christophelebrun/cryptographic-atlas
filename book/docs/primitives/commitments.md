---
title: Commitments
type: primitive
level: basic-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: beginner
maturity: mature
tags:
  - commitments
  - hiding
  - binding
post_quantum_posture: depends
confidence_model:
  type: mathematical-assumption
---

# Commitments

## One-sentence intuition

A commitment lets someone lock in a value now and reveal it later.

## Where it sits in the taxonomy

- Level: basic primitive
- Parent category: primitives
- Related concepts: hash functions, Pedersen commitments, zero-knowledge proofs

## Problem it solves

Commitments solve the problem of delayed disclosure. A party can choose a value, publish evidence that the value has been fixed, and later open the commitment so others can check that the value did not change.

## Mental model

Think of placing a message in a locked box and publishing the box. Later, the sender opens the box. A good commitment hides the message while the box is locked and prevents the sender from opening the same box to a different message.

## Minimal example

A simple hash commitment can look like:

$$
c = H(m \,\|\, r)
$$

The opening is the pair $(m, r)$.

The verifier recomputes the hash during opening and checks that it matches the published commitment.

More abstractly, a commitment scheme has two operations:

$$
c \leftarrow \operatorname{Commit}(m; r)
$$

$$
\operatorname{Open}(c, m, r) \in \{\mathsf{accept}, \mathsf{reject}\}
$$

## Security properties

- Hiding: the commitment should not reveal the committed value before opening.
- Binding: the committer should not be able to open the same commitment to two different values.

Some schemes are computationally hiding or binding; others are perfectly hiding or binding under their model.

## What it does not provide

- Authentication of the committer.
- Proof that the committed value is valid.
- Confidentiality after the opening is revealed.
- Protection against weak randomness.
- Agreement about when openings are allowed.

## Assumptions

Hash commitments usually rely on properties of the hash function and sufficient randomness. Pedersen commitments rely on group assumptions and generator choices.

## Post-quantum posture

Depends on the construction. Hash-based commitments can be plausibly post-quantum with appropriate hash choices and parameters. Pedersen commitments and other discrete-logarithm-based commitments are quantum-vulnerable.

## Confidence model

Confidence comes from the hiding and binding assumptions of the concrete commitment scheme, plus correct randomness and unambiguous opening rules. A commitment does not identify the committer unless authentication is added.

## Common constructions

- Hash-based commitments.
- Pedersen commitments.
- Merkle tree commitments to many values.

## Use cases

- Commit-reveal protocols.
- Private voting and delayed ballot reveal.
- Range proofs and confidential transactions.
- Randomness beacons and fair ordering protocols.

## Composition patterns

Commitments are often combined with zero-knowledge proofs to prove facts about a hidden value without opening it. They are also used with signatures when a system must bind a commitment to an authenticated party.

## Failure modes and anti-patterns

- Reusing or choosing predictable randomness can expose the committed value.
- Forgetting authentication allows anyone to submit a commitment.
- Treating a commitment as encryption confuses delayed disclosure with recipient-controlled confidentiality.
- Opening rules can be abused if the protocol does not define deadlines and abort handling.

## Maturity and deployment

Commitments are mature and widely used, but concrete schemes still depend on careful parameter choices and protocol context.

## Related concepts

- [Pedersen commitments](/docs/primitives/pedersen-commitments)
- [Zero-knowledge proofs](/docs/proof-systems/zero-knowledge-proofs)
- [Private aggregation](/docs/design-patterns/private-aggregation)

## Further reading

- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
- Pedersen, "Non-Interactive and Information-Theoretic Secure Verifiable Secret Sharing."
