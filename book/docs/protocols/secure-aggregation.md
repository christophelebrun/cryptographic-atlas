---
title: Secure Aggregation
type: protocol
level: protocol
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: mature
tags:
  - secure-aggregation
  - privacy
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

## Where it is used

- Federated analytics.
- Federated learning.
- Private telemetry.

## Further reading

- TODO: Add verified references for secure aggregation protocols.
