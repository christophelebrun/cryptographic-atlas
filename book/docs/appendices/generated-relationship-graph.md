---
title: Generated Relationship Graph
type: appendix
level: not-applicable
template: reference
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
| Pedersen commitment | Requires | Discrete Logarithm | Binding depends on the infeasibility of finding the generator relation. |
| Range Proofs | Requires | Commitments | Range proofs usually constrain a hidden value inside a commitment or ciphertext. |
| Authenticity | Requires | Transcript Binding | Authenticating incomplete context can bind the right key to the wrong session or statement. |
| Forward Secrecy | Requires | Key Encapsulation and Exchange | Secure channels need fresh key-establishment material to make later long-term key compromise less damaging. |
| Zcash Orchard shielded protocol | Uses | Halo-style recursion | Orchard uses Halo-style proving to avoid the trusted setup model used by earlier Zcash pools. |
| Zcash Sapling shielded protocol | Uses | Private Payments | Sapling is a concrete shielded-payment protocol suite. |
| BBS Data Integrity credentials | Uses | Anonymous Credential | BBS-based credential profiles support selective disclosure and unlinkable derived proofs under pairing assumptions. |
| W3C Data Integrity ECDSA credentials | Uses | Authenticity | ECDSA data integrity credentials primarily provide issuer authenticity and integrity, not anonymity. |
| W3C Data Integrity EdDSA credentials | Uses | Authenticity | EdDSA data integrity credentials primarily provide issuer authenticity and integrity, not anonymity. |
| LUCID encrypted mempool proposal | Uses | Delayed Reveal | Encrypted mempools use commit-before-reveal or delayed-decryption sequencing rules. |
| Ferveo threshold-decrypted mempool | Uses | Threshold Cryptography | Threshold decryption distributes reveal power across a committee. |
| Threshold BLS signatures | Requires | Pairings | Threshold BLS inherits both threshold-share assumptions and pairing-friendly curve assumptions. |
| MASCOT | Uses | Oblivious Transfer | MASCOT uses OT-based preprocessing for maliciously secure arithmetic MPC. |
| Accountability | Requires | Authenticity | Misbehavior cannot be attributed if actions are not bound to accountable roles, keys, or credentials. |
| Non-Repudiation | Requires | Digital Signature | Non-repudiation commonly depends on signatures plus operational key-control evidence. |
| Censorship Resistance | Requires | Availability | A valid action needs at least one live inclusion path before censorship resistance can be meaningful. |
| BLS12-377 | Requires | Pairings | BLS12-377 is used as a pairing-friendly curve in proof-system stacks. |
| BW6-761 | Requires | Pairings | BW6-761 is often discussed as an outer curve in recursive proof cycles. |
| SLH-DSA SHA2 parameter sets | Uses | Hash Function | SLH-DSA SHA2 profiles rely on hash-based security assumptions and large signatures. |
| SLH-DSA SHAKE parameter sets | Uses | Hash Function | SLH-DSA SHAKE profiles rely on SHAKE-based hash assumptions and large signatures. |
| halo2 proving system stack | Uses | Recursive Proofs | halo2 is commonly associated with recursive proof-system engineering. |
| gnark | Uses | Arithmetization | gnark circuit definitions must compile to constraints that exactly capture the intended statement. |
| arkworks | Uses | SNARKs, STARKs, and Bulletproofs | arkworks provides implementation components for multiple SNARK constructions. |
| Circom | Uses | Arithmetization | Circom circuits need explicit constraint review to avoid underconstrained statements. |
| Microsoft SEAL | Uses | Homomorphic Encryption | Microsoft SEAL exposes concrete FHE schemes whose parameter choices remain expert-sensitive. |
| OpenFHE | Uses | Homomorphic Encryption | OpenFHE supports several FHE families; guarantees depend on the selected scheme and parameters. |
| MP-SPDZ framework | Uses | Multi-Party Computation | MP-SPDZ exposes many MPC protocols with different adversary models. |
| EMP toolkit | Uses | Oblivious Transfer | EMP packages often depend on OT and garbled-circuit assumptions. |
| FRESCO | Uses | Multi-Party Computation | FRESCO is a framework layer; protocol selection determines the security model. |
| Hyperledger AnonCreds v1 | Uses | Anonymous Credential | AnonCreds uses credential-specific ZK proofs and revocation registries. |
| Shutter encrypted mempool | Uses | Threshold Cryptography | Shutter-style encrypted mempools use threshold encryption and key-release committees. |

## Break Conditions and Inherited Risks

