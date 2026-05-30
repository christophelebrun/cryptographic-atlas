---
title: Basic Primitives Overview
type: primitive
level: basic-primitive
status: draft
last_reviewed: 2026-05-30
difficulty: beginner
maturity: not-applicable
tags:
  - primitives
---

# Basic Primitives Overview

Basic primitives provide narrow cryptographic guarantees. They are not complete systems.

## Examples

- Hash functions compress data into fixed-length digests.
- Commitments bind a party to a hidden value.
- Digital signatures authenticate messages.
- Public-key encryption lets a sender encrypt to a recipient's public key.
- Secret sharing splits a secret across multiple shares.

## Reading rule

For each primitive, ask what it guarantees, what it assumes, what it does not provide, and what breaks when it is composed incorrectly.
