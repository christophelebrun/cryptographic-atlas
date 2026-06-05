---
title: Editorial State, Coverage, and Backlog
type: appendix
level: not-applicable
template: reference
status: current
last_reviewed: '2026-06-05'
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
| routing-overview | A formerly grouped page that now mostly routes readers to standalone pages while retaining a compact comparison map. |
| overview | A landing or orientation page for a section. |
| reference | Appendix-style reference material. |
| not-applicable | Pages where coverage depth is not meaningful. |

## Current maturity assessment

The taxonomy is good for the book's mission. It separates goals, assumptions, primitives, proof systems, protocols, systems, and design patterns, which prevents the common mistake of treating a named tool as a complete system design.

The concrete instance layer is the right way to place algorithms and schemes. It avoids turning names such as `AES-GCM`, `Ed25519`, `Groth16`, or `TLS 1.3` into a ninth peer taxonomy level. Those names are tracked in `book/data/instances.yml` with machine-readable `instance_of` relationships to parent concept-card IDs.

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
| Systems | [Systems and Applications Overview](/docs/systems-and-applications/overview) | Routes readers to private payments, ZK rollups, secure messaging, identity wallets, encrypted mempools, private ML analytics, voting systems, and anonymous airdrops. |
| Design patterns | [Operational design patterns](/docs/design-patterns/operational-design-patterns) | Covers encrypt-then-prove, threshold issuance, privacy-preserving revocation, domain separation, transcript binding, and key rotation. |
| Protocols | [Secure Channels](/docs/protocols/secure-channels) | Promotes TLS, HPKE, Noise, and Signal-style channel assumptions into standalone treatment. |
| Protocols | [Oblivious Transfer](/docs/protocols/oblivious-transfer) | Separates a core MPC building block from the broader protocol-family overview. |
| Protocols | [Private Information Retrieval](/docs/protocols/private-information-retrieval) | Clarifies query privacy, non-collusion, and database freshness assumptions. |
| Protocols | [Password-Authenticated Key Exchange](/docs/protocols/password-authenticated-key-exchange) | Distinguishes PAKE from password hashing and ordinary secure channels. |
| Structured primitives | [Polynomial Commitments](/docs/structured-primitives/polynomial-commitments) | Pulls out a central proof-system and rollup dependency with setup and post-quantum caveats. |
| Structured primitives | [Vector Commitments](/docs/structured-primitives/vector-commitments) | Gives indexed commitments and authenticated state roots a proper taxonomy location. |
| Systems | [Private Payments](/docs/systems-and-applications/private-payments) | Promotes note/nullifier, e-cash, wallet, and metadata risks into a full case study. |
| Systems | [ZK Rollups](/docs/systems-and-applications/zk-rollups) | Separates validity proofs from data availability, sequencing, and governance assumptions. |
| Design patterns | [Domain Separation](/docs/design-patterns/domain-separation) | Makes context labeling explicit as a reusable implementation pattern. |
| Design patterns | [Transcript Binding](/docs/design-patterns/transcript-binding) | Makes transcript completeness a standalone composition rule. |
| Design patterns | [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation) | Gives revocation a privacy-aware operational pattern instead of a footnote inside credentials. |
| Data model | [Concrete Algorithms and Schemes](/docs/appendices/concrete-algorithms-and-schemes) | Adds machine-readable concrete-instance data via `book/data/instances.yml`. |
| Assumptions and substrates | [Elliptic Curves](/docs/assumptions/elliptic-curves) | Promotes curve assumptions, validation hazards, and post-quantum posture into standalone treatment. |
| Assumptions and substrates | [Code-Based Assumptions](/docs/assumptions/code-based-assumptions) | Adds a standalone page for code-based post-quantum assumptions and deployment caveats. |
| Assumptions and substrates | [Common Reference Strings](/docs/assumptions/common-reference-strings) | Separates setup material, toxic-waste, and ceremony confidence models from proof-system pages. |
| Basic primitives | [Password Hashing](/docs/primitives/password-hashing) | Separates offline guessing resistance from KDFs, PAKEs, and password storage operations. |
| Basic primitives | [Key-Committing Encryption](/docs/primitives/key-committing-encryption) | Adds a standalone page for ciphertext/key binding and message-franking style ambiguity risks. |
| Structured primitives | [Blind Signatures](/docs/structured-primitives/blind-signatures) | Promotes blind issuance and unlinkability caveats into standalone treatment. |
| Structured primitives | [Verifiable Random Functions](/docs/structured-primitives/verifiable-random-functions) | Adds a standalone VRF page with withholding, grinding, and randomness caveats. |
| Structured primitives | [Verifiable Encryption](/docs/structured-primitives/verifiable-encryption) | Gives encrypt-and-prove workflows a primitive-level treatment. |
| Structured primitives | [E-cash Primitives](/docs/structured-primitives/e-cash-primitives) | Adds issuer, coin, double-spend, and redemption building blocks for private payments. |
| Proof systems | [FRI](/docs/proof-systems/fri) | Adds transparent low-degree testing as a standalone proof-system component. |
| Proof systems | [Folding Schemes](/docs/proof-systems/folding-schemes) | Adds incremental proof composition and accumulator caveats. |
| Proof systems | [Arithmetization](/docs/proof-systems/arithmetization) | Makes statement encoding and underconstraint bugs explicit. |
| Proof systems | [Sumcheck](/docs/proof-systems/sumcheck) | Adds a standalone page for polynomial sum claims and GKR-style components. |
| Proof systems | [Recursive Proofs](/docs/proof-systems/recursive-proofs) | Separates recursion, verifier circuits, and public-input binding risks. |
| Proof systems | [Lookup Arguments](/docs/proof-systems/lookup-arguments) | Adds lookup tables, multiplicity, and table-versioning caveats. |
| Protocols | [Anonymous Tokens](/docs/protocols/anonymous-tokens) | Adds issuance/redemption unlinkability and metadata boundaries. |
| Protocols | [Blind-Signature Credentials](/docs/protocols/blind-signature-credentials) | Separates blind issuance from full anonymous credential guarantees. |
| Systems | [Secure Messaging](/docs/systems-and-applications/secure-messaging) | Adds a system page for channels, ratchets, devices, backups, and metadata. |
| Systems | [Identity Wallets](/docs/systems-and-applications/identity-wallets) | Adds a system page for credentials, selective disclosure, issuers, and revocation. |
| Systems | [Encrypted Mempools](/docs/systems-and-applications/encrypted-mempools) | Adds a system page for encrypted ordering, threshold release, and MEV boundaries. |
| Systems | [Private Machine-Learning Analytics](/docs/systems-and-applications/private-machine-learning-analytics) | Adds a system page for secure aggregation, MPC, HE, and differential privacy composition. |
| Design patterns | [Key Rotation and Migration](/docs/design-patterns/key-rotation-and-migration) | Adds a standalone operational pattern for cryptographic agility and PQ migration. |
| Design patterns | [Encrypt-then-prove](/docs/design-patterns/encrypt-then-prove) | Adds a standalone pattern for proving statements about encrypted data. |
| Design patterns | [Threshold Issuance](/docs/design-patterns/threshold-issuance) | Adds a standalone pattern for distributed authorization and issuer quorum risks. |
| Data model | [Generated Comparison Matrices](/docs/appendices/generated-comparison-matrices) | Adds generated reader-facing Markdown from machine-readable comparison YAML. |
| Data model | Source freshness clusters | Adds `book/data/source-freshness.yml` and validation for fast-moving reference review windows. |

