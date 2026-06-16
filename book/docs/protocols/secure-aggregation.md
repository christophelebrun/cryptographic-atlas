---
title: Secure Aggregation
type: protocol
level: protocol
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
maturity: mature
tags:
  - secure-aggregation
  - privacy
post_quantum_posture: depends
confidence_model:
  type: honest-majority
---

# Secure Aggregation

## Goal

Secure aggregation lets a server learn an aggregate of client values without learning each individual value.

## Participants

- Clients that hold private values.
- Aggregator or server.
- Sometimes helper servers.

## Inputs and outputs

Clients input values. The server learns an aggregate such as a sum or average.

## Building blocks

- Secret sharing.
- Pairwise masks.
- Authentication.
- Dropout handling.

## Security goals

- Hide individual values from the aggregator under the chosen collusion model.
- Recover the aggregate if enough clients complete the protocol.

## Non-goals

- Privacy for tiny groups.
- Protection against malicious values unless validation is added.
- Differential privacy unless added separately.

## Threat model

The model must specify how many clients or servers may collude, whether clients can drop out, and whether malicious clients can submit malformed updates.

## Protocol sketch

1. Clients authenticate and agree on masks.
2. Each client sends a masked value.
3. The server combines masked values.
4. Masks cancel or are reconstructed according to the protocol.
5. The server learns only the aggregate.

## Trust assumptions

Assumptions depend on the number of clients, dropout thresholds, authentication, and helper-server model.

## Post-quantum posture

Depends on the transport, authentication, key agreement, and masking primitives. The aggregation pattern can be made from post-quantum components, but many deployed channels and signatures may not be post-quantum today.

## Confidence model

Confidence comes from the collusion threshold, dropout model, authentication, and whether helper servers are assumed not to collude. Small cohorts can defeat privacy even if the protocol messages are cryptographically protected.

## Metadata leaks

The server may learn which clients participated, when they connected, and the aggregate for small cohorts.

## Failure modes

- Small cohorts reveal individuals.
- Malicious clients poison the aggregate.
- Dropout handling leaks masks or values.
- Repeated aggregates enable differencing attacks.

## Variants

- Single-server secure aggregation.
- Multi-server aggregation.
- Aggregation with differential privacy.

## Concrete protocol families

| Family or system | Typical role | Key differences and cautions |
| --- | --- | --- |
| Bonawitz-style secure aggregation | Federated learning with client dropout | Pairwise masks cancel in aggregate; dropout handling and cohort size dominate privacy. |
| Prio / Prio+ style systems | Private telemetry with validity checks | Adds client-side proof or verification machinery so malformed values are harder to inject. |
| Secret-shared aggregation | Multi-server private aggregation | Privacy depends on non-collusion or corruption threshold between helper servers. |
| Homomorphic-encryption aggregation | Encrypted sums with trustee or server decryption | Useful when client coordination is limited; key management and output leakage remain. |
| Differentially private aggregation | Aggregate release with noise | Not just cryptography; privacy budget and repeated releases are central. |

## Where it is used

- Federated analytics.
- Federated learning.
- Private telemetry.

## Further reading

- Bonawitz et al., [Practical Secure Aggregation for Privacy-Preserving Machine Learning](https://research.google/pubs/practical-secure-aggregation-for-privacy-preserving-machine-learning/).
- Canetti, [Universally Composable Security; A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067).
