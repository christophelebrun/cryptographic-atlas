---
title: Membership Proofs
type: primitive
level: proof-system
status: draft
last_reviewed: 2026-05-30
difficulty: beginner
maturity: mature
tags:
  - membership-proofs
  - accumulators
---

# Membership Proofs

## One-sentence intuition

A membership proof shows that an item belongs to a committed set.

## Use cases

- Proving eligibility.
- Showing inclusion in a Merkle tree.
- Anonymous membership when combined with zero knowledge.

## What it does not provide

- Authorization policy by itself.
- Privacy unless the proof hides which member is used.
- Freshness unless the set commitment is current.

## Failure modes

- Using stale set roots.
- Ambiguous leaf encoding.
- Revealing the member through the proof path or metadata.

## Further reading

- TODO: Add verified references for Merkle and accumulator membership proofs.
