---
title: Identity Wallets
type: system
level: system
template: case-study
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
review:
  structural:
    status: current
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
    next_review_due: '2026-12-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: intermediate
maturity: emerging
tags:
  - identity-wallets
  - credentials
  - selective-disclosure
post_quantum_posture: depends
confidence_model:
  type: trusted-issuer
source_review:
  window_months: 6
  next_review_due: '2026-12-04'
  notes: Re-check W3C VC, OpenID4VC, SD-JWT VC, EUDI ARF, ISO mdoc, AnonCreds, and wallet implementation references.
---

# Identity Wallets

## Overview

Identity wallets store credentials and present claims to verifiers, sometimes with selective disclosure or privacy-preserving proofs; the W3C Verifiable Credentials data model standardizes the credential data model, not a complete privacy-preserving wallet system ([W3C VC Data Model 2.0](https://www.w3.org/TR/vc-data-model/)).

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

Depends on credential signatures, holder binding, revocation commitments, and wallet secure storage. Many deployed credential stacks rely on classical signatures that are quantum-vulnerable under Shor's algorithm ([Shor 1994](https://doi.org/10.1109/SFCS.1994.365700)).

## Confidence model

Confidence comes from trusted issuers, holder-side secrets, verifier policy, wallet implementation, and status infrastructure.

## Failure modes

- Over-disclosure by wallet UX.
- Revocation checks tracking holders ([W3C Bitstring Status List v1.0](https://www.w3.org/TR/vc-bitstring-status-list/)).
- Device compromise or credential export.
- Issuer keys not rotated or revoked cleanly.

## Source-depth notes

Identity-wallet source coverage should distinguish the credential data model, proof cryptosuites, and presentation profiles. W3C Data Integrity ECDSA and EdDSA are credential signature profiles ([ECDSA Cryptosuites](https://www.w3.org/TR/vc-di-ecdsa/), [EdDSA Cryptosuites](https://www.w3.org/TR/vc-di-eddsa/)); BBS, SD-JWT, and SD-JWT VC deployment claims should be checked against their current standards status ([W3C BBS Cryptosuites](https://www.w3.org/TR/vc-di-bbs/), [RFC 9901](https://www.rfc-editor.org/rfc/rfc9901), [SD-JWT VC draft](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/)).

## Related concepts

- [Anonymous Credentials](/docs/protocols/anonymous-credentials)
- [Blind-Signature Credentials](/docs/protocols/blind-signature-credentials)
- [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation)

## Further reading

- [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model/).
- [W3C Bitstring Status List v1.0](https://www.w3.org/TR/vc-bitstring-status-list/).
- [W3C Data Integrity ECDSA Cryptosuites v1.0](https://www.w3.org/TR/vc-di-ecdsa/).
- [W3C Data Integrity EdDSA Cryptosuites v1.0](https://www.w3.org/TR/vc-di-eddsa/).
- [W3C Data Integrity BBS Cryptosuites v1.0](https://www.w3.org/TR/vc-di-bbs/).
- [RFC 9901: Selective Disclosure for JSON Web Tokens](https://www.rfc-editor.org/rfc/rfc9901).
- [IETF SD-JWT-based Verifiable Digital Credentials draft](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/).
- [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html).
- [OpenID for Verifiable Presentations](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html).
- [European Digital Identity Wallet Architecture and Reference Framework](https://eudi.dev/latest/architecture-and-reference-framework-main/).
- [ISO/IEC 18013-5 mobile driving licence application](https://www.iso.org/standard/69084.html).
- [Hyperledger AnonCreds Specification](https://hyperledger.github.io/anoncreds-spec/).
- [Camenisch and Lysyanskaya, "An Efficient System for Non-transferable Anonymous Credentials"](https://doi.org/10.1007/3-540-44987-6_7).
