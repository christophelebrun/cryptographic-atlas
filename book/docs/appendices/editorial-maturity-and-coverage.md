---
title: Editorial Maturity and Coverage
type: appendix
level: not-applicable
template: reference
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - editorial
  - coverage
  - taxonomy
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Editorial Maturity and Coverage

This appendix states what "current" means for the atlas and which important concepts are still missing or shallow.

## Status model

| Status | Meaning in this book |
| --- | --- |
| current | Reviewed against the atlas template, taxonomy, caveat, post-quantum, confidence-model, and source expectations for the current scope. It does not mean exhaustive or production guidance. |
| needs-review | Known to be stale, shallow, or in a fast-moving area that needs a focused update before readers should treat it as current. |
| outdated | Contains claims that are known to be superseded or misleading. |
| draft | Structurally incomplete or not yet reviewed against the atlas editorial checklist. |

## Current maturity assessment

The taxonomy is good for the book's mission. It separates goals, assumptions, primitives, proof systems, protocols, systems, and design patterns, which prevents the common mistake of treating a named tool as a complete system design.

The recent "concrete instance" layer is the right way to place algorithms and schemes. It avoids turning names such as `AES-GCM`, `Ed25519`, `Groth16`, or `TLS 1.3` into a ninth peer taxonomy level. Those names should instead be described as instances of a parent concept, with `instance_of` metadata if the atlas later makes scheme coverage machine-readable.

One taxonomy tension remains: some objects are both building blocks and interactive protocols. Examples include oblivious transfer and oblivious pseudorandom functions. The current rule is:

- use `protocol` when the guarantee comes from interaction between parties;
- cross-link it as a building block where it is composed into MPC, PSI, credentials, or token systems;
- avoid creating a separate "protocol primitive" level unless the atlas later needs a more formal ontology.

## Coverage added in this pass

| Area | Added concept | Why it matters |
| --- | --- | --- |
| Basic primitives | [Authenticated encryption](/docs/primitives/authenticated-encryption) | Modern systems usually need confidentiality and integrity together; bare encryption is easy to misuse. |
| Protocols | [Oblivious pseudorandom functions](/docs/protocols/oblivious-pseudorandom-functions) | OPRFs are a common building block for password hardening, tokens, credentials, and PSI. |
| Protocols | [Private set intersection](/docs/protocols/private-set-intersection) | PSI is one of the core privacy-preserving computation protocols missing from the initial protocol set. |

## Important missing concepts

These are the highest-value gaps for future expansion.

| Taxonomy area | Missing or shallow concepts | Why they matter |
| --- | --- | --- |
| Security goals | verifiability, auditability, accountability, forward secrecy, deniability | Many systems claim "privacy" while relying on public audit or transcript properties that need precise goals. |
| Assumptions and substrates | elliptic curves as a substrate, finite-field groups, code-based assumptions, hash-to-curve, common reference strings, standard-model vs random-oracle distinctions | Current assumption pages cover the main families, but concrete curve/group/setup choices deserve clearer treatment. |
| Basic primitives | pseudorandom functions, pseudorandom permutations, password hashing, nonce-misuse-resistant encryption, key-committing encryption | These explain everyday engineering risks that recur across protocols. |
| Structured primitives | verifiable random functions, blind signatures, polynomial commitments, vector commitments, verifiable encryption, e-cash primitives | These are heavily used in blockchain, credentials, rollups, and private payments. |
| Proof systems | polynomial commitments, FRI, folding schemes, recursive proofs, lookup arguments, sumcheck, arithmetization | The proof-system overview is useful, but ZK engineering needs more concept pages below the family level. |
| Protocols | oblivious transfer, private information retrieval, password-authenticated key exchange, secure channels, anonymous tokens, blind-signature credentials, private payments | These are common in deployed privacy systems and would strengthen the bridge from primitives to systems. |
| Systems | private payments, ZK rollups, secure messaging, privacy-preserving identity wallets, encrypted mempools, private machine-learning analytics | The current system coverage is privacy/voting-heavy; broader deployed systems would make the atlas more balanced. |
| Design patterns | encrypt-then-prove, threshold issuance, revocation with privacy, domain separation, transcript binding, key rotation and migration | These recurring engineering patterns are where many real systems fail. |

## Source-depth gaps

The source registry now covers the main historical and standards references for existing pages, but depth is uneven.

Prioritize deeper sources for:

- post-quantum migration and algorithm status;
- concrete ZK proof-system families and polynomial commitments;
- threshold signing and distributed key generation;
- anonymous credentials, revocation, and selective disclosure;
- private payments and ledger metadata leakage;
- secure-channel protocols such as TLS 1.3, HPKE, Noise, Signal X3DH, and Double Ratchet.

## Recommended next content sequence

1. Add Oblivious Transfer as a protocol page and cross-link it from MPC and PSI.
2. Add Secure Channels covering TLS 1.3, HPKE, Noise, and Signal at the protocol-suite level.
3. Add Polynomial Commitments and Vector Commitments before expanding ZK rollup coverage.
4. Add Verifiable Random Functions and Blind Signatures as structured primitives used by randomness, credentials, and private payments.
5. Add Private Payments as a system page after the blind-signature and accumulator material is stronger.

## Maintenance rule

For fast-moving areas such as post-quantum cryptography, zero-knowledge proof systems, fully homomorphic encryption, MPC frameworks, anonymous credentials, and blockchain privacy, re-check source freshness at least every six months. If a page has not been reviewed in that window, mark it `needs-review` rather than leaving it `current`.

## Bottom line

The taxonomy is sound. The atlas is now more mature as an educational map, but it is not complete. The biggest remaining gap is not the top-level taxonomy; it is deeper coverage of concrete instances, protocol suites, and system case studies.
