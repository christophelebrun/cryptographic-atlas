---
title: Anonymous Credentials
type: protocol
level: protocol
template: protocol
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - anonymous-credentials
  - privacy
post_quantum_posture: depends
confidence_model:
  type: trusted-issuer
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

Designs must consider issuer-verifier collusion, verifier tracking, credential sharing, and revocation leakage.

## Protocol sketch

1. The issuer verifies eligibility and issues a credential.
2. The holder stores the credential and secret.
3. The holder proves a claim to a verifier.
4. The verifier checks the proof, issuer, context, and revocation status.

## Trust assumptions

The issuer may be trusted to issue correctly. Some systems require non-collusion or privacy-preserving revocation infrastructure.

## Post-quantum posture

Depends on the credential signature scheme, presentation proof, accumulator, and revocation mechanism. The anonymous-credential pattern itself is not enough to determine post-quantum posture.

## Confidence model

Confidence usually depends on a trusted issuer, holder-controlled secrets, verifier-side checks, and revocation infrastructure. Some designs also require non-collusion between issuer and verifier to preserve privacy.

## Metadata leaks

Timing, verifier identity, IP addresses, rare attributes, and revocation checks can identify the holder.

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
| CL signatures / Idemix-style credentials | Anonymous credentials with selective disclosure | Mature academic lineage; issuer trust and revocation design are central. |
| BBS+ signatures | Selective-disclosure credentials and unlinkable presentations | Pairing-based and quantum-vulnerable; useful for compact multi-message disclosure. |
| SD-JWT / selective-disclosure verifiable credentials | Practical web credential ecosystems | Easier web integration, but not automatically unlinkable against issuer/verifier correlation. |
| ZK credential systems | Credentials proven inside a zero-knowledge proof | Can hide more metadata, but inherits proof-system assumptions and circuit correctness risk. |
| Accumulator-based revocation | Private or semi-private status checks | Revocation can reintroduce linkability if freshness checks are not designed carefully. |

## Source-depth notes

Credential pages should distinguish mature anonymous-credential schemes from web credential profiles that primarily provide issuer authenticity and selective disclosure. BBS-based W3C work is current but still draft-stage as of April 2026, while SD-JWT is standardized for selective disclosure and SD-JWT VC remains an active Internet-Draft.

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
- W3C, [Bitstring Status List v1.0](https://www.w3.org/TR/vc-bitstring-status-list/).
