---
title: Private DAO Voting
type: system
level: system
template: case-study
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: emerging
tags:
  - voting
  - dao
  - privacy
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Private DAO Voting

## Overview

This case study sketches a private DAO voting system as a composition exercise. It is not a deployable protocol.

## Goals

- Eligible members can vote.
- Ballots remain private until, or unless, tally disclosure is intended.
- A member cannot vote twice in the same election.
- Invalid ballots are rejected.
- The final tally is verifiable.

## Non-goals

- Full coercion resistance.
- Protection against all traffic analysis.
- Production deployment guidance.
- Governance security outside the voting protocol.
- Legal or regulatory compliance.

## Possible building blocks

| Requirement | Possible building block |
| --- | --- |
| Anonymous eligibility | anonymous credentials or membership proofs |
| Anti-double-vote protection | context-specific nullifiers |
| Ballot secrecy | public-key encryption or threshold encryption |
| Valid ballot proofs | zero-knowledge proofs |
| Private tallying | homomorphic encryption, MPC, or threshold decryption |
| Delayed reveal | timelock pattern or governance-defined opening phase |

## Concrete composition options

| Requirement | Concrete options | Main caution |
| --- | --- | --- |
| Eligibility set | Merkle tree, sparse Merkle tree, accumulator, anonymous credential issuer | Set construction affects anonymity, updates, and revocation. |
| Nullifier | Hash nullifier, Semaphore-style nullifier, credential serial number | Context binding controls cross-election linkability. |
| Ballot privacy | ElGamal-style encryption, threshold encryption, homomorphic encryption | Many classical options are quantum-vulnerable; trustees and keys dominate confidence. |
| Validity proof | Groth16, PLONK-style proof, STARK, Bulletproof-style range proof | Proof must bind ballot, election context, nullifier, and eligibility. |
| Tally | Homomorphic tally, mixnet tally, MPC tally | The tally method determines trustee, batching, and audit assumptions. |

## Simple architecture

1. The DAO publishes an election context, eligible voter set, and ballot rules.
2. Each eligible voter derives a context-specific nullifier.
3. The voter encrypts or commits to a ballot.
4. The voter submits a zero-knowledge proof that the ballot is valid and the nullifier is derived from an eligible secret.
5. The system rejects duplicate nullifiers.
6. The tally is computed privately and revealed with verification data.

## Privacy leaks

- Submission timing can correlate voters with ballots.
- Wallet funding and transaction fees can identify voters.
- Small voter groups can reveal preferences from the final tally.
- Reused contexts or poor domain separation can link votes across elections.
- Public discussion, delegation, or governance forums can leak intent.

## Post-quantum posture

Depends on every selected building block: credential signatures, membership proofs, nullifiers, ballot encryption, validity proofs, and tallying. A DAO voting design should be treated as post-quantum only if each layer has been classified.

## Confidence model

A typical design combines several confidence models: trusted or semi-trusted eligibility source, holder secrets for anonymous voting, public nullifier registry for non-reuse, proof-system soundness for ballot validity, and threshold trustees or MPC participants for tally privacy.

## Coercion limitations

Ballot secrecy is not the same as coercion resistance. A voter may be pressured to reveal credentials, prove how they voted, vote under observation, or sell access to a voting key. Coercion-resistant voting needs additional protocol and operational design.

## Maturity warning

:::warning
Private DAO voting combines fast-moving privacy tooling with governance incentives and public ledgers. Treat this as a design map, not an implementation recommendation.
:::

## Failure modes

- Eligibility source is centralized or manipulable.
- Nullifier construction links voters across elections.
- Invalid encrypted ballots pass because validity proofs are incomplete.
- Tally authorities collude or lose decryption shares.
- User interfaces accidentally reveal votes or create receipts.
- Governance rules do not define aborts, challenges, or disputed tallies.

## Related concepts

- [Nullifiers](/docs/protocols/nullifiers)
- [Zero-knowledge proofs](/docs/proof-systems/zero-knowledge-proofs)
- [Private aggregation](/docs/design-patterns/private-aggregation)
- [Coercion-resistant voting](/docs/case-studies/coercion-resistant-voting)

## Further reading

- Benaloh, "Verifiable Secret-Ballot Elections."
- Goldwasser, Micali, and Rackoff, "The Knowledge Complexity of Interactive Proof Systems."
- Bonawitz et al., "Practical Secure Aggregation for Privacy-Preserving Machine Learning."
