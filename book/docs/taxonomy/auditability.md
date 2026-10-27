---
title: Auditability
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
  - auditability
post_quantum_posture: not-applicable
confidence_model:
  type: mixed
---

# Auditability

## One-sentence intuition

Auditability means a process leaves enough trustworthy, accessible evidence for a meaningful later review. This combines evidence protection with log-management and review procedures. [NIST SP 800-92, §§2-3 and 5][logs].

## Where it sits in the taxonomy

- Level: security goal (level 1), usually applied to a system or process.
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Verifiability](/docs/taxonomy/verifiability), [Accountability](/docs/taxonomy/accountability), [Integrity](/docs/taxonomy/integrity).

## Problem it solves

After an incident, “the operator says everything was fine” is insufficient. A reviewer needs records of the relevant actions, enough context to interpret them, and a way to detect tampering. Merely generating logs does not ensure they are retained, inspected, or useful. [NIST SP 800-92, §§2-3 and 5][logs].

## Mental model

Think of a flight recorder with a defined scope. A protected recording can help reconstruct what happened, but it cannot answer questions about events that were never captured.

## Minimal example

A certificate log publishes signed tree heads and provides inclusion and consistency proofs. A domain owner monitors entries for unexpected certificates and retains evidence for investigation. The proofs help review the published history; monitoring is what identifies suspect issuance. The log does not decide on its own whether issuance was legitimate. [RFC 9162, §§8 and 11][ct].

## Security properties

A useful audit design specifies event coverage, integrity, ordering or time context, retention, and reviewer access. These are requirements to establish, not guarantees automatically supplied by a hash chain. [NIST SP 800-92, §§3 and 5][logs].

A consistency proof can check that one Merkle tree extends another. Detecting inconsistent views served to different users additionally requires those views to be compared or otherwise exposed to appropriate monitors. [RFC 9162, §§2.1.4 and 11.3][ct].

## What it does not provide

- Proof that no unrecorded action occurred.
- Truth of every recorded claim.
- Automatic detection, remediation, or punishment.
- Privacy: logs may expose identities, secrets, and relationships.

Logging policy and review determine these boundaries. [NIST SP 800-92, §§2-3][logs]; [RFC 9162, §11][ct].

## Assumptions

Define what must be recorded and who can review it. Protect collection, transport, storage, and deletion; retain evidence for the relevant review period. If independent auditing is part of the claim, reviewers need sufficient access and independence from the operator being checked. [NIST SP 800-92, §§3-5][logs].

## Post-quantum posture

**Not applicable to the goal.** Long-lived evidence inherits the assumptions of signatures, hashes, timestamps, and storage. Evidence signed today is not automatically reliable forever under future attacks. [RFC 3161, §§1 and 4][time]; [NIST post-quantum project][pqc].

## Confidence model

**Public-verifiability** for public log proofs, or **operational-audit** for restricted evidence. Both need available records and a review process; the latter also needs trusted, sufficiently independent reviewers. [RFC 9162, §§8 and 11][ct]; [NIST SP 800-92][logs].

## Common constructions

Append-only transparency logs, signed records, timestamps, and protected centralized log collection support different audit requirements. A timestamp attests to a digest's existence by a time under its authority's trust model; it does not prove that the underlying event was true. [RFC 9162][ct]; [RFC 3161][time]; [NIST SP 800-92][logs].

## Use cases

Certificate issuance monitoring and security incident investigation are representative uses. Choose evidence for the questions the reviewer must answer, rather than collecting everything. [RFC 9162, §11][ct]; [NIST SP 800-92, §3][logs].

## Composition patterns

[Verifiability](/docs/taxonomy/verifiability) supplies specific checks; auditability preserves the evidence needed to repeat them. [Accountability](/docs/taxonomy/accountability) adds attribution under rules and a response process. Public evidence and restricted incident records may require different disclosure policies. [RFC 9162, §11][ct]; [NIST SP 800-92, §§3-5][logs].

## Failure modes and anti-patterns

:::warning A tamper-evident log can still be incomplete
An operator can omit an event before logging it. A log can also present conflicting histories unless the design exposes that behavior. Collecting plaintext or permanent identifiers “for audit” can create new privacy failures. Define coverage, cross-checks, access, and retention together. [RFC 9162, §11.3][ct]; [NIST SP 800-92, §§2-3][logs].
:::

## Maturity and deployment

**Widely deployed practices:** security logging and operational review. Cryptographic transparency logs provide more specific checks; RFC 9162 describes an experimental version 2 protocol and should not be read as a claim that every deployed log uses that version. [NIST SP 800-92][logs]; [RFC 9162][ct].

## Related concepts

- [Verifiability](/docs/taxonomy/verifiability)
- [Accountability](/docs/taxonomy/accountability)
- [Metadata Leakage](/docs/appendices/metadata-leakage)

## Further reading

- [NIST SP 800-92: Guide to Computer Security Log Management][logs], §§2-5 - collection, review, access, and retention.
- [RFC 9162][ct], §§2, 8, and 11 - proofs, monitoring, and misbehaving logs.
- [RFC 3161: Time-Stamp Protocol][time] - timestamp authority assumptions and limitations.

[logs]: https://csrc.nist.gov/pubs/sp/800/92/final
[ct]: https://www.rfc-editor.org/rfc/rfc9162
[time]: https://www.rfc-editor.org/rfc/rfc3161
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
