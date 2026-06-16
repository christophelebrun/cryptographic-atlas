---
title: Encrypt-Then-Prove
type: pattern
level: design-pattern
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
review:
  structural:
    status: current
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: intermediate
maturity: mature
tags:
  - encryption
  - proofs
  - composition
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Encrypt-Then-Prove

## One-sentence intuition

Encrypt-then-prove encrypts data and proves a statement about the hidden plaintext.

## Where it sits in the taxonomy

- Level: design pattern.
- Parent category: encryption plus proof composition.
- Related concepts: [Verifiable Encryption](/docs/structured-primitives/verifiable-encryption), [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs), [Commitments](/docs/primitives/commitments).

## Problem it solves

Verifiers may need confidence that encrypted data is well formed without learning the data itself.

## Mental model

The ciphertext hides the object; the proof verifies a public rule about what is inside.

## Minimal example

An encrypted ballot includes a proof that the hidden vote is one of the allowed choices.

## Security properties

- Plaintext confidentiality.
- Proof of a public property.
- Binding between proof, ciphertext, recipient key, and context.

## What it does not provide

- Correct decryption behavior.
- Fairness.
- Metadata privacy.
- Correctness if the statement is too weak.

## Assumptions

- Encryption and proof-system assumptions both hold.
- The proof references the exact ciphertext and recipient key.
- Public inputs include the right context.

## Post-quantum posture

Depends on the encryption and proof system. A post-quantum layer can be weakened by classical signatures, commitments, or setup.

## Confidence model

Confidence is mixed: mathematical assumptions for encryption and proofs, public-verifiability for proof checks, and operational trust in decryptors.

## Common constructions

- Encrypted ballot validity proofs.
- Verifiable encryption.
- Encrypted order or bid constraints.

## Use cases

- Voting.
- Private payments.
- Auctions.
- Recovery and dispute workflows.

## Composition patterns

Encrypt-then-prove composes with transcript binding, domain separation, key management, and metadata minimization.

## Failure modes and anti-patterns

- Proof not bound to ciphertext.
- Recipient key omitted.
- Public inputs leak sensitive values.
- Decryptor can refuse service.

## Maturity and deployment

Mature as a pattern, but system-specific statement design needs expert review.

## Related concepts

- [Verifiable Encryption](/docs/structured-primitives/verifiable-encryption)
- [Electronic Voting](/docs/protocols/e-voting)
- [Transcript Binding](/docs/design-patterns/transcript-binding)

## Further reading

- [Camenisch and Shoup, "Practical Verifiable Encryption and Decryption of Discrete Logarithms"](https://doi.org/10.1007/3-540-36413-7_9).
- [Goldwasser, Micali, and Rackoff, "The Knowledge Complexity of Interactive Proof Systems"](https://doi.org/10.1137/0218012).
