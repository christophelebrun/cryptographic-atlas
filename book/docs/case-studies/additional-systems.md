---
title: Additional Systems and Applications
type: system
level: system
template: overview
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - systems
  - applications
  - privacy
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Additional Systems and Applications

This page covers system-level applications that compose many primitives and protocols. Each should eventually become a deeper case study if the atlas expands in that direction.

## System matrix

| System | Main goal | Typical building blocks | Main risk |
| --- | --- | --- | --- |
| Private payments | Transfer value with reduced transaction linkage | commitments, nullifiers, ZKPs, e-cash, ledgers | ledger and network metadata |
| ZK rollups | Prove batches of state transitions succinctly | arithmetization, polynomial commitments, SNARKs/STARKs | data availability and prover centralization |
| Secure messaging | Protect message content and session keys | secure channels, Double Ratchet, signatures, KDFs, AEAD | endpoint compromise and metadata |
| Privacy-preserving identity wallets | Present credentials with minimal disclosure | credentials, selective disclosure, ZKPs, revocation | issuer/verifier linkage and rare attributes |
| Encrypted mempools | Hide transaction contents before ordering or inclusion | encryption, threshold decryption, commitments, sequencing rules | timing, censorship, key release |
| Private machine-learning analytics | Learn aggregate or model information without raw data exposure | secure aggregation, MPC, FHE, differential privacy | output leakage and small cohorts |

## Private payments

Private-payment systems try to hide payer, payee, amount, linkage, or some combination of these while preserving value conservation and double-spend control.

Goals:

- Transaction privacy under a stated ledger, issuer, or note model.
- Double-spend prevention or public detection.
- Auditability of monetary rules without revealing unnecessary user data.

Non-goals:

- Network anonymity by default.
- Protection from exchange, wallet, or timing metadata.
- Solvency or governance guarantees.

Confidence model:

- Public-verifiability for ledger rules or proofs.
- Trusted-issuer for account-based or e-cash systems.
- Client-side-secret for notes, serial numbers, nullifiers, or viewing keys.

Failure modes:

- Linking deposits, withdrawals, and payments by timing or amount.
- Small anonymity sets.
- Compromised wallet keys.
- Nullifier or serial-number reuse.

## ZK rollups

ZK rollups use succinct validity proofs to convince verifiers that many off-chain or compressed state transitions were applied correctly.

Goals:

- Public verification of state-transition validity.
- Reduced verification cost on a base chain or verifier.
- Sometimes privacy, if transaction details are hidden.

Non-goals:

- Data availability by itself.
- Decentralized proving by default.
- Privacy unless the rollup design hides inputs, outputs, and metadata.

Confidence model:

- Public-verifiability for proofs.
- Mathematical assumptions and setup assumptions of the proof system.
- Operational assumptions around sequencers, provers, data availability, and upgrade keys.

Failure modes:

- Proving the wrong state transition.
- Data unavailable even though a proof verifies.
- Centralized prover or sequencer censorship.
- Trusted setup or verifier-key mistakes.

## Secure messaging

Secure messaging systems protect message contents across changing devices, networks, and compromise scenarios.

Goals:

- Confidentiality and integrity of messages.
- Forward secrecy and post-compromise recovery where the protocol supports it.
- Authentication of conversation participants.
- Sometimes deniability.

Non-goals:

- Complete metadata privacy.
- Security after endpoint compromise.
- Guaranteed deletion across recipients and backups.

Confidence model:

- Client-side-secret for identity keys and session keys.
- Mathematical-assumption for key agreement and signatures.
- Operational trust in key transparency, safety numbers, device linking, and server delivery behavior.

Failure modes:

- Device compromise.
- Cloud backups exposing plaintext or keys.
- Contact discovery or social graph leakage.
- Key-change UX ignored by users.

## Privacy-preserving identity wallets

Identity wallets store credentials and present claims with selective disclosure or privacy-preserving proofs.

Goals:

- Holder-controlled presentation.
- Selective disclosure of attributes.
- Issuer authenticity.
- Sometimes unlinkability across presentations.

Non-goals:

- Protection from rare-attribute re-identification.
- Revocation privacy by default.
- Trustlessness; issuers still matter.

Confidence model:

- Trusted-issuer for claims.
- Client-side-secret for holder binding.
- Public-verifiability or verifier-local verification for presentations.

Failure modes:

- Issuer/verifier collusion.
- Revocation checks that track holders.
- Over-disclosure by wallet UX.
- Device compromise or credential export.

## Encrypted mempools

Encrypted mempools hide transaction contents until ordering, inclusion, or a reveal/decryption phase.

Goals:

- Reduce front-running and transaction-content leakage before ordering.
- Bind encrypted transactions to later reveal or decryption rules.
- Sometimes support fair ordering or threshold decryption.

Non-goals:

- Hiding sender network metadata.
- Preventing censorship by itself.
- Guaranteed inclusion.

Confidence model:

- Threshold or trusted decryption committee.
- Sequencer or ordering assumptions.
- Public-verifiability for commitments, inclusion, and reveal rules.

Failure modes:

- Decryption key release before ordering.
- Committee collusion or unavailability.
- Timing leakage from transaction submission.
- Censorship of encrypted transactions.

## Private machine-learning analytics

Private machine-learning analytics tries to learn aggregate model updates, statistics, or predictions without exposing raw participant data.

Goals:

- Input privacy under a stated aggregation or computation model.
- Aggregate correctness or robustness.
- Sometimes differential privacy for output protection.

Non-goals:

- Preventing all inference from model outputs.
- Protecting tiny cohorts.
- Securing malicious client updates without validation.

Confidence model:

- Secure aggregation, MPC, homomorphic encryption, trusted execution, differential privacy, or non-collusion depending on design.
- Operational trust in cohort selection, clipping, validation, and release policy.

Failure modes:

- Differencing attacks across repeated aggregates.
- Model inversion or membership inference.
- Poisoned client updates.
- Dropout or small-cohort leakage.

## Post-quantum posture

Depends on the full stack. Systems inherit posture from key exchange, signatures, encryption, proof systems, commitments, accumulators, and operational identity layers. A system with a post-quantum proof or encryption layer can still be quantum-vulnerable through signatures or setup assumptions.

## Related concepts

- [Private Aggregation](/docs/design-patterns/private-aggregation)
- [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs)
- [Additional Protocol Families](/docs/protocols/additional-protocol-families)
- [Advanced Structured Primitives](/docs/structured-primitives/advanced-structured-primitives)
- [Metadata Leakage](/docs/appendices/metadata-leakage)

## Further reading

- Ben-Sasson et al., "Zerocash: Decentralized Anonymous Payments from Bitcoin."
- Signal, "The Double Ratchet Algorithm."
- W3C, "Verifiable Credentials Data Model."
- RFC 8446, "The Transport Layer Security (TLS) Protocol Version 1.3."
- Bonawitz et al., "Practical Secure Aggregation for Privacy-Preserving Machine Learning."
- Canetti, "Universally Composable Security; A New Paradigm for Cryptographic Protocols."
