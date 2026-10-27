---
title: Forward Secrecy
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
difficulty: intermediate
maturity: not-applicable
tags:
  - security-goals
  - secure-channels
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Forward Secrecy

## One-sentence intuition

Forward secrecy limits the damage of a later key theft: past session secrets should remain protected when the specified long-term key is compromised. [RFC 8446, Appendix E.1][tls].

## Where it sits in the taxonomy

- Level: security goal (level 1), usually evaluated for a protocol over time.
- Parent category: [Security Goals](/docs/taxonomy/security-goals).
- Related concepts: [Confidentiality](/docs/taxonomy/confidentiality), [Secure Channels](/docs/protocols/secure-channels), [Secure Messaging](/docs/systems-and-applications/secure-messaging).

## Problem it solves

An attacker records encrypted conversations, then later steals a server's long-term authentication key. A forward-secret exchange is designed so that this theft alone cannot reconstruct the old traffic keys. It does not help if the attacker also saved the old traffic secrets or plaintext. [RFC 8446, §2 and Appendix E][tls].

## Mental model

Each conversation uses a temporary key that is destroyed afterward. Stealing the identity key later should not recreate those temporary keys. Destruction is an essential part of the model, not an optional housekeeping step.

## Minimal example

Alice connects to a server using certificate-authenticated TLS 1.3 with ephemeral Diffie-Hellman key exchange. “Ephemeral” means temporary key-exchange secrets. If they and the old traffic keys are erased, later theft of the server's certificate key alone should not decrypt recorded application traffic. This example does **not** cover every TLS 1.3 mode. [RFC 8446, §§2.2-2.3 and Appendix E][tls].

## Security properties

| Question | Property or limit |
| --- | --- |
| Does later long-term key theft reveal completed sessions? | Forward secrecy aims to prevent this. |
| Does theft of current endpoint state reveal earlier message keys? | A ratchet can provide this if old keys were erased. |
| Can communication become confidential again after a state compromise? | Post-compromise security; it needs additional protocol conditions and fresh secret input. |

A one-way key update can protect earlier keys while still letting a thief derive future ones. The last two properties must therefore be assessed separately. [RFC 8446, Appendix E.2][tls]; [Double Ratchet, §§2 and 8][ratchet].

## What it does not provide

- Protection for a session whose relevant ephemeral or traffic secrets were stolen.
- Erasure of plaintext in backups, screenshots, or logs.
- Automatic recovery while an attacker still controls a device.
- Post-quantum security or metadata privacy by itself.

These are explicit limits of channel and ratchet security models. [RFC 8446, Appendix E][tls]; [Double Ratchet, §8][ratchet].

## Assumptions

Generate fresh secret contributions, authenticate the exchange, erase obsolete secrets, and define which compromise happens when. Retained debugging keys or cloned endpoint state can invalidate the intended protection. [RFC 8446, Appendix E][tls]; [Double Ratchet, §8][ratchet].

## Post-quantum posture

**Not applicable to the goal.** Recorded classical Diffie-Hellman exchanges remain vulnerable to a sufficiently capable quantum attacker, even if temporary keys were erased. Post-quantum key establishment addresses a different threat than later theft of an authentication key. [NIST post-quantum project][pqc]. The current Double Ratchet specification includes Sparse Post-Quantum Ratchet and Triple Ratchet designs; assess the exact variant, not the name alone. [Double Ratchet, §§5-6][ratchet].

## Confidence model

**Mathematical-assumption + client-side-secret:** key establishment must resist the modeled attacker, and endpoints must erase the old secrets. Authentication, compromise timing, and retained skipped-message keys affect the actual boundary. [RFC 8446, Appendix E][tls]; [Double Ratchet, §8][ratchet].

## Common constructions

Ephemeral key exchange and ratcheting protocols offer different scopes of forward secrecy. A key encapsulation mechanism (KEM) alone does not guarantee it: the lifetime of its decapsulation key and the surrounding authenticated protocol matter. [RFC 8446][tls]; [FIPS 203][kem]; [Double Ratchet][ratchet].

## Use cases

Protecting past web sessions and past messaging keys are representative uses. State the unit being protected: a completed connection, an earlier key generation, or an individual message. [RFC 8446, Appendix E][tls]; [Double Ratchet, §2][ratchet].

## Composition patterns

Combine with [Authenticity](/docs/taxonomy/authenticity) and explicit compromise recovery. Ordinary key rotation does not retroactively protect sessions whose keys were derived from a now-exposed long-term secret. [RFC 8446, Appendix E][tls]; [Double Ratchet, §8][ratchet].

## Failure modes and anti-patterns

:::warning TLS 1.3 has mode-specific exceptions
Pre-shared-key (PSK) authentication **without** an ephemeral Diffie-Hellman contribution lacks forward secrecy against later PSK compromise. Zero round-trip time (0-RTT) early data is not forward secret and has separate replay risks. Adding ephemeral exchange for subsequent data does not upgrade that early data. [RFC 8446, §§2.2-2.3 and 8][tls].
:::

## Maturity and deployment

**Widely deployed mechanisms:** ephemeral exchanges in TLS and ratcheting messaging. Post-quantum variants need their own protocol and implementation assessment; classical deployment experience does not settle their properties. [RFC 8446][tls]; [Double Ratchet, §§5-6][ratchet].

## Related concepts

- [Key Encapsulation and Exchange](/docs/primitives/key-encapsulation-and-exchange)
- [Key Rotation and Migration](/docs/design-patterns/key-rotation-and-migration)
- [Post-Quantum Posture](/docs/appendices/post-quantum-posture)

## Further reading

- [RFC 8446][tls], §§2.2-2.3 and Appendix E - forward secrecy, early data, and compromise limits.
- [Signal, The Double Ratchet Algorithm][ratchet], revision 4 (4 November 2025) - message-key evolution and post-quantum variants.
- [FIPS 203][kem] - ML-KEM's interface and security scope.

[tls]: https://www.rfc-editor.org/rfc/rfc8446
[ratchet]: https://signal.org/docs/specifications/doubleratchet/
[pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography
[kem]: https://csrc.nist.gov/pubs/fips/203/final
