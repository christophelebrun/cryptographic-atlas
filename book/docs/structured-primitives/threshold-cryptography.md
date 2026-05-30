---
title: Threshold Cryptography
type: primitive
level: structured-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: mature
tags:
  - threshold
  - key-management
post_quantum_posture: depends
confidence_model:
  type: t-of-n-threshold
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

## Assumptions

The protocol must generate and protect shares correctly, define the threshold and recovery process, authenticate participants, and handle share refresh, replacement, and audit procedures.

## Post-quantum posture

Depends on the underlying primitive. Threshold ECDSA or threshold Schnorr is quantum-vulnerable. Threshold versions of post-quantum signatures, encryption, or key encapsulation need separate analysis and are not automatically available just because a single-party primitive exists.

## Confidence model

Confidence is `t-of-n`: the system assumes fewer than `t` parties collude for privacy or key misuse resistance, and at least `t` parties are available for liveness. Distributed key generation, share custody, and recovery policy are part of the model.

## Failure modes and anti-patterns

- Bad distributed key generation.
- Poor share custody.
- Unclear quorum governance.
- No plan for rotation, slashing, replacement, or disaster recovery.

## Further reading

- Adi Shamir, "How to Share a Secret."
- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
