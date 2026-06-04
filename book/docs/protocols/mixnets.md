---
title: Mixnets
type: protocol
level: protocol
template: protocol
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - mixnets
  - anonymity
post_quantum_posture: depends
confidence_model:
  type: one-honest-party
---

# Mixnets

## Goal

A mixnet breaks the link between message senders and outputs by batching, re-encrypting or transforming, and shuffling messages through one or more mix servers.

## Participants

- Senders.
- Mix servers.
- Recipients or bulletin board.

## Inputs and outputs

Senders submit messages. The mixnet outputs the same logical messages in a shuffled form.

## Building blocks

- Public-key encryption.
- Verifiable shuffles.
- Commitments and proofs.

## Security goals

- Sender-message unlinkability within an anonymity set.
- Verifiable correct shuffling in some designs.

## Non-goals

- Perfect anonymity against global traffic analysis without batching assumptions.
- Protection if all mix servers collude.
- Coercion resistance by itself.

## Threat model

The model must state how many mix servers may be corrupt and what the adversary observes about timing and network traffic.

## Protocol sketch

Messages are collected into a batch, passed through mixes that transform and shuffle them, and then published or delivered.

## Trust assumptions

Privacy often relies on at least one honest mix server and adequate batching.

## Post-quantum posture

Depends on the encryption, signatures, and shuffle proofs used by the mixnet. A mixnet can have a one-honest-server privacy model while still relying on quantum-vulnerable public-key primitives.

## Confidence model

The common confidence model is one-honest-party plus batching: privacy can hold if at least one mix server honestly shuffles and enough messages are mixed together. Verifiable mixnets add public verification for correct shuffling.

## Metadata leaks

Batch size, timing, message size, and participation patterns can reveal users.

## Failure modes

- Small batches.
- All mixes collude.
- Malformed shuffles.
- Side-channel leakage through message formats.

## Variants

- Chaumian mixnets.
- Verifiable mixnets.
- Decryption mixnets.

## Concrete protocols and packet formats

| Family or system | Typical role | Key differences and cautions |
| --- | --- | --- |
| Chaumian mixnets | Batched anonymous message delivery | Privacy depends on batching and at least one honest mix. |
| Verifiable shuffle mixnets | Elections and public bulletin boards | Adds proofs that shuffles are correct; proof system and public auditability matter. |
| Decryption mixnets | Encrypted ballots or messages decrypted through mixes | Mix servers transform and decrypt layers; trustee collusion breaks privacy. |
| Sphinx packet format | Anonymous messaging packets | Hides routing metadata inside fixed-format packets; timing analysis still matters. |
| Loopix-style mixnets | Continuous-time anonymous messaging | Adds delays and cover traffic; latency and traffic assumptions are part of the model. |

## Where it is used

- Electronic voting.
- Anonymous messaging.
- Privacy-preserving publication systems.

## Further reading

- Chaum, "Untraceable Electronic Mail, Return Addresses, and Digital Pseudonyms."
- Benaloh, "Verifiable Secret-Ballot Elections."
