---
title: Private Information Retrieval
type: protocol
level: protocol
template: protocol
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: mature
tags:
  - private-information-retrieval
  - privacy
  - databases
post_quantum_posture: depends
confidence_model:
  type: depends
---

# Private Information Retrieval

## Goal

Let a client retrieve an item from a database without revealing to the server which item was requested.

## Participants

- Client with a private query index.
- One or more database servers.
- Optional non-colluding replicas, preprocessing service, or audit layer.

## Inputs and outputs

Inputs:

- Client query index.
- Server database or encoded database.
- Public parameters, keys, or preprocessing material.

Outputs:

- Client obtains the requested record.
- Server learns limited information about the query according to the PIR model.
- Server may or may not learn that a client queried at a given time.

## Building blocks

- Coding-theoretic PIR.
- Homomorphic encryption or other computational PIR tools.
- Secret sharing or replicated databases for multi-server PIR.
- Authenticated data structures when database integrity matters.

## Security goals

- Query privacy from one or more servers.
- Correctness of the returned record.
- Sometimes database privacy in symmetric PIR, where the client should learn only the requested item.
- Optional robustness against faulty or malicious servers.

## Non-goals

- Hiding the client's network identity.
- Hiding query timing or frequency.
- Protecting writes, updates, or database freshness by default.
- Preventing leakage from repeated queries or returned content.

## Threat model

Single-server computational PIR relies on cryptographic assumptions. Multi-server information-theoretic PIR often relies on non-collusion between servers. If servers collude beyond the threshold, query privacy can fail. Malicious-server models require additional integrity and consistency checks.

## Protocol sketch

1. The client encodes the desired index into a private query.
2. The server or servers evaluate the query over the database.
3. The client decodes the response to recover the requested item.
4. Optional integrity checks prove that the response corresponds to the committed database version.

## Trust assumptions

- Non-collusion holds in replicated-server designs.
- Computational assumptions hold in single-server designs.
- Database version and encoding are bound to the query.
- Integrity checks are used when the server may return malformed data.

## Post-quantum posture

Depends on the construction. Coding-theoretic and information-theoretic multi-server PIR can avoid classical public-key assumptions but depend on non-collusion and data replication. Homomorphic-encryption-based PIR may be plausibly post-quantum when based on well-parameterized lattice schemes.

## Confidence model

Confidence may come from non-collusion, mathematical assumptions, public-verifiability for database commitments, or operational audit of server independence.

## Metadata leaks

- Query timing, client identity, and request frequency.
- Database partition or shard being queried.
- Response size and error behavior.
- Repeated-query linkage.

## Failure modes

- Assuming one-server PIR is private without cryptographic assumptions.
- Treating non-colluding servers as independent when they share operators or logs.
- Returning stale or malicious database versions.
- Ignoring access-pattern leakage outside the PIR query itself.
- Using PIR where the returned item reveals the query anyway.

## Variants

- Single-server computational PIR.
- Multi-server information-theoretic PIR.
- Symmetric PIR.
- Keyword PIR and private lookup systems.
- Batched and preprocessing-heavy PIR.

## Where it is used

- Private contact discovery.
- Certificate transparency or key transparency lookup designs.
- Private blocklist and breach lookup.
- Privacy-preserving database queries.

## Further reading

- [Chor et al., "Private Information Retrieval"](https://doi.org/10.1109/SFCS.1995.492461).
- [Boneh and Shoup, "A Graduate Course in Applied Cryptography"](https://toc.cryptobook.us/).
- [Metadata Leakage](/docs/appendices/metadata-leakage).
