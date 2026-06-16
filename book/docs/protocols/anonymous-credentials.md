---
title: Anonymous Credentials
type: protocol
level: protocol
template: protocol
status: current
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
  - anonymous-credentials
  - privacy
post_quantum_posture: depends
confidence_model:
  type: trusted-issuer
source_review:
  window_months: 6
  next_review_due: '2026-12-04'
  notes: Re-check W3C, IETF, OpenID4VC, AnonCreds, BBS, SD-JWT VC, wallet, and revocation references.
---

# Anonymous Credentials

## Goal

Anonymous credentials let a user prove authorization or attributes without revealing a stable identity.

## Participants

- Issuer.
- Holder.
- Verifier.

## Inputs and outputs

The issuer gives a credential to a holder. Later, the holder proves selected claims to a verifier.

## Building blocks

- Digital signatures or credential schemes.
- Zero-knowledge proofs.
- Revocation or status mechanisms.

## Security goals

- Selective disclosure.
- Unlinkability between presentations, depending on the scheme.
- Issuer authenticity.

## Non-goals

- Network anonymity.
- Coercion resistance.
- Protection if the holder exposes secrets.

## Threat model

Designs must consider issuer-verifier collusion, verifier tracking, credential sharing, and revocation leakage; credential-status mechanisms are part of the W3C credential model and can expose privacy-sensitive presentation behavior if composed poorly ([W3C VC Data Model 2.0](https://www.w3.org/TR/vc-data-model/), [W3C Bitstring Status List v1.0](https://www.w3.org/TR/vc-bitstring-status-list/)).

## Protocol sketch

1. The issuer verifies eligibility and issues a credential.
2. The holder stores the credential and secret.
3. The holder proves a claim to a verifier.
4. The verifier checks the proof, issuer, context, and revocation status.

## Trust assumptions

The issuer may be trusted to issue correctly. Some systems require non-collusion or privacy-preserving revocation infrastructure.

## Post-quantum posture

Depends on the credential signature scheme, presentation proof, accumulator, and revocation mechanism. The anonymous-credential pattern itself is not enough to determine post-quantum posture; pairing-based credential signatures inherit quantum-vulnerable discrete-logarithm assumptions under Shor's algorithm ([Shor 1994](https://doi.org/10.1109/SFCS.1994.365700)).

## Confidence model

Confidence usually depends on a trusted issuer, holder-controlled secrets, verifier-side checks, and revocation infrastructure. Some designs also require non-collusion between issuer and verifier to preserve privacy.

## Metadata leaks

Timing, verifier identity, IP addresses, rare attributes, and revocation checks can identify the holder ([Metadata Leakage](/docs/appendices/metadata-leakage), [W3C Bitstring Status List v1.0](https://www.w3.org/TR/vc-bitstring-status-list/)).

## Failure modes

- Attributes are too identifying.
- Revocation checks create tracking.
- Presentations are not bound to the right context.
- Credentials are transferable when the system assumes they are not.

## Variants

- Selective disclosure credentials.
- Anonymous credentials with nullifiers.
- Unlinkable presentations.

## Concrete schemes and systems

| Scheme or family | Typical role | Key differences and cautions |
| --- | --- | --- |
| CL signatures / Idemix-style credentials | Anonymous credentials with selective disclosure | Mature academic lineage; issuer trust and revocation design are central ([Camenisch and Lysyanskaya](https://doi.org/10.1007/3-540-44987-6_7)). |
| BBS+ signatures | Selective-disclosure credentials and unlinkable presentations | Pairing-based and quantum-vulnerable; useful for compact multi-message disclosure ([IETF BBS draft](https://datatracker.ietf.org/doc/draft-irtf-cfrg-bbs-signatures/), [Shor 1994](https://doi.org/10.1109/SFCS.1994.365700)). |
| SD-JWT / selective-disclosure verifiable credentials | Practical web credential ecosystems | Easier web integration, but not automatically unlinkable against issuer/verifier correlation ([RFC 9901](https://www.rfc-editor.org/rfc/rfc9901)). |
| ZK credential systems | Credentials proven inside a zero-knowledge proof | Can hide more metadata, but inherits proof-system assumptions and circuit correctness risk. |
| Accumulator-based revocation | Private or semi-private status checks | Revocation can reintroduce linkability if freshness checks are not designed carefully. |

## Source-depth notes

Credential pages should distinguish mature anonymous-credential schemes from web credential profiles that primarily provide issuer authenticity and selective disclosure. BBS-based W3C and IETF work should be checked against its current draft or recommendation status before making deployment claims ([W3C Data Integrity BBS Cryptosuites](https://www.w3.org/TR/vc-di-bbs/), [IETF BBS draft](https://datatracker.ietf.org/doc/draft-irtf-cfrg-bbs-signatures/)), while SD-JWT is standardized for selective disclosure and SD-JWT VC status should be checked separately ([RFC 9901](https://www.rfc-editor.org/rfc/rfc9901), [SD-JWT VC draft](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/)).

## Where it is used

- Private access control.
- Eligibility proofs.
- Age or membership claims.

## Further reading

- Camenisch and Lysyanskaya, [An Efficient System for Non-transferable Anonymous Credentials with Optional Anonymity Revocation](https://doi.org/10.1007/3-540-44987-6_7).
- Goldwasser, Micali, and Rackoff, [The Knowledge Complexity of Interactive Proof Systems](https://doi.org/10.1137/0218012).
- IETF CFRG, [The BBS Signature Scheme](https://datatracker.ietf.org/doc/draft-irtf-cfrg-bbs-signatures/).
- W3C, [Data Integrity BBS Cryptosuites v1.0](https://www.w3.org/TR/vc-di-bbs/).
- RFC 9901, [Selective Disclosure for JSON Web Tokens](https://www.rfc-editor.org/rfc/rfc9901).
- IETF OAuth, [SD-JWT-based Verifiable Digital Credentials](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/).
- OpenID Foundation, [OpenID for Verifiable Credential Issuance](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html).
- OpenID Foundation, [OpenID for Verifiable Presentations](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html).
- Hyperledger, [AnonCreds Specification](https://hyperledger.github.io/anoncreds-spec/).
- W3C, [Bitstring Status List v1.0](https://www.w3.org/TR/vc-bitstring-status-list/).
