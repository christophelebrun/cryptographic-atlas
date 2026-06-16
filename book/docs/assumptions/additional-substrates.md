---
title: Additional Assumptions and Substrates
type: assumption
level: assumption
template: overview
status: needs-review
coverage_depth: routing-overview
last_reviewed: '2026-06-04'
review:
  structural:
    status: needs-review
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: intermediate
maturity: not-applicable
tags:
  - assumptions
  - substrates
  - elliptic-curves
post_quantum_posture: depends
confidence_model:
  type: depends
---

# Additional Assumptions and Substrates

This page is now a routing overview for substrate and model concepts that appear across concrete schemes.

## Classification matrix

| Concept | Level | Typical role | Post-quantum posture |
| --- | --- | --- | --- |
| [Elliptic curves](/docs/assumptions/elliptic-curves) | mathematical assumption / substrate | Groups for signatures, key agreement, commitments, pairings | vulnerable for discrete-log-based uses |
| Finite-field groups | mathematical assumption / substrate | Diffie-Hellman, Schnorr-style protocols, classically deployed groups | vulnerable |
| [Code-based assumptions](/docs/assumptions/code-based-assumptions) | mathematical assumption | Post-quantum encryption and key encapsulation candidates | plausible, scheme-dependent |
| Hash-to-curve | substrate / encoding method | Maps arbitrary strings into curve/group elements | depends on target group and encoding |
| [Common reference strings](/docs/assumptions/common-reference-strings) | setup assumption | Public parameters for proofs, commitments, and protocols | depends on generation model |
| Standard model vs random oracle | proof model distinction | Explains whether a proof idealizes a hash function | not-applicable to the distinction itself |

## Elliptic curves as a substrate

Elliptic curves provide finite groups with compact representations and efficient operations. They instantiate ECDH, ECDSA, EdDSA, Schnorr signatures, Pedersen commitments, BLS signatures, pairings, accumulators, and many proof-system commitments.

What they provide:

- Efficient group operations.
- Compact keys and signatures compared with many finite-field alternatives.
- Mature implementation ecosystems for selected curves.

What they do not provide:

- Post-quantum security for discrete-logarithm-based schemes.
- Safe parameter generation if a curve or subgroup is ad hoc.
- Complete protocol security without validation, domain separation, and context binding.

Assumptions and failure modes:

- The relevant elliptic-curve discrete-logarithm problem must be hard.
- Implementations must validate points, handle cofactors correctly, and use constant-time scalar operations.
- Failures include invalid-curve attacks, subgroup confusion, nonce reuse in signatures, and using the wrong curve for a protocol's security target.

## Finite-field groups

Finite-field groups are classic substrates for Diffie-Hellman, discrete-log assumptions, and Schnorr-style protocols.

What they provide:

- A well-studied discrete-logarithm setting.
- Standards-based safe-prime groups for interoperability.
- Conceptual simplicity for some proofs.

What they do not provide:

- Post-quantum security.
- Safety for small, custom, or trapdoored groups.
- Automatic validation of peer public values.

Assumptions and failure modes:

- The finite-field discrete-logarithm problem must be hard at the chosen size.
- Parameters must be reviewed, public values must be validated, and small-subgroup attacks must be prevented.

## Code-based assumptions

Code-based cryptography relies on the hardness of decoding or related problems for error-correcting codes. It is a major post-quantum family alongside lattices, hashes, multivariate assumptions, and isogenies.

What it provides:

- A different post-quantum assumption family from lattices.
- Mature history through McEliece-style encryption.
- Diversity for migration planning.

What it does not provide:

- Small public keys by default.
- Automatic protection from implementation side channels.
- A universal replacement for signatures, proofs, or advanced primitives.

Assumptions and failure modes:

- The decoding problem must remain hard for the selected code family and parameters.
- Deployments must handle key sizes, decapsulation behavior, and constant-time implementation.
- The posture is plausible for reviewed schemes, but scheme-specific analysis matters.

## Hash-to-curve

Hash-to-curve maps arbitrary strings into elliptic-curve points or group elements in a way that is suitable for cryptographic protocols.

What it provides:

- A standardized way to turn identifiers, messages, or transcript data into group elements.
- Domain separation through suite IDs and context labels.
- Avoidance of ad hoc encodings that bias outputs or fail on edge cases.

What it does not provide:

- Security for the protocol using the point.
- Protection if the wrong suite, domain tag, or curve is selected.
- Post-quantum security when the target group is quantum-vulnerable.

Assumptions and failure modes:

- The hash function and suite mapping must match the protocol's target group.
- Failures include missing domain separation, non-uniform encodings, and accepting invalid points.

## Common reference strings

A common reference string (CRS) is public setup material used by a proof system, commitment scheme, or protocol.

What it provides:

- Shared parameters needed for proving, verifying, committing, or encrypting.
- Sometimes succinctness or efficiency unavailable in transparent settings.
- A fixed public context for all participants.

What it does not provide:

- Honest generation by itself.
- Toxic-waste destruction.
- Public verifiability unless the setup process or update ceremony is designed for it.

Assumptions and failure modes:

- The CRS generation model must be explicit: trusted, updatable, transparent, or one-honest-party.
- Failures include hidden trapdoors, biased parameters, mismatched CRS files, and using a CRS for the wrong circuit or domain.

## Standard model vs random oracle distinctions

The standard model analyzes protocols without idealizing hash functions as perfect random oracles. The random oracle model treats a hash function as an ideal public random function for proof purposes.

What it provides:

- A way to compare proof assumptions.
- A warning that "proved secure" depends on the model.
- Vocabulary for Fiat-Shamir-style transformations and hash-based protocol proofs.

What it does not provide:

- A guarantee that a real hash function exactly behaves like the ideal model.
- A simple ranking where every standard-model construction is always better in practice.
- Protection from implementation or composition mistakes.

Assumptions and failure modes:

- Random-oracle proofs rely on the heuristic that the concrete hash behaves well enough for the use.
- Standard-model constructions may require stronger setup, larger parameters, or more complex assumptions.

## Confidence model

These concepts have different confidence models: mathematical-assumption for curve, finite-field, and code-based hardness; trusted-setup or public-verifiability for common reference strings; and model-assumption for random-oracle distinctions.

## Related concepts

- [Discrete Logarithm](/docs/assumptions/discrete-logarithm)
- [Elliptic Curves](/docs/assumptions/elliptic-curves)
- [Code-Based Assumptions](/docs/assumptions/code-based-assumptions)
- [Pairings](/docs/assumptions/pairings)
- [Lattices](/docs/assumptions/lattices)
- [Random Oracle Model](/docs/assumptions/random-oracle-model)
- [Trusted Setup](/docs/assumptions/trusted-setup)
- [Common Reference Strings](/docs/assumptions/common-reference-strings)

## Further reading

- RFC 7748, ["Elliptic Curves for Security"](https://www.rfc-editor.org/rfc/rfc7748).
- RFC 7919, ["Negotiated Finite Field Diffie-Hellman Ephemeral Parameters for TLS"](https://www.rfc-editor.org/rfc/rfc7919).
- RFC 9380, ["Hashing to Elliptic Curves"](https://www.rfc-editor.org/rfc/rfc9380).
- Bellare and Rogaway, ["Random Oracles are Practical"](https://cseweb.ucsd.edu/~mihir/papers/ro.pdf).
- NIST, ["Post-Quantum Cryptography Project"](https://csrc.nist.gov/Projects/post-quantum-cryptography).
