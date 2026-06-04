---
title: Protocols Overview
type: protocol
level: protocol
template: overview
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - protocols
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Protocols Overview

Protocols specify how parties interact. They combine primitives, messages, state transitions, checks, and failure handling.

## Protocol questions

- Who participates?
- What are their inputs and outputs?
- What can each adversary observe or corrupt?
- What metadata is public?
- What happens if a party aborts?
- What assumptions are required?

## Covered protocol families

- [Additional protocol families](/docs/protocols/additional-protocol-families)
- [Anonymous credentials](/docs/protocols/anonymous-credentials)
- [Nullifiers](/docs/protocols/nullifiers)
- [Oblivious pseudorandom functions](/docs/protocols/oblivious-pseudorandom-functions)
- [Private set intersection](/docs/protocols/private-set-intersection)
- [Secure aggregation](/docs/protocols/secure-aggregation)
- [Multi-party computation](/docs/protocols/mpc)
- [Mixnets](/docs/protocols/mixnets)
- [Electronic voting](/docs/protocols/e-voting)

## Safety note

A protocol can fail even if every primitive inside it is sound.

Protocol coverage is still intentionally high-level in some areas. Full standalone pages can be promoted from the additional protocol-family coverage as needed.
