---
title: Generated Relationship Graph
type: appendix
level: not-applicable
template: reference
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: not-applicable
tags:
  - relationships
  - graph
  - generated
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Generated Relationship Graph

This page is generated from `book/data/relationships.yml`. Edit the YAML relationship data, concept cards, and instance registry rather than this Markdown file.

Machine-readable snapshot: [relationship-graph.json](/data/relationship-graph.json).

Graph size: 120 referenced nodes and 111 directed edges.

## Direct Dependencies

`requires` and `uses` edges show dependencies that should be reviewed before changing a concept, protocol, system, or concrete instance.

| Source | Relation | Target | Notes |
| --- | --- | --- | --- |
| Pedersen commitment | requires | Discrete Logarithm | Binding depends on the infeasibility of finding the generator relation. |
| Range Proofs | requires | Commitments | Range proofs usually constrain a hidden value inside a commitment or ciphertext. |
| Authenticity | requires | Transcript Binding | Authenticating incomplete context can bind the right key to the wrong session or statement. |
| Forward Secrecy | requires | Key Encapsulation and Exchange | Secure channels need fresh key-establishment material to make later long-term key compromise less damaging. |
| Zcash Orchard shielded protocol | uses | Halo-style recursion | Orchard uses Halo-style proving to avoid the trusted setup model used by earlier Zcash pools. |
| Zcash Sapling shielded protocol | uses | Private Payments | Sapling is a concrete shielded-payment protocol suite. |
| BBS Data Integrity credentials | uses | Anonymous Credential | BBS-based credential profiles support selective disclosure and unlinkable derived proofs under pairing assumptions. |
| W3C Data Integrity ECDSA credentials | uses | Authenticity | ECDSA data integrity credentials primarily provide issuer authenticity and integrity, not anonymity. |
| W3C Data Integrity EdDSA credentials | uses | Authenticity | EdDSA data integrity credentials primarily provide issuer authenticity and integrity, not anonymity. |
| LUCID encrypted mempool proposal | uses | Delayed Reveal | Encrypted mempools use commit-before-reveal or delayed-decryption sequencing rules. |
| Ferveo threshold-decrypted mempool | uses | Threshold Cryptography | Threshold decryption distributes reveal power across a committee. |
| Threshold BLS signatures | requires | Pairings | Threshold BLS inherits both threshold-share assumptions and pairing-friendly curve assumptions. |
| MASCOT | uses | Oblivious Transfer | MASCOT uses OT-based preprocessing for maliciously secure arithmetic MPC. |
| Accountability | requires | Authenticity | Misbehavior cannot be attributed if actions are not bound to accountable roles, keys, or credentials. |
| Non-Repudiation | requires | Digital Signature | Non-repudiation commonly depends on signatures plus operational key-control evidence. |
| Censorship Resistance | requires | Availability | A valid action needs at least one live inclusion path before censorship resistance can be meaningful. |
| BLS12-377 | requires | Pairings | BLS12-377 is used as a pairing-friendly curve in proof-system stacks. |
| BW6-761 | requires | Pairings | BW6-761 is often discussed as an outer curve in recursive proof cycles. |
| SLH-DSA SHA2 parameter sets | uses | Hash Function | SLH-DSA SHA2 profiles rely on hash-based security assumptions and large signatures. |
| SLH-DSA SHAKE parameter sets | uses | Hash Function | SLH-DSA SHAKE profiles rely on SHAKE-based hash assumptions and large signatures. |
| halo2 proving system stack | uses | Recursive Proofs | halo2 is commonly associated with recursive proof-system engineering. |
| gnark | uses | Arithmetization | gnark circuit definitions must compile to constraints that exactly capture the intended statement. |
| arkworks | uses | SNARKs, STARKs, and Bulletproofs | arkworks provides implementation components for multiple SNARK constructions. |
| Circom | uses | Arithmetization | Circom circuits need explicit constraint review to avoid underconstrained statements. |
| Microsoft SEAL | uses | Homomorphic Encryption | Microsoft SEAL exposes concrete FHE schemes whose parameter choices remain expert-sensitive. |
| OpenFHE | uses | Homomorphic Encryption | OpenFHE supports several FHE families; guarantees depend on the selected scheme and parameters. |
| MP-SPDZ framework | uses | Multi-Party Computation | MP-SPDZ exposes many MPC protocols with different adversary models. |
| EMP toolkit | uses | Oblivious Transfer | EMP packages often depend on OT and garbled-circuit assumptions. |
| FRESCO | uses | Multi-Party Computation | FRESCO is a framework layer; protocol selection determines the security model. |
| Hyperledger AnonCreds v1 | uses | Anonymous Credential | AnonCreds uses credential-specific ZK proofs and revocation registries. |
| Shutter encrypted mempool | uses | Threshold Cryptography | Shutter-style encrypted mempools use threshold encryption and key-release committees. |

