---
title: Reveal Only a Function
type: pattern
level: design-pattern
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: emerging
tags:
  - minimal-disclosure
  - functional-encryption
---

# Reveal Only a Function

## One-sentence intuition

Reveal only a function means exposing a computed result while keeping the underlying inputs hidden.

## Common building blocks

- Homomorphic encryption.
- Functional encryption.
- Multi-party computation.
- Zero-knowledge proofs for input validity.

## What it does not provide

- Protection if the function output is too revealing.
- Privacy across repeated queries without leakage analysis.
- Correctness unless inputs and computation are verified.

## Failure modes

- Differencing attacks across multiple outputs.
- Functions that encode private values directly.
- Missing access control around who can ask which function.

## Further reading

- TODO: Add verified references for functional encryption, MPC, and leakage from query outputs.
