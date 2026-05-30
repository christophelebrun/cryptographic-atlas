---
title: Homomorphic Encryption
type: primitive
level: structured-primitive
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: emerging
tags:
  - homomorphic-encryption
  - encryption
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

## What it does not provide

- Automatic input validity.
- Protection against malicious outputs without verification.
- Metadata privacy.
- Practical efficiency for every workload.

## Use cases

- Private tallying.
- Confidential analytics.
- Encrypted computation services.

## Failure modes

- Choosing parameters that do not meet the security or correctness target.
- Ignoring noise growth or implementation limits.
- Revealing too much through outputs or repeated queries.

## Further reading

- TODO: Add verified references for homomorphic encryption families.