## Break Conditions and Inherited Risks

`breaks-if`, `breaks-if-missing`, `breaks-if-misused`, `weakens-if`, `inherits-risk-from`, and `unsafe-instance-of` edges show conditions that can defeat or materially weaken a guarantee.

| Source | Relation | Target | Notes |
| --- | --- | --- | --- |
| Digital Signature | inherits risk from | Discrete Logarithm | ECDSA, EdDSA, and Schnorr-style signatures inherit discrete-logarithm quantum vulnerability. |
| Public-Key Encryption | inherits risk from | Factoring and RSA | RSA-based encryption inherits factoring and padding assumptions. |
| Homomorphic Encryption | inherits risk from | Lattices | Many modern FHE families rely on lattice assumptions and parameter selection. |
| SNARKs, STARKs, and Bulletproofs | inherits risk from | Pairings | Pairing-based SNARKs inherit pairing and elliptic-curve assumptions. |
| SNARKs, STARKs, and Bulletproofs | inherits risk from | Trusted Setup | Some proof systems require setup ceremonies or structured reference strings. |
| Zero-Knowledge Proof | inherits risk from | Random Oracle Model | Fiat-Shamir-style non-interactive proofs often use random-oracle-model reasoning. |
| Confidentiality | breaks if missing | Authenticated Encryption | Confidentiality claims often fail operationally when encryption is used without authentication or plaintext is logged. |
| Anonymity | breaks if | Metadata Leakage | Timing, network, amount, and rare-attribute metadata can defeat anonymity even when proofs verify. |
| Unlinkability | breaks if misused | Nullifier | Nullifiers deliberately create linkability inside a context and must not be reused across contexts. |
| Verifiability | breaks if missing | Transcript Binding | Verification can be meaningless if public inputs, verifier keys, or context are omitted. |
| Encrypted Mempools | breaks if | Metadata Leakage | Size, timing, sender path, and censorship behavior can reveal transaction strategy even when payloads are encrypted. |
| RSAES-PKCS1-v1_5 encryption | unsafe instance of | Public-Key Encryption | Legacy RSA encryption can fail through padding-oracle behavior and should be isolated in migration inventories. |
| SHA-1 | unsafe instance of | Hash Function | SHA-1 collision resistance is not adequate for new cryptographic uses. |
| MD5 | unsafe instance of | Hash Function | MD5 is retained only for legacy recognition and non-adversarial checksum context. |
| Auditability | breaks if | Metadata Leakage | Over-collected audit logs can defeat privacy goals even when evidence integrity is strong. |
| Deniability | breaks if misused | Digital Signature | Publicly verifiable signatures on message content can create durable third-party evidence. |
| Availability | weakens if | Trusted Setup | Setup or recovery ceremonies can become availability bottlenecks if no replacement path exists. |
| Censorship Resistance | breaks if | Metadata Leakage | Sender, fee, size, and timing metadata can leave enough information to censor targeted users. |

## Composition and Usage

`commonly-composed-with`, `composes-with`, `implements-pattern`, and `used-in` edges show common composition paths and placement relationships.

