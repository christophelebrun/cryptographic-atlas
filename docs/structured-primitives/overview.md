---
title: Structured Primitives Overview
type: primitive
level: structured-primitive
status: draft
last_reviewed: 2026-05-30
difficulty: beginner
maturity: not-applicable
tags:
  - structured-primitives
---

# Structured Primitives Overview

Structured primitives add algebraic, access-control, timing, or delegation structure to basic cryptographic building blocks.

## Examples

- Homomorphic commitments preserve arithmetic relationships.
- Homomorphic encryption computes on encrypted values.
- Threshold cryptography distributes authority across parties.
- Functional encryption reveals only an approved function of encrypted data.
- Verifiable delay functions make computation take sequential time.

## Safety note

The extra structure is useful because it exposes controlled relationships. The same structure can create surprising failure modes if the protocol forgets to constrain inputs or metadata.
