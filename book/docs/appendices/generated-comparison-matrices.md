---
title: Generated Comparison Matrices
type: appendix
level: not-applicable
template: reference
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - comparisons
  - generated
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Generated Comparison Matrices

This page is generated from `book/data/comparison-matrices/*.yml`. Edit the YAML data, not this Markdown file.

## Basic primitive comparison

Comparison of common primitive roles, non-goals, and implementation risks.

| Concept | Primary Goal | Does Not Provide | Common Risk | Post Quantum Posture | Implementation Risk |
| --- | --- | --- | --- | --- | --- |
| Hash functions | fixed-length digest with preimage and collision resistance | encryption, authentication, or hiding for low-entropy secrets | missing domain separation or obsolete algorithms | plausible with adequate output length | medium |
| Symmetric encryption | confidentiality under a shared secret key | key distribution or authentication by itself | nonce misuse or unauthenticated ciphertexts | plausible with conservative key sizes | high |
| Authenticated encryption | confidentiality plus ciphertext and associated-data integrity | public verifiability, identity, or metadata privacy | nonce reuse, missing associated-data context, or tag-check bypass | plausible with conservative parameters | high |
| MACs | shared-key integrity and authenticity | public verifiability or confidentiality | replay, key reuse, or timing-leaky comparisons | plausible | medium |
| Digital signatures | public verifiability of message origin and integrity | confidentiality or signer understanding | ambiguous signing contexts or nonce reuse | depends on scheme | high |
| Public-key encryption | recipient-controlled confidentiality | sender authentication or metadata privacy | key misbinding or unsafe raw encryption | depends on scheme | high |
| Password hashing | make offline guessing of low-entropy secrets expensive | high entropy, online rate limiting, or password-authenticated key exchange | fast unsalted hashes, weak reset flows, or stale work factors | plausible with current memory-hard parameters | medium |
| Key-committing encryption | bind ciphertext validity to the intended key or key commitment | sender attribution, deniability, or metadata privacy by itself | using non-committing AEAD where key ambiguity matters | depends on the underlying encryption and authentication layers | high |
| Secret sharing | threshold reconstruction and confidentiality below threshold | share authentication or governance | correlated share custody or unclear recovery rules | plausible for the information-theoretic core | medium |

Source: `book/data/comparison-matrices/primitives.yml`.

## Privacy protocol comparison

Comparison of common privacy protocols and their metadata boundaries.

| Concept | Main Privacy Goal | Confidence Model | Metadata Leaks | Common Failure | Maturity |
| --- | --- | --- | --- | --- | --- |
| Anonymous credentials | selective disclosure or unlinkable authorization | trusted issuer plus holder secret | issuer-verifier collusion, rare attributes, revocation checks | revocation or verifier context tracks users | emerging |
| Anonymous tokens | unlink issuance and redemption of authorization tokens | issuer policy plus blind signature, OPRF, or accumulator assumptions | issuance timing, redemption timing, transport identifiers | token privacy defeated by browser, network, or verifier logs | emerging |
| Blind-signature credentials | authorize a credential without showing the issuer the eventual presentation token | trusted issuer plus blind-signature unforgeability and holder-secret policy | issuance metadata, presentation timing, revocation checks | blind issuance treated as full anonymous credentials | emerging |
| Nullifiers | one anonymous action per context | holder secret plus public duplicate registry | timing, transaction fees, reused contexts | nullifier accepted without eligibility proof | emerging |
| OPRFs | client learns keyed PRF output without revealing input | mathematical assumption plus server-key secrecy | request timing, server identity, request volume | missing domain separation or invalid group-element handling | emerging |
| Private set intersection | reveal only set overlap, cardinality, or approved function | depends on semi-honest, malicious, or helper-server model | set size, output, timing, abort behavior | repeated queries, low-entropy elements, or wrong adversary model | mature |
| Secure aggregation | aggregate-only disclosure | honest-majority or non-collusion depending on protocol | participation, dropout, cohort size | small cohorts or repeated queries reveal individuals | mature |
| MPC | joint computation without revealing inputs | adversary threshold and abort model | participant set, circuit shape, aborts | output or abort pattern leaks inputs | mature |
| Mixnets | sender-recipient unlinkability through shuffling | at least one honest mix | timing, batch membership, message size | small batches or all mixes collude | mature |
| Secure messaging | message-content confidentiality with forward secrecy and participant authentication | endpoint secrets, ratchet state, key directories, and server-delivery assumptions | contact graph, device list, timing, IP addresses | endpoint compromise or plaintext backups defeat protocol guarantees | deployed |

Source: `book/data/comparison-matrices/privacy-protocols.yml`.

## Proof-system family comparison

High-level comparison for selecting which proof-system page to read next.

