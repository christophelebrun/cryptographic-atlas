---
title: Primitives vs Protocols
type: taxonomy
level: taxonomy
template: overview
status: current
last_reviewed: '2026-06-04'
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

A concrete algorithm, scheme, parameter family, or protocol suite is an instance of a concept. It should point back to the parent concept rather than replace it.

## Comparison

| Aspect | Primitive | Protocol |
| --- | --- | --- |
| Scope | Narrow operation | End-to-end interaction |
| Examples | hash, signature, commitment | MPC, mixnet, anonymous credential issuance |
| Main question | What property does this operation provide? | What happens across participants, messages, and failure cases? |
| Common risk | Misstating the guarantee | Ignoring metadata, aborts, or trust assumptions |

## Where named schemes fit

Named constructions belong under the concept they instantiate:

| Named item | Parent concept | Notes |
| --- | --- | --- |
| SHA-256 | Hash functions | A concrete hash algorithm, not the whole concept of hashing. |
| Ed25519 | Digital signatures | A concrete signature scheme with specific curve and encoding choices. |
| Groth16 | SNARKs / proof systems | A concrete proof system with trusted-setup and pairing assumptions. |
| TLS 1.3 | Secure-channel protocol suite | A concrete protocol suite composed from several primitives and transcript rules. |

This keeps the taxonomy concept-first while still letting the book discuss concrete deployment names where they matter.

## Example

A commitment can bind a value. A voting protocol may use commitments, signatures, zero-knowledge proofs, nullifiers, and tallying rules to achieve a larger goal.

## Further reading

- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
- Katz and Lindell, "Introduction to Modern Cryptography."
