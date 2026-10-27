---
title: Verifiability
type: taxonomy
level: security-goal
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-10-27'
review:
  structural:
    status: current
    last_reviewed: '2026-10-27'
  sources:
    status: current
    last_reviewed: '2026-10-27'
    next_review_due: '2027-04-27'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: beginner
maturity: not-applicable
tags:
  - security-goals
  - verifiability
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Verifiability

## One-sentence intuition

Verifiability means you can check a stated claim using evidence, instead of accepting the claimant's word. Cryptographic proofs make this precise through properties such as completeness and soundness. [Goldwasser, Micali, and Rackoff][zk].

## Where it sits in the taxonomy

- Level: security goal (level 1).
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Auditability](/docs/taxonomy/auditability), [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs), [Membership Proofs](/docs/proof-systems/membership-proofs).

## Problem it solves

An operator says that a record is included in a log or that a computation followed the rules. Verifiability gives a checker a way to assess that particular claim. It moves trust toward the verification rules, their inputs, and their assumptions; it does not remove all trust. [RFC 9162, §2][ct]; [Goldwasser, Micali, and Rackoff][zk].

## Mental model

Think of a worked answer that can be checked against a precise question. The check is useful only if it asks the question you actually care about.

## Minimal example

A log operator gives Alice a Merkle inclusion proof for a certificate. Alice checks the proof against a particular authenticated tree root and tree size. Success establishes inclusion in that tree; it does not show that the certificate was legitimately issued or that the operator shows everyone the same tree. Those need separate monitoring and consistency checks. [RFC 9162, §§2.1 and 11][ct].

## Security properties

- **Completeness:** honest proofs of valid statements should be accepted under the scheme's definition.
- **Soundness:** a false statement should not be accepted except with the permitted error probability or attack advantage.
- **Verification scope:** public verification is available to anyone with the public evidence; designated verification may require a particular party's secret.

These are different properties. Zero knowledge adds a disclosure limit; it is not a synonym for soundness or public verifiability. [Goldwasser, Micali, and Rackoff][zk]; [Boneh and Shoup, proof systems][book].

## What it does not provide

- Truth of an external input: a proof about a supplied temperature does not measure the room.
- Correctness of rules that were encoded incorrectly.
- Availability of underlying data or continued service.
- Privacy unless the mechanism explicitly provides it.

An inclusion proof, for example, is about a tree entry, not the legitimacy of that entry or the completeness of the world's records. [RFC 9162, §§2 and 11][ct].

## Assumptions

The intended statement must be encoded correctly. Obtain authentic roots or verification parameters, bind all relevant inputs, run the complete verifier, and state any trusted-setup assumptions. Soundness is always relative to a particular proof system and adversary model. [Boneh and Shoup, proof systems][book].

## Post-quantum posture

**Not applicable to the goal.** Proofs, hashes, commitments, and signatures must be assessed individually. In a signed Merkle log, quantum-resistant tree hashing alone does not upgrade a vulnerable log-signing key. [RFC 9162, §§2 and 10][ct]; [NIST post-quantum project][pqc].

## Confidence model

**Depends:** public-verifiability for public proofs; a designated verifier or shared secret for other mechanisms. Mathematical assumptions, setup, and authentic public inputs remain separate dependencies. Do not infer public verifiability from the word “proof.” [Boneh and Shoup][book].

## Common constructions

Signatures verify a message under a key; Merkle proofs verify membership or consistency relative to roots; proof systems verify formally specified statements. They answer different questions. [Boneh and Shoup][book]; [RFC 9162, §2][ct].

## Use cases

Log inclusion and consistency checks, credential verification, and computation proofs use this goal. Ask which claim each check actually establishes before extending it to an entire application. [RFC 9162][ct]; [Boneh and Shoup][book].

## Composition patterns

[Integrity](/docs/taxonomy/integrity) protects the evidence, [Authenticity](/docs/taxonomy/authenticity) identifies the expected key or authority, and [Auditability](/docs/taxonomy/auditability) preserves evidence for later review. Certificate Transparency shows why proofs still need monitoring and responses. [RFC 9162, §§8 and 11][ct].

## Failure modes and anti-patterns

:::warning Check the statement as well as the proof
A valid proof against the wrong root, application, or public inputs answers the wrong question. A log inclusion proof also cannot reveal every unlogged event. Verification is bounded by its inputs and rules. [RFC 9162, §§2 and 11][ct]; [Boneh and Shoup][book].
:::

## Maturity and deployment

**Widely deployed mechanisms:** signatures and authenticated data structures. Advanced proof systems have different maturity levels; their common ability to verify claims is not evidence of equal deployment readiness. [Boneh and Shoup][book]; [RFC 9162][ct].

## Related concepts

- [Accumulators and Merkle Trees](/docs/structured-primitives/accumulators-and-merkle-trees)
- [Transcript Binding](/docs/design-patterns/transcript-binding)
- [ZK Rollups](/docs/systems-and-applications/zk-rollups)

## Further reading

- [Goldwasser, Micali, and Rackoff, The Knowledge Complexity of Interactive Proof Systems][zk] (1989) - proof properties and zero knowledge.
- [Boneh and Shoup, A Graduate Course in Applied Cryptography][book] - definitions and proof-system models.
- [RFC 9162: Certificate Transparency Version 2.0][ct], §§2 and 11 - what log proofs do and do not establish; an experimental protocol specification.

[zk]: https://doi.org/10.1137/0218012
[book]: https://toc.cryptobook.us/
[ct]: https://www.rfc-editor.org/rfc/rfc9162
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
