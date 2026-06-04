---
title: Additional Security Goals
type: taxonomy
level: security-goal
template: overview
status: current
coverage_depth: grouped-first-pass
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - security-goals
  - verifiability
  - auditability
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Additional Security Goals

Security goals describe what a system is trying to achieve before any primitive or protocol is selected. This page adds goals that often appear in secure messaging, voting, rollups, identity, and operational cryptography.

## Goal matrix

| Goal | One-sentence intuition | Usually sits at | What it does not provide |
| --- | --- | --- | --- |
| Verifiability | A party can check that a statement, tally, proof, or transcript satisfies stated rules. | proof system, protocol, system | Truth of off-chain facts or good user intent. |
| Auditability | Enough evidence exists for later review of a process or decision. | protocol, system, governance layer | Privacy by itself; logs can create new leaks. |
| Accountability | Misbehavior can be attributed or sanctioned under stated rules. | protocol, system | Public identity disclosure or automatic enforcement. |
| Forward secrecy | Later compromise of long-term keys does not expose past session secrets. | protocol | Protection if session secrets were recorded or compromised at the time. |
| Deniability | A transcript does not convince outsiders that a participant said or did something. | protocol, system | Public verifiability or legal non-repudiation. |

## Verifiability

Verifiability is the ability to check a claim. A verifier may check a digital signature, a zero-knowledge proof, a Merkle inclusion proof, a voting tally, or a rollup state transition.

Security properties:

- A valid transcript or proof can be checked by the intended verifier.
- Invalid statements should fail verification under the stated model.
- Public verifiability allows anyone to check; local verifiability allows only a participant to check.

Assumptions and confidence model:

- Confidence comes from public-verifiability, correct statement design, and complete verifier checks.
- Verifiability fails if the verified statement omits the property the system actually needs.

Failure modes:

- Verifying a proof for the wrong statement.
- Treating verified cryptographic state as proof of off-chain truth.
- Publishing public inputs that destroy privacy.

## Auditability

Auditability means enough information survives for later review. It is a system property, not a primitive.

Security properties:

- Reviewers can inspect logs, proofs, commitments, signatures, or transcripts.
- The audit trail is tied to the process being audited.
- Tampering should be detectable under the stated model.

Assumptions and confidence model:

- Confidence comes from public-verifiability, append-only records, independent observers, or operational audit controls.
- Auditability often conflicts with privacy, minimization, and deniability.

Failure modes:

- Logging secrets or linkable identifiers to "improve auditability."
- Keeping records without integrity protection.
- Making audit evidence available only to the party being audited.

## Accountability

Accountability means misbehavior can be attributed, challenged, or sanctioned. It often depends on signatures, authenticated logs, governance, and dispute rules.

Security properties:

- Relevant actions are bound to accountable roles or keys.
- Evidence is interpretable by the dispute process.
- The system distinguishes unauthorized behavior from normal failure.

Assumptions and confidence model:

- Confidence comes from authentic identity or key binding, durable evidence, and an external enforcement process.
- Accountability can be local, institutional, or public.

Failure modes:

- Equating a key with a human without operational key-control evidence.
- Creating permanent public identity leaks when pseudonymous accountability would suffice.
- Leaving no appeal path for key compromise.

## Forward secrecy

Forward secrecy is a protocol goal: compromise of a long-term secret should not reveal past session keys.

Security properties:

- Past session keys remain protected after later long-term key compromise.
- Fresh ephemeral secrets contribute to each session.
- Key schedules erase old secret material.

Assumptions and confidence model:

- Confidence comes from ephemeral key generation, secure erasure, transcript binding, and correct key derivation.
- Forward secrecy does not help if the attacker recorded plaintext or compromised the endpoint during the session.

Failure modes:

- Reusing ephemeral keys.
- Storing session secrets indefinitely.
- Authenticating a handshake but not binding the transcript into derived keys.

## Deniability

Deniability means a transcript does not create convincing evidence for outsiders. Secure messaging protocols often aim for authentication between participants without public non-repudiation.

Security properties:

- Participants can authenticate messages locally.
- Outsiders cannot reliably distinguish a real transcript from one a participant could have simulated.
- Long-term public evidence is minimized.

Assumptions and confidence model:

- Confidence comes from protocol design, symmetric authentication, key evolution, and careful transcript handling.
- Deniability is often incompatible with public audit requirements.

Failure modes:

- Using digital signatures where deniable authentication is required.
- Publishing transcripts, receipts, or server logs that create external evidence.
- Confusing deniability with anonymity.

## Post-quantum posture

Not applicable to the goals themselves. Each goal inherits posture from the concrete primitives, protocols, authentication layers, and storage mechanisms used to realize it.

## Related concepts

- [Security Goals](/docs/taxonomy/security-goals)
- [Digital Signatures](/docs/primitives/digital-signatures)
- [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs)
- [Secure Channels](/docs/protocols/secure-channels)
- [Metadata Leakage](/docs/appendices/metadata-leakage)

## Further reading

- Katz and Lindell, "Introduction to Modern Cryptography."
- Canetti, "Universally Composable Security; A New Paradigm for Cryptographic Protocols."
- Benaloh, "Verifiable Secret-Ballot Elections."
- Signal, "The Double Ratchet Algorithm."