`breaks-if`, `breaks-if-missing`, `breaks-if-misused`, `weakens-if`, `inherits-risk-from`, and `unsafe-instance-of` edges show conditions that can defeat or materially weaken a guarantee.

| Source | Relation | Target | Notes |
| --- | --- | --- | --- |
| Digital Signature | Inherits risk from | Discrete Logarithm | ECDSA, EdDSA, and Schnorr-style signatures inherit discrete-logarithm quantum vulnerability. |
| Public-Key Encryption | Inherits risk from | Factoring and RSA | RSA-based encryption inherits factoring and padding assumptions. |
| Homomorphic Encryption | Inherits risk from | Lattices | Many modern FHE families rely on lattice assumptions and parameter selection. |
| SNARKs, STARKs, and Bulletproofs | Inherits risk from | Pairings | Pairing-based SNARKs inherit pairing and elliptic-curve assumptions. |
| SNARKs, STARKs, and Bulletproofs | Inherits risk from | Trusted Setup | Some proof systems require setup ceremonies or structured reference strings. |
| Zero-Knowledge Proof | Inherits risk from | Random Oracle Model | Fiat-Shamir-style non-interactive proofs often use random-oracle-model reasoning. |
| Confidentiality | Breaks if missing | Authenticated Encryption | Confidentiality claims often fail operationally when encryption is used without authentication or plaintext is logged. |
| Anonymity | Breaks if | Metadata Leakage | Timing, network, amount, and rare-attribute metadata can defeat anonymity even when proofs verify. |
| Unlinkability | Breaks if misused | Nullifier | Nullifiers deliberately create linkability inside a context and must not be reused across contexts. |
| Verifiability | Breaks if missing | Transcript Binding | Verification can be meaningless if public inputs, verifier keys, or context are omitted. |
| Encrypted Mempools | Breaks if | Metadata Leakage | Size, timing, sender path, and censorship behavior can reveal transaction strategy even when payloads are encrypted. |
| RSAES-PKCS1-v1_5 encryption | Unsafe instance of | Public-Key Encryption | Legacy RSA encryption can fail through padding-oracle behavior and should be isolated in migration inventories. |
| SHA-1 | Unsafe instance of | Hash Function | SHA-1 collision resistance is not adequate for new cryptographic uses. |
| MD5 | Unsafe instance of | Hash Function | MD5 is retained only for legacy recognition and non-adversarial checksum context. |
| Auditability | Breaks if | Metadata Leakage | Over-collected audit logs can defeat privacy goals even when evidence integrity is strong. |
| Deniability | Breaks if misused | Digital Signature | Publicly verifiable signatures on message content can create durable third-party evidence. |
| Availability | Weakens if | Trusted Setup | Setup or recovery ceremonies can become availability bottlenecks if no replacement path exists. |
| Censorship Resistance | Breaks if | Metadata Leakage | Sender, fee, size, and timing metadata can leave enough information to censor targeted users. |

## Composition and Usage

`commonly-composed-with`, `composes-with`, `implements-pattern`, and `used-in` edges show common composition paths and placement relationships.

