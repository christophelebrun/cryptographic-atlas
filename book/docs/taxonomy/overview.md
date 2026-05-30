---
title: Taxonomy Overview
type: taxonomy
level: taxonomy
status: draft
last_reviewed: 2026-05-30
difficulty: beginner
maturity: not-applicable
tags:
  - taxonomy
---

# Taxonomy Overview

The atlas organizes cryptographic ideas from desired outcomes to system patterns:

```text
Security goals -> assumptions -> primitives -> structured primitives -> proof systems -> protocols -> systems -> design patterns
```

This ordering prevents a common mistake: starting with a fashionable tool before stating the problem, the adversary, and the assumptions.

## Taxonomy table

| Level | Question it answers | Examples |
| --- | --- | --- |
| Security goal | What property do we want? | confidentiality, integrity, anonymity, unlinkability |
| Assumption or substrate | What must be hard, trusted, or available? | discrete logarithm, lattices, pairings, random oracle model |
| Basic primitive | What small building block provides a narrow guarantee? | hash function, commitment, digital signature |
| Structured primitive | What extra algebraic or access structure is useful? | homomorphic encryption, threshold cryptography, VDF |
| Proof system | How can a party prove a statement without revealing too much? | zero-knowledge proof, range proof, membership proof |
| Protocol | How do parties interact to achieve a goal? | MPC, secure aggregation, mixnet |
| System or application | What user-facing application combines many tools? | e-voting, private DAO voting, anonymous airdrop |
| Design pattern | What reusable composition pattern appears across systems? | anonymous membership, delayed reveal, anti-double-use nullifiers |

## Cross-cutting classifications

Two classifications cut across the taxonomy:

- [Post-quantum posture](/docs/appendices/post-quantum-posture): whether a construction is vulnerable, plausibly post-quantum, dependent on instantiation, unknown, or not applicable.
- [Confidence models](/docs/appendices/confidence-models): where confidence comes from, such as public verification, one honest party, `t-of-n` threshold assumptions, honest majority, non-collusion, or a trusted issuer.

## Why the levels matter

Each level has different failure modes. A primitive can be mathematically sound and still be used in a protocol that leaks metadata. A protocol can satisfy a narrow model and still fail inside a product because enrollment, timing, recovery, or coercion was ignored.

## Practical workflow

When evaluating a design, ask:

1. What security goals are claimed?
2. What assumptions make those goals plausible?
3. Which primitives and protocols provide the claimed properties?
4. Which properties are missing?
5. What happens when the components are composed?

## Further reading

- TODO: Add verified sources on applied cryptography taxonomies.
