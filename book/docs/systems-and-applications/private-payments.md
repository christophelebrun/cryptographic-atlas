---
title: Private Payments
type: system
level: system
template: case-study
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
    next_review_due: '2026-12-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: intermediate
maturity: emerging
tags:
  - private-payments
  - e-cash
  - nullifiers
post_quantum_posture: depends
confidence_model:
  type: mixed
source_review:
  window_months: 6
  next_review_due: '2026-12-04'
  notes: Re-check Zcash protocol references, private-payment wallet behavior, ledger metadata research, and shielded-pool deployment status.
---

# Private Payments

## Overview

Private-payment systems transfer value while hiding selected details such as payer, payee, amount, balance, or transaction linkage. No design hides everything: privacy depends on the ledger model, issuer model, wallet behavior, network layer, and metadata available to observers; this difference is visible across e-cash and shielded-ledger designs ([Chaum, Fiat, and Naor](https://doi.org/10.1007/0-387-34799-2_25), [Zerocash](https://doi.org/10.1109/SP.2014.36)).

![Private-payment note flow](/img/diagrams/private-payment-note-flow.svg)

## Goals

- Preserve value conservation.
- Prevent or detect double spending.
- Hide transaction linkage, participants, and amounts under a stated model.
- Allow public or issuer-side audit of monetary rules.
- Support recovery, viewing, or compliance workflows only when explicitly designed.

## Non-goals

- Network anonymity by default.
- Solvency, governance, or monetary policy guarantees.
- Protection from exchange, wallet, timing, or amount metadata.
- Perfect privacy with small anonymity sets.
- Safe custody or key recovery by itself.

## Building blocks

- Commitments to notes, balances, or amounts.
- Nullifiers or serial numbers for duplicate-spend detection.
- Zero-knowledge proofs for conservation and authorization.
- Accumulators or Merkle trees for note membership.
- Blind signatures or issuer ledgers in e-cash systems.
- Secure channels and wallet key management.

## Metadata leaks

- Deposit and withdrawal timing.
- Amounts, denominations, fees, or change patterns.
- Network addresses and wallet fingerprinting.
- Exchange, bridge, or merchant records.
- Viewing-key, compliance, or recovery workflows.

## Post-quantum posture

Depends on the full stack. Many deployed private-payment systems use elliptic-curve commitments, pairings, or SNARKs that are quantum-vulnerable under Shor's algorithm ([Shor 1994](https://doi.org/10.1109/SFCS.1994.365700)). Hash-based proof systems and symmetric components may be plausible, but signatures, commitments, note encryption, and ledger authentication must all be reviewed ([STARKs](https://eprint.iacr.org/2018/046)).

## Confidence model

Confidence is mixed: public-verifiability for ledger rules and proofs, client-side-secret for notes and nullifiers, trusted-issuer for account or e-cash systems, and operational trust for wallets, exchanges, bridges, and network routing.

## Failure modes

- Linking deposits, withdrawals, and payments by timing or amount.
- Small anonymity sets.
- Wallet compromise or viewing-key leakage.
- Nullifier or serial-number reuse.
- Broken note commitment or memo encryption.
- Trusted issuer abuse or insolvency in issuer-backed systems.
- Treating ledger privacy as user anonymity.

## Source-depth notes

Private-payment source coverage should separate e-cash lineage, shielded-ledger protocol specifications, and metadata analysis. A deployed protocol specification can describe note and nullifier mechanics, but it does not by itself prove wallet, exchange, bridge, or network privacy ([Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf), [Metadata Leakage](/docs/appendices/metadata-leakage)).

## Related concepts

- [Nullifiers](/docs/protocols/nullifiers)
- [Anti-Double-Use Nullifiers](/docs/design-patterns/anti-double-use-nullifiers)
- [Commitments](/docs/primitives/commitments)
- [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs)
- [Private Information Retrieval](/docs/protocols/private-information-retrieval)

## Further reading

- [Chaum, Fiat, and Naor, "Untraceable Electronic Cash"](https://doi.org/10.1007/0-387-34799-2_25).
- [Zerocash: Decentralized Anonymous Payments from Bitcoin](https://doi.org/10.1109/SP.2014.36).
- [Chaum, "Blind Signatures for Untraceable Payments"](https://doi.org/10.1007/978-1-4757-0602-4_18).
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf).
- [The Orchard Book](https://zcash.github.io/orchard/).
- [Metadata Leakage](/docs/appendices/metadata-leakage).