| Source | Relation | Target | Notes |
| --- | --- | --- | --- |
| Commitments | Composes with | Zero-Knowledge Proof | ZK proofs often prove statements about committed values without opening them. |
| Nullifier | Implements pattern | Anti-Double-Use Nullifiers | Nullifiers are the public duplicate-detection tag used by the pattern. |
| Anonymous Airdrop | Composes with | Nullifier | Airdrops use nullifiers to reject duplicate claims. |
| Private DAO Voting | Composes with | Anonymous Membership | Voters may prove eligibility without revealing which member they are. |
| Private DAO Voting | Composes with | Private Aggregation | The tally should reveal an aggregate rather than individual ballots. |
| Homomorphic Encryption | Used in | Private Aggregation | Additive homomorphic encryption is a common private tallying mechanism. |
| Secure Aggregation | Implements pattern | Private Aggregation | Secure aggregation is a protocol family for aggregating many client inputs. |
| Mixnets | Used in | Electronic Voting | Mixnets can break the link between submitted encrypted ballots and decrypted ballots. |
| Authenticated Encryption | Composes with | Symmetric Encryption | AEAD schemes combine encryption with integrity and associated-data authentication. |
| Authenticated Encryption | Composes with | Message Authentication Codes | AEAD schemes often use MAC-like authentication internally or replace ad hoc encryption-plus-MAC composition. |
| Oblivious Pseudorandom Functions | Used in | Private Set Intersection | OPRF-based PSI is a common construction family. |
| Private Set Intersection | Composes with | Multi-Party Computation | PSI can be built from general MPC techniques or specialized protocols depending on the deployment model. |
| Secure Channels | Composes with | Transcript Binding | Secure channels bind identities, negotiation, and key exchange into the derived traffic keys. |
| Secure Channels | Composes with | Authenticated Encryption | Secure channels usually protect application records with AEAD once handshake keys are derived. |
| Password-Authenticated Key Exchange | Composes with | Secure Channels | PAKEs can establish or authenticate a session key that is then used by a secure channel. |
| Oblivious Transfer | Used in | Multi-Party Computation | OT is a core building block for many MPC and garbled-circuit protocols. |
| Polynomial Commitments | Used in | ZK Rollups | Many rollup proof systems use polynomial commitments to bind witness or trace polynomials. |
| Vector Commitments | Used in | Privacy-Preserving Revocation | Revocation systems can use vector commitments or authenticated status lists for compact status proofs. |
| Private Payments | Composes with | Nullifier | Private payments often use nullifiers or serial numbers to prevent duplicate spending. |
| ZK Rollups | Composes with | Transcript Binding | Rollup proofs must bind public inputs, state roots, verifier keys, and batch data to the proof. |
| Confidentiality | Commonly composed with | Integrity | Most deployed confidentiality mechanisms also need tamper detection. |
| Integrity | Commonly composed with | Authenticity | Systems usually need both tamper detection and origin binding. |
| Anonymity | Commonly composed with | Unlinkability | Anonymous systems often need unlinkability across repeated actions, but the goals are distinct. |
| Unlinkability | Commonly composed with | Domain Separation | Context-bound tags prevent linkability across unrelated applications. |
| Forward Secrecy | Commonly composed with | Secure Channels | Forward secrecy is usually realized at the protocol layer. |
| Verifiability | Commonly composed with | Integrity | A verifier needs tamper-evident inputs and authentic verification parameters. |
| Gennaro-Jarecki-Krawczyk-Rabin DKG | Used in | Threshold Cryptography | DKG is a setup protocol for dealerless threshold keys. |
| Poseidon | Used in | Arithmetization | ZK-friendly hashes are chosen to reduce circuit or constraint cost. |
| MiMC | Used in | Arithmetization | MiMC is an example of a low-multiplicative-complexity hash used in some proof circuits. |
| Rescue-Prime | Used in | Arithmetization | Rescue-Prime is a proof-system-oriented hash family with scheme-specific parameters. |
| CKKS homomorphic encryption | Used in | Private Machine Learning Analytics | Approximate homomorphic arithmetic is common in privacy-preserving analytics and inference discussions. |
| BFV homomorphic encryption | Used in | Private Machine Learning Analytics | Exact homomorphic arithmetic can support bounded private analytics workloads. |
| SPDZ protocol family | Used in | Multi-Party Computation | SPDZ is a concrete actively secure arithmetic MPC family. |
| Auditability | Commonly composed with | Verifiability | Audit trails are stronger when reviewers can independently verify records, proofs, or logs. |
| Accountability | Commonly composed with | Auditability | Accountability usually needs durable evidence and a review process. |
| Deniability | Commonly composed with | Forward Secrecy | Key evolution and erasure reduce the value of later transcript compromise. |
| Non-Repudiation | Commonly composed with | Accountability | Signed evidence must feed a dispute or accountability process to have practical effect. |
| Availability | Commonly composed with | Threshold Cryptography | Threshold designs can remove single points of failure if quorum independence assumptions hold. |
| Censorship Resistance | Commonly composed with | Encrypted Mempools | Encrypted mempools can reduce content-based censorship before reveal, but only under committee and inclusion assumptions. |
| Jubjub | Used in | Zcash Sapling shielded protocol | Jubjub appears in Zcash Sapling-related circuit and note components. |
| ML-KEM-512 | Used in | Key Encapsulation and Exchange | ML-KEM parameter profiles should be selected according to policy and protocol constraints. |
| ML-KEM-768 | Used in | Key Encapsulation and Exchange | ML-KEM-768 is a common general-purpose migration profile. |
| ML-KEM-1024 | Used in | Key Encapsulation and Exchange | Larger KEM parameters increase integration pressure and should be inventory-driven. |
| ML-DSA-44 | Used in | Digital Signature | ML-DSA parameter profiles affect certificate, protocol, and hardware constraints. |
| ML-DSA-65 | Used in | Digital Signature | ML-DSA-65 is a common general-purpose post-quantum signature migration profile. |
| ML-DSA-87 | Used in | Digital Signature | Higher signature parameters require compatibility review before deployment. |
| HQC-128 | Used in | Code-Based Assumptions | HQC profiles are migration-planning entries until the backup KEM standard is final. |
| HQC-192 | Used in | Code-Based Assumptions | Higher HQC profiles provide code-based algorithm diversity with larger integration costs. |
| HQC-256 | Used in | Code-Based Assumptions | HQC-256 is retained as a high-category planning profile pending final standardization. |
| Concrete ML | Commonly composed with | Private Machine Learning Analytics | FHE-based ML tooling still needs output, model, and repeated-query leakage review. |
| OpenID for Verifiable Credential Issuance | Used in | Identity Wallets | OID4VCI describes credential issuance flows, not presentation privacy by itself. |
| OpenID for Verifiable Presentations | Used in | Identity Wallets | OID4VP describes wallet-to-verifier presentation flows across credential formats. |
| EUDI Wallet Architecture and Reference Framework | Commonly composed with | Identity Wallets | EUDI ARF profiles wallet roles, trust lists, and secure-device assumptions. |
| ISO mdoc / mobile driving licence | Used in | Identity Wallets | ISO mdoc and mobile driving licence profiles are deployed credential-wallet formats. |
| DIDComm Messaging v2 | Commonly composed with | Identity Wallets | DIDComm is a wallet-agent messaging layer and should not be mistaken for credential privacy. |
| Shutter encrypted mempool | Commonly composed with | Censorship Resistance | Threshold encryption can reduce pre-reveal content-based censorship but not all exclusion paths. |
| Open Quantum Safe tooling | Used in | Key Rotation and Migration | OQS tooling is useful for experimentation and interoperability, not a deployment certificate. |

