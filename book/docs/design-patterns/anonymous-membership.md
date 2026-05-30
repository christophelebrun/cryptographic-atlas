---
title: Anonymous Membership
type: pattern
level: design-pattern
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: emerging
tags:
  - anonymous-membership
  - credentials
---

# Anonymous Membership

## One-sentence intuition

Anonymous membership lets someone prove they belong to an eligible group without revealing which member they are.

## Common building blocks

- Anonymous credentials.
- Merkle or accumulator membership proofs.
- Zero-knowledge proofs.
- Context binding.

## What it does not provide

- Anti-double-use unless nullifiers or rate limits are added.
- Network anonymity.
- Coercion resistance.
- Privacy for very small groups.

## Failure modes

- The eligible set is too small.
- Membership data is stale or manipulable.
- Proofs are linkable across contexts.
- Metadata reveals the member.

## Further reading

- TODO: Add verified references for anonymous credentials and membership proofs.