| Source | Relation | Target | Notes |
| --- | --- | --- | --- |
| Commitments | composes with | Zero-Knowledge Proof | ZK proofs often prove statements about committed values without opening them. |
| Nullifier | implements pattern | Anti-Double-Use Nullifiers | Nullifiers are the public duplicate-detection tag used by the pattern. |
| Anonymous Airdrop | composes with | Nullifier | Airdrops use nullifiers to reject duplicate claims. |
| Private DAO Voting | composes with | Anonymous Membership | Voters may prove eligibility without revealing which member they are. |
| Private DAO Voting | composes with | Private Aggregation | The tally should reveal an aggregate rather than individual ballots. |
| Homomorphic Encryption | used in | Private Aggregation | Additive homomorphic encryption is a common private tallying mechanism. |
| Secure Aggregation | implements pattern | Private Aggregation | Secure aggregation is a protocol family for aggregating many client inputs. |
| Mixnets | used in | Electronic Voting | Mixnets can break the link between submitted encrypted ballots and decrypted ballots. |
| Authenticated Encryption | composes with | Symmetric Encryption | AEAD schemes combine encryption with integrity and associated-data authentication. |
| Authenticated Encryption | composes with | Message Authentication Codes | AEAD schemes often use MAC-like authentication internally or replace ad hoc encryption-plus-MAC composition. |
| Oblivious Pseudorandom Functions | used in | Private Set Intersection | OPRF-based PSI is a common construction family. |
| Private Set Intersection | composes with | Multi-Party Computation | PSI can be built from general MPC techniques or specialized protocols depending on the deployment model. |
| Secure Channels | composes with | Transcript Binding | Secure channels bind identities, negotiation, and key exchange into the derived traffic keys. |
| Secure Channels | composes with | Authenticated Encryption | Secure channels usually protect application records with AEAD once handshake keys are derived. |
| Password-Authenticated Key Exchange | composes with | Secure Channels | PAKEs can establish or authenticate a session key that is then used by a secure channel. |
| Oblivious Transfer | used in | Multi-Party Computation | OT is a core building block for many MPC and garbled-circuit protocols. |
| Polynomial Commitments | used in | ZK Rollups | Many rollup proof systems use polynomial commitments to bind witness or trace polynomials. |
| Vector Commitments | used in | Privacy-Preserving Revocation | Revocation systems can use vector commitments or authenticated status lists for compact status proofs. |
| Private Payments | composes with | Nullifier | Private payments often use nullifiers or serial numbers to prevent duplicate spending. |
| ZK Rollups | composes with | Transcript Binding | Rollup proofs must bind public inputs, state roots, verifier keys, and batch data to the proof. |
| Confidentiality | commonly composed with | Integrity | Most deployed confidentiality mechanisms also need tamper detection. |
| Integrity | commonly composed with | Authenticity | Systems usually need both tamper detection and origin binding. |
| Anonymity | commonly composed with | Unlinkability | Anonymous systems often need unlinkability across repeated actions, but the goals are distinct. |
| Unlinkability | commonly composed with | Domain Separation | Context-bound tags prevent linkability across unrelated applications. |
| Forward Secrecy | commonly composed with | Secure Channels | Forward secrecy is usually realized at the protocol layer. |
| Verifiability | commonly composed with | Integrity | A verifier needs tamper-evident inputs and authentic verification parameters. |
| Gennaro-Jarecki-Krawczyk-Rabin DKG | used in | Threshold Cryptography | DKG is a setup protocol for dealerless threshold keys. |
| Poseidon | used in | Arithmetization | ZK-friendly hashes are chosen to reduce circuit or constraint cost. |
| MiMC | used in | Arithmetization | MiMC is an example of a low-multiplicative-complexity hash used in some proof circuits. |
| Rescue-Prime | used in | Arithmetization | Rescue-Prime is a proof-system-oriented hash family with scheme-specific parameters. |
| CKKS homomorphic encryption | used in | Private Machine Learning Analytics | Approximate homomorphic arithmetic is common in privacy-preserving analytics and inference discussions. |
| BFV homomorphic encryption | used in | Private Machine Learning Analytics | Exact homomorphic arithmetic can support bounded private analytics workloads. |
| SPDZ protocol family | used in | Multi-Party Computation | SPDZ is a concrete actively secure arithmetic MPC family. |
| Auditability | commonly composed with | Verifiability | Audit trails are stronger when reviewers can independently verify records, proofs, or logs. |
| Accountability | commonly composed with | Auditability | Accountability usually needs durable evidence and a review process. |
| Deniability | commonly composed with | Forward Secrecy | Key evolution and erasure reduce the value of later transcript compromise. |
| Non-Repudiation | commonly composed with | Accountability | Signed evidence must feed a dispute or accountability process to have practical effect. |
| Availability | commonly composed with | Threshold Cryptography | Threshold designs can remove single points of failure if quorum independence assumptions hold. |
| Censorship Resistance | commonly composed with | Encrypted Mempools | Encrypted mempools can reduce content-based censorship before reveal, but only under committee and inclusion assumptions. |
| Jubjub | used in | Zcash Sapling shielded protocol | Jubjub appears in Zcash Sapling-related circuit and note components. |
| ML-KEM-512 | used in | Key Encapsulation and Exchange | ML-KEM parameter profiles should be selected according to policy and protocol constraints. |
| ML-KEM-768 | used in | Key Encapsulation and Exchange | ML-KEM-768 is a common general-purpose migration profile. |
| ML-KEM-1024 | used in | Key Encapsulation and Exchange | Larger KEM parameters increase integration pressure and should be inventory-driven. |
| ML-DSA-44 | used in | Digital Signature | ML-DSA parameter profiles affect certificate, protocol, and hardware constraints. |
| ML-DSA-65 | used in | Digital Signature | ML-DSA-65 is a common general-purpose post-quantum signature migration profile. |
| ML-DSA-87 | used in | Digital Signature | Higher signature parameters require compatibility review before deployment. |
| HQC-128 | used in | Code-Based Assumptions | HQC profiles are migration-planning entries until the backup KEM standard is final. |
| HQC-192 | used in | Code-Based Assumptions | Higher HQC profiles provide code-based algorithm diversity with larger integration costs. |
| HQC-256 | used in | Code-Based Assumptions | HQC-256 is retained as a high-category planning profile pending final standardization. |
| Concrete ML | commonly composed with | Private Machine Learning Analytics | FHE-based ML tooling still needs output, model, and repeated-query leakage review. |
| OpenID for Verifiable Credential Issuance | used in | Identity Wallets | OID4VCI describes credential issuance flows, not presentation privacy by itself. |
| OpenID for Verifiable Presentations | used in | Identity Wallets | OID4VP describes wallet-to-verifier presentation flows across credential formats. |
| EUDI Wallet Architecture and Reference Framework | commonly composed with | Identity Wallets | EUDI ARF profiles wallet roles, trust lists, and secure-device assumptions. |
| ISO mdoc / mobile driving licence | used in | Identity Wallets | ISO mdoc and mobile driving licence profiles are deployed credential-wallet formats. |
| DIDComm Messaging v2 | commonly composed with | Identity Wallets | DIDComm is a wallet-agent messaging layer and should not be mistaken for credential privacy. |
| Shutter encrypted mempool | commonly composed with | Censorship Resistance | Threshold encryption can reduce pre-reveal content-based censorship but not all exclusion paths. |
| Open Quantum Safe tooling | used in | Key Rotation and Migration | OQS tooling is useful for experimentation and interoperability, not a deployment certificate. |