## Coverage status

The concepts previously listed as highest-value gaps now have standalone first-pass pages. The grouped overview pages remain as routing maps and are marked `needs-review` with `coverage_depth: routing-overview` so they are not confused with complete standalone coverage.

| Taxonomy area | Missing or shallow concepts | Why they matter |
| --- | --- | --- |
| Security goals | promoted with routing overview | Confidentiality, integrity, authenticity, anonymity, unlinkability, forward secrecy, verifiability, auditability, accountability, deniability, non-repudiation, availability, and censorship resistance now have standalone pages. Receipt-freeness and coercion resistance remain grouped system-level refinements. |
| Assumptions and substrates | promoted with routing overview | Elliptic curves, code-based assumptions, and common reference strings now have standalone pages; finite-field groups and hash-to-curve remain future candidates. |
| Basic primitives | promoted with routing overview | Password hashing and key-committing encryption now have standalone pages; PRFs, PRPs, and misuse-resistant encryption remain candidates if depth is needed. |
| Structured primitives | promoted with routing overview | Blind signatures, VRFs, verifiable encryption, and e-cash primitives now have standalone pages. |
| Proof systems | promoted with routing overview | FRI, folding schemes, arithmetization, sumcheck, recursive proofs, and lookup arguments now have standalone pages. |
| Protocols | promoted with routing overview | Anonymous tokens and blind-signature credentials now have standalone pages; private-payment protocol details are handled in the private-payments case study. |
| Systems | promoted with routing overview | Secure messaging, identity wallets, encrypted mempools, and private ML analytics now have standalone pages. |
| Design patterns | promoted with routing overview | Key rotation and migration, encrypt-then-prove, and threshold issuance now have standalone pages. |

