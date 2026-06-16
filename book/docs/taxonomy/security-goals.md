---
title: Security Goals
type: taxonomy
level: security-goal
template: overview
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
difficulty: beginner
maturity: not-applicable
tags:
  - security-goals
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Security Goals

Security goals are the properties a system is trying to achieve. They should be stated before choosing primitives.

## Common goals

| Goal | Meaning | Common confusion |
| --- | --- | --- |
| [Confidentiality](/docs/taxonomy/confidentiality) | Data is not disclosed to unauthorized parties | Not the same as anonymity |
| [Integrity](/docs/taxonomy/integrity) | Data cannot be modified undetectably | Not the same as authenticity |
| [Authenticity](/docs/taxonomy/authenticity) | A message or action is tied to an authorized actor | Not the same as privacy |
| [Anonymity](/docs/taxonomy/anonymity) | A subject is hidden within a set | Depends heavily on the size and behavior of the set |
| [Unlinkability](/docs/taxonomy/unlinkability) | Two actions cannot be linked to the same actor | Does not remove all metadata |
| Receipt-freeness | A user cannot prove how they acted | Stronger than ballot secrecy |
| [Verifiability](/docs/taxonomy/verifiability) | A verifier can check that a claim, proof, tally, or transcript satisfies stated rules | Not the same as truth of off-chain inputs |
| [Auditability](/docs/taxonomy/auditability) | Enough evidence exists to review a process after the fact | Can conflict with privacy if logs are over-collected |
| [Accountability](/docs/taxonomy/accountability) | Misbehavior can be attributed under stated rules | Not the same as public identity disclosure |
| [Forward secrecy](/docs/taxonomy/forward-secrecy) | Compromise of a long-term key does not expose past session secrets | Requires protocol-level key evolution |
| [Deniability](/docs/taxonomy/deniability) | A transcript does not convince outsiders who participated or what they said | Can conflict with public verifiability |
| [Non-repudiation](/docs/taxonomy/non-repudiation) | Evidence is intended to make later denial of an action unconvincing | Opposite design pressure from deniability |
| [Availability](/docs/taxonomy/availability) | Honest users can use the system when needed | Not the same as confidentiality or censorship resistance |
| [Censorship resistance](/docs/taxonomy/censorship-resistance) | Valid actions cannot be selectively blocked beyond the stated model | Requires inclusion paths, not just uptime |

## Why precision matters

Saying "private" is usually too vague. A system may hide values but expose identities, or hide identities but reveal timing. State the goal and the leak separately.

Some goals are primitive-level, such as confidentiality or integrity for a specific message. Others are protocol or system-level, such as coercion resistance, auditability, or forward secrecy. Do not assign a system-level goal to a primitive unless the surrounding protocol assumptions are also stated.

High-value goals with standalone pages are [Confidentiality](/docs/taxonomy/confidentiality), [Integrity](/docs/taxonomy/integrity), [Authenticity](/docs/taxonomy/authenticity), [Anonymity](/docs/taxonomy/anonymity), [Unlinkability](/docs/taxonomy/unlinkability), [Forward Secrecy](/docs/taxonomy/forward-secrecy), [Verifiability](/docs/taxonomy/verifiability), [Auditability](/docs/taxonomy/auditability), [Accountability](/docs/taxonomy/accountability), [Deniability](/docs/taxonomy/deniability), [Non-Repudiation](/docs/taxonomy/non-repudiation), [Availability](/docs/taxonomy/availability), and [Censorship Resistance](/docs/taxonomy/censorship-resistance).

See [Additional Security Goals](/docs/taxonomy/additional-security-goals) for adjacent system-level goals and terminology that still do not need standalone pages.

## Further reading

- Katz and Lindell, [Introduction to Modern Cryptography](https://www.cs.umd.edu/~jkatz/imc.html).
- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
