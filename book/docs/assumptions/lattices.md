---
title: Lattices
type: assumption
level: mathematical-assumption
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: advanced
maturity: emerging
tags:
  - assumptions
  - lattices
  - post-quantum
post_quantum_posture: plausible
confidence_model:
  type: mathematical-assumption
---

# Lattices

## One-sentence intuition

Lattice-based cryptography relies on the apparent hardness of finding or distinguishing structured noisy points in high-dimensional grids.

## Where it sits in the taxonomy

- Level: mathematical assumption or substrate
- Parent category: assumptions
- Related concepts: post-quantum cryptography, homomorphic encryption, key encapsulation, signatures

## Problem it solves

Lattice assumptions provide a foundation for many post-quantum candidates and for advanced tools such as fully homomorphic encryption.

## Mental model

Imagine a high-dimensional grid where noise slightly moves points away from clean grid locations. Some problems ask an adversary to recover hidden structure from those noisy samples.

## Minimal example

Learning with errors (LWE)-style problems involve noisy linear equations. Informally:

$$
b = A s + e
$$

The secret is $s$, and $e$ is small noise. Recovering $s$ or distinguishing these samples from random should be hard for suitable parameters.

## Security properties

- Supports post-quantum key encapsulation and signatures in standardized families.
- Supports homomorphic encryption in many modern schemes.
- Can provide worst-case to average-case style security reductions in some settings.

## What it does not provide

- Automatic security for every parameter set.
- Simple implementations.
- Metadata privacy or access control by itself.

## Assumptions

Security depends on the concrete lattice problem, dimension, modulus, noise distribution, reduction quality, and implementation side-channel posture.

## Post-quantum posture

Plausible. Lattice-based schemes are central post-quantum candidates, but each scheme and parameter set still needs concrete analysis.

## Confidence model

Confidence comes from mathematical-assumption hardness, parameter selection, standardization review, and implementation discipline.

## Common constructions

- Learning with errors and module-LWE schemes.
- Lattice-based key encapsulation.
- Lattice-based signatures.
- Fully homomorphic encryption schemes.

## Concrete assumptions and schemes

| Family or scheme | Common role | Key differences and cautions |
| --- | --- | --- |
| LWE and module-LWE | Foundation for KEMs and encryption | Parameter choices control concrete security and failure behavior. |
| SIS and module-SIS | Foundation for signatures and commitments | Often appears in lattice signatures and proof systems. |
| NTRU-style lattices | Key encapsulation and encryption families | Different structure and parameter trade-offs from module-LWE families. |
| ML-KEM | Standardized post-quantum key encapsulation | Plausibly post-quantum; larger public keys and ciphertexts affect protocols. |
| ML-DSA | Standardized post-quantum signatures | Plausibly post-quantum; signature size and deterministic/randomized signing choices matter. |
| BFV, BGV, CKKS, TFHE/FHEW | Homomorphic encryption families | Workload fit, noise growth, bootstrapping, and approximation behavior differ sharply. |

## Use cases

- Post-quantum key establishment.
- Post-quantum signatures.
- Homomorphic encryption.
- Some functional-encryption research.

## Composition patterns

Lattice-based components are often combined with symmetric encryption, KDFs, signatures, and protocol transcript binding. Migration designs may combine classical and post-quantum mechanisms during transition.

## Failure modes and anti-patterns

- Choosing ad hoc parameters.
- Ignoring decryption-failure behavior.
- Treating all lattice assumptions as interchangeable.
- Assuming post-quantum posture removes implementation risk.

## Maturity and deployment

Emerging to deployed depending on the scheme. ML-KEM and ML-DSA are standardized, while many advanced lattice tools remain specialized or research-stage.

## Related concepts

- [Post-quantum posture](/docs/appendices/post-quantum-posture)
- [Homomorphic encryption](/docs/structured-primitives/homomorphic-encryption)
- [Key encapsulation and exchange](/docs/primitives/key-encapsulation-and-exchange)

## Further reading

- Regev, "On Lattices, Learning with Errors, Random Linear Codes, and Cryptography."
- NIST FIPS 203, "Module-Lattice-Based Key-Encapsulation Mechanism Standard."
- Gentry, "Fully Homomorphic Encryption Using Ideal Lattices."