## Source-depth status

The source registry now covers the main historical and standards references for existing pages, plus deeper clusters for ZK proof-system families, implementation stacks, threshold signing and DKG, anonymous credentials, private payments, secure channels, encrypted mempools, identity wallets, post-quantum migration, FHE, and MPC.

Remaining source work should focus on depth and freshness rather than breadth alone:

- add implementation-specific references only when they explain deployed behavior, parameter choices, or failure modes;
- revisit fast-moving draft specifications on the review windows in `book/data/source-freshness.yml`;
- keep source clusters topic-local so readers can distinguish foundational papers, standards, and deployed project documentation.

## Current limitations and editorial priorities

The atlas has a strong taxonomy and data model, but several product and editorial limitations keep it from reading like a finished web book:

| Limitation | Why it matters | Direction |
| --- | --- | --- |
| The homepage renders every concept card at once. | A flat set of more than ninety dense cards is difficult to scan and gives new readers no obvious route through the material. | Add taxonomy filters, compact summaries, progressive disclosure, and curated entry points for common reader goals. |
| Coverage is broader than it is deep. | Many pages are accurate, template-complete summaries but do not yet provide the worked examples, narrative progression, or design comparisons needed for durable understanding. | Develop a smaller set of flagship chapters with worked scenarios, deeper diagrams, and explicit comparison of competing approaches. |
| Sources are usually collected under `Further reading` rather than attached to individual claims. | Readers cannot easily determine which source supports a specific technical, maturity, deployment, or performance claim. | Add claim-level footnotes or structured source IDs for nontrivial assertions. |
| Review status compresses several different kinds of confidence into `current`. | Structural review, source-freshness review, and expert cryptographic review are not equivalent. A recent date can otherwise imply more assurance than the process provides. | Track these review dimensions separately and reserve any expert-reviewed label for named human review. |
| Machine-oriented labels appear in reader-facing concept cards. | Values such as `public-verifiability` or inconsistent category capitalization make the interface feel database-first and reduce readability. | Add a presentation-label layer while retaining stable machine identifiers underneath. |
| High-risk cautions are not consistently surfaced as visual warnings inside chapters. | Readers can miss setup, maturity, composability, or implementation warnings when they appear only in ordinary prose or card metadata. | Use warning callouts selectively for expert-only, research-stage, setup-sensitive, and easy-to-misuse concepts. |
| The visual identity is functional but unfinished. | The layout is clean, but the placeholder logo and generic documentation styling do not yet give the atlas a distinctive editorial identity. | Replace placeholder branding after information architecture and chapter depth stabilize. |
| Sidebar hierarchy has historically been flatter than the concept hierarchy. | A child page displayed beside its parent obscures dependency and specialization relationships, making a large book harder to navigate. | Use linked sidebar categories for direct parent-child relationships and routing overviews, while preserving taxonomy boundaries for cross-level dependencies. |

## Completed backlog items in this pass

