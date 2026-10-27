---
title: Integrity
type: taxonomy
level: security-goal
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-10-27'
review:
  structural:
    status: current
    last_reviewed: '2026-10-27'
  sources:
    status: current
    last_reviewed: '2026-10-27'
    next_review_due: '2027-04-27'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: beginner
maturity: not-applicable
tags:
  - security-goals
  - integrity
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Integrity

## One-sentence intuition

Integrity lets a verifier detect an unauthorized change to protected data. [Boneh and Shoup, Part I][book].

## Where it sits in the taxonomy

- Level: security goal (level 1).
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Authenticity](/docs/taxonomy/authenticity), [Message Authentication Codes](/docs/primitives/message-authentication-codes), [Digital Signatures](/docs/primitives/digital-signatures).

## Problem it solves

If Alice sends “pay Bob 10,” an attacker should not be able to turn it into “pay Bob 100” and have the altered instruction accepted. Cryptographic integrity makes such forgery infeasible under a stated attack model; it does not physically prevent someone from changing bytes. [Boneh and Shoup, message authentication][book].

## Mental model

A tamper-evident seal tells Bob that the package no longer matches what was sealed. Bob still needs a trustworthy way to recognize the seal and must check it before acting.

## Minimal example

A webhook sender attaches a message authentication code (MAC), a keyed check value, to a request. The receiver verifies it using their shared secret. An attacker without that secret should not be able to change the covered bytes and produce an accepted tag. Either secret holder can create tags, so this is not public proof of which holder sent the request. [Boneh and Shoup, MACs][book].

## Security properties

- Detect changes and new forgeries to the data covered by the authenticator.
- Bind context, such as a record identifier or protocol version, if it is included in the authenticated input.
- Allow an application to reject failed verification before using the protected result.

Authenticated encryption with associated data (AEAD) covers both encrypted content and designated unencrypted context. [RFC 5116, §§2.1-2.2][aead].

## What it does not provide

- Secrecy of the data.
- Freshness: a valid old message can still be replayed.
- Truth, business validity, or human approval of the contents.
- Completeness: a missing record is not necessarily detected.

A bare hash is also insufficient if an attacker can replace both the file and its expected hash. These limits follow from what the authenticated input and trust anchor actually cover. [Boneh and Shoup][book]; [RFC 5116, §1][aead].

## Assumptions

The scheme must resist forgery, keys or expected digests must come from a trustworthy source, and verification must cover every field the application relies on. For AEAD, respect nonce requirements and treat authentication failure as failure, not as usable plaintext. [RFC 5116, §§2-3][aead].

## Post-quantum posture

**Not applicable to the goal.** A concrete MAC, hash, or signature has its own assumptions and parameter requirements. Post-quantum signature standards include ML-DSA and SLH-DSA; their existence does not upgrade an older signature automatically. [NIST post-quantum project][pqc].

## Confidence model

**Client-side-secret** for MACs; **public-verifiability** plus authentic verification keys for signatures. A Merkle proof instead needs a trusted or authenticated root. The application must interpret exactly the bytes that were verified. [Boneh and Shoup][book]; [RFC 9162, §2][ct].

## Common constructions

MACs, digital signatures, and AEAD protect different settings. Merkle trees provide compact proofs that data matches a particular root; authenticating that root is a separate step. [Boneh and Shoup][book]; [RFC 9162, §2][ct].

## Use cases

Webhook checks, software update verification, and authenticated records all need integrity. The first may use a shared key; the others may need public verification. [Boneh and Shoup][book].

## Composition patterns

Add [Authenticity](/docs/taxonomy/authenticity) to establish the expected origin. Add authenticated counters, challenges, and receiver state when replay matters; an authenticated timestamp alone still needs an acceptance policy. [RFC 5116, §1][aead]; [Boneh and Shoup][book].

## Failure modes and anti-patterns

:::warning Check the exact data that drives the action
Authenticating the amount while omitting the recipient leaves the recipient unprotected. Accepting a checksum from the same untrusted source as the file leaves both replaceable. Using an old valid tag as evidence of a fresh request leaves replay possible. [Boneh and Shoup][book]; [RFC 5116, §1][aead].
:::

## Maturity and deployment

**Widely deployed mechanisms:** MACs, signatures, and authenticated encryption are established families. Correct input coverage and verification behavior remain application responsibilities. [Boneh and Shoup][book]; [RFC 5116][aead].

## Related concepts

- [Authenticated Encryption](/docs/primitives/authenticated-encryption)
- [Accumulators and Merkle Trees](/docs/structured-primitives/accumulators-and-merkle-trees)
- [Transcript Binding](/docs/design-patterns/transcript-binding)

## Further reading

- [Boneh and Shoup, A Graduate Course in Applied Cryptography][book] - MACs, signatures, and authenticated data.
- [RFC 5116][aead] - AEAD and the separate need for replay protection.
- [RFC 9162][ct], §2 - Merkle inclusion and consistency proofs.

[book]: https://toc.cryptobook.us/
[aead]: https://www.rfc-editor.org/rfc/rfc5116
[ct]: https://www.rfc-editor.org/rfc/rfc9162
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
