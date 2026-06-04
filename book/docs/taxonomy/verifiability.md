---
title: Verifiability
type: taxonomy
level: security-goal
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - security-goals
  - verifiability
post_quantum_posture: not-applicable
confidence_model:
  type: public-verifiability
---

# Verifiability

## One-sentence intuition

Verifiability means a party can check that a claim, proof, transcript, tally, or state transition satisfies stated rules.

## Where it sits in the taxonomy

- Level: security goal.
- Parent category: security goals.
- Related concepts: [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs), [Membership Proofs](/docs/proof-systems/membership-proofs), [ZK Rollups](/docs/case-studies/zk-rollups), [E-Voting](/docs/protocols/e-voting).

## Problem it solves

Verifiability addresses blind trust. A user, auditor, verifier, or public observer should be able to check a cryptographic claim rather than accepting an operator's assertion.

## Mental model

Verifiability is a checklist with evidence. It proves only what the checklist actually asks and what the evidence actually binds.

## Minimal example

A rollup verifier checks a validity proof against a previous state root, new state root, batch commitment, and verifier key. The proof is useful only if those public inputs match the intended batch.

## Security properties

- Valid claims can be checked by the intended verifier.
- Invalid claims should fail under the stated soundness model.
- Public verifiability lets anyone check without private verifier state.
- Local verifiability lets a participant check what affects them.

## What it does not provide

- Truth of off-chain facts.
- Correctness of a statement that was encoded incorrectly.
- Privacy unless the proof or transcript is designed to hide information.
- Governance or enforcement after a failure is detected.

## Assumptions

- The verified statement captures the property the system needs.
- Verifier keys, roots, public inputs, and transcript fields are authentic and complete.
- The verifier runs the full check and rejects failures.
- Any setup or proof-system assumptions are explicit.

## Post-quantum posture

Not applicable to the goal itself. Verifiability inherits posture from signatures, commitments, proof systems, hashes, and setup models.

## Confidence model

Confidence is often public-verifiability, but some systems use local-verifiability, trusted auditors, or operational audit. State which one applies.

## Common constructions

- Digital signatures.
- Merkle and accumulator proofs.
- Zero-knowledge and succinct proofs.
- Verifiable tallying and audit logs.
- Transparency logs.

## Use cases

- Rollup state-transition validity.
- Voting tally checks.
- Credential presentation checks.
- Software supply-chain signatures.
- Transparency and accountability systems.

## Composition patterns

Verifiability often combines with [Integrity](/docs/taxonomy/integrity), [Transcript Binding](/docs/design-patterns/transcript-binding), [Domain Separation](/docs/design-patterns/domain-separation), and auditability.

## Failure modes and anti-patterns

- Verifying a proof for the wrong statement.
- Omitting public inputs or context.
- Treating public verifiability as privacy.
- Relying on a verifier controlled by the party being checked.
- No response plan when verification fails.

## Maturity and deployment

Widely used, but maturity depends on the proof, log, or signature mechanism and whether the verified statement matches the system goal.

## Related concepts

- [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs)
- [Transcript Binding](/docs/design-patterns/transcript-binding)
- [ZK Rollups](/docs/case-studies/zk-rollups)

## Further reading

- Goldwasser, Micali, and Rackoff, [The Knowledge Complexity of Interactive Proof Systems](https://doi.org/10.1137/0218012).
- Benaloh, [Verifiable Secret-Ballot Elections](https://www.microsoft.com/en-us/research/publication/verifiable-secret-ballot-elections/).
- Canetti, [Universally Composable Security; A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067).
