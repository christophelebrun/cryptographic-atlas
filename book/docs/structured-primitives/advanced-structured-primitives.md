---
title: Advanced Structured Primitives
type: primitive
level: structured-primitive
template: overview
status: needs-review
coverage_depth: routing-overview
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - structured-primitives
  - commitments
  - credentials
post_quantum_posture: depends
confidence_model:
  type: depends
---

# Advanced Structured Primitives

This page is now a routing overview for primitives that add structure beyond basic encryption, signatures, commitments, or hashes.

This is a grouped overview. [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments) and [Vector Commitments](/docs/structured-primitives/vector-commitments) now have standalone pages because their assumptions and failure modes are important enough to track separately.

## Classification matrix

| Concept | Level | Typical role | Main caution |
| --- | --- | --- | --- |
| [Verifiable random functions (VRFs)](/docs/structured-primitives/verifiable-random-functions) | structured primitive | Publicly verifiable pseudorandom output from a secret key | Usually signature-like and scheme-specific. |
| [Blind signatures](/docs/structured-primitives/blind-signatures) | structured primitive | Signer authorizes a hidden message | Blindness does not imply unlinkable spending by itself. |
| [Polynomial commitments](/docs/structured-primitives/polynomial-commitments) | structured primitive / proof-system building block | Commit to a polynomial and open evaluations | Setup, pairing, or transcript assumptions vary. |
| [Vector commitments](/docs/structured-primitives/vector-commitments) | structured primitive | Commit to indexed values with compact openings | Update, non-membership, and setup models differ. |
| [Verifiable encryption](/docs/structured-primitives/verifiable-encryption) | structured primitive | Encrypt while proving something about the plaintext | Easy to prove the wrong statement or leak metadata. |
| [E-cash primitives](/docs/structured-primitives/e-cash-primitives) | structured primitive family | Issue, transfer, and redeem digital coins with privacy controls | Double-spend handling and issuer trust dominate. |

## Verifiable random functions

A verifiable random function (VRF) lets a secret-key holder produce pseudorandom output plus a public proof that the output was derived from a specific input and public key.

Security properties:

- Pseudorandom output to parties without the secret key.
- Public verifiability of correct evaluation.
- Uniqueness: one valid output for a given key and input, depending on the scheme.

What it does not provide:

- Unbiased public randomness if the key holder can choose whether to publish.
- Anonymity of the key holder.
- Protection if the secret key is compromised.

Assumptions and failure modes:

- Many deployed VRFs rely on elliptic-curve assumptions and are quantum-vulnerable.
- Failures include grinding inputs, withholding unfavorable outputs, and missing domain separation.

## Blind signatures

A blind signature lets a user obtain a signature on a message without the signer seeing the message.

Security properties:

- Blindness: the signer should not link issuance to the final signed message.
- Unforgeability: users should not obtain more valid signatures than allowed.
- Public or issuer-side verification, depending on the scheme.

What it does not provide:

- Revocation.
- Double-spend prevention.
- Protection from network or timing linkage.
- Attribute disclosure control unless combined with a credential protocol.

Assumptions and failure modes:

- The signature assumption must hold and the blinding protocol must be implemented correctly.
- Failures include issuing without rate limits, using linkable metadata, or assuming blindness survives payment, transport, or redemption logs.

## Polynomial commitments

A polynomial commitment binds a committer to a polynomial while allowing compact proofs of evaluations.

Security properties:

- Binding to a polynomial.
- Compact opening proofs for claimed evaluations.
- Often batching or aggregation support.

What it does not provide:

- Hiding unless the scheme includes it.
- Transparent setup in all constructions.
- Post-quantum posture by default.

Assumptions and failure modes:

- KZG commitments rely on pairings and structured setup; inner-product commitments rely on discrete-log assumptions; FRI-style commitments rely more heavily on hashes and coding theory.
- Failures include toxic-waste setup, domain mismatch, and verifying an opening for the wrong polynomial or evaluation point.

## Vector commitments

A vector commitment binds to an indexed list of values and supports compact proofs for individual positions.

