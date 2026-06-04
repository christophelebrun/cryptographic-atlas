---
title: Timelock and VDFs
type: primitive
level: structured-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
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

## Where it sits in the taxonomy

- Level: structured-primitive
- Parent category: delay
- Related concepts: [Delayed Reveal](/docs/design-patterns/delayed-reveal), [Commitments](/docs/primitives/commitments)

## Problem it solves

This page explains the problem behind the concept: A function that takes sequential time to compute but is fast to verify. It separates the guarantee from the assumptions, missing guarantees, and composition risks that decide whether the idea is useful in a real system.

## Mental model

Think of a puzzle that forces time to pass before a value can be opened, while the answer is easy to check.

## Minimal example

A lottery seed is committed now and revealed only after a verifiable delay output is available.

A verifiable delay function can be read as a function that takes an input `x`, requires about `T` sequential steps to compute, and returns a result plus a proof:

$$
(y, \pi) \leftarrow \operatorname{Eval}(x, T)
$$

Verification should be much faster than evaluation:

$$
\operatorname{Verify}(x, y, \pi) = 1
$$

## Security properties

- sequential delay
- public verifiability

## What it does not provide

- Wall-clock fairness in every network setting.
- Protection against specialized hardware unless modeled.
- Confidentiality by themselves.

## Assumptions

The delay parameter must reflect realistic sequential computation, the setup model must be sound for the chosen construction, and the protocol must account for network delay, denial of service, and hardware advantage.

## Post-quantum posture

Depends on the construction. Some VDF and timelock designs rely on assumptions whose post-quantum status is not the same as hash-based or lattice-based primitives. Treat each construction separately.

## Confidence model

Confidence comes from the sequential-delay assumption, the verification equation, parameter selection, and any setup process. The model is not "trusted time"; it is an assumption about how much sequential work an adversary can complete.

## Common constructions

### Concrete schemes and families

| Scheme or family | Assumption shape | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| Repeated-squaring timelocks | Sequential squaring in an unknown-order group | Delayed disclosure and timelock puzzles | Delay depends on sequential work; setup and modulus/class-group choice matter. |
| Wesolowski VDF | Unknown-order group with compact proof | Publicly verifiable delay outputs | Compact verification, but assumption and setup choices must be explicit. |
| Pietrzak VDF | Unknown-order group with interactive/recursive proof structure | Verifiable delay outputs | Different proof and verification trade-offs from Wesolowski-style VDFs. |
| Class-group VDFs | Unknown-order class groups | Avoiding trusted RSA modulus generation | Parameter generation differs from RSA groups and still needs expert review. |
| Trusted delay services | External time authority or server | Engineering substitute for cryptographic delay | Not a VDF; confidence shifts to service trust and availability. |

## Use cases

- Randomness beacons.
- Delayed reveal.
- Leader election protocols.

## Composition patterns

- Specialized hardware can change delay assumptions.
- Delay does not prevent denial of service.
- Verification only checks the computation, not the surrounding protocol goal.

Common adjacent concepts: [Delayed Reveal](/docs/design-patterns/delayed-reveal), [Commitments](/docs/primitives/commitments).

## Failure modes and anti-patterns

- Underestimating hardware advantage.
- Confusing sequential work with trusted time.
- Ignoring denial-of-service and availability.

## Maturity and deployment

Classified as emerging. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: expert-only. Parameter sensitivity: high.

## Related concepts

- [Delayed Reveal](/docs/design-patterns/delayed-reveal)
- [Commitments](/docs/primitives/commitments)

## Further reading

- Boneh et al., [Verifiable Delay Functions](https://eprint.iacr.org/2018/601).
- Wesolowski, [Efficient Verifiable Delay Functions](https://eprint.iacr.org/2018/623).
