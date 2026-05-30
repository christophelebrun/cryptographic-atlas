---
title: Randomness and Nonces
type: primitive
level: basic-primitive
template: concept
status: draft
last_reviewed: '2026-05-30'
difficulty: beginner
maturity: deployed
tags:
  - randomness
  - nonces
post_quantum_posture: not-applicable
confidence_model:
  type: client-side-secret
---

# Randomness and Nonces

## One-sentence intuition

Randomness and nonces provide the fresh or unique values that many cryptographic schemes need to stay secure.

## Security properties

- Unpredictability for secrets, keys, salts, and some protocol challenges.
- Uniqueness for nonces in schemes that require no reuse.

## What it does not provide

- Security if the surrounding scheme is misused.
- Confidentiality or authentication by itself.
- A substitute for domain separation.

## Assumptions

Random values must come from an appropriate random-number generator, nonces must satisfy the exact uniqueness or unpredictability rule of the scheme, and failures must be detectable where possible.

## Post-quantum posture

Not applicable as a standalone category. Randomness quality matters equally in classical and post-quantum systems.

## Confidence model

Confidence depends on local entropy sources, deterministic derivation where appropriate, implementation checks, and operational monitoring for reuse or generator failure.

## Use cases

- Encryption nonces.
- Signature nonces.
- Commitment randomness.
- Protocol challenges.

## Failure modes and anti-patterns

- Reusing a signature nonce in schemes where it exposes the private key.
- Reusing encryption nonces in modes that require uniqueness.
- Treating predictable identifiers as random values.

## Further reading

- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
- Katz and Lindell, "Introduction to Modern Cryptography."
