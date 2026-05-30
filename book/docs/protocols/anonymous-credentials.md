---
title: Anonymous Credentials
type: protocol
level: protocol
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: emerging
tags:
  - anonymous-credentials
  - privacy
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

## Where it is used

- Private access control.
- Eligibility proofs.
- Age or membership claims.

## Further reading

- TODO: Add verified references for anonymous credential systems.
