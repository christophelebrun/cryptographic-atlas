---
title: Assumptions
type: taxonomy
level: assumption
status: draft
last_reviewed: 2026-05-30
difficulty: beginner
maturity: not-applicable
tags:
  - assumptions
---

# Assumptions

Cryptographic guarantees are conditional. An assumption is something that must hold for a claim to be meaningful.

## Types of assumptions

| Type | Examples |
| --- | --- |
| Mathematical | discrete logarithm hardness, lattice assumptions |
| Model | random oracle model, algebraic group model |
| Setup | trusted setup, common reference string, public parameters |
| Trust | honest majority, non-collusion, threshold of honest parties |
| Network | reliable broadcast, authenticated channels, timing bounds |
| Implementation | secure randomness, constant-time code, safe key storage |

## Practical checklist

- Who can break the system if they collude?
- What setup must be generated correctly?
- What happens if randomness is weak?
- What metadata remains public?
- Which assumptions are mature and which are research-stage?

## Further reading

- TODO: Add verified references for common cryptographic assumptions.
