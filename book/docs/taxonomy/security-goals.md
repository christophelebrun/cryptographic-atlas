---
title: Security Goals
type: taxonomy
level: security-goal
template: overview
status: current
last_reviewed: '2026-06-04'
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
| Confidentiality | Data is not disclosed to unauthorized parties | Not the same as anonymity |
| Integrity | Data cannot be modified undetectably | Not the same as authenticity |
| Authenticity | A message or action is tied to an authorized actor | Not the same as privacy |
| Anonymity | A subject is hidden within a set | Depends heavily on the size and behavior of the set |
| Unlinkability | Two actions cannot be linked to the same actor | Does not remove all metadata |
| Receipt-freeness | A user cannot prove how they acted | Stronger than ballot secrecy |
| Verifiability | A verifier can check that a claim, proof, tally, or transcript satisfies stated rules | Not the same as truth of off-chain inputs |
| Auditability | Enough evidence exists to review a process after the fact | Can conflict with privacy if logs are over-collected |
| Accountability | Misbehavior can be attributed under stated rules | Not the same as public identity disclosure |
| Forward secrecy | Compromise of a long-term key does not expose past session secrets | Requires protocol-level key evolution |
| Deniability | A transcript does not convince outsiders who participated or what they said | Can conflict with public verifiability |

## Why precision matters

Saying "private" is usually too vague. A system may hide values but expose identities, or hide identities but reveal timing. State the goal and the leak separately.

Some goals are primitive-level, such as confidentiality or integrity for a specific message. Others are protocol or system-level, such as coercion resistance, auditability, or forward secrecy. Do not assign a system-level goal to a primitive unless the surrounding protocol assumptions are also stated.

See [Additional Security Goals](/docs/taxonomy/additional-security-goals) for verifiability, auditability, accountability, forward secrecy, and deniability.

## Further reading

- Katz and Lindell, "Introduction to Modern Cryptography."
- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
