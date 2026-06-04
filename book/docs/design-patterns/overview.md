---
title: Design Patterns Overview
type: pattern
level: design-pattern
template: overview
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - design-patterns
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Design Patterns Overview

Design patterns are recurring ways to compose cryptographic tools into system behavior.

## Examples

- Anonymous membership proves eligibility without naming the user.
- Anti-double-use nullifiers prevent repeated anonymous actions.
- Private aggregation reveals totals without exposing individual values.
- Delayed reveal separates commitment time from opening time.
- Reveal only a function limits disclosure to a computed output.
- Make receipts useless reduces coercion and vote-buying risk.
- [Domain separation](/docs/design-patterns/domain-separation) and [transcript binding](/docs/design-patterns/transcript-binding) prevent cross-protocol and cross-statement confusion.
- [Privacy-preserving revocation](/docs/design-patterns/privacy-preserving-revocation) manages status checks without turning every presentation into a tracking event.
- [Encrypt-then-prove](/docs/design-patterns/encrypt-then-prove) proves validity of encrypted values.
- [Threshold issuance](/docs/design-patterns/threshold-issuance) splits authorization across issuers.
- [Key rotation and migration](/docs/design-patterns/key-rotation-and-migration) manages cryptographic agility over time.

## Reading rule

A pattern is not a complete protocol. Treat it as a design shape that still needs assumptions, threat models, and implementation review.

See [Operational Design Patterns](/docs/design-patterns/operational-design-patterns), [Domain Separation](/docs/design-patterns/domain-separation), [Transcript Binding](/docs/design-patterns/transcript-binding), [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation), [Encrypt-then-prove](/docs/design-patterns/encrypt-then-prove), [Threshold Issuance](/docs/design-patterns/threshold-issuance), and [Key Rotation and Migration](/docs/design-patterns/key-rotation-and-migration).
