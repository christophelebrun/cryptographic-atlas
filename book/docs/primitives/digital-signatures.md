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

## Failure modes

- Signing ambiguous encodings.
- Reusing nonces in schemes where nonce uniqueness is required.
- Failing to bind signatures to domain, chain, or protocol context.

## Further reading

- TODO: Add verified references for signature schemes and safe message encoding.
