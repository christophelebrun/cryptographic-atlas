---
title: Glossary
type: glossary
level: not-applicable
template: glossary
status: current
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
difficulty: beginner
maturity: not-applicable
tags:
  - glossary
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Glossary

## Authenticated encryption

A symmetric encryption interface that provides plaintext confidentiality and lets receivers reject modified ciphertexts, often while authenticating public associated data.

Related: [Authenticated encryption](/docs/primitives/authenticated-encryption), [Symmetric encryption](/docs/primitives/symmetric-encryption), [Message authentication codes](/docs/primitives/message-authentication-codes).

## Anonymity

The property that an actor is hidden within a set of possible actors.

Related: [Security goals](/docs/taxonomy/security-goals), [Anonymous membership](/docs/design-patterns/anonymous-membership), [Mixnets](/docs/protocols/mixnets).

## Binding

For commitments, the property that a committer cannot open one commitment to two different values.

Related: [Commitments](/docs/primitives/commitments), [Pedersen commitments](/docs/primitives/pedersen-commitments), [Homomorphic commitments](/docs/structured-primitives/homomorphic-commitments).

## Commitment

A primitive that hides a value while binding the committer to that value for a later opening.

Related: [Commitments](/docs/primitives/commitments), [Delayed reveal](/docs/design-patterns/delayed-reveal), [Range proofs](/docs/proof-systems/range-proofs).

## Completeness

For proof systems, honest proofs for true statements should verify.

Related: [Zero-knowledge proofs](/docs/proof-systems/zero-knowledge-proofs), [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs).

## Confidence model

The source of confidence for a cryptographic guarantee, such as a hardness assumption, public verification, a trusted issuer, one honest party, or a threshold of honest parties.

Related: [Confidence models](/docs/appendices/confidence-models), [Assumptions](/docs/taxonomy/assumptions), [Trusted setup](/docs/assumptions/trusted-setup).

## Discrete logarithm

A mathematical problem where exponentiation is easy in a selected group but recovering the exponent should be hard.

Related: [Discrete logarithm](/docs/assumptions/discrete-logarithm), [Digital signatures](/docs/primitives/digital-signatures), [Pedersen commitments](/docs/primitives/pedersen-commitments).

## Factoring

The problem of recovering prime factors from a composite number.

Related: [Factoring and RSA](/docs/assumptions/factoring-rsa), [Public-key encryption](/docs/primitives/public-key-encryption), [Post-quantum posture](/docs/appendices/post-quantum-posture).

## Hiding

For commitments, the property that the commitment does not reveal the committed value before opening.

Related: [Commitments](/docs/primitives/commitments), [Pedersen commitments](/docs/primitives/pedersen-commitments).

## Lattice

A structured high-dimensional grid used as the substrate for many post-quantum schemes.

Related: [Lattices](/docs/assumptions/lattices), [Homomorphic encryption](/docs/structured-primitives/homomorphic-encryption), [Key encapsulation and exchange](/docs/primitives/key-encapsulation-and-exchange).

## Metadata leak

Information revealed outside the protected cryptographic payload, such as timing, size, participation, or public inputs.

Related: [Metadata leakage](/docs/appendices/metadata-leakage), [Composability](/docs/taxonomy/composability), [Threat-model checklist](/docs/appendices/threat-model-checklist).

## Multi-party computation

A protocol family where parties jointly compute a function without revealing their private inputs beyond the output.

Related: [MPC](/docs/protocols/mpc), [Secure aggregation](/docs/protocols/secure-aggregation), [Reveal only a function](/docs/design-patterns/reveal-only-a-function).

## Nullifier

A public value used to detect repeated anonymous actions within a context.

Related: [Nullifiers](/docs/protocols/nullifiers), [Anti-double-use nullifiers](/docs/design-patterns/anti-double-use-nullifiers), [Anonymous airdrop](/docs/systems-and-applications/anonymous-airdrop).

## Oblivious pseudorandom function

A two-party protocol where a client learns a keyed pseudorandom function output for its private input without learning the key and without revealing the input to the server.

Related: [Oblivious pseudorandom functions](/docs/protocols/oblivious-pseudorandom-functions), [Private set intersection](/docs/protocols/private-set-intersection), [Discrete logarithm](/docs/assumptions/discrete-logarithm).

## Pairing

A special map between algebraic groups that makes some hidden exponent relationships publicly checkable.

Related: [Pairings](/docs/assumptions/pairings), [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs), [Trusted setup](/docs/assumptions/trusted-setup).

## Post-quantum posture

An editorial classification of whether a construction is quantum-vulnerable, plausibly post-quantum, dependent on instantiation, unknown, or not applicable.

Related: [Post-quantum posture](/docs/appendices/post-quantum-posture), [Lattices](/docs/assumptions/lattices), [Discrete logarithm](/docs/assumptions/discrete-logarithm).

## Private set intersection

A protocol family that lets parties learn the overlap, size of overlap, or approved function of their private sets while limiting disclosure about non-matching elements.

Related: [Private set intersection](/docs/protocols/private-set-intersection), [Oblivious pseudorandom functions](/docs/protocols/oblivious-pseudorandom-functions), [MPC](/docs/protocols/mpc).

## Random oracle model

An idealized proof model that treats a hash function as a public random function.

Related: [Random oracle model](/docs/assumptions/random-oracle-model), [Hash functions](/docs/primitives/hash-functions), [Zero-knowledge proofs](/docs/proof-systems/zero-knowledge-proofs).

## Receipt-freeness

A property where a participant cannot create convincing evidence of how they acted.

Related: [Security goals](/docs/taxonomy/security-goals), [Make receipts useless](/docs/design-patterns/make-receipts-useless), [Coercion-resistant voting](/docs/systems-and-applications/coercion-resistant-voting).

## Soundness

For proof systems, false statements should not verify except with negligible probability.

Related: [Zero-knowledge proofs](/docs/proof-systems/zero-knowledge-proofs), [Range proofs](/docs/proof-systems/range-proofs), [Membership proofs](/docs/proof-systems/membership-proofs).

## Trusted setup

A parameter-generation process whose hidden trapdoor must not survive for the system's claims to hold.

Related: [Trusted setup](/docs/assumptions/trusted-setup), [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs), [Confidence models](/docs/appendices/confidence-models).

## Unlinkability

The property that two actions cannot be linked to the same actor under the stated model.

Related: [Security goals](/docs/taxonomy/security-goals), [Anonymous credentials](/docs/protocols/anonymous-credentials), [Mixnets](/docs/protocols/mixnets).

## Witness

Private information that makes a public proof statement true.

Related: [Zero-knowledge proofs](/docs/proof-systems/zero-knowledge-proofs), [Range proofs](/docs/proof-systems/range-proofs), [Membership proofs](/docs/proof-systems/membership-proofs).

## Zero-knowledge

The property that a proof reveals no information beyond the truth of the statement, under the proof system's model.

Related: [Zero-knowledge proofs](/docs/proof-systems/zero-knowledge-proofs), [SNARKs, STARKs, and Bulletproofs](/docs/proof-systems/snarks-starks-bulletproofs), [Random oracle model](/docs/assumptions/random-oracle-model).
