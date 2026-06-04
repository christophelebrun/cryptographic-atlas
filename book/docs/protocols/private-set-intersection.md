---
title: Private Set Intersection
type: protocol
level: protocol
template: protocol
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - psi
  - privacy
  - protocols
post_quantum_posture: depends
confidence_model:
  type: depends
---

# Private Set Intersection

## Goal

Private set intersection (PSI) lets parties learn the overlap between their private sets while revealing as little as possible about non-overlapping elements.

## Participants

- Two or more set holders.
- Optional helper or server roles in delegated, outsourced, or multi-party variants.
- Optional auditor or verifier in variants that prove correct computation.

## Inputs and outputs

- Inputs: each participant's private set.
- Outputs: the intersection, the size of the intersection, or a function of matching records, depending on the protocol.
- Public parameters: hash functions, encodings, protocol suite, security level, and sometimes public keys or setup material.

## Building blocks

- Oblivious pseudorandom functions (OPRFs).
- Diffie-Hellman-style blinding or public-key encryption.
- Oblivious transfer.
- Garbled circuits or multi-party computation.
- Homomorphic encryption in some constructions.
- Hashing, canonical encoding, and domain separation.

## Security goals

- Hide non-matching elements under the stated threat model.
- Reveal only the intended output: intersection, cardinality, or approved function.
- Bind comparisons to canonical encodings so equal items match and distinct items do not accidentally collide.
- Support semi-honest or malicious security depending on the construction.

## Non-goals

- Hiding the fact that a PSI run happened.
- Hiding set sizes unless the protocol pads or otherwise protects them.
- Preventing inference from the intersection itself.
- Handling fuzzy, approximate, or dirty data safely by default.
- Providing fairness if one party aborts after learning output.

## Threat model

PSI protocols vary sharply. A semi-honest protocol assumes participants follow the protocol but try to learn extra information from transcripts. A malicious-secure protocol must handle malformed inputs, selective aborts, and attempts to bias or expand the result. Multi-party, delegated, and asymmetric PSI variants add different collusion and availability assumptions.

## Protocol sketch

One common OPRF-style two-party shape is:

1. The client encodes and blinds each element in its set.
2. The server evaluates an OPRF on blinded elements without seeing them.
3. The client unblinds outputs and compares them with server-provided encodings of the server set.
4. The client learns matching elements or intersection size, depending on the design.
5. Malicious-secure variants add proofs, consistency checks, or cut-and-choose-style defenses.

## Trust assumptions

Inputs must be encoded canonically, the chosen construction's assumptions must hold, each party must use the agreed security parameters, and the output policy must match the privacy claim. If helper servers are used, the protocol must state whether privacy depends on non-collusion.

## Post-quantum posture

Depends on the construction. Diffie-Hellman and many OPRF-based PSI protocols are quantum-vulnerable. PSI from symmetric-key multi-party computation or post-quantum assumptions may be plausible, but concrete posture depends on the protocol, parameters, and authentication layer.

## Confidence model

Confidence may come from mathematical assumptions, a semi-honest or malicious-secure proof, public verification of commitments or proofs, or non-collusion among helper services. These models are not interchangeable.

## Metadata leaks

- Set sizes unless padded.
- Timing, retry, and abort behavior.
- Which party learns the output.
- Intersection size if cardinality is revealed.
- Network identifiers and operational logs.
- Distributional clues from rare or predictable elements.

## Failure modes

- Treating PSI as "privacy preserving" without stating exactly what output is revealed.
- Comparing low-entropy identifiers that are easy to guess offline.
- Ignoring set-size leakage.
- Using inconsistent normalization, causing false matches or missed matches.
- Running repeated PSI queries that allow differencing attacks.
- Using a semi-honest protocol against malicious parties.
- Revealing too much through post-processing of matched records.

## Variants

- PSI with intersection output.
- PSI-cardinality, where only the intersection size is revealed.
- PSI with associated payloads, where matching records unlock extra values.
- Multi-party PSI.
- Delegated or outsourced PSI.
- Fuzzy or approximate PSI, which usually has stronger leakage concerns.

## Where it is used

- Private contact discovery.
- Fraud and abuse signal sharing.
- Privacy-preserving record linkage.
- Audience overlap and measurement.
- Federated learning cohort construction.
- Credential or allowlist checks when full lists should not be shared.

## Further reading

- Freedman, Nissim, and Pinkas, "Efficient Private Matching and Set Intersection."
- RFC 9497, "Oblivious Pseudorandom Functions (OPRFs) Using Prime-Order Groups."
- Bonawitz et al., "Practical Secure Aggregation for Privacy-Preserving Machine Learning."
- Canetti, "Universally Composable Security; A New Paradigm for Cryptographic Protocols."
