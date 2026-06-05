---
title: Reveal Only a Function
type: pattern
level: design-pattern
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - minimal-disclosure
  - functional-encryption
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Reveal Only a Function

## One-sentence intuition

Reveal only a function means exposing a computed result while keeping the underlying inputs hidden.

## Where it sits in the taxonomy

- Level: design-pattern
- Parent category: design-pattern
- Related concepts: [Functional Encryption](/docs/structured-primitives/functional-encryption), [Homomorphic Encryption](/docs/structured-primitives/homomorphic-encryption), [MPC](/docs/protocols/mpc)

## Problem it solves

A party may need to disclose an approved result, such as a score, eligibility bit, or aggregate, without exposing the raw input that produced it. This pattern frames the boundary between useful disclosure and unnecessary data release.

## Mental model

Think of a calculator that accepts hidden inputs and shows only the approved output, not the inputs themselves.

## Minimal example

A service learns that a user score is above a threshold without learning the exact score.

## Security properties

- controlled disclosure
- input privacy
- least information release

## What it does not provide

- Protection if the function output is too revealing.
- Privacy across repeated queries without leakage analysis.
- Correctness unless inputs and computation are verified.

## Assumptions

The allowed function must be chosen carefully, repeated queries must be controlled, and the underlying primitive or protocol must enforce that only the intended function result is revealed.

## Post-quantum posture

Not applicable to the pattern by itself. A concrete system inherits posture from functional encryption, homomorphic encryption, multi-party computation, proof systems, and authentication.

## Confidence model

Confidence depends on the mechanism: a key authority for functional encryption, threshold or honest-party assumptions for multi-party computation, or mathematical assumptions and key control for homomorphic encryption.

## Common constructions

### Common building blocks

- Homomorphic encryption.
- Functional encryption.
- Multi-party computation.
- Zero-knowledge proofs for input validity.

### Concrete compositions

| Composition | Revealed value | Main caution |
| --- | --- | --- |
| Homomorphic encryption plus threshold decryption | Aggregate or limited computation result | Trustees and output leakage define the confidence model. |
| MPC computation | Function output from private inputs | Abort behavior and the revealed output can leak sensitive information. |
| Functional encryption | Function value authorized by a function key | Key issuer trust and repeated-query leakage are central. |
| ZK proof plus public computation | Proof that a hidden input satisfies a function predicate | The predicate may still reveal sensitive facts. |

## Use cases

- restricted analytics
- private classification
- private tallying

## Composition patterns

- Repeated function outputs can reconstruct inputs.
- Access control must govern who can ask which function.

Common adjacent concepts: [Functional Encryption](/docs/structured-primitives/functional-encryption), [Homomorphic Encryption](/docs/structured-primitives/homomorphic-encryption), [MPC](/docs/protocols/mpc).

## Failure modes and anti-patterns

- Differencing attacks across multiple outputs.
- Functions that encode private values directly.
- Missing access control around who can ask which function.

## Maturity and deployment

Classified as emerging. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: expert-only. Parameter sensitivity: scheme-dependent.

## Related concepts

- [Functional Encryption](/docs/structured-primitives/functional-encryption)
- [Homomorphic Encryption](/docs/structured-primitives/homomorphic-encryption)
- [MPC](/docs/protocols/mpc)

## Further reading

- [Functional encryption](/docs/structured-primitives/functional-encryption)
- [Multi-party computation](/docs/protocols/mpc)
