---
title: Threshold Cryptography
type: primitive
level: structured-primitive
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: mature
tags:
  - threshold
  - key-management
---

# Threshold Cryptography

## One-sentence intuition

Threshold cryptography distributes a cryptographic power across several parties so that a quorum is required to act.

## What it can provide

- Reduced single-key compromise risk.
- Distributed signing or decryption.
- Better availability if some parties fail.

## What it does not provide

- Trustlessness.
- Protection if the threshold colludes.
- Simple operations or recovery.
- Metadata privacy by itself.

## Failure modes

- Bad distributed key generation.
- Poor share custody.
- Unclear quorum governance.
- No plan for rotation, slashing, replacement, or disaster recovery.

## Further reading

- TODO: Add verified references for threshold signatures and distributed key generation.
