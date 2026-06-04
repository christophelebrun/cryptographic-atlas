---
title: Elliptic Curves
type: assumption
level: mathematical-assumption
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - elliptic-curves
  - discrete-logarithm
  - substrate
post_quantum_posture: vulnerable
confidence_model:
  type: mathematical-assumption
---

# Elliptic Curves

## One-sentence intuition

Elliptic curves provide finite groups where discrete-logarithm problems can support compact signatures, key exchange, commitments, and pairings.

## Where it sits in the taxonomy

- Level: mathematical assumption or substrate.
- Parent category: [Discrete Logarithm](/docs/assumptions/discrete-logarithm).
- Related concepts: [Digital Signatures](/docs/primitives/digital-signatures), [Key Encapsulation and Exchange](/docs/primitives/key-encapsulation-and-exchange), [Pairings](/docs/assumptions/pairings).

## Problem it solves

Elliptic-curve groups give efficient public-key cryptography with smaller keys and signatures than many finite-field alternatives, while still relying on a well-studied discrete-logarithm hardness assumption.

## Mental model

The curve is the playing field; the base point is a public direction; multiplying by a secret scalar is easy, but recovering that scalar from the resulting point should be hard.

## Minimal example

In X25519, Alice and Bob exchange curve points derived from secret scalars. Each combines the other party's public point with their own scalar to obtain a shared secret that a secure-channel protocol must authenticate and bind into a transcript.

## Security properties

- Efficient discrete-logarithm-based public-key operations.
- Compact signatures and key agreement.
- Optional algebraic structure for commitments, accumulators, and pairings in selected curves.

## What it does not provide

- Post-quantum security.
- Safe encodings by default.
- Endpoint authentication without a protocol.
- Protection from invalid-curve, subgroup, or side-channel implementation mistakes.

## Assumptions

- The chosen curve has a large prime-order subgroup or safe cofactor handling.
- Scalar multiplication, point validation, and encodings follow the scheme specification.
- Randomness and nonce handling are correct for signature schemes that require it.
- Implementations resist timing, fault, and invalid-input attacks.

## Post-quantum posture

Vulnerable. Shor's algorithm breaks elliptic-curve discrete logarithms on a sufficiently capable quantum computer.

## Confidence model

Confidence comes from mathematical-assumption security, public parameter review, conservative curve selection, and implementation review.

## Common constructions

- X25519 and X448 key agreement.
- Ed25519 and Ed448 signatures.
- ECDSA over NIST curves or secp256k1.
- Pairing-friendly curves such as BLS12-381 and BN254.

## Use cases

- TLS and Noise handshakes.
- Wallet and software signatures.
- Commitments and zero-knowledge systems.
- Threshold signing and verifiable randomness.

## Composition patterns

Elliptic-curve operations must be wrapped in protocols that bind identities, suites, public keys, and transcripts. The curve operation is a substrate, not a complete channel or signature policy.

## Failure modes and anti-patterns

- Invalid point or subgroup attacks.
- ECDSA nonce reuse.
- Ambiguous encodings.
- Choosing obscure or custom curves.
- Treating curve choice as the only security decision.

## Maturity and deployment

Widely deployed and mature, but quantum-vulnerable. New systems should plan migration paths for public-key uses that need long-term security.

## Related concepts

- [Discrete Logarithm](/docs/assumptions/discrete-logarithm)
- [Pairings](/docs/assumptions/pairings)
- [Post-Quantum Posture](/docs/appendices/post-quantum-posture)

## Further reading

- [RFC 7748: Elliptic Curves for Security](https://www.rfc-editor.org/rfc/rfc7748).
- [RFC 8032: Edwards-Curve Digital Signature Algorithm](https://www.rfc-editor.org/rfc/rfc8032).
- [NIST FIPS 186-5: Digital Signature Standard](https://csrc.nist.gov/pubs/fips/186-5/final).
