---
title: Digital Signatures
type: primitive
level: basic-primitive
status: draft
last_reviewed: 2026-05-30
difficulty: beginner
maturity: deployed
tags:
  - signatures
  - authentication
---

# Digital Signatures

## One-sentence intuition

A digital signature lets a private key holder authorize a message so anyone with the public key can verify it.

## Security properties

- Message authenticity.
- Integrity.
- Non-repudiation in some legal or operational contexts, depending on key control.

## What it does not provide

- Confidentiality.
- Anonymity.
- Proof that the signer understood the message.
- Protection if the private key is stolen.

## Use cases

- Software updates.
- Blockchain transactions.
- Credential issuance.
- Protocol transcript authentication.

## Post-quantum posture

Depends on the signature scheme. RSA, ECDSA, EdDSA, and Schnorr-style signatures are quantum-vulnerable, while standardized post-quantum signature families such as ML-DSA and SLH-DSA are designed for post-quantum migration.

## Confidence model

Confidence comes from the signer controlling the private key, verifiers binding the public key to the right identity and context, and the signature scheme resisting forgery.

## Failure modes

- Signing ambiguous encodings.
- Reusing nonces in schemes where nonce uniqueness is required.
- Failing to bind signatures to domain, chain, or protocol context.

## Further reading

- TODO: Add verified references for signature schemes and safe message encoding.
