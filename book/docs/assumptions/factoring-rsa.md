---
title: Factoring and RSA
type: assumption
level: mathematical-assumption
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: mature
tags:
  - assumptions
  - rsa
  - factoring
post_quantum_posture: vulnerable
confidence_model:
  type: mathematical-assumption
---

# Factoring and RSA

## One-sentence intuition

RSA-style cryptography relies on arithmetic modulo a large composite number whose prime factors are secret.

## Where it sits in the taxonomy

- Level: mathematical assumption or substrate
- Parent category: assumptions
- Related concepts: public-key encryption, digital signatures, accumulators, VDFs

## Problem it solves

RSA gives a public-key trapdoor structure: public operations can be easy while the corresponding private operation depends on knowing the factorization of the modulus.

## Mental model

Multiplying two large primes is easy. Recovering those primes from only their product is believed to be hard for classical computers when the primes are generated correctly and are large enough.

## Minimal example

An RSA modulus is:

$$
N = p q
$$

The factors $p$ and $q$ are secret. Many RSA-based systems rely on the difficulty of recovering them from $N$.

## Security properties

- Supports trapdoor public-key encryption and signatures when used in safe schemes.
- Supports RSA accumulators and some time-delay constructions under additional assumptions.

## What it does not provide

- Security for textbook RSA.
- Protection against quantum computers.
- Safety if primes, padding, or key sizes are wrong.

## Assumptions

RSA systems assume correct prime generation, adequate modulus sizes, safe padding or signature schemes, and protection of the private exponent or factorization.

## Post-quantum posture

Vulnerable. Shor's algorithm breaks integer factoring on a sufficiently large cryptographically relevant quantum computer.

## Confidence model

Confidence comes from mathematical-assumption hardness, parameter generation, padding or scheme design, and private-key protection.

## Common constructions

- RSA encryption schemes.
- RSA signature schemes.
- RSA accumulators.
- Groups of unknown order used in some VDF or timelock designs.

## Use cases

- Legacy public-key encryption and signatures.
- Accumulators.
- Some delay and timelock constructions.

## Composition patterns

RSA is commonly used inside hybrid encryption, certificate systems, signatures, and accumulator protocols. Each use needs its own security notion and padding or proof layer.

## Failure modes and anti-patterns

- Using textbook RSA directly.
- Reusing primes or generating weak primes.
- Confusing factoring hardness with security of every RSA-based scheme.
- Treating RSA-based systems as post-quantum.

## Maturity and deployment

Mature and widely deployed historically, but quantum-vulnerable and being migrated away from in long-term security designs.

## Related concepts

- [Public-key encryption](/docs/primitives/public-key-encryption)
- [Digital signatures](/docs/primitives/digital-signatures)
- [Accumulators and Merkle trees](/docs/structured-primitives/accumulators-and-merkle-trees)

## Further reading

- Rivest, Shamir, and Adleman, "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems."
- Shor, "Algorithms for Quantum Computation; Discrete Logarithms and Factoring."
- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
