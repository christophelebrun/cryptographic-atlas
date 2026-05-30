---
title: Make Receipts Useless
type: pattern
level: design-pattern
status: draft
last_reviewed: 2026-05-30
difficulty: advanced
maturity: emerging
tags:
  - coercion-resistance
  - voting
---

# Make Receipts Useless

## One-sentence intuition

This pattern tries to stop users from proving to a coercer how they acted.

## Problem it solves

Some systems need more than privacy from observers. They need to prevent a participant from producing convincing evidence of their own action.

## Common approaches

- Deniable or fakeable transcripts.
- Re-voting where only the last vote counts.
- Controlled credential recovery or revocation.
- Mixnets or tallying designs that avoid public vote receipts.

## What it does not provide

- Protection against all real-world coercion.
- Safety on compromised devices.
- A simple add-on to ordinary privacy systems.

## Failure modes

- User interfaces expose receipts.
- Logs or screenshots become proofs.
- Coercers demand credentials before the action.
- Small groups make choices inferable from outcomes.

## Further reading

- TODO: Add verified references for receipt-freeness and coercion-resistant voting.
