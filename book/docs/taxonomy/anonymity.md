---
title: Anonymity
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
  - anonymity
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Anonymity

## One-sentence intuition

Anonymity means an observer cannot sufficiently identify you among the people who could plausibly have performed an action. [Pfitzmann and Hansen, §3][privacy].

## Where it sits in the taxonomy

- Level: security goal (level 1).
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Unlinkability](/docs/taxonomy/unlinkability), [Mixnets](/docs/protocols/mixnets), [Anonymous Membership](/docs/design-patterns/anonymous-membership).

## Problem it solves

A service may need to accept an eligible user's action without learning which eligible user acted. The question is always “anonymous **to whom**, among **which candidates**, given **which observations**?” A hidden name alone does not answer it. [Pfitzmann and Hansen, §§2-3][privacy].

## Mental model

Think of a crowd in which several people could have sent a message. If one person wears a uniquely identifiable coat, the size of the crowd overstates their protection. An anonymity set need not make every member equally likely. [Pfitzmann and Hansen, §3][privacy].

## Minimal example

Alice proves that she holds an eligible membership credential without revealing which member she is. That can hide her identity in the credential interaction. If she submits while logged into a named account, that surrounding application can still identify her. Anonymous credentials and application-level observations must be evaluated together. [Camenisch and Lysyanskaya][credentials]; [RFC 9576, §6][tokens].

## Security properties

Specify sender or recipient anonymity, the observer's capabilities, and how much identification advantage is allowed. Some protocols hide a participant's identity while still letting a verifier check eligibility. This is a property of a particular proof or credential protocol, not of every zero-knowledge proof (ZKP). [Pfitzmann and Hansen, §§3 and 5][privacy]; [Camenisch and Lysyanskaya][credentials].

## What it does not provide

- Confidentiality of the content.
- Unlinkability between repeated actions: a stable pseudonym may connect them.
- Concealment of network addresses or participation unless explicitly included.
- Equal protection for every member of a nominally large set.

Anonymity, pseudonymity, and unlinkability are related but distinct. [Pfitzmann and Hansen, §§3-5 and 9][privacy].

## Assumptions

Define the corruption and collusion model, how many plausible users remain, and what the observer sees. A mixnet may require an honest relay; a credential system may instead rely on a cryptographic privacy definition that tolerates issuer-verifier collusion. Do not assume that every system has the same non-collusion requirement. [Chaum][mix]; [Camenisch and Lysyanskaya][credentials].

## Post-quantum posture

**Not applicable to the goal.** Analyze the credential, proof, encryption, and channel separately. Quantum resistance of one component does not establish anonymity for the whole interaction. [NIST post-quantum project][pqc]; [RFC 9576, §6][tokens].

## Confidence model

Possible models include **one-honest-party**, **non-collusion**, **mathematical-assumption**, and **client-side-secret**, depending on the protocol. State who must remain honest and what they must not learn; do not infer this from the word “anonymous.” [Chaum][mix]; [RFC 9576, §§4 and 6][tokens].

## Common constructions

Mixnets obscure correspondence between incoming and outgoing messages. Anonymous credential protocols can prove an entitlement without identifying its holder. These address different observation points and may need to be combined. [Chaum][mix]; [Camenisch and Lysyanskaya][credentials].

## Use cases

Anonymous access and private credential presentations are examples. Voting and payments need additional rules for eligibility, duplicate use, and public evidence. [Camenisch and Lysyanskaya][credentials]; [RFC 9576][tokens].

## Composition patterns

Combine anonymous authentication with [Unlinkability](/docs/taxonomy/unlinkability) and an explicit [Metadata Leakage](/docs/appendices/metadata-leakage) model. If an abuse-control identifier deliberately links actions, specify the scope of that exception. Privacy Pass illustrates how deployment metadata can narrow otherwise cryptographic privacy. [RFC 9576, §§3-6][tokens].

## Failure modes and anti-patterns

:::warning Count plausible users, not registered accounts
Timing, rare attributes, user-specific issuer keys, or a named login can isolate someone within a much larger nominal population. A valid privacy proof does not neutralize these observations. [RFC 9576, §§6.1-6.3][tokens].
:::

## Maturity and deployment

**Mature but specialized constructions:** mixnets and anonymous credentials have established research foundations. Operational anonymity remains dependent on the concrete deployment and observer model; no universal anonymity strength follows from a construction's name. [Chaum][mix]; [Camenisch and Lysyanskaya][credentials]; [RFC 9576][tokens].

## Related concepts

- [Anonymous Credentials](/docs/protocols/anonymous-credentials)
- [Unlinkability](/docs/taxonomy/unlinkability)
- [Private Payments](/docs/systems-and-applications/private-payments)

## Further reading

- [Pfitzmann and Hansen, privacy terminology, v0.34][privacy], §§2-5 - precise definitions and observer models.
- [Chaum, Untraceable Electronic Mail, Return Addresses, and Digital Pseudonyms][mix] (1981) - mix-based communication.
- [Camenisch and Lysyanskaya, anonymous credentials][credentials] (2001) - anonymous, unlinkable credential use.
- [RFC 9576: The Privacy Pass Architecture][tokens], §6 - practical anonymity-set reduction.

[privacy]: https://dud.inf.tu-dresden.de/literatur/Anon_Terminology_v0.34.pdf
[mix]: https://doi.org/10.1145/358549.358563
[credentials]: https://cs.brown.edu/people/alysyans/papers/cl01a.pdf
[tokens]: https://www.rfc-editor.org/rfc/rfc9576
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
