---
title: Encrypted Mempools
type: system
level: system
template: case-study
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - encrypted-mempools
  - blockchains
  - threshold-encryption
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Encrypted Mempools

## Overview

Encrypted mempools hide transaction contents before ordering, inclusion, or a reveal phase, usually to reduce pre-trade leakage and some forms of front-running.

## Goals

- Hide transaction contents before ordering.
- Bind encrypted submissions to reveal or decryption rules.
- Reduce content-based front-running.
- Support fairer sequencing under a stated model.

## Non-goals

- Guaranteed inclusion.
- Censorship resistance by itself.
- Hiding sender network metadata.
- Solving all miner or maximal extractable value risks.

## Building blocks

- Public-key encryption or threshold encryption.
- Commitments to encrypted transactions.
- Sequencing and reveal rules.
- Slashing, availability, or committee accountability.

## Metadata leaks

- Submission timing.
- Sender network path.
- Gas or fee patterns.
- Transaction size.
- Censorship and reveal behavior.

## Post-quantum posture

Depends on the encryption, threshold scheme, signatures, and ledger authentication. Many current designs rely on classical public-key assumptions.

## Confidence model

Confidence is mixed: threshold or trusted decryption committee, sequencer assumptions, public-verifiability for commitments and inclusion, and operational audit for key release.

## Failure modes

- Decryption keys released before ordering.
- Committee collusion or unavailability.
- Censorship of encrypted transactions.
- Metadata still revealing strategy.
- Reveal failures or griefing.

## Related concepts

- [Delayed Reveal](/docs/design-patterns/delayed-reveal)
- [Threshold Issuance](/docs/design-patterns/threshold-issuance)
- [Secure Channels](/docs/protocols/secure-channels)

## Further reading

- [Daian et al., "Flash Boys 2.0"](https://doi.org/10.1109/SP40000.2020.00040).
- [Canetti, "Universally Composable Security"](https://eprint.iacr.org/2000/067).
