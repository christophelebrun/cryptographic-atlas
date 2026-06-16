---
title: Confidence Models
type: appendix
level: not-applicable
template: reference
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
maturity: not-applicable
tags:
  - confidence-models
  - trust-assumptions
  - composability
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Confidence Models

A confidence model states where the reader's confidence is supposed to come from.

In cryptographic systems, confidence may come from a mathematical assumption, public verification, a quorum of independent parties, at least one honest participant, an honest majority, a trusted issuer, or operational controls. These are not interchangeable.

## Common models

| Model | Meaning | Typical failure |
| --- | --- | --- |
| mathematical-assumption | Security rests mainly on a hardness assumption and implementation correctness. | The assumption is broken, parameters are weak, or implementation leaks secrets. |
| public-verifiability | Anyone can check the relevant proof, transcript, or commitment. | The public statement is incomplete or the verifier checks the wrong property. |
| trusted-setup | A setup phase must be generated honestly or securely destroyed. | Toxic waste, biased parameters, or unverifiable setup. |
| trusted-issuer | One issuer or authority controls eligibility, credentials, or identity binding. | The issuer misissues, logs, censors, or deanonymizes users. |
| one-honest-party | Privacy or correctness holds if at least one party in a set behaves honestly. | All parties collude, or the honest party is excluded. |
| t-of-n-threshold | A property fails only when at least `t` out of `n` parties collude or are unavailable. | Enough parties collude, lose keys, or are coerced. |
| honest-majority | Security requires more honest than corrupt participants. | The adversary controls the majority or network scheduling violates the model. |
| non-collusion | Multiple services are assumed not to share data or keys. | Services collude, merge, are subpoenaed together, or share infrastructure. |
| client-side-secret | A user secret or device key anchors the guarantee. | The secret is stolen, shared, backed up insecurely, or coerced from the user. |
| external-timing | Timing or delay assumptions are part of the guarantee. | Hardware advantage, network latency, or denial of service changes the effective timing. |

## Quick matrix

| Concept or protocol | Typical confidence model | What to ask |
| --- | --- | --- |
| Hash commitment | mathematical-assumption | Is the message high entropy or properly randomized? |
| Pedersen commitment | mathematical-assumption plus public parameters | Who generated the generators, and can anyone know their discrete-log relation? |
| Pairing-based SNARK | trusted-setup or universal setup, depending on construction | What happens if setup toxic waste exists? |
| STARK-style proof | public-verifiability and transparent setup | Are hash assumptions and public inputs appropriate? |
| Bulletproof-style range proof | mathematical-assumption and public-verifiability | Is the proof bound to the correct commitment and range? |
| Threshold decryption | t-of-n-threshold | How many trustees can collude before privacy fails? |
| Mixnet | one-honest-party plus batching | Is at least one mix honest, and is the anonymity set large enough? |
| MPC | honest-majority, dishonest-majority, or threshold model | Which corruption model does the protocol actually support? |
| Secure aggregation | threshold, dropout, and collusion model | How many clients or helper servers may collude? |
| Anonymous credentials | trusted-issuer plus holder secret | Can the issuer or verifier link presentations? |
| Nullifiers | client-side-secret plus public registry | Does the nullifier prove eligibility, or only non-reuse? |
| E-voting | threshold trustees, public bulletin board, and audit process | Which authorities can collude, censor, or create receipts? |

## How to write this in pages

Prefer concrete statements:

> Privacy holds if fewer than `t` of `n` trustees collude, the proof system statement is correct, and metadata outside the tally is handled separately.

Avoid vague statements:

> The system is decentralized and therefore trustless.

## Further reading

- Canetti, [Universally Composable Security; A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067).
- Shamir, [How to Share a Secret](https://doi.org/10.1145/359168.359176).
- Benaloh, [Verifiable Secret-Ballot Elections](https://www.microsoft.com/en-us/research/publication/verifiable-secret-ballot-elections/).
