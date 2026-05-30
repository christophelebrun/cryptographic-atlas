---
title: Range Proofs
type: primitive
level: proof-system
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: mature
tags:
  - range-proofs
---

# Range Proofs

## One-sentence intuition

A range proof shows that a hidden value lies within an allowed interval.

## Why it matters

Hidden values can be invalid. In private payments, a value may need to be non-negative. In voting, a ballot may need to be one of a small set of choices.

The typical statement is that a hidden value lies in a public interval:

$$
m \in [0, 2^k - 1]
$$

When the value is inside a commitment, the proof should be bound to that exact commitment:

$$
C = \operatorname{Commit}(m; r)
$$

## Post-quantum posture

Depends on the proof system and commitment scheme. Bulletproof-style range proofs are usually discrete-logarithm based and quantum-vulnerable; hash-based or STARK-style approaches may be plausibly post-quantum if the full construction supports the required statement.

## Confidence model

Confidence comes from public verification of the range statement, the soundness of the proof system, and correct binding to the commitment or ciphertext being constrained.

## What it does not provide

- Authentication.
- Correct tallying by itself.
- Protection against metadata leaks.
- A guarantee that the range was the right policy choice.

## Use cases

- Confidential transactions.
- Private voting.
- Rate limits.
- Private statistics.

## Failure modes

- Proving the wrong bound.
- Ignoring overflow or field wraparound.
- Failing to bind the proof to the correct commitment or context.

## Further reading

- TODO: Add verified references for range proof constructions.
