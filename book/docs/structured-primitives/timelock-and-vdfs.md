---
title: Timelock and VDFs
type: primitive
level: structured-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: emerging
tags:
  - timelock
  - vdf
post_quantum_posture: depends
confidence_model:
  type: external-timing
---

# Timelock and VDFs

## One-sentence intuition

Timelock tools and verifiable delay functions (VDFs) make information or outputs depend on the passage of sequential computation time.

A VDF can be read as a function that takes an input `x`, requires about `T` sequential steps to compute, and returns a result plus a proof:

$$
(y, \pi) \leftarrow \operatorname{Eval}(x, T)
$$

Verification should be much faster than evaluation:

$$
\operatorname{Verify}(x, y, \pi) = 1
$$

## What VDFs provide

- A result that is slow to compute.
- A proof that is fast to verify, depending on the construction.

## Post-quantum posture

Depends on the construction. Some VDF and timelock designs rely on assumptions whose post-quantum status is not the same as hash-based or lattice-based primitives. Treat each construction separately.

## Confidence model

Confidence comes from the sequential-delay assumption, the verification equation, parameter selection, and any setup process. The model is not "trusted time"; it is an assumption about how much sequential work an adversary can complete.

## What it does not provide

- Wall-clock fairness in every network setting.
- Protection against specialized hardware unless modeled.
- Confidentiality by themselves.

## Assumptions

The delay parameter must reflect realistic sequential computation, the setup model must be sound for the chosen construction, and the protocol must account for network delay, denial of service, and hardware advantage.

## Use cases

- Randomness beacons.
- Delayed reveal.
- Leader election protocols.

## Concrete schemes and families

| Scheme or family | Assumption shape | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| Repeated-squaring timelocks | Sequential squaring in an unknown-order group | Delayed disclosure and timelock puzzles | Delay depends on sequential work; setup and modulus/class-group choice matter. |
| Wesolowski VDF | Unknown-order group with compact proof | Publicly verifiable delay outputs | Compact verification, but assumption and setup choices must be explicit. |
| Pietrzak VDF | Unknown-order group with interactive/recursive proof structure | Verifiable delay outputs | Different proof and verification trade-offs from Wesolowski-style VDFs. |
| Class-group VDFs | Unknown-order class groups | Avoiding trusted RSA modulus generation | Parameter generation differs from RSA groups and still needs expert review. |
| Trusted delay services | External time authority or server | Engineering substitute for cryptographic delay | Not a VDF; confidence shifts to service trust and availability. |

## Failure modes and anti-patterns

- Underestimating hardware advantage.
- Confusing sequential work with trusted time.
- Ignoring denial-of-service and availability.

## Further reading

- Boneh et al., "Verifiable Delay Functions."
- Wesolowski, "Efficient Verifiable Delay Functions."