1. Promoted grouped coverage into standalone pages for elliptic curves, code-based assumptions, common reference strings, password hashing, key-committing encryption, blind signatures, VRFs, verifiable encryption, e-cash primitives, FRI, folding schemes, arithmetization, sumcheck, recursion, lookup arguments, anonymous tokens, blind-signature credentials, secure messaging, identity wallets, encrypted mempools, private ML analytics, key rotation, encrypt-then-prove, and threshold issuance.
2. Expanded `book/data/instances.yml` with additional curves, code-based schemes, blind/VRF schemes, protocol suites, proof-system constructions, status-list revocation, and migration-relevant concrete entries.
3. Added generated reader-facing rendering for comparison-matrix YAML.
4. Added source-freshness review windows for fast-moving reference clusters.
5. Added topic-local URLs to the grouped routing pages that still had title-only further-reading entries.
6. Added deeper source coverage for ZK proof-system families, threshold signing and DKG, anonymous credentials, private payments, secure channels, encrypted mempools, identity wallets, and post-quantum migration.
7. Expanded `book/data/instances.yml` with legacy schemes, additional parameter families, pairing-friendly curves, ZK-friendly hashes, FHE schemes, MPC protocol families, deployed credential profiles, and deployed private-payment and encrypted-mempool profiles.
8. Promoted high-value security goals into standalone pages and concept cards for confidentiality, integrity, authenticity, anonymity, unlinkability, forward secrecy, and verifiability.
9. Added richer relationship edge types beyond `instance_of`, including `uses`, `requires`, `breaks-if`, and `commonly-composed-with`, with validation against concept-card IDs, instance IDs, aliases, and document slugs.
10. Cleaned older `Further reading` sections so title-only citations are replaced with topic-local URLs where a stable source URL was available.
11. Added generated reader-facing and machine-facing relationship graph exports: `book/docs/appendices/generated-relationship-graph.md` and `book/static/data/relationship-graph.json`.
12. Expanded `book/data/instances.yml` with PQ parameter profiles, less common curves, ZK implementation stacks, FHE libraries, MPC frameworks, wallet/credential deployment profiles, and encrypted-mempool prototypes.
13. Promoted auditability, accountability, deniability, non-repudiation, availability, and censorship resistance into standalone security-goal pages with concept cards.
14. Added implementation-specific references for halo2, gnark, arkworks, Circom, Zcash Foundation FROST, drand, OpenID4VC, EUDI ARF, AnonCreds, Shutter, OQS, Microsoft SEAL, OpenFHE, Concrete ML, MP-SPDZ, EMP, and FRESCO.
15. Added per-page `source_review` notes and review windows to fast-moving pages that depend on draft standards, ecosystem specifications, proving stacks, PQ migration tooling, FHE/MPC libraries, or encrypted-mempool prototypes.
16. Audited every sidebar entry and added linked parent-child categories where the relationship is direct or represented by a routing overview, without moving cross-level dependencies into the wrong taxonomy section.
17. Promoted Security Goals to a top-level sidebar category so all eight primary taxonomy levels have consistent navigation placement.
18. Renamed the Case Studies navigation level to Systems and Applications, moved it before Design Patterns to match the taxonomy, migrated its pages to natural `/docs/systems-and-applications/` routes, and removed the redundant additional-systems grouping.

## Remaining editorial backlog

This is the authoritative maintenance backlog. Do not duplicate the active list in `TODO.md`.

1. Replace the all-at-once homepage card grid with filtered, grouped, and progressively disclosed concept browsing.
2. Add curated reading paths for common reader goals, such as evaluating a ZK system, designing a secure channel, comparing private-computation approaches, or reviewing a private-payment design.
3. Develop 10 to 15 flagship chapters with worked examples, stronger narrative progression, more diagrams, and comparisons between plausible design choices.
4. Add claim-level citations or structured source references for nontrivial technical, deployment, maturity, and performance claims.
5. Separate structural review, source-freshness review, and expert cryptographic review in page metadata and reader-facing status labels.
6. Normalize reader-facing labels and capitalization without changing stable concept-card IDs or relationship keys.
7. Add visible warning callouts to expert-only, research-stage, trusted-setup-sensitive, composition-sensitive, and commonly misused topics.
8. Replace the placeholder logo and refine the visual identity after the navigation and flagship chapter work stabilizes.
9. Maintain sidebar parent-child nesting when a page has a direct conceptual parent or a routing overview, but do not move a concept across taxonomy levels merely because it depends on a concept in another section.
10. Add a formal JSON schema for `static/data/relationship-graph.json` if external tools begin consuming the graph snapshot.
11. Add generated graph slices for common reader questions, such as "what breaks this guarantee?", "what does this scheme require?", and "which concepts use this primitive?".
12. Continue expanding `book/data/instances.yml` selectively with additional deployed libraries, wallet profiles, proof-system backends, PQ migration profiles, and legacy schemes only when readers are likely to encounter them.
13. Promote receipt-freeness, coercion resistance, fairness, or liveness into standalone pages if the atlas adds a larger voting, governance, or consensus-goals section.
14. Add versioned audit-status notes for implementation stacks where audits, release trains, or API stability materially change deployment advice.
15. Continue source-freshness reviews on the six-month windows and mark pages `needs-review` when draft standards or ecosystem profiles move.

## Timestamped editorial changelog