Security properties:

- Binding to a vector.
- Opening proofs for selected indices.
- Sometimes efficient updates.

What it does not provide:

- Privacy of the vector unless hiding is added.
- Freshness without authenticated roots or update rules.
- Efficient non-membership in every construction.

Assumptions and failure modes:

- The posture depends on whether the scheme is Merkle/hash-based, RSA-based, pairing-based, or polynomial-commitment-based.
- Failures include stale roots, ambiguous indexing, and update-witness inconsistency.

## Verifiable encryption

Verifiable encryption lets a party encrypt a value while proving that the ciphertext encrypts a plaintext satisfying a public statement.

Security properties:

- Plaintext confidentiality under the encryption scheme.
- Public or verifier-specific proof that the encrypted plaintext has a required property.
- Binding between proof, ciphertext, public key, and context.

What it does not provide:

- Decryption fairness.
- Correct behavior by the decryptor after decryption.
- Metadata privacy for ciphertext size, recipient, or timing.

Assumptions and failure modes:

- The encryption and proof-system assumptions both matter.
- Failures include proving a weak statement, omitting recipient/context binding, and relying on a decryptor who can refuse service.

## E-cash primitives

E-cash primitives support issuance, transfer, redemption, and double-spend handling for digital value with privacy goals.

Security properties:

- Issuer authenticity for minted value.
- Spending privacy under the scheme's model.
- Double-spend detection or prevention.
- Sometimes offline detection of double-spenders.

What it does not provide:

- Monetary policy or solvency guarantees.
- Network anonymity.
- Protection from ledger, timing, or amount metadata.
- Regulation or dispute resolution.

Assumptions and failure modes:

- Confidence may come from blind signatures, commitments, zero-knowledge proofs, accumulators, nullifiers, or issuer ledgers.
- Failures include linkable issuance/redemption, broken double-spend rules, and confusing privacy of coins with privacy of users.

## Post-quantum posture

Depends on the construction. Hash-based vector commitments may be plausible; pairing, RSA, and elliptic-curve-based commitments, VRFs, blind signatures, and many e-cash systems are quantum-vulnerable unless replaced by post-quantum schemes.

## Confidence model

Confidence varies: mathematical-assumption for core schemes, public-verifiability for openings and proofs, trusted-issuer for e-cash issuance, and trusted-setup for some commitment and proof-system deployments.

## Related concepts

- [Commitments](/docs/primitives/commitments)
- [Accumulators and Merkle Trees](/docs/structured-primitives/accumulators-and-merkle-trees)
- [Blind Signatures](/docs/structured-primitives/blind-signatures)
- [Verifiable Random Functions](/docs/structured-primitives/verifiable-random-functions)
- [Verifiable Encryption](/docs/structured-primitives/verifiable-encryption)
- [E-cash Primitives](/docs/structured-primitives/e-cash-primitives)
- [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs)
- [Private Payments](/docs/systems-and-applications/private-payments)
- [Anonymous Tokens](/docs/protocols/anonymous-tokens)

## Further reading

- Micali, Rabin, and Vadhan, ["Verifiable Random Functions"](https://people.seas.harvard.edu/~salil/research/VRF-abs.html).
- Chaum, ["Blind Signatures for Untraceable Payments"](https://www.chaum.com/publications/Chaum-blind-signatures.PDF).
- Kate, Zaverucha, and Goldberg, ["Constant-Size Commitments to Polynomials and Their Applications"](https://www.iacr.org/archive/asiacrypt2010/6477178/6477178.pdf).
- Catalano and Fiore, ["Vector Commitments and Their Applications"](https://eprint.iacr.org/2011/495).
- Camenisch and Shoup, ["Practical Verifiable Encryption and Decryption of Discrete Logarithms"](https://www.shoup.net/papers/verenc.pdf).
- Chaum, Fiat, and Naor, ["Untraceable Electronic Cash"](https://www.wisdom.weizmann.ac.il/~naor/PAPERS/chaum_fiat_naor.pdf).
