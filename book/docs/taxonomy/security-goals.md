---
title: Security Goals
type: taxonomy
level: security-goal
template: overview
status: current
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
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Security Goals

A security goal describes an outcome you want: keep a message secret, detect a change, or let a user submit a valid transaction. A primitive is a tool used to pursue that outcome. Start with the outcome, then choose the tools and state the conditions they need. This chapter separates these goals using the terminology of [RFC 4949][glossary] and the definitions in [Boneh and Shoup][book].

## Start with one ordinary action

Imagine Alice sends Bob a payment instruction. Asking whether it is “secure” leaves several different questions unanswered:

| Reader's question | Security goal | A limit to remember |
| --- | --- | --- |
| Can someone else read the instruction? | [Confidentiality](/docs/taxonomy/confidentiality) | Bob can still disclose what he receives. |
| Can someone change the amount without detection? | [Integrity](/docs/taxonomy/integrity) | An unchanged instruction might still be old or fraudulent. |
| Did it come from the expected key or party? | [Authenticity](/docs/taxonomy/authenticity) | A valid signature does not establish human intent or permission. |
| Can an observer identify Alice? | [Anonymity](/docs/taxonomy/anonymity) | Hiding the amount does not hide the sender. |
| Can an observer connect this payment to another? | [Unlinkability](/docs/taxonomy/unlinkability) | A pseudonym can hide a name while linking every action. |
| Would a later key theft expose today's conversation? | [Forward secrecy](/docs/taxonomy/forward-secrecy) | It does not protect plaintext already copied. |

The first three distinctions follow [RFC 4949][glossary]. Anonymity and unlinkability depend on the observer's information, as formalized by [Pfitzmann and Hansen, §§3-5][privacy]. Forward secrecy depends on the protocol and key lifecycle; see [TLS 1.3, §2 and Appendix E][tls].

## Checking results and keeping a service usable

Other questions concern the whole process rather than a single message:

| Reader's question | Security goal | A limit to remember |
| --- | --- | --- |
| Can I check that the result follows the stated rules? | [Verifiability](/docs/taxonomy/verifiability) | Checking a claim does not establish the truth of its external inputs. |
| Can someone review what happened later? | [Auditability](/docs/taxonomy/auditability) | A protected log can still omit events. |
| Can evidence identify a participant that broke a rule? | [Accountability](/docs/taxonomy/accountability) | Attribution does not automatically impose consequences. |
| Can a recipient turn the conversation into proof for outsiders? | [Deniability](/docs/taxonomy/deniability) aims to prevent this. | It cannot stop screenshots or disclosure. |
| Can a recipient retain evidence for a later dispute? | [Non-repudiation](/docs/taxonomy/non-repudiation) aims to support this. | Evidence still needs a key-control and dispute model. |
| Can authorized users complete the operation when needed? | [Availability](/docs/taxonomy/availability) | A service may work for most users while excluding Alice. |
| Can an operator selectively block Alice's valid submission? | [Censorship resistance](/docs/taxonomy/censorship-resistance) | Inclusion needs reachable paths and explicit network assumptions. |

These distinctions are developed with sources on each linked page. For voting, also read [receipt-freeness and coercion resistance](/docs/taxonomy/additional-security-goals): ballot secrecy alone does not address a voter who is pressured to cooperate with an attacker.

## Turn a goal into a checkable requirement

Use this sentence as a design worksheet:

> Protect **which information or action**, from **which adversary**, for **how long**, provided **which assumptions hold**, while allowing **which leakage or failures**?

For example: “Hide payment amounts from a passive network observer during delivery, assuming uncompromised endpoints and authenticated key establishment; connection addresses, timing, and approximate sizes remain visible.” This is a deliberately limited confidentiality requirement, consistent with [TLS 1.3's security analysis][tls]. It makes no claim about anonymity or the recipient's behavior.

![A requirement connects a goal to a threat model, mechanism, assumptions, and explicit limits.](/img/diagrams/security-goal-requirement.svg)

The diagram is a reading guide. **All goals in this chapter are taxonomy level 1.** Encryption and signatures are primitives; secure channels are protocols; a payment application is a system. A goal can apply to any of those scopes without changing its taxonomy level.

## Goals can support or pull against each other

- **Confidentiality and integrity:** authenticated encryption combines content protection with tamper detection. It still needs key management and replay handling. [RFC 5116, §§1-3][aead].
- **Anonymity and authenticity:** a credential can establish eligibility without exposing the holder's identity, if its presentation protocol provides that property. [Camenisch and Lysyanskaya][credentials].
- **Deniability and non-repudiation:** decide who should be able to verify evidence. Publicly verifiable signatures on a message work against deniability for that message. [Borisov, Goldberg, and Brewer][otr].
- **Auditability and privacy:** evidence helps review, but logs can expose identities, relationships, and secrets. Collect what the audit requires and define access and retention. [NIST SP 800-92, §§2-3][logs].

:::warning A named building block is not an end-to-end guarantee
A zero-knowledge proof (ZKP) addresses disclosure from a specified proof interaction; it does not erase network metadata. A signature authenticates a statement under a key; it does not make the statement true. Evaluate the complete protocol, its inputs, and the surrounding application. [Goldwasser, Micali, and Rackoff][zk]; [Boneh and Shoup][book].
:::

## Post-quantum posture

**Not applicable to a goal itself.** A concrete realization can be vulnerable, plausible, or depend on its components. Changing a key-establishment algorithm does not also change signatures, stored evidence, or a proof system. NIST has finalized standards for module-lattice-based key encapsulation (ML-KEM), module-lattice-based signatures (ML-DSA), and stateless hash-based signatures (SLH-DSA); these are building blocks, not complete system guarantees. [NIST's post-quantum project][pqc].

## How to read the chapter

Begin with confidentiality, integrity, and authenticity. Read anonymity and unlinkability together, then forward secrecy for protection across time. The remaining pages explain evidence, disputes, and continued service. Each concept page states assumptions, missing guarantees, failure modes, and the maturity of example mechanisms.

Sources and changing specification statuses were checked on **27 October 2026**. Foundational papers remain useful for definitions; their age is not a claim about current deployment. This editorial source check is not an expert cryptographic audit. The next source review is due **27 April 2027**.

## Further reading

- [RFC 4949: Internet Security Glossary, Version 2][glossary] - definitions; an informational glossary, not an implementation standard.
- [Boneh and Shoup, A Graduate Course in Applied Cryptography][book] - deeper treatment of encryption, authentication, and security models.
- [Pfitzmann and Hansen, privacy terminology, v0.34][privacy] - anonymity, pseudonymity, and unlinkability.
- [Threat Model Checklist](/docs/appendices/threat-model-checklist) and [Confidence Models](/docs/appendices/confidence-models) - worksheets for evaluating a system.

[glossary]: https://www.rfc-editor.org/rfc/rfc4949
[book]: https://toc.cryptobook.us/
[privacy]: https://dud.inf.tu-dresden.de/literatur/Anon_Terminology_v0.34.pdf
[tls]: https://www.rfc-editor.org/rfc/rfc8446
[aead]: https://www.rfc-editor.org/rfc/rfc5116
[credentials]: https://cs.brown.edu/people/alysyans/papers/cl01a.pdf
[otr]: https://otr.cypherpunks.ca/otr-wpes.pdf
[logs]: https://csrc.nist.gov/pubs/sp/800/92/final
[zk]: https://doi.org/10.1137/0218012
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
