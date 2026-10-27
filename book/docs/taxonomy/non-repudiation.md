---
title: Non-Repudiation
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
  - non-repudiation
post_quantum_posture: not-applicable
confidence_model:
  type: mixed
---

# Non-Repudiation

## One-sentence intuition

Non-repudiation aims to preserve evidence that a third party can use to resolve a later denial of an action. [RFC 4949, non-repudiation entries][glossary].

## Where it sits in the taxonomy

- Level: security goal (level 1), applied to a protocol or evidence process.
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Authenticity](/docs/taxonomy/authenticity), [Accountability](/docs/taxonomy/accountability), [Deniability](/docs/taxonomy/deniability).

## Problem it solves

Bob receives an instruction and wants evidence for a later dispute in which Alice denies issuing it. A digital signature can support that evidence, provided the verifier can establish which key was trusted, what it signed, and the relevant key-control conditions. It does not make all denial impossible. [FIPS 186-5][dss]; [RFC 4949][glossary].

## Mental model

Think of a signed receipt with a documented chain of custody. The mark matters, but so do the exact statement, the signer's authority, and the conditions under which the receipt was created and kept.

## Minimal example

A release process signs an artifact digest and a release statement naming the product and version. A reviewer later verifies the signature with the trusted release key. If an independent timestamp is retained, it can add evidence that the signed material existed by a particular time. Neither check proves that the release was free of bugs or that a particular employee approved it. [FIPS 186-5][dss]; [RFC 3161, §§1-2][time].

## Security properties

Distinguish evidence of **origin** from evidence of **receipt**. Alice's signature on an instruction can support origin evidence; it does not prove Bob received or acted on it. The system must specify the action being evidenced and the third party expected to assess it. [RFC 4949, non-repudiation service][glossary].

## What it does not provide

- Proof of a specific human's intent or physical presence.
- Protection after an attacker obtains the signing key.
- Proof of delivery from an origin signature alone.
- Automatic legal effect or a guaranteed outcome in a dispute.
- Deniability for the same statement and evidence audience.

Digital signatures support evidence under key-management and identity assumptions; the surrounding process supplies their interpretation. [FIPS 186-5][dss]; [RFC 4949][glossary].

## Assumptions

Keep the private key under the intended control, provision authentic verification keys, and retain the exact signed bytes and relevant identity, validation, and timestamp evidence. Define how key compromise, revocation, and validation at a past time affect acceptance. [FIPS 186-5][dss]; [RFC 3161, §§2 and 4][time].

## Post-quantum posture

**Not applicable to the goal.** Long-lived evidence depends on signatures, timestamp authorities, hashes, and archival policy. NIST's ML-DSA and SLH-DSA standards provide post-quantum signature building blocks; they do not retroactively strengthen existing classical signatures. [NIST post-quantum project][pqc].

## Confidence model

**Mixed:** mathematical-assumption for signature security, trusted-issuer or another authentic key directory for identity, key-custody controls, and trusted timing when required. The dispute process must understand these limitations. [FIPS 186-5][dss]; [RFC 3161][time].

## Common constructions

Digital signatures, certificate-based identity binding, signed acknowledgments, and trusted timestamps support different parts of an evidence process. A MAC shared by Alice and Bob cannot, by itself, show a third party which of them generated a message. [Boneh and Shoup, MACs and signatures][book]; [RFC 3161][time].

## Use cases

Signed release statements, administrative approvals, and signed transaction instructions can preserve origin evidence. Receipt evidence needs an acknowledgment or a separate delivery protocol. [FIPS 186-5][dss]; [RFC 4949][glossary].

## Composition patterns

Pair with [Integrity](/docs/taxonomy/integrity), [Auditability](/docs/taxonomy/auditability), explicit key validity rules, and an evidence-retention policy. Avoid adding public signatures to a protocol that requires deniability for those same messages. [RFC 3161, §4][time]; [Borisov, Goldberg, and Brewer][otr].

## Failure modes and anti-patterns

:::warning A signature proves less than an approval screen suggests
A valid signature over ambiguous bytes, the wrong document version, or an incomplete instruction may not support the intended dispute. A timestamp establishes a time-related claim about a digest, not the truth of the content or the signer's intent. [FIPS 186-5][dss]; [RFC 3161][time].
:::

## Maturity and deployment

**Widely deployed mechanisms:** signatures and public-key infrastructure support evidence processes. Their technical maturity does not establish the adequacy of a particular legal or organizational process. [FIPS 186-5][dss]; [RFC 4949][glossary].

## Related concepts

- [Digital Signatures](/docs/primitives/digital-signatures)
- [Accountability](/docs/taxonomy/accountability)
- [Deniability](/docs/taxonomy/deniability)

## Further reading

- [RFC 4949][glossary] - origin and receipt evidence; technical versus broader meanings.
- [FIPS 186-5: Digital Signature Standard][dss] - signature guarantees and key-management dependencies.
- [RFC 3161: Time-Stamp Protocol][time], especially §4 - timestamp security considerations.
- [Boneh and Shoup][book] - why public signatures differ from shared-key MACs.

[glossary]: https://www.rfc-editor.org/rfc/rfc4949
[dss]: https://csrc.nist.gov/pubs/fips/186-5/final
[time]: https://www.rfc-editor.org/rfc/rfc3161
[book]: https://toc.cryptobook.us/
[otr]: https://otr.cypherpunks.ca/otr-wpes.pdf
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
