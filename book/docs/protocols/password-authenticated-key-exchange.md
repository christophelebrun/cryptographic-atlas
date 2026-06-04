---
title: Password-Authenticated Key Exchange
type: protocol
level: protocol
template: protocol
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: deployed
tags:
  - pake
  - passwords
  - authentication
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Password-Authenticated Key Exchange

## Goal

Let parties establish a strong session key from a low-entropy password while preventing passive transcript capture from enabling offline password guessing.

## Participants

- Client or user with a password.
- Server or peer with either the same password, a transformed password record, or an augmented PAKE envelope.
- Active network attacker.

## Inputs and outputs

Inputs:

- Password or password-derived registration record.
- Party identities and protocol parameters.
- Fresh randomness.
- Optional server public key, OPRF key, or credential envelope.

Outputs:

- Shared session key if authentication succeeds.
- Failure if the password, record, or transcript check fails.

## Building blocks

- PAKE-specific algebra or OPRF construction.
- Key derivation functions.
- Authenticated transcript binding.
- Sometimes a secure channel, envelope encryption, or server-side rate limiting.

## Security goals

- Session key establishment from a password.
- Resistance to offline dictionary attacks from recorded handshakes.
- Mutual or asymmetric authentication, depending on the protocol.
- Protection against server-record compromise in augmented PAKEs, depending on the design.

## Non-goals

- Protection against unlimited online guessing.
- Password reset, account recovery, or credential lifecycle policy.
- Metadata privacy.
- Security if the password is phished and used in a real session.

## Threat model

The network attacker can record, replay, and modify messages. PAKE should prevent the attacker from testing password guesses offline from transcripts. The server still needs rate limits and account protections against online guessing. Augmented PAKEs reduce damage from server-record compromise but do not make weak passwords strong.

## Protocol sketch

1. The client and server exchange PAKE messages derived from the password or password record.
2. The protocol hides enough password-dependent material to prevent offline testing.
3. Both parties bind identities, parameters, and messages into a transcript.
4. A key confirmation step verifies that both parties derived the same session key.
5. The session key is used directly or fed into a secure-channel key schedule.

## Trust assumptions

- The PAKE protocol is implemented exactly as specified.
- Password registration records are generated and stored correctly.
- Identities, protocol versions, and suite parameters are transcript-bound.
- Online guessing is rate limited and monitored.

## Post-quantum posture

Depends on the PAKE. OPAQUE as standardized in RFC 9383 uses prime-order-group OPRF suites and is quantum-vulnerable at that layer. Some PAKE research explores post-quantum assumptions, but deployment maturity and standardization vary.

## Confidence model

Confidence is mixed: mathematical-assumption for the PAKE and OPRF layers, client-side-secret for the password, operational controls for online guessing, and implementation review for transcript and envelope handling.

## Metadata leaks

- Account identifier, timing, and login frequency.
- Failure behavior, lockout state, and recovery flows.
- Server identity and supported suite metadata.

## Failure modes

- Treating password hashing as a PAKE.
- Missing identity or parameter binding.
- Allowing downgrade to a weaker password protocol.
- Leaking password-derived material through logs, telemetry, or reset flows.
- Omitting online rate limits.

## Variants

- Balanced PAKE, where both parties share a password.
- Augmented PAKE, where the server stores a password-derived record.
- OPAQUE-style OPRF-based PAKE.
- Password-authenticated secure-channel handshakes.

## Where it is used

- Password login protocols.
- Device pairing.
- Password-derived secure channels.
- Systems that want less server-side verifier exposure than traditional password hashes.

## Further reading

- [RFC 9383: OPAQUE](https://www.rfc-editor.org/rfc/rfc9383).
- [RFC 9497: OPRFs Using Prime-Order Groups](https://www.rfc-editor.org/rfc/rfc9497.html).
- [RFC 9106: Argon2](https://www.rfc-editor.org/rfc/rfc9106).
