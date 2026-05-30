---
title: Coercion-Resistant Voting
type: system
level: system
status: draft
last_reviewed: 2026-05-30
difficulty: advanced
maturity: emerging
tags:
  - voting
  - coercion-resistance
---

# Coercion-Resistant Voting

## Overview

Coercion-resistant voting aims to prevent a voter from proving how they voted, even if a coercer pressures them.

## Goals

- Ballot secrecy.
- Receipt-freeness.
- Resistance to forced abstention or forced choice, depending on the model.
- Verifiable tallying.

## Non-goals

- Solving all physical coercion.
- Protecting compromised voter devices by cryptography alone.
- Simple deployment.

## Building blocks

- Anonymous credentials.
- Re-voting or credential recovery.
- Mixnets or homomorphic tallying.
- Zero-knowledge proofs.
- Careful user experience and operational procedures.

## Privacy leaks

Timing, small groups, device compromise, and social pressure can defeat formal privacy claims.

## Maturity warning

Coercion resistance is a demanding system property. Treat any simple claim of coercion resistance with skepticism unless the threat model is precise.

## Further reading

- TODO: Add verified references for coercion-resistant voting protocols.
