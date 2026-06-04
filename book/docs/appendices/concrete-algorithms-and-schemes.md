---
title: Concrete Algorithms and Schemes
type: appendix
level: not-applicable
template: reference
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - algorithms
  - schemes
  - taxonomy
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Concrete Algorithms and Schemes

This appendix explains how concrete algorithms, schemes, parameter families, and named protocol suites fit into the taxonomy. The machine-readable source of truth is `book/data/instances.yml`, where each entry declares `instance_of` relationships to parent concept-card IDs.

## Where algorithms sit in the taxonomy

Concrete algorithms inherit the taxonomy level of the concept they instantiate. They are not a separate top-level level; they sit in a cross-cutting instance layer attached to a parent concept.

Use this mental format:

```text
Concrete instance of: [parent concept]
```

Examples: Ed25519 is a concrete instance of digital signatures, Groth16 is a concrete instance of SNARK-style proof systems, and TLS 1.3 is a concrete instance of secure-channel protocols. The registry also tracks concrete entries such as P-256, Curve25519, BLS12-381, BN254, SHA-1, MD5, Classic McEliece, HQC, RSA blind signatures, ECVRF, FROST, threshold BLS, MLS, Privacy Pass, PLONK-style proof systems, Nova-style folding, Halo-style recursion, ZK-friendly hashes, FHE schemes, MPC protocol families, W3C credential profiles, Zcash-style payment profiles, encrypted-mempool profiles, and W3C Bitstring Status Lists.

| Example | Taxonomy placement | Why |
| --- | --- | --- |
| SHA-256 | Basic primitive: hash functions | It is a concrete hash algorithm. |
| AES-GCM | Basic primitive: symmetric encryption / authenticated encryption | It is a concrete encryption mode and authentication composition. |
| HMAC-SHA-256 | Basic primitive: message authentication codes | It is a concrete MAC construction. |
| Ed25519 | Basic primitive: digital signatures | It is a concrete signature scheme. |
| X25519 | Basic primitive: key exchange | It is a concrete Diffie-Hellman function over Curve25519. |
| ML-KEM | Basic primitive: key encapsulation | It is a concrete post-quantum key-encapsulation mechanism. |
| Groth16 | Proof system | It is a concrete succinct proof system. |
| Pedersen commitment | Basic primitive: commitments | It is a concrete commitment scheme. |
| KZG commitment | Structured primitive: polynomial/vector commitment | It is a concrete commitment scheme with pairing and setup assumptions. |
| TLS 1.3 | Protocol: secure channels | It is a concrete protocol suite combining key exchange, authentication, transcript binding, and traffic protection. |
| OPAQUE | Protocol: password-authenticated key exchange | It is a concrete PAKE suite with OPRF, envelope, and authenticated key-exchange components. |

This distinction matters because a name like `SHA-256` does not explain its goal, assumptions, misuse cases, or composition role. The concept page should explain the primitive; the instance entry should explain the concrete trade-offs.

## Why most algorithms are not first-class pages

The book is organized by concepts, not as an algorithm catalog. That keeps the taxonomy readable, but readers still encounter names such as `SHA-256`, `AES-GCM`, `Ed25519`, `X25519`, `BLS12-381`, `Groth16`, or `ML-KEM` before they understand where those names sit.

For that reason, concrete algorithms should usually appear first as comparison tables on their parent concept pages. A dedicated page is useful only when the named scheme has distinct assumptions, failure modes, deployment status, or composition risks that would overload the parent page.

## Machine-readable instance registry

The instance registry lives in `book/data/instances.yml`. Each entry includes:

- `id` and `name`;
- `kind`, such as algorithm, scheme, mode, curve, standard, or protocol suite;
- `instance_of`, which points to one or more concept-card IDs;
- taxonomy level, maturity, post-quantum posture, setup posture, assumptions, uses, cautions, and references.

Validation checks that every instance ID is unique, every parent in `instance_of` exists as a concept card, and every reference ID exists in `book/data/references.yml`.

Use an `instance_of` relationship rather than a new `level` value. That preserves the main taxonomy while allowing filters such as "show concrete instances of digital signatures" or "show post-quantum instances of key encapsulation".

Concrete algorithms should be added when they do at least one of the following:

- appear frequently in real systems;
- change the trust assumptions or post-quantum posture;
- have important misuse hazards;
- are common in blockchain, zero-knowledge, privacy, or applied security systems;
- are legacy names readers still need to recognize.

## Expansion candidates by category

The registry is intentionally selective. The tables below are expansion candidates; some entries are already present in `book/data/instances.yml` and others remain useful future additions.

