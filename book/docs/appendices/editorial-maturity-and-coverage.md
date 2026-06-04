---
title: Editorial State, Coverage, and Backlog
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

# Editorial State, Coverage, and Backlog

This appendix states what "current" means for the atlas, how coverage depth is labeled, what changed in recent editorial passes, and which work remains.

## Status model

| Status | Meaning in this book |
| --- | --- |
| current | Reviewed against the atlas template, taxonomy, caveat, post-quantum, confidence-model, and source expectations for the current scope. It does not mean exhaustive or production guidance. |
| needs-review | Known to be stale, shallow, or in a fast-moving area that needs a focused update before readers should treat it as current. |
| outdated | Contains claims that are known to be superseded or misleading. |
| draft | Structurally incomplete or not yet reviewed against the atlas editorial checklist. |

## Coverage-depth model

`status` and `coverage_depth` answer different questions. A page can be `status: current` because it has been reviewed, while still being `coverage_depth: grouped-first-pass` because it intentionally summarizes several concepts.

| Coverage depth | Meaning |
| --- | --- |
| standalone | A concept, protocol, pattern, or case study has its own template-complete page and concept card when applicable. |
| grouped-first-pass | Several related concepts are covered in one reviewed overview page. This is acceptable for breadth, but not a substitute for standalone depth. |
| overview | A landing or orientation page for a section. |
| reference | Appendix-style reference material. |
| not-applicable | Pages where coverage depth is not meaningful. |

## Current maturity assessment

The taxonomy is good for the book's mission. It separates goals, assumptions, primitives, proof systems, protocols, systems, and design patterns, which prevents the common mistake of treating a named tool as a complete system design.

The concrete instance layer is the right way to place algorithms and schemes. It avoids turning names such as `AES-GCM`, `Ed25519`, `Groth16`, or `TLS 1.3` into a ninth peer taxonomy level. Those names are now tracked in `book/data/instances.yml` with machine-readable `instance_of` relationships to parent concept-card IDs.

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
| Protocols | [Secure Channels](/docs/protocols/secure-channels) | Promotes TLS, HPKE, Noise, and Signal-style channel assumptions into standalone treatment. |
| Protocols | [Oblivious Transfer](/docs/protocols/oblivious-transfer) | Separates a core MPC building block from the broader protocol-family overview. |
| Protocols | [Private Information Retrieval](/docs/protocols/private-information-retrieval) | Clarifies query privacy, non-collusion, and database freshness assumptions. |
| Protocols | [Password-Authenticated Key Exchange](/docs/protocols/password-authenticated-key-exchange) | Distinguishes PAKE from password hashing and ordinary secure channels. |
| Structured primitives | [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments) | Pulls out a central proof-system and rollup dependency with setup and post-quantum caveats. |
| Structured primitives | [Vector Commitments](/docs/structured-primitives/vector-commitments) | Gives indexed commitments and authenticated state roots a proper taxonomy location. |
| Systems | [Private Payments](/docs/case-studies/private-payments) | Promotes note/nullifier, e-cash, wallet, and metadata risks into a full case study. |
| Systems | [ZK Rollups](/docs/case-studies/zk-rollups) | Separates validity proofs from data availability, sequencing, and governance assumptions. |
| Design patterns | [Domain Separation](/docs/design-patterns/domain-separation) | Makes context labeling explicit as a reusable implementation pattern. |
| Design patterns | [Transcript Binding](/docs/design-patterns/transcript-binding) | Makes transcript completeness a standalone composition rule. |
| Design patterns | [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation) | Gives revocation a privacy-aware operational pattern instead of a footnote inside credentials. |
| Data model | [Concrete Algorithms and Schemes](/docs/appendices/concrete-algorithms-and-schemes) | Adds machine-readable concrete-instance data via `book/data/instances.yml`. |

## Coverage status

The concepts previously listed as highest-value gaps now have first-pass coverage. The highest-priority grouped concepts identified in the review have been promoted to standalone pages. Some grouped overview pages remain because they provide useful section maps.

