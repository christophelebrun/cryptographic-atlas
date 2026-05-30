---
title: Electronic Voting
type: system
level: system
template: protocol
status: draft
last_reviewed: '2026-05-30'
difficulty: intermediate
maturity: emerging
tags:
  - e-voting
  - voting
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Electronic Voting

## Goal

Electronic voting systems aim to collect, protect, tally, and verify votes under demanding privacy, integrity, and coercion constraints.

## Participants

- Voters.
- Election authority.
- Trustees or tally authorities.
- Observers and auditors.

## Inputs and outputs

Voters input ballots. The system outputs a tally and audit evidence.

## Building blocks

- Authentication or eligibility checks.
- Ballot encryption.
- Zero-knowledge proofs.
- Mixnets or homomorphic tallying.
- Threshold decryption.

## Security goals

- Eligibility.
- Ballot secrecy.
- Verifiability.
- Integrity.
- Coercion resistance, in stronger systems.

## Non-goals

No single cryptographic primitive makes a voting system safe. Operational procedures, usability, legal rules, and public auditability matter.

## Threat model

Voting systems must consider malicious voters, corrupt authorities, compromised devices, coercers, network observers, and public trust.

## Protocol sketch

Eligible voters cast protected ballots. Ballots are checked for validity, anonymized or aggregated, tallied, and audited.

## Trust assumptions

Assumptions may include trustee honesty thresholds, device integrity, public bulletin boards, and audit processes.

## Post-quantum posture

Depends on the election cryptography: voter authentication, ballot encryption, proofs, signatures, mixnets, and trustee key management may each have different posture. A voting system should not receive a single post-quantum label unless every relevant layer is classified.

## Confidence model

Confidence usually comes from threshold trustees, public verifiability, eligibility authorities, client-device assumptions, and audit procedures. Ballot secrecy may be `t-of-n`, while integrity may come from public verification and challenge processes.

## Metadata leaks

Timing, voter check-in, device identifiers, and small precinct totals can leak information.

## Failure modes

- Validity checks leak votes.
- Receipts enable coercion.
- Malware changes ballots before encryption.
- Trustees collude.
- The audit trail is too complex for public confidence.

## Variants

- Mixnet-based voting.
- Homomorphic tallying.
- End-to-end verifiable voting.
- Coercion-resistant voting protocols.

## Where it is used

- Government elections in limited settings.
- Organization voting.
- DAO governance experiments.

## Further reading

- Benaloh, "Verifiable Secret-Ballot Elections."
- Chaum, "Untraceable Electronic Mail, Return Addresses, and Digital Pseudonyms."
- Canetti, "Universally Composable Security; A New Paradigm for Cryptographic Protocols."
