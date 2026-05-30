---
title: Anonymous Airdrop
type: system
level: system
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: emerging
tags:
  - airdrops
  - nullifiers
  - anonymity
---

# Anonymous Airdrop

## Overview

An anonymous airdrop lets eligible users claim once without publicly linking the claim to their original identity.

## Goals

- Eligibility.
- One claim per eligible user.
- Claim privacy.
- Public auditability of the spent claim set.

## Non-goals

- Network anonymity.
- Protection from identity leaks during funding or withdrawal.
- Sybil resistance beyond the eligibility source.

## Possible building blocks

- Eligibility set commitment.
- Membership proof.
- Nullifier.
- Zero-knowledge proof.
- Private withdrawal or shielding mechanism.

## Privacy leaks

Claim timing, gas funding, wallet reuse, and exchange withdrawals can identify claimants.

## Failure modes

- Eligibility set contains duplicates.
- Nullifiers are linkable across campaigns.
- Claims reveal wallet funding patterns.
- The proof omits a required context.

## Further reading

- TODO: Add verified references for anonymous airdrop and private claim designs.
