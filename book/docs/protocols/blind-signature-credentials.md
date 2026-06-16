---
title: Blind-Signature Credentials
type: protocol
level: protocol
template: protocol
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
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: intermediate
maturity: emerging
tags:
  - credentials
  - blind-signatures
  - privacy
post_quantum_posture: depends
confidence_model:
  type: trusted-issuer
---

# Blind-Signature Credentials

## Goal

Issue credentials through blind signatures so an issuer can authorize a holder without seeing the exact token or presentation later.

## Participants

- Issuer.
- Holder.
- Verifier.
- Optional revocation or status service.

## Inputs and outputs

Inputs: issuer policy, holder attributes or eligibility, blinded message, presentation context, and verifier policy.

Outputs: a signed credential or token, and later a verifier decision.

## Building blocks

- Blind signatures.
- Holder secrets.
- Selective disclosure or presentation protocol.
- Revocation and status mechanisms.

## Security goals

- Blind issuance.
- Credential authenticity.
- Limited disclosure under the presentation protocol.
- Unlinkability when metadata and revocation support it.

## Non-goals

- Attribute privacy by default.
- Revocation privacy by default.
- Non-transferability without holder binding.
- Protection from rare-attribute re-identification.

## Threat model

Issuers and verifiers may collude to link issuance and presentation. Holders may try to forge or share credentials. Verifiers may over-collect attributes.

## Protocol sketch

1. Holder blinds a credential message or token.
2. Issuer checks eligibility and signs the blinded value.
3. Holder unblinds and stores the credential.
4. Holder presents a credential or derived proof to a verifier.
5. Verifier checks issuer authenticity, context, and status policy.

## Trust assumptions

- Issuer is trusted for claims.
- Blind signature unforgeability and blindness hold.
- Holder secrets remain protected when non-transferability matters.
- Revocation does not become a tracking beacon.

## Post-quantum posture

Depends on the signature and proof system. Common RSA or elliptic-curve designs are quantum-vulnerable.

## Confidence model

Confidence comes from trusted-issuer claims, mathematical assumptions, holder secrets, and operational privacy controls around status checks.

## Metadata leaks

- Issuance timing.
- Verifier identity.
- Rare disclosed attributes.
- Revocation or status queries.

## Failure modes

- Treating blind signatures as complete anonymous credentials.
- Over-issuing credentials.
- Linking by metadata or revocation checks.
- No holder binding when transfer is a threat.

## Variants

- Blind-signature bearer credentials.
- Partially blind credentials.
- Selective-disclosure credentials with blind issuance.

## Where it is used

- Anonymous authorization.
- Private rate limits.
- Credential wallets.
- Token systems.

## Further reading

- [Chaum, "Blind Signatures for Untraceable Payments"](https://doi.org/10.1007/978-1-4757-0602-4_18).
- [RFC 9474: RSA Blind Signatures](https://www.rfc-editor.org/rfc/rfc9474).
- [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model/).
