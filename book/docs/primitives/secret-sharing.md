---
title: Secret Sharing
type: primitive
level: basic-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
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

## Where it sits in the taxonomy

- Level: basic-primitive
- Parent category: threshold
- Related concepts: [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography), [Secure Aggregation](/docs/protocols/secure-aggregation), [Electronic Voting](/docs/protocols/e-voting)

## Problem it solves

This page explains the problem behind the concept: A secret is split into shares so only an authorized subset can reconstruct it. It separates the guarantee from the assumptions, missing guarantees, and composition risks that decide whether the idea is useful in a real system.

## Mental model

Think of splitting a vault code across people so no small group can open the vault, but a quorum can.

## Minimal example

A backup key is split into five shares, and any three can reconstruct it if two shares are lost.

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

## What it does not provide

- Authentication of shares unless added.
- Protection against maliciously corrupted shares unless verification is added.
- Automatic key rotation or operational security.

## Assumptions

Shares must be generated with correct randomness, distributed over authenticated channels, stored independently, and reconstructed only under the intended threshold and governance rules.

## Post-quantum posture

Plausible for the information-theoretic core of schemes such as Shamir secret sharing. The full system may still depend on quantum-vulnerable authentication, transport encryption, signatures, or storage controls.

## Confidence model

Confidence is threshold-based. Fewer than `t` shares should not reveal the secret; at least `t` valid shares can reconstruct it. Availability fails if too many shares are lost, and confidentiality fails if enough shareholders collude.

## Common constructions

### Concrete algorithms and schemes

| Scheme | Typical role | Key differences and cautions |
| --- | --- | --- |
| Shamir secret sharing | Threshold sharing over a finite field | Information-theoretic privacy below threshold; requires authenticated distribution and careful reconstruction. |
| Additive secret sharing | MPC and simple split-control workflows | Simple and efficient, but usually needs all shares or protocol-specific reconstruction. |
| Feldman verifiable secret sharing | Publicly checkable share consistency | Adds public verification, but commitments can reveal structure and rely on discrete-logarithm assumptions. |
| Pedersen verifiable secret sharing | Verifiable sharing with hiding commitments | Hides coefficients better than Feldman-style commitments, but inherits generator and group assumptions. |
| Distributed key generation | Threshold key creation without one dealer knowing the whole secret | Protocol, not just a sharing algorithm; participant authentication and abort handling dominate risk. |

## Use cases

- Threshold key custody.
- Backup and recovery.
- Distributed decryption.
- MPC building blocks.

## Composition patterns

- Share custody is an operational security problem.
- Threshold choices encode governance assumptions.

Common adjacent concepts: [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography), [Secure Aggregation](/docs/protocols/secure-aggregation), [Electronic Voting](/docs/protocols/e-voting).

## Failure modes and anti-patterns

- Losing too many shares.
- Letting one organization control enough shares.
- No process for detecting invalid shares.

## Maturity and deployment

Classified as mature. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: medium. Parameter sensitivity: medium.

## Related concepts

- [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography)
- [Secure Aggregation](/docs/protocols/secure-aggregation)
- [Electronic Voting](/docs/protocols/e-voting)

## Further reading

- Shamir, [How to Share a Secret](https://doi.org/10.1145/359168.359176).
- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
