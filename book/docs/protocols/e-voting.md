---
title: Electronic Voting
type: system
level: system
template: protocol
status: current
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

## Concrete systems and protocol families

| Family or system | Tally/privacy shape | Key differences and cautions |
| --- | --- | --- |
| Helios-style voting | Public bulletin board, encrypted ballots, public verification | Useful for low-coercion settings; not coercion-resistant by default. |
| Mixnet tallying | Ballots are shuffled before decryption or publication | Stronger unlinkability when at least one mix is honest; shuffle proofs and batch size matter. |
| Homomorphic tallying | Encrypted ballots combine into an encrypted tally | Efficient for simple ballot formats; validity proofs must prevent malformed ballots. |
| Threshold decryption elections | Trustees jointly decrypt tally or ballots | Ballot secrecy depends on trustee threshold and key ceremony. |
| Coercion-resistant protocols | Receipt-free or fake-credential-resistant designs | Much harder system problem; usability and registration assumptions are critical. |
| DAO voting experiments | On-chain eligibility, nullifiers, ZK proofs, public tally | Ledger metadata, wallet funding, and coercion risks often dominate cryptography. |

## Where it is used

- Government elections in limited settings.
- Organization voting.
- DAO governance experiments.

## Further reading

- Benaloh, [Verifiable Secret-Ballot Elections](https://www.microsoft.com/en-us/research/publication/verifiable-secret-ballot-elections/).
- Chaum, [Untraceable Electronic Mail, Return Addresses, and Digital Pseudonyms](https://doi.org/10.1145/358549.358563).
- Canetti, [Universally Composable Security; A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067).
