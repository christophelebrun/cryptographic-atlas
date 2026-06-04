---
title: Identity Wallets
type: system
level: system
template: case-study
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - identity-wallets
  - credentials
  - selective-disclosure
post_quantum_posture: depends
confidence_model:
  type: trusted-issuer
---

# Identity Wallets

## Overview

Identity wallets store credentials and present claims to verifiers, sometimes with selective disclosure or privacy-preserving proofs.

## Goals

- Holder-controlled credential presentation.
- Issuer authenticity.
- Selective disclosure.
- Optional unlinkability across presentations.

## Non-goals

- Trustlessness; issuers still matter.
- Protection from rare-attribute re-identification.
- Revocation privacy by default.
- Device compromise protection.

## Building blocks

- Digital signatures or anonymous credentials.
- Holder binding.
- Selective disclosure proofs.
- Status lists, accumulators, or revocation registries.
- Secure storage and recovery.

## Metadata leaks

- Issuer/verifier collusion.
- Presentation timing.
- Rare attributes.
- Status-check queries.
- Wallet software fingerprinting.

## Post-quantum posture

Depends on credential signatures, holder binding, revocation commitments, and wallet secure storage. Many deployed credential stacks rely on classical signatures.

## Confidence model

Confidence comes from trusted issuers, holder-side secrets, verifier policy, wallet implementation, and status infrastructure.

## Failure modes

- Over-disclosure by wallet UX.
- Revocation checks tracking holders.
- Device compromise or credential export.
- Issuer keys not rotated or revoked cleanly.

## Related concepts

- [Anonymous Credentials](/docs/protocols/anonymous-credentials)
- [Blind-Signature Credentials](/docs/protocols/blind-signature-credentials)
- [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation)

## Further reading

- [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model/).
- [W3C Bitstring Status List v1.0](https://www.w3.org/TR/vc-bitstring-status-list/).
- [Camenisch and Lysyanskaya, "An Efficient System for Non-transferable Anonymous Credentials"](https://doi.org/10.1007/3-540-44987-6_7).
