---
title: Secret Sharing
type: primitive
level: basic-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: beginner
maturity: mature
tags:
  - secret-sharing
  - threshold
post_quantum_posture: plausible
confidence_model:
  type: t-of-n-threshold
---

# Secret Sharing

## One-sentence intuition

Secret sharing splits a secret into shares so that only an authorized subset can reconstruct it.

In a threshold scheme, a secret can be split so that any `t` shares reconstruct it, while fewer than `t` shares should reveal nothing useful:

$$
\text{threshold} = t \quad\text{out of}\quad n
$$

For Shamir-style secret sharing, the dealer can choose a random polynomial whose constant term is the secret:

$$
f(z) = s + a_1 z + \cdots + a_{t-1} z^{t-1}
$$

Each participant receives one point on that polynomial:

$$
\mathsf{share}_i = (i, f(i))
$$

## Security properties

- Confidentiality against parties below the reconstruction threshold.
- Availability when enough shares survive.

## Assumptions

Shares must be generated with correct randomness, distributed over authenticated channels, stored independently, and reconstructed only under the intended threshold and governance rules.

## Post-quantum posture

Plausible for the information-theoretic core of schemes such as Shamir secret sharing. The full system may still depend on quantum-vulnerable authentication, transport encryption, signatures, or storage controls.

## Confidence model

Confidence is threshold-based. Fewer than `t` shares should not reveal the secret; at least `t` valid shares can reconstruct it. Availability fails if too many shares are lost, and confidentiality fails if enough shareholders collude.

## What it does not provide

- Authentication of shares unless added.
- Protection against maliciously corrupted shares unless verification is added.
- Automatic key rotation or operational security.

## Use cases

- Threshold key custody.
- Backup and recovery.
- Distributed decryption.
- MPC building blocks.

## Failure modes and anti-patterns

- Losing too many shares.
- Letting one organization control enough shares.
- No process for detecting invalid shares.

## Further reading

- Adi Shamir, "How to Share a Secret."
- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
