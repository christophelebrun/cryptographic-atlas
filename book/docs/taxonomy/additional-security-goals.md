---
title: Additional Security Goals
type: taxonomy
level: security-goal
template: overview
status: needs-review
coverage_depth: routing-overview
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - security-goals
  - verifiability
  - auditability
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Additional Security Goals

Security goals describe what a system is trying to achieve before any primitive or protocol is selected. This page now routes to standalone high-value goals and keeps grouped coverage for adjacent goals.

## Goal matrix

| Goal | One-sentence intuition | Usually sits at | What it does not provide |
| --- | --- | --- | --- |
| [Verifiability](/docs/taxonomy/verifiability) | A party can check that a statement, tally, proof, or transcript satisfies stated rules. | proof system, protocol, system | Truth of off-chain facts or good user intent. |
| [Auditability](/docs/taxonomy/auditability) | Enough evidence exists for later review of a process or decision. | protocol, system, governance layer | Privacy by itself; logs can create new leaks. |
| [Accountability](/docs/taxonomy/accountability) | Misbehavior can be attributed or sanctioned under stated rules. | protocol, system | Public identity disclosure or automatic enforcement. |
| [Forward secrecy](/docs/taxonomy/forward-secrecy) | Later compromise of long-term keys does not expose past session secrets. | protocol | Protection if session secrets were recorded or compromised at the time. |
| [Deniability](/docs/taxonomy/deniability) | A transcript does not convince outsiders that a participant said or did something. | protocol, system | Public verifiability or legal non-repudiation. |
| [Non-Repudiation](/docs/taxonomy/non-repudiation) | Evidence is intended to make later denial of an action unconvincing. | protocol, system, legal process | Deniability or proof of human intent. |
| [Availability](/docs/taxonomy/availability) | Honest users can use the system when needed. | protocol, system, operations | Confidentiality or censorship resistance by itself. |
| [Censorship Resistance](/docs/taxonomy/censorship-resistance) | Valid actions cannot be selectively blocked beyond the stated model. | protocol, system, network | Payload privacy or fair ordering by itself. |
| Receipt-freeness | A user cannot prove how they acted to a coercer. | voting, credential, or governance system | Usability, availability, or full coercion resistance. |
| Coercion resistance | A system remains safe when users are pressured outside the protocol. | voting and governance systems | Protection against every social or legal pressure. |

## Standalone routes

The goals above now have standalone pages where they are central to the atlas. Use this page for quick comparison and for adjacent goals that are still better handled inside system pages.

## Adjacent grouped goals

Receipt-freeness and coercion resistance remain grouped because they are usually system-level refinements of voting, credential, or governance designs. They should be promoted only if the atlas adds a larger section on coercion models.

Fair ordering and liveness are also adjacent goals. They are currently covered through [Availability](/docs/taxonomy/availability), [Censorship Resistance](/docs/taxonomy/censorship-resistance), [Encrypted Mempools](/docs/systems-and-applications/encrypted-mempools), and [Delayed Reveal](/docs/design-patterns/delayed-reveal).

## Post-quantum posture

Not applicable to the goals themselves. Each goal inherits posture from the concrete primitives, protocols, authentication layers, and storage mechanisms used to realize it.

## Related concepts

- [Security Goals](/docs/taxonomy/security-goals)
- [Confidentiality](/docs/taxonomy/confidentiality)
- [Integrity](/docs/taxonomy/integrity)
- [Authenticity](/docs/taxonomy/authenticity)
- [Anonymity](/docs/taxonomy/anonymity)
- [Unlinkability](/docs/taxonomy/unlinkability)
- [Forward Secrecy](/docs/taxonomy/forward-secrecy)
- [Verifiability](/docs/taxonomy/verifiability)
- [Auditability](/docs/taxonomy/auditability)
- [Accountability](/docs/taxonomy/accountability)
- [Deniability](/docs/taxonomy/deniability)
- [Non-Repudiation](/docs/taxonomy/non-repudiation)
- [Availability](/docs/taxonomy/availability)
- [Censorship Resistance](/docs/taxonomy/censorship-resistance)
- [Digital Signatures](/docs/primitives/digital-signatures)
- [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs)
- [Secure Channels](/docs/protocols/secure-channels)
- [Metadata Leakage](/docs/appendices/metadata-leakage)

## Further reading

- Katz and Lindell, [Introduction to Modern Cryptography](https://www.cs.umd.edu/~jkatz/imc.html).
- Canetti, [Universally Composable Security; A New Paradigm for Cryptographic Protocols](https://eprint.iacr.org/2000/067).
- Benaloh, [Verifiable Secret-Ballot Elections](https://www.microsoft.com/en-us/research/publication/verifiable-secret-ballot-elections/).
- Signal, [The Double Ratchet Algorithm](https://signal.org/docs/specifications/doubleratchet/).
