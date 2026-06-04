---
title: Code-Based Assumptions
type: assumption
level: mathematical-assumption
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - code-based
  - post-quantum
  - assumptions
post_quantum_posture: plausible
confidence_model:
  type: mathematical-assumption
---

# Code-Based Assumptions

## One-sentence intuition

Code-based cryptography relies on the hardness of decoding noisy error-correcting-code data without secret structure.

## Where it sits in the taxonomy

- Level: mathematical assumption.
- Parent category: post-quantum public-key assumptions.
- Related concepts: [Lattices](/docs/assumptions/lattices), [Key Encapsulation and Exchange](/docs/primitives/key-encapsulation-and-exchange), [Post-Quantum Posture](/docs/appendices/post-quantum-posture).

## Problem it solves

Code-based assumptions provide a long-studied post-quantum direction for public-key encryption and key encapsulation, complementing lattice-based schemes.

## Mental model

A public key describes a scrambled code. Anyone can add noise, but only the holder of the secret structure can efficiently remove enough noise to decode.

## Minimal example

In a McEliece-style KEM, a sender encodes a secret with a public code and adds errors. The recipient uses a hidden decoding structure to recover the secret.

## Security properties

- Public-key encryption or KEM security under decoding assumptions.
- Plausible resistance to known quantum attacks when parameters are conservative.
- Long history of cryptanalysis for some families.

## What it does not provide

- Small public keys in many classic systems.
- Signatures by default.
- Security for arbitrary codes or ad hoc parameters.
- Protection from implementation side channels.

## Assumptions

- Decoding random-looking linear codes remains hard at selected parameters.
- The public key does not leak exploitable structure.
- Parameter sets are chosen from reviewed schemes rather than custom code families.

## Post-quantum posture

Plausible. Code-based KEMs are considered post-quantum candidates, but exact confidence depends on scheme family, parameters, and cryptanalysis.

## Confidence model

Confidence comes from mathematical-assumption security, conservative parameter selection, public cryptanalysis, and implementation review.

## Common constructions

- Classic McEliece-style encryption and KEMs.
- HQC-style code-based KEMs.
- Niederreiter-style variants.

## Use cases

- Post-quantum key establishment.
- Diversifying away from lattice-only migration.
- Long-term confidentiality planning.

## Composition patterns

Code-based KEMs are composed into secure-channel handshakes, usually with KDFs, transcript binding, authentication, and sometimes hybrid classical-plus-post-quantum key exchange.

## Failure modes and anti-patterns

- Underestimating large public-key sizes.
- Using unreviewed code families.
- Ignoring side-channel and decoding-failure behavior.
- Treating "post-quantum" as deployment maturity.

## Maturity and deployment

Mature but specialized. McEliece-style assumptions are old, while standardization and deployment profiles for code-based KEMs are still evolving.

## Related concepts

- [Key Encapsulation and Exchange](/docs/primitives/key-encapsulation-and-exchange)
- [Post-Quantum Posture](/docs/appendices/post-quantum-posture)
- [Concrete Algorithms and Schemes](/docs/appendices/concrete-algorithms-and-schemes)

## Further reading

- [McEliece, "A Public-Key Cryptosystem Based on Algebraic Coding Theory"](https://ipnpr.jpl.nasa.gov/progress_report2/42-44/44N.PDF).
- [NIST IR 8545](https://doi.org/10.6028/NIST.IR.8545).
- [Classic McEliece project](https://classic.mceliece.org/).