### Assumptions and substrates

These are mostly parameter families, groups, curves, or problem families rather than standalone algorithms.

| Area | Include first | Include later or mention as caution |
| --- | --- | --- |
| Finite-field discrete logarithm | FFDHE groups, safe-prime groups | Small or custom groups |
| Elliptic curves | P-256, P-384, Curve25519, Curve448, secp256k1 | P-521, legacy binary curves |
| Pairing-friendly curves | BLS12-381, BN254 | BW6 curves, MNT curves |
| RSA substrate | RSA modulus sizes, public exponent conventions | Multi-prime RSA, raw RSA |
| Lattice assumptions | Learning with errors (LWE), module-LWE, short integer solution (SIS), module-SIS, NTRU lattices | Ring-LWE variants, parameter-set caveats |
| Hash-to-curve | RFC 9380 suites | Ad hoc hash-to-curve mappings |

### Basic primitives

| Primitive page | Include first | Include later or mention as caution |
| --- | --- | --- |
| Hash functions | SHA-256, SHA-384, SHA-512, SHA3-256, SHAKE128, SHAKE256, BLAKE2, BLAKE3 | SHA-1 and MD5 as broken or legacy context |
| ZK-friendly hashes | Poseidon, Rescue, MiMC, Griffin | Pedersen hash, domain-specific circuit costs |
| Symmetric encryption and AEAD | AES-GCM, ChaCha20-Poly1305, XChaCha20-Poly1305, AES-GCM-SIV, AES-SIV | AES-CBC as legacy; AES-ECB as an anti-pattern |
| Block ciphers | AES-128, AES-192, AES-256 | DES and 3DES as legacy context |
| Message authentication codes | HMAC-SHA-256, HMAC-SHA-512, CMAC-AES, GMAC, Poly1305, KMAC | CBC-MAC misuse outside its narrow setting |
| Key derivation and password hashing | HKDF, PBKDF2, scrypt, Argon2id | Raw hashes as password storage anti-patterns |
| Randomness and nonces | HMAC_DRBG, Hash_DRBG, CTR_DRBG, ChaCha20-based CSPRNGs, operating-system CSPRNG interfaces | Reused nonces, userland entropy mixers |
| Commitments | Hash commitments, Pedersen commitments, Merkle commitments | Low-entropy committed values without salt or hiding |
| Digital signatures | Ed25519, Ed448, ECDSA P-256, ECDSA secp256k1, RSA-PSS, Schnorr/BIP-340, BLS signatures, ML-DSA, SLH-DSA | RSA PKCS #1 v1.5 signatures, DSA, Falcon/FN-DSA as standardization and deployment profiles evolve |
| Public-key encryption and KEMs | RSA-OAEP, HPKE, X25519, X448, ML-KEM | RSAES-PKCS1-v1_5, ECIES variants, HQC while standardization is still in progress |
| Secret sharing | Shamir secret sharing, additive secret sharing, Feldman VSS, Pedersen VSS | Naive share splitting |

### Structured primitives

| Primitive page | Include first | Include later or mention as caution |
| --- | --- | --- |
| Homomorphic encryption | BFV, BGV, CKKS, TFHE/FHEW | Parameter-selection examples and bootstrapping costs |
| Homomorphic commitments | Pedersen vector commitments, KZG commitments, inner-product-argument commitments | Trusted-setup and pairing-specific caveats |
| Threshold cryptography | FROST, threshold BLS, threshold ECDSA families, distributed key generation (DKG) | Implementation-specific MPC signing protocols |
| Accumulators and authenticated data structures | Merkle trees, sparse Merkle trees, RSA accumulators, bilinear accumulators, Verkle/KZG vector commitments | Dynamic accumulator update costs |
| Timelocks and VDFs | Wesolowski VDF, Pietrzak VDF, timelock encryption from repeated squaring | Centralized delay services |
| Functional encryption | Identity-based encryption, attribute-based encryption, inner-product functional encryption | General functional encryption as mostly theoretical |

### Proof systems

