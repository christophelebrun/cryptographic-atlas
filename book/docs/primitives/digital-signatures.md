---
title: Digital Signatures
type: primitive
level: basic-primitive
template: concept
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
maturity: deployed
tags:
  - signatures
  - authentication
post_quantum_posture: depends
confidence_model:
  type: mathematical-assumption
---

# Digital Signatures

## One-sentence intuition

A digital signature lets a private key holder authorize a message so anyone with the public key can verify it.

## Where it sits in the taxonomy

- Level: basic-primitive
- Parent category: authentication
- Related concepts: [Anonymous Credentials](/docs/protocols/anonymous-credentials), [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography), [Public-Key Encryption](/docs/primitives/public-key-encryption)

## Problem it solves

Open systems need a way for anyone to verify that a message was authorized by a private-key holder. Digital signatures provide public verifiability for origin and integrity, but only if keys, contexts, and verification rules are handled correctly.

## Mental model

Think of a public wax seal: anyone can check the seal, but only the private key holder should be able to create it.

## Minimal example

A package maintainer signs a release digest; users verify the signature against the maintainer public key before installing.

## Security properties

- Message authenticity.
- Integrity.
- Non-repudiation in some legal or operational contexts, depending on key control.

## What it does not provide

- Confidentiality.
- Anonymity.
- Proof that the signer understood the message.
- Protection if the private key is stolen.

## Assumptions

The signature scheme must resist forgery, the private key must remain secret, and verifiers must bind the public key to the right signer, protocol, message format, and domain.

## Post-quantum posture

Depends on the signature scheme. RSA, ECDSA, EdDSA, and Schnorr-style signatures are quantum-vulnerable, while finalized post-quantum signature standards such as ML-DSA and SLH-DSA are designed for post-quantum migration. Falcon/FN-DSA is selected for ongoing standardization, so its deployment status should be checked separately.

## Confidence model

Confidence comes from the signer controlling the private key, verifiers binding the public key to the right identity and context, and the signature scheme resisting forgery.

## Common constructions

### Concrete algorithms and schemes

| Scheme family | Examples | Common role | Post-quantum posture and cautions |
| --- | --- | --- | --- |
| EdDSA | Ed25519, Ed448 | General-purpose signatures where ecosystem support exists | Quantum-vulnerable; deterministic signing helps avoid random nonce failures, but context binding still matters. |
| ECDSA | ECDSA P-256, ECDSA secp256k1 | TLS, certificates, blockchain transactions | Quantum-vulnerable; nonce reuse or biased nonces can expose the private key. |
| Schnorr-style signatures | BIP-340 Schnorr, protocol-specific Schnorr variants | Blockchains, multisignatures, zero-knowledge protocols | Quantum-vulnerable; batch verification and multisignature variants need careful domain separation. |
| RSA-PSS | RSA Probabilistic Signature Scheme | Legacy public-key infrastructure and compatibility | Quantum-vulnerable; prefer PSS over older RSA PKCS #1 v1.5 signatures in new RSA designs. |
| BLS signatures | BLS12-381 or BN254 deployments | Aggregatable signatures and threshold signing | Quantum-vulnerable and pairing-based; subgroup checks and domain separation are critical. |
| ML-DSA | Module-lattice signature standard | Post-quantum migration | Plausibly post-quantum; larger keys and signatures affect protocol design. |
| SLH-DSA | Stateless hash-based signature standard | Conservative post-quantum signatures | Plausibly post-quantum; signatures are large and performance differs sharply from elliptic-curve schemes. |
| Falcon / FN-DSA | Compact lattice signature selected for ongoing NIST standardization | Future post-quantum option where smaller signatures matter | Not one of the three finalized 2024 FIPS standards; track FIPS 206 status before treating as finalized. |
| Legacy signatures | DSA, RSA PKCS #1 v1.5 signatures | Compatibility and verification of old artifacts | Keep as legacy context; do not present as a modern default. |

## Use cases

- Software updates.
- Blockchain transactions.
- Credential issuance.
- Protocol transcript authentication.

## Composition patterns

- Signatures must bind protocol, domain, and message encoding.
- Legal non-repudiation depends on operational key control.

Common adjacent concepts: [Anonymous Credentials](/docs/protocols/anonymous-credentials), [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography), [Public-Key Encryption](/docs/primitives/public-key-encryption).

## Failure modes and anti-patterns

- Signing ambiguous encodings.
- Reusing nonces in schemes where nonce uniqueness is required.
- Failing to bind signatures to domain, chain, or protocol context.

## Maturity and deployment

Classified as deployed. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: high. Parameter sensitivity: high.

## Related concepts

- [Anonymous Credentials](/docs/protocols/anonymous-credentials)
- [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography)
- [Public-Key Encryption](/docs/primitives/public-key-encryption)

## Further reading

- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
- NIST FIPS 204, [Module-Lattice-Based Digital Signature Standard](https://csrc.nist.gov/pubs/fips/204/final).
- NIST FIPS 205, [Stateless Hash-Based Digital Signature Standard](https://csrc.nist.gov/pubs/fips/205/final).
- NIST CSRC, [Post-Quantum Cryptography Project](https://csrc.nist.gov/Projects/post-quantum-cryptography).
