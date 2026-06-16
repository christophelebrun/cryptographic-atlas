---
title: Proof Systems Overview
type: primitive
level: proof-system
template: overview
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
- Proof-system components include [FRI](/docs/proof-systems/fri), [folding schemes](/docs/proof-systems/folding-schemes), [recursive proofs](/docs/proof-systems/recursive-proofs), [lookup arguments](/docs/proof-systems/lookup-arguments), [sumcheck](/docs/proof-systems/sumcheck), and [arithmetization](/docs/proof-systems/arithmetization).

## Reading rule

Always identify the statement, the witness, public inputs, setup assumptions, verifier cost, prover cost, and metadata leaks.

See [Proof-System Components](/docs/proof-systems/proof-system-components), [FRI](/docs/proof-systems/fri), [Folding Schemes](/docs/proof-systems/folding-schemes), [Arithmetization](/docs/proof-systems/arithmetization), [Sumcheck](/docs/proof-systems/sumcheck), [Recursive Proofs](/docs/proof-systems/recursive-proofs), and [Lookup Arguments](/docs/proof-systems/lookup-arguments).
