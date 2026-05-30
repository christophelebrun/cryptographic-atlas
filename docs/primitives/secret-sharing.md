---
title: Secret Sharing
type: primitive
level: basic-primitive
status: draft
last_reviewed: 2026-05-30
difficulty: beginner
maturity: mature
tags:
  - secret-sharing
  - threshold
---

# Secret Sharing

## One-sentence intuition

Secret sharing splits a secret into shares so that only an authorized subset can reconstruct it.

## Security properties

- Confidentiality against parties below the reconstruction threshold.
- Availability when enough shares survive.

## What it does not provide

- Authentication of shares unless added.
- Protection against maliciously corrupted shares unless verification is added.
- Automatic key rotation or operational security.

## Use cases

- Threshold key custody.
- Backup and recovery.
- Distributed decryption.
- MPC building blocks.

## Failure modes

- Losing too many shares.
- Letting one organization control enough shares.
- No process for detecting invalid shares.

## Further reading

- TODO: Add verified references for Shamir secret sharing and verifiable secret sharing.
