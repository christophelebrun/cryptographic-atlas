---
title: Metadata Leakage
type: appendix
level: not-applicable
template: reference
status: current
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - metadata
  - privacy
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Metadata Leakage

Metadata leakage is information revealed outside the protected cryptographic payload.

## Common leak classes

| Leak | Examples | Typical mitigation |
| --- | --- | --- |
| Identity | public keys, accounts, issuer records | anonymous credentials, mixnets, fresh identifiers |
| Timing | submission time, reveal time, response delay | batching, delays, cover traffic |
| Size | ciphertext length, proof size, message count | padding, fixed-size messages |
| Participation | who joined, dropped out, or abstained | cohort thresholds, aggregation policy |
| Context | election id, app id, public inputs | domain separation, minimal public inputs |
| Output | final aggregate, function result, tally | cohort-size rules, differential privacy, query limits |

## How to use this appendix

For every primitive, protocol, or system page, separate the cryptographic statement from the metadata statement. A zero-knowledge proof may hide a witness while the public inputs or transaction timing still identify the user.

## Further reading

- Chaum, [Untraceable Electronic Mail, Return Addresses, and Digital Pseudonyms](https://doi.org/10.1145/358549.358563).
- Canetti, [Universally Composable Security; A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067).
