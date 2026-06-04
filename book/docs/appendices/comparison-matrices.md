---
title: Comparison Matrices
type: appendix
level: not-applicable
template: reference
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - comparisons
  - matrices
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Comparison Matrices

These matrices are editorial shortcuts. They compare where to look first, not which construction to deploy.

## Basic primitives

| Primitive | Primary goal | Does not provide | Common risk |
| --- | --- | --- | --- |
| Hash functions | Fixed-length digest with preimage and collision resistance | Encryption, authentication, hiding low-entropy secrets | Missing domain separation or obsolete algorithms |
| Symmetric encryption | Confidentiality under a shared secret key | Key distribution or authentication by itself | Nonce misuse or unauthenticated ciphertexts |
| MACs | Shared-key integrity and authenticity | Public verifiability or confidentiality | Replay, key reuse, timing-leaky comparisons |
| Digital signatures | Public verifiability of message origin and integrity | Confidentiality or signer understanding | Ambiguous signing contexts or nonce reuse |
| Public-key encryption | Recipient-controlled confidentiality | Sender authentication or metadata privacy | Key misbinding or unsafe raw encryption |
| Secret sharing | Threshold reconstruction and confidentiality below threshold | Share authentication or governance | Correlated share custody or unclear recovery rules |

## Privacy protocols

| Protocol | Main privacy goal | Confidence model | Metadata leaks |
| --- | --- | --- | --- |
| Anonymous credentials | Selective disclosure or unlinkable authorization | Trusted issuer plus holder secret | Issuer-verifier collusion, rare attributes, revocation checks |
| Nullifiers | One anonymous action per context | Holder secret plus public duplicate registry | Timing, transaction fees, reused contexts |
| Secure aggregation | Aggregate-only disclosure | Honest-majority or non-collusion depending on protocol | Participation, dropout, cohort size |
| MPC | Joint computation without revealing inputs | Adversary threshold and abort model | Participant set, circuit shape, aborts |
| Mixnets | Sender-recipient unlinkability through shuffling | At least one honest mix | Timing, batch membership, message size |

## Systems and patterns

| Item | Level | Primary goal | Deployment caution |
| --- | --- | --- | --- |
| Anonymous membership | Design pattern | Prove eligibility without revealing member identity | Needs anti-double-use design when repeated action matters |
| Private aggregation | Design pattern | Reveal aggregate rather than individual inputs | Small groups and differencing attacks dominate many failures |
| Delayed reveal | Design pattern | Commit now and open later | Define deadlines, challenges, and abort handling |
| Private DAO voting | System | Private eligible voting with public tally confidence | Not coercion-resistant by default |
| Anonymous airdrop | System | One private claim per eligible user | Public ledger metadata can defeat cryptographic anonymity |

## Data files

The machine-readable versions live in:

- `book/data/comparison-matrices/proof-systems.yml`
- `book/data/comparison-matrices/primitives.yml`
- `book/data/comparison-matrices/privacy-protocols.yml`
- `book/data/comparison-matrices/system-patterns.yml`
