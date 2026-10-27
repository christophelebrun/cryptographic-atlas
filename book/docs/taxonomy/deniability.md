---
title: Deniability
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
  - deniability
post_quantum_posture: not-applicable
confidence_model:
  type: mixed
---

# Deniability

## One-sentence intuition

Deniability aims to let participants authenticate a conversation without giving them a transcript that cryptographically proves the other's statements to outsiders. [Borisov, Goldberg, and Brewer][otr].

## Where it sits in the taxonomy

- Level: security goal (level 1), usually evaluated for a protocol.
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Authenticity](/docs/taxonomy/authenticity), [Non-Repudiation](/docs/taxonomy/non-repudiation), [Secure Messaging](/docs/systems-and-applications/secure-messaging).

## Problem it solves

Alice wants assurance that she is talking to Bob, but does not want their exchange to create portable cryptographic evidence of every statement. Local authentication and third-party proof are different requirements. Off-the-Record (OTR) communication was designed around this distinction. [Borisov, Goldberg, and Brewer][otr].

## Mental model

Think of a conversation without a transferable signed receipt. The other participant may believe what happened, but the protocol transcript alone should not uniquely prove it to someone else.

## Minimal example

Alice and Bob share a secret message authentication code (MAC) key established within a suitable authenticated protocol. Bob checks a tag during the conversation. Because Bob also knows the MAC key, the tag alone cannot prove to an outsider that only Alice could have created it. This illustrates the distinction; a shared MAC alone is not a complete deniable messaging protocol. [Borisov, Goldberg, and Brewer][otr].

## Security properties

A deniability definition specifies who can simulate plausible evidence and which adversary should be unable to distinguish it from a real exchange. Hiding message authorship after the fact, hiding participation, and resisting an adversary who cooperates during the session are different goals. The informal claim “deniable chat” does not settle all of them. [Borisov, Goldberg, and Brewer][otr]; [Di Raimondo, Gennaro, and Krawczyk][deniable].

## What it does not provide

- Secrecy from the recipient.
- Prevention of screenshots, recordings, or witness testimony.
- Sender anonymity or concealment of contact metadata.
- A guarantee about how people or a legal process will assess evidence.

The cryptographic goal concerns the transferability of protocol evidence, not the impossibility of disclosure or belief. [Borisov, Goldberg, and Brewer][otr].

## Assumptions

The whole authentication protocol must support the intended deniability definition. Public signatures, server records, or device artifacts may add evidence beyond the modeled transcript. State whether the attacker acts during the exchange or only receives records afterward. [Di Raimondo, Gennaro, and Krawczyk][deniable]; [Borisov, Goldberg, and Brewer][otr].

## Post-quantum posture

**Not applicable to the goal.** Check the exact authenticated key exchange and its deniability argument against the modeled quantum attacker. A post-quantum key exchange or a new ratchet does not automatically establish deniability for the complete protocol. [Di Raimondo, Gennaro, and Krawczyk][deniable]; [NIST post-quantum project][pqc].

## Confidence model

**Mixed:** the protocol's authentication and simulation properties, endpoint behavior, and the scope of available evidence all matter. Erasing old keys can help [Forward Secrecy](/docs/taxonomy/forward-secrecy), but forward secrecy alone does not imply deniability. [Borisov, Goldberg, and Brewer][otr].

## Common constructions

Deniable authenticated key exchange, symmetric message authentication, and protocol-specific disclosure of obsolete authentication keys appear in OTR-style designs. Avoiding public signatures on message content can help, but is not a complete proof of deniability. [Borisov, Goldberg, and Brewer][otr]; [Di Raimondo, Gennaro, and Krawczyk][deniable].

## Use cases

Private conversations and off-the-record negotiations may want local authentication without permanent transferable receipts. A system whose purpose is public evidence has a different requirement. [Borisov, Goldberg, and Brewer][otr].

## Composition patterns

Combine deniable authentication with [Confidentiality](/docs/taxonomy/confidentiality) and forward secrecy. Treat [receipt-freeness](/docs/taxonomy/additional-security-goals#receipt-freeness) as a separate voting goal: a deniable chat transcript alone does not stop vote buying or credential surrender. [Borisov, Goldberg, and Brewer][otr]; [Benaloh and Tuinstra][receipt].

## Failure modes and anti-patterns

:::warning A ratchet is not a deniability certificate
Key evolution addresses compromise over time. Deniability also depends on authentication, transcripts, and the adversary model. Adding an externally verifiable signature to each message can create precisely the evidence the application wanted to avoid. [Borisov, Goldberg, and Brewer][otr]; [Di Raimondo, Gennaro, and Krawczyk][deniable].
:::

## Maturity and deployment

**Mature but specialized:** deniable messaging and key-exchange constructions have an established literature. Stronger adversary models and application-level evidence still need protocol-specific expert analysis; an educational sketch is not deployment guidance. [Borisov, Goldberg, and Brewer][otr]; [Di Raimondo, Gennaro, and Krawczyk][deniable].

## Related concepts

- [Non-Repudiation](/docs/taxonomy/non-repudiation)
- [Forward Secrecy](/docs/taxonomy/forward-secrecy)
- [Make Receipts Useless](/docs/design-patterns/make-receipts-useless)

## Further reading

- [Borisov, Goldberg, and Brewer, Off-the-Record Communication, or, Why Not To Use PGP][otr] (WPES 2004) - intuition and design trade-offs.
- [Di Raimondo, Gennaro, and Krawczyk, Deniable Authentication and Key Exchange][deniable] (CCS 2006) - formal deniability models.
- [Benaloh and Tuinstra, Receipt-Free Secret-Ballot Elections][receipt] (STOC 1994) - the related voting requirement.

[otr]: https://otr.cypherpunks.ca/otr-wpes.pdf
[deniable]: https://www.iris.unict.it/handle/20.500.11769/96372
[receipt]: https://www.microsoft.com/en-us/research/publication/receipt-free-secret-ballot-elections/
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
