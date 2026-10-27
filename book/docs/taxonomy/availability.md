---
title: Availability
type: taxonomy
level: security-goal
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-10-27'
review:
  structural:
    status: current
    last_reviewed: '2026-10-27'
  sources:
    status: current
    last_reviewed: '2026-10-27'
    next_review_due: '2027-04-27'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: beginner
maturity: not-applicable
tags:
  - security-goals
  - availability
post_quantum_posture: not-applicable
confidence_model:
  type: mixed
---

# Availability

## One-sentence intuition

Availability means authorized users can obtain the intended service when required, within the system's stated performance and failure limits. [RFC 4949, availability][glossary].

## Where it sits in the taxonomy

- Level: security goal (level 1), usually evaluated for a system.
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Censorship Resistance](/docs/taxonomy/censorship-resistance), [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography), [Key Rotation and Migration](/docs/design-patterns/key-rotation-and-migration).

## Problem it solves

A system can keep secrets and reject forged messages while still refusing every useful request. Availability addresses service failure, including lost keys, unreachable participants, stalled processing, and resource exhaustion. State what must complete and within what time; “online” is too vague. [RFC 4949, availability and denial of service][glossary].

## Mental model

Think of a building with several working entrances. Several doors do not help if they all depend on the same failed access controller. Likewise, counting servers does not establish independent failure tolerance. [Castro and Liskov, §2][model].

## Minimal example

A 3-of-5 signing service needs three cooperating signers for an operation. If two are offline and the other three follow the protocol, the threshold is still attainable. If three are offline, it is not. This arithmetic is a necessary condition, not a guarantee of completion: a chosen signer can withhold a response and abort a FROST signing attempt. Retrying and selecting participants are additional system responsibilities. [RFC 9591, §§5 and 7][frost].

## Security properties

Define availability relative to a workload, timing requirement, and fault model. In distributed protocols, **liveness** means the required progress eventually occurs under stated conditions; it is distinct from a safety claim such as “no conflicting result is accepted.” Byzantine-fault-tolerant replication illustrates that these properties need separate network assumptions. [RFC 4949][glossary]; [Castro and Liskov, §§2-3][pbft].

## What it does not provide

- Confidentiality or integrity of responses.
- Progress during every network partition or unlimited denial-of-service attack.
- Selective-inclusion guarantees merely because a service is generally reachable.
- Recoverability of data merely because a commitment or proof exists.

A proof can check data that is supplied without ensuring it will be supplied. Separate availability requirements from verification requirements. [RFC 4949][glossary]; [RFC 9162, §§2 and 11][ct].

## Assumptions

Specify reachable participants, tolerated faults, network conditions, capacity, and recovery dependencies. Independence matters: separate machines may share administrators, credentials, software bugs, or a provider outage. A threshold number does not capture all these dependencies. [Castro and Liskov, §2][model]; [RFC 9591, §7][frost].

## Post-quantum posture

**Not applicable to the goal.** Quantum-vulnerable authentication can undermine a concrete service, but adopting post-quantum primitives does not solve overload, key loss, or correlated outages. Evaluate both cryptographic and operational dependencies. [NIST post-quantum project][pqc]; [RFC 4949][glossary].

## Confidence model

**Mixed:** a t-of-n-threshold may describe a signing requirement; a consensus protocol may have a different honest-party threshold and timing model. State the threshold for each operation and how many participants must be reachable and cooperative, not just uncompromised. [RFC 9591][frost]; [Castro and Liskov][model].

## Common constructions

Replication, protocol-specific fault tolerance, recovery procedures, and redundant access paths can support availability. Threshold signing distributes key control, but can add a participation dependency; it does not automatically improve uptime. [Castro and Liskov][model]; [RFC 9591, §7][frost].

## Use cases

Threshold custody and replicated services need explicit completion and recovery requirements. A website health check is insufficient if users cannot retrieve required data or obtain the necessary signatures. [RFC 4949][glossary]; [RFC 9591][frost].

## Composition patterns

Evaluate [Censorship Resistance](/docs/taxonomy/censorship-resistance) for particular users, and [Verifiability](/docs/taxonomy/verifiability) for returned results. Design recovery alongside confidentiality: making a secret easier to recover changes who may gain access to it. [RFC 4949][glossary]; [RFC 9591, §7][frost].

## Failure modes and anti-patterns

:::warning Count shared dependencies as well as participants
A committee can meet its nominal size and still fail together. A reachable signer can also refuse to cooperate. Test the actual completion and recovery paths against the fault model; do not treat replication or a signature threshold as a standalone availability guarantee. [Castro and Liskov, §2][model]; [RFC 9591, §7][frost].
:::

## Maturity and deployment

**Widely deployed techniques:** replication and operational recovery. Byzantine fault tolerance and threshold-signing services require more specialized assumptions. Their guarantees must be taken from the chosen protocol, not generalized from a replica count. [Castro and Liskov][pbft]; [RFC 9591][frost].

## Related concepts

- [Censorship Resistance](/docs/taxonomy/censorship-resistance)
- [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography)
- [ZK Rollups](/docs/systems-and-applications/zk-rollups)

## Further reading

- [RFC 4949][glossary] - availability and denial-of-service terminology.
- [Castro and Liskov, Practical Byzantine Fault Tolerance][pbft] (OSDI 1999), §§2-3 - network and failure assumptions, safety, and liveness.
- [RFC 9591: FROST][frost], §7 - participation, aborts, and operational responsibilities.

[glossary]: https://www.rfc-editor.org/rfc/rfc4949
[model]: https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/node2.html
[pbft]: https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/castro.html
[frost]: https://www.rfc-editor.org/rfc/rfc9591
[ct]: https://www.rfc-editor.org/rfc/rfc9162
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
