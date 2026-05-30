---
title: Homomorphic Commitments
type: primitive
level: structured-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: mature
tags:
  - commitments
  - homomorphic
post_quantum_posture: vulnerable
confidence_model:
  type: mathematical-assumption
---

# Homomorphic Commitments

## One-sentence intuition

A homomorphic commitment lets commitments be combined in ways that correspond to operations on the hidden values.

## Use cases

- Confidential sums.
- Private tallying.
- Range proof systems.

## What it does not provide

- Proof that hidden values are in a valid range.
- Authentication.
- Protection against maliciously crafted commitments without additional checks.

## Assumptions

The commitment scheme must retain its hiding and binding properties under the allowed homomorphic operation, and the surrounding protocol must define the arithmetic domain being committed to.

## Post-quantum posture

Depends on the construction. Pedersen-style homomorphic commitments are quantum-vulnerable because they rely on discrete logarithms. Other commitment families need separate classification.

## Confidence model

Confidence comes from the commitment binding and hiding assumptions plus explicit constraints on the hidden arithmetic domain. Homomorphic structure is useful only when invalid values are ruled out elsewhere.

## Failure modes and anti-patterns

Homomorphism can let invalid values cancel or wrap unless the protocol adds range proofs and clear arithmetic domains.

## Further reading

- Torben Pryds Pedersen, "Non-Interactive and Information-Theoretic Secure Verifiable Secret Sharing."
- [Pedersen commitments](/docs/primitives/pedersen-commitments)