## Adjacency Index

Outgoing edges grouped by source. This table is useful when reviewing what a concept, concrete scheme, or page depends on or composes with.

| Source | Outgoing relationships |
| --- | --- |
| Accountability | commonly composed with -> Auditability<br />requires -> Authenticity |
| Hyperledger AnonCreds v1 | uses -> Anonymous Credential |
| Anonymity | breaks if -> Metadata Leakage<br />commonly composed with -> Unlinkability |
| Anonymous Airdrop | composes with -> Nullifier |
| arkworks | uses -> SNARKs, STARKs, and Bulletproofs |
| Auditability | breaks if -> Metadata Leakage<br />commonly composed with -> Verifiability |
| Authenticated Encryption | composes with -> Message Authentication Codes<br />composes with -> Symmetric Encryption |
| Authenticity | requires -> Transcript Binding |
| Availability | commonly composed with -> Threshold Cryptography<br />weakens if -> Trusted Setup |
| BBS Data Integrity credentials | uses -> Anonymous Credential |
| BFV homomorphic encryption | used in -> Private Machine Learning Analytics |
| BLS12-377 | requires -> Pairings |
| BW6-761 | requires -> Pairings |
| Censorship Resistance | breaks if -> Metadata Leakage<br />commonly composed with -> Encrypted Mempools<br />requires -> Availability |
| Circom | uses -> Arithmetization |
| CKKS homomorphic encryption | used in -> Private Machine Learning Analytics |
| Commitments | composes with -> Zero-Knowledge Proof |
| Concrete ML | commonly composed with -> Private Machine Learning Analytics |
| Confidentiality | breaks if missing -> Authenticated Encryption<br />commonly composed with -> Integrity |
| Deniability | breaks if misused -> Digital Signature<br />commonly composed with -> Forward Secrecy<br />contrasts with -> Non-Repudiation |
| DIDComm Messaging v2 | commonly composed with -> Identity Wallets |
| Digital Signature | inherits risk from -> Discrete Logarithm |
| Domain Separation | strengthens -> Transcript Binding |
| EMP toolkit | uses -> Oblivious Transfer |
| Encrypted Mempools | breaks if -> Metadata Leakage |
| EUDI Wallet Architecture and Reference Framework | commonly composed with -> Identity Wallets |
| Ferveo threshold-decrypted mempool | uses -> Threshold Cryptography |
| Forward Secrecy | commonly composed with -> Secure Channels<br />requires -> Key Encapsulation and Exchange |
| FRESCO | uses -> Multi-Party Computation |
| Gennaro-Jarecki-Krawczyk-Rabin DKG | used in -> Threshold Cryptography |
| gnark | uses -> Arithmetization |
| halo2 proving system stack | uses -> Recursive Proofs |
| Homomorphic Encryption | inherits risk from -> Lattices<br />used in -> Private Aggregation |
| HQC-128 | used in -> Code-Based Assumptions |
| HQC-192 | used in -> Code-Based Assumptions |
| HQC-256 | used in -> Code-Based Assumptions |
| Integrity | commonly composed with -> Authenticity |
| ISO mdoc / mobile driving licence | used in -> Identity Wallets |
| Jubjub | used in -> Zcash Sapling shielded protocol |
| LUCID encrypted mempool proposal | uses -> Delayed Reveal |
| Make Receipts Useless | strengthens -> Electronic Voting |
| MASCOT | uses -> Oblivious Transfer |
| MD5 | unsafe instance of -> Hash Function |
| Microsoft SEAL | uses -> Homomorphic Encryption |
| MiMC | used in -> Arithmetization |
| Mixnets | used in -> Electronic Voting |
| ML-DSA-44 | used in -> Digital Signature |
| ML-DSA-65 | used in -> Digital Signature |
| ML-DSA-87 | used in -> Digital Signature |
| ML-KEM-1024 | used in -> Key Encapsulation and Exchange |
| ML-KEM-512 | used in -> Key Encapsulation and Exchange |
| ML-KEM-768 | used in -> Key Encapsulation and Exchange |
| MP-SPDZ framework | uses -> Multi-Party Computation |
| Non-Repudiation | commonly composed with -> Accountability<br />requires -> Digital Signature |
| Nullifier | implements pattern -> Anti-Double-Use Nullifiers |
| Oblivious Pseudorandom Functions | used in -> Private Set Intersection |
| Oblivious Transfer | used in -> Multi-Party Computation |
| OpenID for Verifiable Credential Issuance | used in -> Identity Wallets |
| OpenID for Verifiable Presentations | used in -> Identity Wallets |
| Open Quantum Safe tooling | used in -> Key Rotation and Migration |
| OpenFHE | uses -> Homomorphic Encryption |
| Password-Authenticated Key Exchange | composes with -> Secure Channels |
| Pedersen commitment | requires -> Discrete Logarithm |
| Polynomial Commitments | used in -> ZK Rollups |
| Poseidon | used in -> Arithmetization |
| Private DAO Voting | composes with -> Anonymous Membership<br />composes with -> Private Aggregation |
| Private Information Retrieval | contrasts with -> Private Set Intersection |
| Private Payments | composes with -> Nullifier |
| Private Set Intersection | composes with -> Multi-Party Computation |
| Public-Key Encryption | inherits risk from -> Factoring and RSA |
| Range Proofs | requires -> Commitments |
| Rescue-Prime | used in -> Arithmetization |
| RSAES-PKCS1-v1_5 encryption | unsafe instance of -> Public-Key Encryption |
| Selective Disclosure JWT | contrasts with -> Anonymous Credential |
| Secure Aggregation | implements pattern -> Private Aggregation |
| Secure Channels | composes with -> Authenticated Encryption<br />composes with -> Transcript Binding |
| SHA-1 | unsafe instance of -> Hash Function |
| Shutter encrypted mempool | commonly composed with -> Censorship Resistance<br />uses -> Threshold Cryptography |
| SLH-DSA SHA2 parameter sets | uses -> Hash Function |
| SLH-DSA SHAKE parameter sets | uses -> Hash Function |
| SNARKs, STARKs, and Bulletproofs | inherits risk from -> Pairings<br />inherits risk from -> Trusted Setup |
| SPDZ protocol family | used in -> Multi-Party Computation |
| Threshold BLS signatures | requires -> Pairings |
| Unlinkability | breaks if misused -> Nullifier<br />commonly composed with -> Domain Separation |
| W3C Data Integrity ECDSA credentials | uses -> Authenticity |
| W3C Data Integrity EdDSA credentials | uses -> Authenticity |
| Vector Commitments | used in -> Privacy-Preserving Revocation |
| Verifiability | breaks if missing -> Transcript Binding<br />commonly composed with -> Integrity |
| Zcash Orchard shielded protocol | uses -> Halo-style recursion |
| Zcash Sapling shielded protocol | uses -> Private Payments |
| Zero-Knowledge Proof | inherits risk from -> Random Oracle Model |
| ZK Rollups | composes with -> Transcript Binding |