## Adjacency Index

Outgoing edges grouped by source. This table is useful when reviewing what a concept, concrete scheme, or page depends on or composes with.

| Source | Outgoing relationships |
| --- | --- |
| Accountability | Commonly composed with -> Auditability<br />Requires -> Authenticity |
| Hyperledger AnonCreds v1 | Uses -> Anonymous Credential |
| Anonymity | Breaks if -> Metadata Leakage<br />Commonly composed with -> Unlinkability |
| Anonymous Airdrop | Composes with -> Nullifier |
| arkworks | Uses -> SNARKs, STARKs, and Bulletproofs |
| Auditability | Breaks if -> Metadata Leakage<br />Commonly composed with -> Verifiability |
| Authenticated Encryption | Composes with -> Message Authentication Codes<br />Composes with -> Symmetric Encryption |
| Authenticity | Requires -> Transcript Binding |
| Availability | Commonly composed with -> Threshold Cryptography<br />Weakens if -> Trusted Setup |
| BBS Data Integrity credentials | Uses -> Anonymous Credential |
| BFV homomorphic encryption | Used in -> Private Machine Learning Analytics |
| BLS12-377 | Requires -> Pairings |
| BW6-761 | Requires -> Pairings |
| Censorship Resistance | Breaks if -> Metadata Leakage<br />Commonly composed with -> Encrypted Mempools<br />Requires -> Availability |
| Circom | Uses -> Arithmetization |
| CKKS homomorphic encryption | Used in -> Private Machine Learning Analytics |
| Commitments | Composes with -> Zero-Knowledge Proof |
| Concrete ML | Commonly composed with -> Private Machine Learning Analytics |
| Confidentiality | Breaks if missing -> Authenticated Encryption<br />Commonly composed with -> Integrity |
| Deniability | Breaks if misused -> Digital Signature<br />Commonly composed with -> Forward Secrecy<br />Contrasts with -> Non-Repudiation |
| DIDComm Messaging v2 | Commonly composed with -> Identity Wallets |
| Digital Signature | Inherits risk from -> Discrete Logarithm |
| Domain Separation | Strengthens -> Transcript Binding |
| EMP toolkit | Uses -> Oblivious Transfer |
| Encrypted Mempools | Breaks if -> Metadata Leakage |
| EUDI Wallet Architecture and Reference Framework | Commonly composed with -> Identity Wallets |
| Ferveo threshold-decrypted mempool | Uses -> Threshold Cryptography |
| Forward Secrecy | Commonly composed with -> Secure Channels<br />Requires -> Key Encapsulation and Exchange |
| FRESCO | Uses -> Multi-Party Computation |
| Gennaro-Jarecki-Krawczyk-Rabin DKG | Used in -> Threshold Cryptography |
| gnark | Uses -> Arithmetization |
| halo2 proving system stack | Uses -> Recursive Proofs |
| Homomorphic Encryption | Inherits risk from -> Lattices<br />Used in -> Private Aggregation |
| HQC-128 | Used in -> Code-Based Assumptions |
| HQC-192 | Used in -> Code-Based Assumptions |
| HQC-256 | Used in -> Code-Based Assumptions |
| Integrity | Commonly composed with -> Authenticity |
| ISO mdoc / mobile driving licence | Used in -> Identity Wallets |
| Jubjub | Used in -> Zcash Sapling shielded protocol |
| LUCID encrypted mempool proposal | Uses -> Delayed Reveal |
| Make Receipts Useless | Strengthens -> Electronic Voting |
| MASCOT | Uses -> Oblivious Transfer |
| MD5 | Unsafe instance of -> Hash Function |
| Microsoft SEAL | Uses -> Homomorphic Encryption |
| MiMC | Used in -> Arithmetization |
| Mixnets | Used in -> Electronic Voting |
| ML-DSA-44 | Used in -> Digital Signature |
| ML-DSA-65 | Used in -> Digital Signature |
| ML-DSA-87 | Used in -> Digital Signature |
| ML-KEM-1024 | Used in -> Key Encapsulation and Exchange |
| ML-KEM-512 | Used in -> Key Encapsulation and Exchange |
| ML-KEM-768 | Used in -> Key Encapsulation and Exchange |
| MP-SPDZ framework | Uses -> Multi-Party Computation |
| Non-Repudiation | Commonly composed with -> Accountability<br />Requires -> Digital Signature |
| Nullifier | Implements pattern -> Anti-Double-Use Nullifiers |
| Oblivious Pseudorandom Functions | Used in -> Private Set Intersection |
| Oblivious Transfer | Used in -> Multi-Party Computation |
| OpenID for Verifiable Credential Issuance | Used in -> Identity Wallets |
| OpenID for Verifiable Presentations | Used in -> Identity Wallets |
| Open Quantum Safe tooling | Used in -> Key Rotation and Migration |
| OpenFHE | Uses -> Homomorphic Encryption |
| Password-Authenticated Key Exchange | Composes with -> Secure Channels |
| Pedersen commitment | Requires -> Discrete Logarithm |
| Polynomial Commitments | Used in -> ZK Rollups |
| Poseidon | Used in -> Arithmetization |
| Private DAO Voting | Composes with -> Anonymous Membership<br />Composes with -> Private Aggregation |
| Private Information Retrieval | Contrasts with -> Private Set Intersection |
| Private Payments | Composes with -> Nullifier |
| Private Set Intersection | Composes with -> Multi-Party Computation |
| Public-Key Encryption | Inherits risk from -> Factoring and RSA |
| Range Proofs | Requires -> Commitments |
| Rescue-Prime | Used in -> Arithmetization |
| RSAES-PKCS1-v1_5 encryption | Unsafe instance of -> Public-Key Encryption |
| Selective Disclosure JWT | Contrasts with -> Anonymous Credential |
| Secure Aggregation | Implements pattern -> Private Aggregation |
| Secure Channels | Composes with -> Authenticated Encryption<br />Composes with -> Transcript Binding |
| SHA-1 | Unsafe instance of -> Hash Function |
| Shutter encrypted mempool | Commonly composed with -> Censorship Resistance<br />Uses -> Threshold Cryptography |
| SLH-DSA SHA2 parameter sets | Uses -> Hash Function |
| SLH-DSA SHAKE parameter sets | Uses -> Hash Function |
| SNARKs, STARKs, and Bulletproofs | Inherits risk from -> Pairings<br />Inherits risk from -> Trusted Setup |
| SPDZ protocol family | Used in -> Multi-Party Computation |
| Threshold BLS signatures | Requires -> Pairings |
| Unlinkability | Breaks if misused -> Nullifier<br />Commonly composed with -> Domain Separation |
| W3C Data Integrity ECDSA credentials | Uses -> Authenticity |
| W3C Data Integrity EdDSA credentials | Uses -> Authenticity |
| Vector Commitments | Used in -> Privacy-Preserving Revocation |
| Verifiability | Breaks if missing -> Transcript Binding<br />Commonly composed with -> Integrity |
| Zcash Orchard shielded protocol | Uses -> Halo-style recursion |
| Zcash Sapling shielded protocol | Uses -> Private Payments |
| Zero-Knowledge Proof | Inherits risk from -> Random Oracle Model |
| ZK Rollups | Composes with -> Transcript Binding |
