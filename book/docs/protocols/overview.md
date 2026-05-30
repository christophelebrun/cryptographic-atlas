---
title: Protocols Overview
type: protocol
level: protocol
template: overview
status: draft
last_reviewed: '2026-05-30'
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

## Safety note

A protocol can fail even if every primitive inside it is sound.
