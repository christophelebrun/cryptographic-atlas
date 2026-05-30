---
title: SNARKs, STARKs, and Bulletproofs
type: primitive
level: proof-system
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: emerging
tags:
  - snarks
  - starks
  - bulletproofs
---

# SNARKs, STARKs, and Bulletproofs

## One-sentence intuition

SNARKs, STARKs, and Bulletproofs are families of proof systems that package zero-knowledge or succinct verification with different costs and assumptions.

## Comparison snapshot

| Family | Common strengths | Common trade-offs |
| --- | --- | --- |
| SNARKs | Small proofs and fast verification | Some constructions need trusted setup or pairing assumptions |
| STARKs | Transparent setup and hash-based assumptions | Larger proofs and heavier verification than many SNARKs |
| Bulletproofs | No trusted setup and useful range proofs | Verification can be heavier for large statements |

## What they do not provide

- A correct statement automatically.
- Metadata privacy.
- Protection against implementation bugs.
- A complete protocol.

## Further reading

- TODO: Add verified references for each proof-system family.
