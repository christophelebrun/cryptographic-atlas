---
title: Unlinkability
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
  - unlinkability
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Unlinkability

## One-sentence intuition

Unlinkability limits what an observer can learn about whether two items, actions, or identities are related. [Pfitzmann and Hansen, §4][privacy].

## Where it sits in the taxonomy

- Level: security goal (level 1).
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Anonymity](/docs/taxonomy/anonymity), [Anonymous Tokens](/docs/protocols/anonymous-tokens), [Nullifiers](/docs/protocols/nullifiers).

## Problem it solves

An observer may not know your name but may still build a detailed profile by linking your visits. Unlinkability asks whether the observer can connect the visits, not merely whether they can identify the person. Specify the relationship being hidden: two presentations, an issuance and redemption, or a sender and recipient. [Pfitzmann and Hansen, §§4-5 and 9][privacy].

## Mental model

Imagine using separate tickets for separate visits. Changing the ticket number helps only if neither the tickets nor the surrounding observations reveal their shared origin. A stable account cookie can undo the separation.

## Minimal example

Alice obtains a Privacy Pass token and later presents it to a website. The token protocol can prevent the website from matching that token to its issuance event. Whether the website can recognize Alice through an address, account, or timing is a separate deployment question. [RFC 9576, §§3.3-3.6 and 6][tokens].

## Security properties

A claim must name the observer and the relationship it hides. Privacy Pass distinguishes several unlinkability properties across its client, issuer, attester, and origin roles. A guarantee against one role does not automatically hold against all roles acting together. [RFC 9576, §§3-4][tokens].

## What it does not provide

- Content confidentiality or anonymous networking.
- Immunity to timing correlation and identifying attributes.
- Proof that a token cannot be transferred to someone else.
- Duplicate-use prevention: a service may still need to remember spent tokens.

In particular, unlinkability and non-transferability are different properties. Privacy Pass discusses token sharing and replay separately from privacy. [RFC 9576, §§6 and 7.1][tokens].

## Assumptions

Use the correct cryptographic issuance and presentation protocol, consistent public parameters, and the deployment's stated collusion model. Blind signatures can hide the issuance-redemption relation cryptographically even when roles collude; identifying metadata can still defeat system-level privacy. Non-collusion is therefore a specific architectural assumption, not a universal requirement of unlinkability. [RFC 9576, §§3-4 and 6][tokens]; [Chaum][blind].

## Post-quantum posture

**Not applicable to the goal.** The blind-signature, credential, or token construction has its own assumptions. Classical RSA-based blind signatures do not become quantum resistant because the transport changes. [Chaum][blind]; [NIST post-quantum project][pqc].

## Confidence model

**Mathematical-assumption** for the cryptographic unlinkability property; sometimes **non-collusion** for the overall deployment. Client behavior and public-parameter consistency also matter. Name the parties that could reconstruct the hidden relationship. [RFC 9576, §§4 and 6][tokens].

## Common constructions

Blind signatures and randomized anonymous credential presentations can hide links between interactions. A **nullifier** is different: it deliberately creates a repeatable identifier within a chosen scope to detect repeat use. It supports a limited exception to unlinkability rather than providing unlinkability by itself. [Chaum][blind]; [Camenisch and Lysyanskaya][credentials]; [Zerocash, §4][zerocash].

## Use cases

Anonymous token redemption, repeated credential presentations, and private payments each hide different relationships. Their claims should name those relationships instead of promising general “untraceability.” [RFC 9576][tokens]; [Camenisch and Lysyanskaya][credentials]; [Zerocash][zerocash].

## Composition patterns

When using [Anti-Double-Use Nullifiers](/docs/design-patterns/anti-double-use-nullifiers), define the application or event that shares an identifier. Reusing the same link identifier across unrelated contexts can expose an unwanted relationship. This is an application of the distinction between scoped and cross-context pseudonyms. [Pfitzmann and Hansen, §11][privacy].

## Failure modes and anti-patterns

:::warning Different cryptographic values can still be correlated
A user-specific issuer key, a unique issuance time, or a stable browser identifier can connect otherwise unlinkable interactions. Key rotation can also partition users into smaller groups; evaluate that privacy trade-off alongside compromise handling. [RFC 9576, §§6.1-6.3][tokens].
:::

## Maturity and deployment

**Mature but specialized mechanisms:** blind signatures and anonymous credentials have long-standing constructions; Privacy Pass has standardized architecture and token protocols. This does not give every deployment the same metadata protection. [RFC 9576][tokens].

## Related concepts

- [Blind Signatures](/docs/structured-primitives/blind-signatures)
- [Anonymous Credentials](/docs/protocols/anonymous-credentials)
- [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation)

## Further reading

- [Pfitzmann and Hansen, privacy terminology][privacy], §§4-5 and 11 - relationships and scoped pseudonyms.
- [RFC 9576][tokens], §§3-7 - token unlinkability and deployment risks.
- [Chaum, Blind Signatures for Untraceable Payments][blind] (CRYPTO 1982; proceedings 1983) - foundational construction.
- [Zerocash][zerocash] (2014), §4 - deliberate repeat-spend detection in a private payment protocol.

[privacy]: https://dud.inf.tu-dresden.de/literatur/Anon_Terminology_v0.34.pdf
[tokens]: https://www.rfc-editor.org/rfc/rfc9576
[blind]: https://chaum.com/wp-content/uploads/2022/01/Chaum-blind-signatures.pdf
[credentials]: https://cs.brown.edu/people/alysyans/papers/cl01a.pdf
[zerocash]: https://cs-people.bu.edu/tromer/papers/zerocash-extended-20140518.pdf
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