| Concept | Setup | Common Strength | Common Risk | Post Quantum Posture | Maturity |
| --- | --- | --- | --- | --- | --- |
| SNARKs | varies; many deployed families use trusted or universal setup | very small proofs and fast verification | setup and pairing assumptions can dominate the confidence model | often vulnerable for pairing-based systems | deployed to emerging by family |
| STARKs | transparent in common families | hash-based transparency and scalable proving | larger proofs and careful parameter choices | plausible when hash choices and parameters are appropriate | emerging |
| Bulletproofs | no trusted setup | compact range proofs | discrete-logarithm assumptions and heavier verification for large statements | vulnerable in common discrete-logarithm constructions | mature |
| FRI | transparent | scalable low-degree testing for STARK-style systems | parameter, field, query, and hash choices drive soundness and size | plausible when instantiated with conservative hashes and parameters | emerging |
| Folding schemes | construction-specific | incrementally combine repeated computation claims | fast-moving security analysis and accumulator-finalization details | depends on commitment and proof-system assumptions | research to emerging |
| Recursive proofs | inherited from the inner and outer proof systems | aggregate or chain proofs by verifying proofs inside proofs | transcript binding, verification-key binding, and field-cycle constraints | depends on every recursive layer | emerging |
| Lookup arguments | inherited from the arithmetization and commitment scheme | efficient range, table, and opcode checks | table versioning, multiplicities, and leaked lookup values | depends on the enclosing proof system | emerging |
| Sumcheck | transparent as an interactive protocol component | reduces large polynomial sum claims to small checks | wrong degree bounds, field sizes, or Fiat-Shamir transcript binding | plausible when paired with post-quantum commitments and hashes | mature component |
| Arithmetization | not a setup model; it defines the statement representation | turns computation into checkable constraints or polynomial identities | underconstrained circuits or traces prove the wrong program | not applicable by itself | mature concept, implementation-specific |

Source: `book/data/comparison-matrices/proof-systems.yml`.

## System and pattern comparison

Comparison of design patterns and system-level privacy compositions.

| Concept | Level | Primary Goal | Inherited Risk | Metadata Boundary | Deployment Caution |
| --- | --- | --- | --- | --- | --- |
| Anonymous membership | design pattern | prove eligibility without revealing member identity | issuer, set, proof system, and anonymity set | timing, verifier identity, group size | needs anti-double-use or rate-limit design when repeated action matters |
| Private aggregation | design pattern | reveal aggregate rather than individual inputs | aggregation mechanism, cohort size, validity checks | participation, output value, repeated releases | small groups and differencing attacks dominate many failures |
| Encrypt-then-prove | design pattern | prove validity of encrypted data without revealing the plaintext | encryption, proof statement, recipient-key binding, and transcript context | proof timing, recipient key, public inputs | bind the proof to the exact ciphertext, key, and application context |
| Threshold issuance | design pattern | require multiple issuers to authorize tokens, credentials, or signatures | DKG or share provisioning, quorum policy, issuer availability | issuer participation and issuance timing | threshold control is not trustlessness when operators collude |
| Key rotation and migration | design pattern | replace keys or algorithms without silent downgrade or continuity loss | trust roots, inventory accuracy, client enforcement, version policy | supported versions and migration timing | dual-stack periods often preserve the weakest accepted algorithm |
| Delayed reveal | design pattern | commit now and open later | commitment binding, timing, abort policy | commitment and reveal times | define deadlines, challenges, and abort handling |
| Private DAO voting | system | private eligible voting with public tally confidence | credentials, nullifiers, ballot encryption, proofs, tallying | wallet funding, submission timing, public discussion | not coercion-resistant by default |
| Secure messaging | system | protect message contents and session keys across devices and compromise windows | secure channels, ratchets, key directories, backups, endpoint security | contact graph, delivery timing, device list | endpoint compromise and plaintext backup policy often dominate |
| Identity wallets | system | hold credentials and present claims with selective disclosure | issuer trust, holder-device secrets, verifier policy, revocation mechanism | presentation timing, verifier identity, status checks | rare attributes and online revocation can re-identify holders |
| Encrypted mempools | system | hide transaction contents before ordering or reveal | threshold encryption, sequencing, censorship resistance, key release | sender network path, size, timing, inclusion status | encryption cannot prevent censorship or metadata-based ordering alone |
| Private machine-learning analytics | system | learn aggregates, model updates, or metrics with reduced exposure of raw inputs | secure aggregation, MPC, HE, differential privacy, cohort policy | participation, cohort membership, output releases | outputs, repeated queries, and small cohorts can defeat cryptographic input privacy |
| Anonymous airdrop | system | one private claim per eligible user | eligibility source, nullifiers, wallet funding, withdrawal privacy | claim timing, fees, exchange flows | public ledger metadata can defeat cryptographic anonymity |

Source: `book/data/comparison-matrices/system-patterns.yml`.
