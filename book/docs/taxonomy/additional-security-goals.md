---
title: Additional Security Goals
type: taxonomy
level: security-goal
template: overview
status: current
coverage_depth: routing-overview
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
  - verifiability
  - auditability
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Additional Security Goals

Some goals become clearer when you ask what happens beyond an ordinary honest-user interaction: a voter cooperates with a coercer, a protocol stops making progress, or an operator changes transaction order. These remain **security goals (taxonomy level 1)**, even when evaluated for an entire system. The examples below are conceptual, not deployable protocol sketches.

## Receipt-freeness

**Intuition:** a voter should not be able to give a buyer or coercer convincing evidence of their vote, within the election's model. Ballot secrecy hides the choice from an observer; receipt-freeness also addresses a voter who tries to demonstrate that choice. [Benaloh and Tuinstra][receipt].

**Minimal example:** encrypting a vote hides its contents. But if the voter can disclose the encryption randomness and prove which plaintext produced the posted ciphertext, that ciphertext may serve as a receipt. Publishing encrypted ballots is therefore not enough by itself. [Benaloh and Tuinstra][receipt].

**Assumptions and limits:** the protocol must specify what private interactions and secrets a voter can expose. A receipt-free design does not necessarily stop forced abstention, credential surrender, or continuous observation. Those belong in a stronger coercion model. [Benaloh and Tuinstra][receipt]; [Juels, Catalano, and Jakobsson][coercion].

## Coercion resistance

**Intuition:** a voter should have a strategy to cast a vote reflecting their own choice while making compliance with a coercer's demands indistinguishable from resistance, under a specified adversary model. The model must define what the coercer can observe and demand. [Juels, Catalano, and Jakobsson][coercion].

In the Juels-Catalano-Jakobsson model, demands can include voting a particular way, abstaining, or surrendering credentials. Its construction relies on an anonymous channel for voting and a protected registration interaction; these assumptions are part of the result, not incidental conveniences. This is a research construction and model, not a general guarantee for remote voting systems. [Juels, Catalano, and Jakobsson][coercion].

| Goal | Question it addresses | What remains outside the claim |
| --- | --- | --- |
| Ballot secrecy | Can an observer learn the vote? | A willing voter may reveal evidence. |
| Receipt-freeness | Can the voter convincingly demonstrate the vote? | Other forms of coercion may remain. |
| Coercion resistance | Can the voter resist the modeled coercer's strategy? | Attacks excluded by that model remain. |

The distinction follows [Benaloh and Tuinstra][receipt] and [Juels, Catalano, and Jakobsson][coercion]. Comparisons of strength require compatible definitions and assumptions; avoid treating these labels as universal guarantees.

:::warning Remote voting needs system-level scrutiny
Neither encryption nor a zero-knowledge proof (ZKP) alone supplies receipt-freeness or coercion resistance. Registration, devices, private opportunities to act, publication rules, and the coercer's observations can determine whether the design meets its model. Implementation requires specialist evaluation. [Benaloh and Tuinstra][receipt]; [Juels, Catalano, and Jakobsson][coercion].
:::

Read [E-Voting](/docs/protocols/e-voting), [Coercion-Resistant Voting](/docs/systems-and-applications/coercion-resistant-voting), and [Make Receipts Useless](/docs/design-patterns/make-receipts-useless) for the surrounding protocols and patterns.

## Liveness and fair ordering

**Liveness** asks whether a protocol eventually makes required progress under its network and fault assumptions. It does not automatically supply a useful deadline. [Castro and Liskov, §§2-3][pbft]. See [Availability](/docs/taxonomy/availability).

**Fair ordering** requires an explicit rule about relative order: for example, what observations count as evidence that one transaction arrived first. Hiding payloads before ordering can reduce some information advantages; it does not itself prove a fair order or guaranteed inclusion. [Daian et al.][flash]; [EIP-7805, Core Properties][focil]. See [Encrypted Mempools](/docs/systems-and-applications/encrypted-mempools) and [Censorship Resistance](/docs/taxonomy/censorship-resistance).

## Post-quantum posture

**Not applicable to the goals.** Their implementations depend on encryption, credentials, proofs, authentication, and operational assumptions. NIST's post-quantum standards address particular primitives; they do not establish coercion resistance or fair ordering. [NIST post-quantum project][pqc]; [Juels, Catalano, and Jakobsson][coercion].

## Confidence model and maturity

**Depends on the system:** a voting construction may need trusted registration, a protected channel, and an honest-party or non-collusion assumption. A live distributed protocol needs its own fault and timing model. The cited coercion-resistant construction is research work; the cited FOCIL mechanism is a draft proposal as checked on **27 October 2026**. [Juels, Catalano, and Jakobsson][coercion]; [Castro and Liskov][pbft]; [EIP-7805][focil].

## Related concepts

- [Security Goals](/docs/taxonomy/security-goals) - the chapter's main comparison tables.
- [Deniability](/docs/taxonomy/deniability) - limits on transferable conversational evidence.
- [Verifiability](/docs/taxonomy/verifiability), [Auditability](/docs/taxonomy/auditability), and [Accountability](/docs/taxonomy/accountability) - checking results, reviewing records, and attributing violations.

## Further reading

- [Benaloh and Tuinstra, Receipt-Free Secret-Ballot Elections][receipt] (STOC 1994) - the foundational receipt-freeness problem.
- [Juels, Catalano, and Jakobsson, Coercion-Resistant Electronic Elections][coercion] (WPES 2005) - stronger coercion demands and explicit channel assumptions.
- [Castro and Liskov, Practical Byzantine Fault Tolerance][pbft] (OSDI 1999) - progress versus safety under a fault model.
- [Daian et al., Flash Boys 2.0][flash] - ordering incentives and attacks.

[receipt]: https://www.microsoft.com/en-us/research/publication/receipt-free-secret-ballot-elections/
[coercion]: https://www.iris.unict.it/handle/20.500.11769/113010
[pbft]: https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/castro.html
[flash]: https://arxiv.org/abs/1904.05234
[focil]: https://eips.ethereum.org/EIPS/eip-7805
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
