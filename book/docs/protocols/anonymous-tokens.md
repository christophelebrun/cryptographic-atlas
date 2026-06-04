---
title: Anonymous Tokens
type: protocol
level: protocol
template: protocol
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - anonymous-tokens
  - privacy-pass
  - rate-limits
post_quantum_posture: depends
confidence_model:
  type: trusted-issuer
---

# Anonymous Tokens

## Goal

Issue and redeem authorization tokens while limiting linkability between issuance and redemption.

## Participants

- Client or holder.
- Issuer that authorizes token issuance.
- Redeemer or verifier.
- Optional attester, rate limiter, or public redemption log.

## Inputs and outputs

Inputs: issuance policy, holder request, token key material, redemption context, and transport metadata.

Outputs: a token or proof accepted by the verifier, or failure if the token is invalid, duplicated, expired, or out of context.

## Building blocks

- Blind signatures or OPRFs.
- Token binding and domain separation.
- Rate limits or issuance policy.
- Optional accumulators, public keys, or redemption logs.

## Security goals

- Unlinkability between issuance and redemption under the protocol model.
- Issuer authenticity.
- One-token-per-event or rate-limited authorization.
- Context binding for token use.

## Non-goals

- Network anonymity.
- Sybil resistance beyond the issuance policy.
- Revocation without extra machinery.
- Protection from device or browser identifiers.

## Threat model

Issuers and verifiers may try to link token issuance and redemption. The model must state whether issuer-verifier collusion is allowed and what metadata they observe.

## Protocol sketch

1. The client obtains authorization under an issuance policy.
2. The issuer issues a blinded or oblivious token.
3. The client unblinds or derives a redeemable token.
4. The verifier checks authenticity, context, and duplicate-use rules.

## Trust assumptions

- Issuer keys and issuance policy are sound.
- The anonymity set is large enough.
- Transport metadata and device identifiers do not re-link redemption.

## Post-quantum posture

Depends on blind-signature, OPRF, and authentication suites. Many standardized suites are currently classical.

## Confidence model

Confidence comes from trusted-issuer policy, mathematical assumptions, client-side token secrecy, and operational separation between issuance and redemption.

## Metadata leaks

- Timing and batch size.
- Client network identifiers.
- Issuer/verifier collusion data.
- Redemption context and device state.

## Failure modes

- Unique token metadata.
- Small issuance batches.
- Shared browser identifiers.
- Issuer and verifier logs joined by timing.

## Variants

- Blind-signature tokens.
- OPRF-based tokens.
- Publicly verifiable tokens.
- Rate-limited anonymous credentials.

## Where it is used

- Privacy Pass-style systems.
- Abuse prevention.
- Private rate limits.
- Anonymous authorization.

## Further reading

- [RFC 9576: Privacy Pass Architecture](https://www.rfc-editor.org/rfc/rfc9576).
- [RFC 9497: OPRFs Using Prime-Order Groups](https://www.rfc-editor.org/rfc/rfc9497.html).
- [RFC 9474: RSA Blind Signatures](https://www.rfc-editor.org/rfc/rfc9474).
