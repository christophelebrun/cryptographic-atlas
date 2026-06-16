---
title: Password Hashing
type: primitive
level: basic-primitive
template: concept
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
difficulty: beginner
maturity: deployed
tags:
  - passwords
  - hashing
  - authentication
post_quantum_posture: plausible
confidence_model:
  type: client-side-secret
---

# Password Hashing

## One-sentence intuition

Password hashing stores a salted, deliberately expensive verifier so stolen password databases are harder to brute-force offline.

## Where it sits in the taxonomy

- Level: basic primitive and storage pattern.
- Parent category: [Key Derivation Functions](/docs/primitives/key-derivation-functions).
- Related concepts: [Password-Authenticated Key Exchange](/docs/protocols/password-authenticated-key-exchange), [Randomness and Nonces](/docs/primitives/randomness-and-nonces).

## Problem it solves

Passwords are usually low entropy. If a database stores raw passwords or fast hashes, an attacker who steals it can test guesses cheaply. Password hashing raises the cost of each guess.

## Mental model

The salt prevents attackers from reusing one giant lookup table. The work factor makes every guess expensive. Memory hardness makes specialized parallel hardware less attractive.

## Minimal example

A server stores `Argon2id(password, salt, parameters)` plus the salt and parameters. During login, it recomputes the verifier and compares it in constant time.

## Security properties

- Per-password salts defeat shared precomputation.
- Work and memory factors slow offline guessing.
- Parameter metadata supports future upgrades.

## What it does not provide

- High entropy for weak passwords.
- Protection against online guessing without rate limits.
- Password-authenticated key exchange.
- Safe reset or recovery flows.
- Protection if plaintext passwords are logged before hashing.

## Assumptions

- Salt generation is random and unique enough.
- Parameters match current hardware and risk tolerance.
- The chosen function is designed for password storage.
- Online guessing and reset flows are separately controlled.

## Post-quantum posture

Plausible with conservative parameters. Quantum search can reduce brute-force margins, but password strength, rate limits, and work factors dominate practical security.

## Confidence model

Confidence depends on client-side-secret quality, server-side verifier handling, parameter selection, and operational controls around login and recovery.

## Common constructions

- Argon2id.
- scrypt.
- PBKDF2, mainly for legacy or compatibility contexts.
- bcrypt, mainly for legacy deployments with parameter caveats.

## Use cases

- Password verifier storage.
- Password-derived local encryption keys with careful UX.
- Migration from legacy password databases.

## Composition patterns

Password hashing is paired with rate limits, breach monitoring, multi-factor authentication, and parameter migration. It is distinct from PAKE, which changes the login protocol rather than only the stored verifier.

## Failure modes and anti-patterns

- Raw SHA-256 or unsalted fast hashes.
- Global salts reused for every user.
- Parameters never upgraded.
- Passwords logged before hashing.
- Reset flows weaker than the password verifier.

## Maturity and deployment

Widely deployed, but often misconfigured. Mature deployments periodically review parameters and recovery policy.

## Related concepts

- [Key Derivation Functions](/docs/primitives/key-derivation-functions)
- [Password-Authenticated Key Exchange](/docs/protocols/password-authenticated-key-exchange)
- [Secure Channels](/docs/protocols/secure-channels)

## Further reading

- [RFC 9106: Argon2](https://www.rfc-editor.org/rfc/rfc9106).
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).
- [Boneh and Shoup, "A Graduate Course in Applied Cryptography"](https://toc.cryptobook.us/).
