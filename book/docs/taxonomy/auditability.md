---
title: Auditability
type: taxonomy
level: security-goal
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

Auditability means enough trustworthy evidence exists to review a process after it happens.

## Where it sits in the taxonomy

- Level: security goal.
- Parent category: security goals.
- Related concepts: [Verifiability](/docs/taxonomy/verifiability), [Integrity](/docs/taxonomy/integrity), [Accountability](/docs/taxonomy/accountability), [Metadata Leakage](/docs/appendices/metadata-leakage).

## Problem it solves

Auditability addresses opaque operation. Readers should be able to distinguish systems that merely claim correct behavior from systems that preserve evidence for later inspection by users, auditors, courts, governance bodies, or public observers.

## Mental model

Auditability is a tamper-evident trail. The trail is useful only if it records the right events, binds them to the right context, and remains available to the right reviewers.

## Minimal example

A voting system publishes encrypted ballots, ballot commitments, mix proofs, and tally proofs. Observers can later check whether the public tally follows from the posted evidence without trusting the election operator's private statement.

## Security properties

- Relevant events are recorded with integrity protection.
- Evidence is bound to a process, time, role, or transcript.
- Tampering, omission, or inconsistency is detectable under the stated model.
- Reviewers have enough access to check the evidence they are expected to audit.

## What it does not provide

- Privacy by itself.
- Correctness of events that were never recorded.
- Enforcement after misbehavior is found.
- Truth of off-chain facts unless the audit evidence binds those facts.

## Assumptions

- The audit scope is explicit.
- Logs, commitments, signatures, proofs, or records cannot be silently rewritten.
- Evidence retention and access rules match the threat model.
- Auditors are independent enough for the intended confidence model.

## Post-quantum posture

Not applicable to the goal itself. Auditability inherits posture from signatures, hashes, commitments, timestamping, transparency logs, and storage systems.

## Confidence model

Confidence may come from public-verifiability, independent auditors, append-only logs, operational controls, or legal process. State which model applies.

## Common constructions

- Append-only logs and transparency logs.
- Digital signatures and timestamping.
- Commitments and Merkle roots.
- Zero-knowledge proofs for privacy-preserving audits.
- Public bulletin boards for voting and governance.

## Use cases

- Election audits.
- Rollup and bridge operation.
- Software supply-chain records.
- Credential issuance and revocation review.
- Privacy systems that need limited oversight without exposing all user data.

## Composition patterns

Auditability often composes with [Verifiability](/docs/taxonomy/verifiability), [Accountability](/docs/taxonomy/accountability), [Transcript Binding](/docs/design-patterns/transcript-binding), and privacy-preserving disclosure controls.

## Failure modes and anti-patterns

- Logging secrets or stable identifiers to "improve auditability."
- Keeping logs that only the audited party can modify and inspect.
- Recording events without the context needed to interpret them.
- Treating an audit trail as proof that no unlogged event occurred.

## Maturity and deployment

Widely deployed as a system goal, but maturity depends on the evidence mechanism, retention process, auditor independence, and privacy controls.

## Related concepts

- [Verifiability](/docs/taxonomy/verifiability)
- [Accountability](/docs/taxonomy/accountability)
- [Metadata Leakage](/docs/appendices/metadata-leakage)

## Further reading

- Benaloh, [Verifiable Secret-Ballot Elections](https://www.microsoft.com/en-us/research/publication/verifiable-secret-ballot-elections/).
- Canetti, [Universally Composable Security; A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067).
