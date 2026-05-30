---
title: Homomorphic Encryption
type: primitive
level: structured-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: emerging
tags:
  - homomorphic-encryption
  - encryption
post_quantum_posture: plausible
confidence_model:
  type: mathematical-assumption
---

# Homomorphic Encryption

## One-sentence intuition

Homomorphic encryption allows computation on ciphertexts so that decrypting the result reveals the result of a computation on the plaintexts.

At a high level, evaluation over ciphertexts should agree with evaluating the function over plaintexts:

$$
\operatorname{Dec}_{sk}(\operatorname{Eval}(f, c_1, \ldots, c_n))
= f(m_1, \ldots, m_n)
$$

where each ciphertext hides a message:

$$
c_i = \operatorname{Enc}_{pk}(m_i)
$$

## Types

- Partially homomorphic encryption supports limited operations.
- Somewhat homomorphic encryption supports bounded computations.
- Fully homomorphic encryption (FHE) supports general computation in principle.

For an additive homomorphic scheme, the useful shape is:

$$
\operatorname{Dec}_{sk}(c_1 \oplus c_2) = m_1 + m_2
$$

## Post-quantum posture

Plausible for many lattice-based homomorphic encryption families, assuming appropriate parameters and implementations. The posture still depends on the concrete scheme, security level, and whether surrounding signatures, proofs, or key-management layers are post-quantum.

## Confidence model

Confidence usually comes from a scheme-specific hardness assumption, correct parameter selection, secure key generation, and protection of decryption keys. In threshold or multi-key settings, the confidence model also includes the trustee or participant threshold.

## What it does not provide

- Automatic input validity.
- Protection against malicious outputs without verification.
- Metadata privacy.
- Practical efficiency for every workload.

## Assumptions

The scheme-specific hardness assumption, parameter set, noise budget, key-management model, and implementation side-channel posture must all match the workload and threat model.

## Use cases

- Private tallying.
- Confidential analytics.
- Encrypted computation services.

## Failure modes and anti-patterns

- Choosing parameters that do not meet the security or correctness target.
- Ignoring noise growth or implementation limits.
- Revealing too much through outputs or repeated queries.

## Further reading

- Craig Gentry, "Fully Homomorphic Encryption Using Ideal Lattices."
- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
