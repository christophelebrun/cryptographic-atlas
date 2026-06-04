---
title: Homomorphic Encryption
type: primitive
level: structured-primitive
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - homomorphic-encryption
  - encryption
post_quantum_posture: plausible
confidence_model:
  type: mathematical-assumption
source_review:
  window_months: 6
  next_review_due: '2026-12-04'
  notes: Re-check FHE standardization, Microsoft SEAL, OpenFHE, TFHE, Concrete ML, parameter guidance, and deployment cautions.
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

## Concrete schemes and families

| Family | Computation style | Typical role | Key differences and cautions |
| --- | --- | --- | --- |
| BFV | Exact arithmetic over integers modulo a plaintext modulus | Private tallying and exact arithmetic workloads | Good for exact values; parameter selection and batching shape performance. |
| BGV | Exact arithmetic with leveled homomorphic evaluation | Exact encrypted computation | Similar use space to BFV, with different noise-management techniques. |
| CKKS | Approximate arithmetic over real or complex values | Machine learning and statistical analytics | Approximate results are part of the design; precision and scale management are security-relevant engineering choices. |
| TFHE / FHEW-style schemes | Boolean or small-gate bootstrapped computation | Bit-level computation and programmable bootstrapping | Can support frequent bootstrapping; performance profile differs from arithmetic-circuit schemes. |
| Threshold HE variants | Shared decryption key across trustees | Private tallying and multi-party analytics | Adds a `t-of-n` confidence model on top of the encryption scheme. |

## Failure modes and anti-patterns

- Choosing parameters that do not meet the security or correctness target.
- Ignoring noise growth or implementation limits.
- Revealing too much through outputs or repeated queries.

## Further reading

- Gentry, [Fully Homomorphic Encryption Using Ideal Lattices](https://doi.org/10.1145/1536414.1536440).
- Microsoft Research, [Microsoft SEAL](https://www.microsoft.com/en-us/research/project/microsoft-seal/).
- OpenFHE contributors, [OpenFHE documentation](https://openfhe.org/documentation/).
- Zama, [Concrete ML documentation](https://docs.zama.org/concrete-ml/).
- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
