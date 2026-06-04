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

## Coverage added in recent passes

| Area | Added concept | Why it matters |
| --- | --- | --- |
| Basic primitives | [Authenticated encryption](/docs/primitives/authenticated-encryption) | Modern systems usually need confidentiality and integrity together; bare encryption is easy to misuse. |
| Protocols | [Oblivious pseudorandom functions](/docs/protocols/oblivious-pseudorandom-functions) | OPRFs are a common building block for password hardening, tokens, credentials, and PSI. |
| Protocols | [Private set intersection](/docs/protocols/private-set-intersection) | PSI is one of the core privacy-preserving computation protocols missing from the initial protocol set. |
| Security goals | [Additional security goals](/docs/taxonomy/additional-security-goals) | Covers verifiability, auditability, accountability, forward secrecy, and deniability. |
| Assumptions and substrates | [Additional assumptions and substrates](/docs/assumptions/additional-substrates) | Covers elliptic curves, finite-field groups, code-based assumptions, hash-to-curve, common reference strings, and proof-model distinctions. |
| Basic primitives | [Primitive engineering concepts](/docs/primitives/primitive-engineering-concepts) | Covers PRFs, PRPs, password hashing, nonce-misuse-resistant encryption, and key-committing encryption. |
| Structured primitives | [Advanced structured primitives](/docs/structured-primitives/advanced-structured-primitives) | Covers VRFs, blind signatures, polynomial/vector commitments, verifiable encryption, and e-cash primitives. |
| Proof systems | [Proof-system components](/docs/proof-systems/proof-system-components) | Covers polynomial commitments, FRI, folding, recursive proofs, lookup arguments, sumcheck, and arithmetization. |
| Protocols | [Additional protocol families](/docs/protocols/additional-protocol-families) | Covers oblivious transfer, PIR, PAKE, secure channels, anonymous tokens, blind-signature credentials, and private-payment protocols. |
| Systems | [Additional systems and applications](/docs/case-studies/additional-systems) | Covers private payments, ZK rollups, secure messaging, identity wallets, encrypted mempools, and private ML analytics. |
| Design patterns | [Operational design patterns](/docs/design-patterns/operational-design-patterns) | Covers encrypt-then-prove, threshold issuance, privacy-preserving revocation, domain separation, transcript binding, and key rotation. |

## Coverage status

The concepts previously listed as highest-value gaps now have first-pass coverage. Many are intentionally grouped by taxonomy area rather than promoted to standalone pages, because a full page for every subcomponent would make the sidebar harder to navigate before the book has enough depth to justify it.

| Taxonomy area | Missing or shallow concepts | Why they matter |
| --- | --- | --- |
| Security goals | covered in grouped page | Promote individual pages if the atlas adds a dedicated security-goal section. |
| Assumptions and substrates | covered in grouped page | Elliptic curves, code-based assumptions, and common reference strings are the strongest candidates for standalone pages. |
| Basic primitives | covered in grouped page | Password hashing and key-committing encryption are the strongest candidates for standalone pages. |
| Structured primitives | covered in grouped page | Polynomial commitments, blind signatures, and VRFs are the strongest candidates for standalone pages. |
| Proof systems | covered in grouped page | FRI, folding schemes, arithmetization, and lookup arguments deserve deeper pages before a ZK-rollup deep dive. |
| Protocols | covered in grouped page | Secure channels, oblivious transfer, PIR, and PAKE are the strongest candidates for standalone pages. |
| Systems | covered in grouped page | Private payments, ZK rollups, and secure messaging are the strongest candidates for full case studies. |
| Design patterns | covered in grouped page | Domain separation, transcript binding, and key rotation are the strongest candidates for implementation-oriented guidance. |

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

1. Promote Secure Channels to a full protocol page because TLS, HPKE, Noise, and Signal have enough depth to justify standalone treatment.
2. Promote Polynomial Commitments and Vector Commitments before expanding ZK rollup coverage.
3. Promote Private Payments and ZK Rollups to full case studies after proof-system component coverage deepens.
4. Promote Domain Separation and Transcript Binding to implementation-oriented design-pattern pages.
5. Add machine-readable `instance_of` data for concrete algorithms and schemes.

## Maintenance rule

For fast-moving areas such as post-quantum cryptography, zero-knowledge proof systems, fully homomorphic encryption, MPC frameworks, anonymous credentials, and blockchain privacy, re-check source freshness at least every six months. If a page has not been reviewed in that window, mark it `needs-review` rather than leaving it `current`.

## Bottom line

The taxonomy is sound. The atlas is now more mature as an educational map, but it is not complete. The biggest remaining gap is not top-level coverage; it is deeper standalone treatment of concrete instances, protocol suites, and system case studies.
