---
title: Assumptions
type: taxonomy
level: assumption
template: overview
status: current
last_reviewed: '2026-06-04'
review:
  structural:
    status: current
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: beginner
maturity: not-applicable
tags:
  - assumptions
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Assumptions

Cryptographic guarantees are conditional. An assumption is something that must hold for a claim to be meaningful.

![Assumption stack](/img/diagrams/assumption-stack.svg)

## Types of assumptions

| Type | Examples |
| --- | --- |
| Mathematical | discrete logarithm hardness, lattice assumptions |
| Model | random oracle model, algebraic group model |
| Setup | trusted setup, common reference string, public parameters |
| Trust | honest majority, non-collusion, threshold of honest parties |
| Network | reliable broadcast, authenticated channels, timing bounds |
| Implementation | secure randomness, constant-time code, safe key storage |

## Post-quantum posture

Post-quantum posture is a classification of assumptions under a quantum adversary. For example, discrete-logarithm assumptions are quantum-vulnerable, while some hash-based and lattice-based constructions are commonly treated as plausible post-quantum candidates when parameters and implementations are appropriate.

See [Post-Quantum Posture](/docs/appendices/post-quantum-posture).

## Confidence model

A confidence model states who or what must remain honest, independent, hard, available, or verifiable. Examples include one-honest-party mixnets, `t-of-n` threshold trustees, honest-majority MPC, public-verifiable proof systems, trusted issuers, and transparent setup.

See [Confidence Models](/docs/appendices/confidence-models).

## Practical checklist

- Who can break the system if they collude?
- What setup must be generated correctly?
- What happens if randomness is weak?
- What metadata remains public?
- Which assumptions are mature and which are research-stage?

## Assumption pages

- [Discrete logarithm](/docs/assumptions/discrete-logarithm)
- [Elliptic curves](/docs/assumptions/elliptic-curves)
- [Factoring and RSA](/docs/assumptions/factoring-rsa)
- [Code-based assumptions](/docs/assumptions/code-based-assumptions)
- [Pairings](/docs/assumptions/pairings)
- [Lattices](/docs/assumptions/lattices)
- [Random oracle model](/docs/assumptions/random-oracle-model)
- [Trusted setup](/docs/assumptions/trusted-setup)
- [Common reference strings](/docs/assumptions/common-reference-strings)
- [Additional assumptions and substrates](/docs/assumptions/additional-substrates)

## Further reading

- Boneh and Shoup, ["A Graduate Course in Applied Cryptography"](https://toc.cryptobook.us/).
- Shor, ["Algorithms for Quantum Computation: Discrete Logarithms and Factoring"](https://doi.org/10.1109/SFCS.1994.365700).