| Proof-system page | Include first | Include later or mention as caution |
| --- | --- | --- |
| Interactive proof building blocks | Sigma protocols, Schnorr identification, Fiat-Shamir transform | Rewinding assumptions and transcript ambiguity |
| SNARK families | Groth16, PLONK, Marlin, Sonic-style universal setup systems | Scheme-specific arithmetization details |
| Transparent proof systems | STARKs, FRI, DEEP-FRI | Parameter and hash choices |
| Inner-product systems | Bulletproofs, Halo-style accumulation, Nova-style folding | Proof-size and verification trade-offs |
| Range proofs | Bulletproof range proofs, Pedersen commitment plus range proof patterns | Bit-decomposition pitfalls |
| Membership proofs | Merkle inclusion proofs, sparse Merkle proofs, RSA accumulator witnesses, KZG opening proofs | Non-membership proofs and update witnesses |
| Lookup and set arguments | Plookup-style lookups, permutation arguments, grand-product arguments | Circuit-specific soundness caveats |

### Protocols

| Protocol page | Include first | Include later or mention as caution |
| --- | --- | --- |
| Key establishment and secure channels | TLS 1.3, HPKE, Noise patterns, Signal X3DH and Double Ratchet | Legacy TLS and static key exchange |
| Multi-party computation | Yao garbled circuits, GMW, BGW, SPDZ, MASCOT, oblivious transfer extension | Fairness and abort-model variants |
| Secure aggregation | Bonawitz-style secure aggregation, Prio/Prio+ | Small-cohort leakage and dropout handling |
| Oblivious pseudorandom functions | RFC 9497 OPRF/VOPRF/POPRF suites | Prime-order-group suites are quantum-vulnerable; application context binding matters. |
| Private set intersection | Diffie-Hellman PSI, OPRF-based PSI, circuit PSI | Cardinality-only PSI and malicious-security upgrades |
| Anonymous credentials | CL signatures / Idemix, BBS+ signatures, selective-disclosure JWT/VC patterns, ZK credential systems | Revocation and rare-attribute leakage |
| Mixnets | Chaumian mixnets, Sphinx packet format, Loopix-style mixnets | Timing and active tagging attacks |
| Electronic voting | Helios-style encrypted tallying, mixnet tallying, homomorphic tallying, coercion-resistant protocols | Receipt-freeness claims without a coercion model |

### Design patterns and systems

| Pattern or system page | Include first | Include later or mention as caution |
| --- | --- | --- |
| Commit-reveal | Hash commit-reveal, Pedersen commit-reveal, VDF-assisted delayed reveal | Abort and last-mover advantage |
| Anonymous membership | Semaphore-style Merkle membership, accumulator-based membership, nullifier-based rate limiting | Small anonymity sets |
| Anti-double-use nullifiers | Hash nullifiers, serial-number e-cash patterns, context-bound nullifiers | Cross-context linkability |
| Private aggregation | Secret-shared aggregation, Prio-style validation, differential privacy composition | Differencing attacks |
| Private payments | Zerocoin, Zerocash, Zcash Sapling/Orchard-style note systems | Ledger metadata leakage |
| ZK rollups | Groth16-based rollups, PLONK-ish rollups, STARK-based rollups | Data availability and prover centralization |

## Editorial policy

Algorithm coverage should be practical rather than exhaustive. Prefer:

- one concept page for the primitive or protocol;
- a comparison table for common concrete schemes;
- a dedicated page only when the scheme has distinct assumptions, failure modes, deployment status, or composition risks.

Legacy or broken algorithms can be included when readers need to recognize them, but they should be labeled as legacy, deprecated, or unsafe for new systems.

## Further reading

- NIST, [FIPS 180-4: Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final).
- NIST, [FIPS 202: SHA-3 Standard](https://csrc.nist.gov/projects/hash-functions).
- NIST, [FIPS 197: Advanced Encryption Standard](https://csrc.nist.gov/pubs/fips/197/final).
- NIST, [FIPS 186-5: Digital Signature Standard](https://csrc.nist.gov/pubs/fips/186-5/final).
- NIST, [Post-Quantum Cryptography standardization](https://csrc.nist.gov/Projects/Post-Quantum-Cryptography/Post-Quantum-Cryptography-Standardization).
- RFC 5869, [HMAC-based Extract-and-Expand Key Derivation Function](https://datatracker.ietf.org/doc/html/rfc5869).
- RFC 7748, [Elliptic Curves for Security](https://datatracker.ietf.org/doc/rfc7748/).
- RFC 8032, [Edwards-Curve Digital Signature Algorithm](https://www.rfc-editor.org/rfc/rfc8032).
- RFC 8439, [ChaCha20 and Poly1305 for IETF Protocols](https://www.rfc-editor.org/rfc/rfc8439).
- RFC 9180, [Hybrid Public Key Encryption](https://www.rfc-editor.org/rfc/rfc9180).
- RFC 9380, [Hashing to Elliptic Curves](https://www.rfc-editor.org/info/rfc9380).
