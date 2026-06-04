---
title: Threat-Model Checklist
type: appendix
level: not-applicable
template: reference
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - threat-model
  - checklist
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Threat-Model Checklist

Use this checklist before selecting primitives.

## Questions

- What is the exact security goal: confidentiality, integrity, anonymity, unlinkability, verifiability, or coercion resistance?
- Which actors can be malicious, curious, offline, coerced, or compromised?
- Which parties must remain honest, non-colluding, available, or publicly verifiable?
- What metadata remains public even if cryptographic payloads are hidden?
- What setup, issuer, threshold, timing, or network assumptions are required?
- What happens on abort, dropout, lost keys, stale state, or disputed outputs?
- Which claims are mathematical, and which are operational or governance claims?
- Which components are quantum-vulnerable, and which merely inherit posture from another layer?

## Output

A useful threat model should produce three lists: guarantees, non-goals, and leaks. If a claim cannot be placed in one of those lists, it is probably too vague to guide design.

## Further reading

- Katz and Lindell, [Introduction to Modern Cryptography](https://www.cs.umd.edu/~jkatz/imc.html).
- Canetti, [Universally Composable Security; A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067).
