---
title: Primitives vs Protocols
type: taxonomy
level: taxonomy
template: overview
status: draft
last_reviewed: '2026-05-30'
difficulty: beginner
maturity: not-applicable
tags:
  - primitives
  - protocols
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Primitives vs Protocols

A primitive is a small building block with a narrow interface. A protocol is a multi-step construction, often involving several parties and several primitives.

## Comparison

| Aspect | Primitive | Protocol |
| --- | --- | --- |
| Scope | Narrow operation | End-to-end interaction |
| Examples | hash, signature, commitment | MPC, mixnet, anonymous credential issuance |
| Main question | What property does this operation provide? | What happens across participants, messages, and failure cases? |
| Common risk | Misstating the guarantee | Ignoring metadata, aborts, or trust assumptions |

## Example

A commitment can bind a value. A voting protocol may use commitments, signatures, zero-knowledge proofs, nullifiers, and tallying rules to achieve a larger goal.

## Further reading

- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
- Katz and Lindell, "Introduction to Modern Cryptography."