| Taxonomy area | Missing or shallow concepts | Why they matter |
| --- | --- | --- |
| Security goals | covered in grouped page | Promote individual pages if the atlas adds a dedicated security-goal section. |
| Assumptions and substrates | covered in grouped page | Elliptic curves, code-based assumptions, and common reference strings are the strongest candidates for standalone pages. |
| Basic primitives | covered in grouped page | Password hashing and key-committing encryption are the strongest candidates for standalone pages. |
| Structured primitives | partially promoted | Blind signatures, VRFs, verifiable encryption, and e-cash primitives remain grouped. |
| Proof systems | covered in grouped page | FRI, folding schemes, arithmetization, sumcheck, recursion, and lookup arguments deserve standalone pages as ZK coverage deepens. |
| Protocols | partially promoted | Anonymous tokens, blind-signature credentials, and private-payment protocol families remain grouped. |
| Systems | partially promoted | Secure messaging, identity wallets, encrypted mempools, and private ML analytics remain grouped. |
| Design patterns | partially promoted | Key rotation and migration, encrypt-then-prove, and threshold issuance remain grouped. |

## Source-depth gaps

The source registry now covers the main historical and standards references for existing pages, but depth is uneven.

Prioritize deeper sources for:

- post-quantum migration and algorithm status;
- concrete ZK proof-system families and polynomial commitments;
- threshold signing and distributed key generation;
- anonymous credentials, revocation, and selective disclosure;
- private payments and ledger metadata leakage;
- secure-channel protocols such as TLS 1.3, HPKE, Noise, Signal X3DH, and Double Ratchet.

## Remaining editorial backlog

This is the authoritative maintenance backlog. Do not duplicate the active list in `TODO.md`.

1. Promote grouped coverage into full standalone pages for elliptic curves, code-based assumptions, common reference strings, password hashing, key-committing encryption, blind signatures, VRFs, verifiable encryption, e-cash primitives, FRI, folding schemes, arithmetization, sumcheck, recursion, lookup arguments, anonymous tokens, blind-signature credentials, secure messaging, identity wallets, encrypted mempools, private ML analytics, key rotation, encrypt-then-prove, and threshold issuance.
2. Add deeper source coverage for ZK proof-system families, threshold signing, anonymous credentials, private payments, secure channels, encrypted mempools, identity wallets, and post-quantum migration.
3. Expand `book/data/instances.yml` to cover more concrete algorithms, parameter families, curves, proof-system constructions, protocol suites, and legacy schemes.
4. Add generated rendering for comparison-matrix YAML so matrix data is machine-readable and reader-facing.
5. Add source freshness review dates or review windows to fast-moving reference clusters.
6. Add topic-local URLs in `Further reading` sections when older pages still cite sources by title only.

## Timestamped editorial changelog

| Date | Change |
| --- | --- |
| 2026-06-04 | Added AI-generation disclosure to homepage, intro, footer, and PDF cover. |
| 2026-06-04 | Added PDF table-of-contents page numbers and clickable concept-card navigation. |
| 2026-06-04 | Added first-pass grouped coverage for missing security goals, assumptions, primitive engineering concepts, structured primitives, proof-system components, protocol families, systems, and operational design patterns. |
| 2026-06-04 | Promoted secure channels, oblivious transfer, private information retrieval, password-authenticated key exchange, polynomial commitments, vector commitments, private payments, ZK rollups, domain separation, transcript binding, and privacy-preserving revocation to standalone pages with concept cards. |
| 2026-06-04 | Added machine-readable concrete-instance data in `book/data/instances.yml` and validation for `instance_of` and reference IDs. |
| 2026-06-04 | Added generated diagram sources for secure-channel handshakes, ZK-rollup data flow, private-payment note/nullifier flow, and privacy-preserving revocation. |

## Maintenance rule

For fast-moving areas such as post-quantum cryptography, zero-knowledge proof systems, fully homomorphic encryption, MPC frameworks, anonymous credentials, and blockchain privacy, re-check source freshness at least every six months. If a page has not been reviewed in that window, mark it `needs-review` rather than leaving it `current`.

## Bottom line

The taxonomy is sound. The atlas is now more mature as an educational map, and the highest-priority gaps have standalone pages. The biggest remaining gap is deeper standalone treatment, structured source freshness, and fuller machine-readable coverage of instances, relationships, and comparison data.