| Date | Change |
| --- | --- |
| 2026-06-05 | Aligned the web-book navigation with the taxonomy by replacing Case Studies with Systems and Applications before Design Patterns and moving system pages to natural routes. |
| 2026-06-05 | Promoted Security Goals from the Taxonomy orientation category to its own top-level sidebar category. |
| 2026-06-05 | Added the current product and editorial limitations to the authoritative backlog, including discovery, chapter depth, claim-level sourcing, review semantics, reader-facing labels, warnings, and visual identity. |
| 2026-06-05 | Reorganized the sidebar around direct parent-child relationships and routing overviews while preserving taxonomy boundaries and existing page URLs. |
| 2026-06-04 | Added AI-generation disclosure to homepage, intro, footer, and PDF cover. |
| 2026-06-04 | Added PDF table-of-contents page numbers and clickable concept-card navigation. |
| 2026-06-04 | Added first-pass grouped coverage for missing security goals, assumptions, primitive engineering concepts, structured primitives, proof-system components, protocol families, systems, and operational design patterns. |
| 2026-06-04 | Promoted secure channels, oblivious transfer, private information retrieval, password-authenticated key exchange, polynomial commitments, vector commitments, private payments, ZK rollups, domain separation, transcript binding, and privacy-preserving revocation to standalone pages with concept cards. |
| 2026-06-04 | Added machine-readable concrete-instance data in `book/data/instances.yml` and validation for `instance_of` and reference IDs. |
| 2026-06-04 | Added generated diagram sources for secure-channel handshakes, ZK-rollup data flow, private-payment note/nullifier flow, and privacy-preserving revocation. |
| 2026-06-04 | Promoted the remaining grouped backlog topics into standalone pages with concept cards. |
| 2026-06-04 | Added `source-freshness.yml` review clusters for ZK, threshold signing, anonymous credentials, private payments, secure channels, identity wallets, and post-quantum migration. |
| 2026-06-04 | Added generated reader-facing comparison matrices from `book/data/comparison-matrices/*.yml`. |
| 2026-06-04 | Expanded concrete instances with curves, code-based KEMs, blind signatures, VRFs, FROST, MLS, Privacy Pass, PLONK, Nova, Halo, GKR-style sumcheck, and status-list revocation. |
| 2026-06-04 | Promoted confidentiality, integrity, authenticity, anonymity, unlinkability, forward secrecy, and verifiability into standalone security-goal pages with concept cards. |
| 2026-06-04 | Expanded source coverage for ZK proof-system families, threshold signing and DKG, anonymous credentials, private payments, secure channels, encrypted mempools, identity wallets, FHE/MPC, and post-quantum migration. |
| 2026-06-04 | Expanded concrete instances with legacy schemes, pairing-friendly curves, ZK-friendly hashes, FHE schemes, MPC protocol families, deployed credential profiles, private-payment profiles, and encrypted-mempool profiles. |
| 2026-06-04 | Added relationship edge types for uses, requirements, break conditions, and common compositions, with validator checks against pages, concept cards, instances, and aliases. |
| 2026-06-04 | Added generated relationship graph exports as reader-facing Markdown and machine-facing JSON. |
| 2026-06-04 | Expanded concrete instances with PQ parameter profiles, BLS12-377/BW6-761/Jubjub, halo2, gnark, arkworks, Circom, Microsoft SEAL, OpenFHE, Concrete ML, MP-SPDZ, EMP, FRESCO, OpenID4VC, EUDI, ISO mdoc, AnonCreds, DIDComm, Shutter, and OQS entries. |
| 2026-06-04 | Promoted auditability, accountability, deniability, non-repudiation, availability, and censorship resistance into standalone security-goal pages with concept cards. |
| 2026-06-04 | Added per-page source-review windows to fast-moving ZK, threshold, credential, payment, channel, mempool, wallet, PQ, FHE, MPC, and private-ML pages. |

## Maintenance rule

For fast-moving areas such as post-quantum cryptography, zero-knowledge proof systems, fully homomorphic encryption, MPC frameworks, anonymous credentials, and blockchain privacy, re-check source freshness at least every six months. If a page has not been reviewed in that window, mark it `needs-review` rather than leaving it `current`.

## Bottom line

The taxonomy is sound. The atlas is mature as an educational map, the highest-priority gaps have standalone pages, and concrete instances plus relationship edges are machine-readable and generated into reader-facing views. The biggest remaining work is turning that breadth into a guided web-book experience through better discovery, deeper flagship chapters, claim-level sourcing, clearer review semantics, and disciplined source freshness.
