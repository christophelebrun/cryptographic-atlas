---
title: Proof Systems Overview
type: primitive
level: proof-system
template: overview
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - proof-systems
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Proof Systems Overview

Proof systems let a prover convince a verifier that a statement is true. Some proof systems also hide the witness.

## Examples

- Zero-knowledge proofs hide witnesses.
- Range proofs show a hidden value is within bounds.
- Membership proofs show inclusion in a set.
- SNARKs, STARKs, and Bulletproofs are proof-system families with different trade-offs.

## Reading rule

Always identify the statement, the witness, public inputs, setup assumptions, verifier cost, prover cost, and metadata leaks.
