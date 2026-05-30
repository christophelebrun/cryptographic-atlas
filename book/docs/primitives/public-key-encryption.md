---
title: Public-Key Encryption
type: primitive
level: basic-primitive
status: draft
last_reviewed: 2026-05-30
difficulty: beginner
maturity: deployed
tags:
  - encryption
  - confidentiality
---

# Public-Key Encryption

## One-sentence intuition

Public-key encryption lets anyone encrypt to a public key while only the private key holder can decrypt.

## Security properties

- Confidentiality of plaintexts under the chosen security model.
- Sometimes sender anonymity or ciphertext unlinkability, depending on the construction and context.

## What it does not provide

- Sender authentication.
- Message validity beyond successful decryption.
- Protection against metadata leaks.
- Safety if keys are misbound to identities.

## Use cases

- Secure messaging.
- Hybrid encryption.
- Encrypted ballots.
- Key exchange support, depending on the protocol.

## Post-quantum posture

Depends on the scheme. RSA and elliptic-curve public-key encryption or key agreement are quantum-vulnerable. Post-quantum key encapsulation mechanisms such as ML-KEM are designed for migration, but protocol integration still matters.

## Confidence model

Confidence comes from key authenticity, correct encryption or encapsulation, secure private-key handling, and the recipient's ability to decrypt. If the public key is bound to the wrong party, confidentiality can fail even when the encryption algorithm is sound.

## Failure modes

- Using raw textbook encryption instead of authenticated, padded, or hybrid constructions.
- Forgetting key authentication.
- Treating encrypted data as valid without additional checks or proofs.

## Further reading

- TODO: Add verified references for public-key encryption security notions.
