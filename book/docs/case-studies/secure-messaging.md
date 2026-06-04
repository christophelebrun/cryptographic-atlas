---
title: Secure Messaging
type: system
level: system
template: case-study
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: deployed
tags:
  - secure-messaging
  - secure-channels
  - metadata
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Secure Messaging

## Overview

Secure messaging systems protect message contents across asynchronous delivery, device changes, and compromise scenarios. They are systems, not just encrypted channels.

## Goals

- Message confidentiality and integrity.
- Participant authentication.
- Forward secrecy and post-compromise recovery where supported.
- Deniability in some designs.

## Non-goals

- Complete metadata privacy.
- Protection after endpoint compromise.
- Guaranteed deletion from recipients or backups.
- Social-graph privacy by default.

## Building blocks

- Secure channels.
- X3DH-style initial key agreement.
- Double Ratchet or group messaging key schedules.
- Signatures, KDFs, AEAD, and key transparency.

## Metadata leaks

- Contact graph and delivery timing.
- Device count and key changes.
- Message size and frequency.
- Backup and notification behavior.

## Post-quantum posture

Depends on identity keys, key agreement, signatures, and ratchet design. Many deployed systems still use classical elliptic-curve assumptions, though hybrid migration is possible.

## Confidence model

Confidence is mixed: client-side-secret for device keys, mathematical assumptions for key agreement and signatures, and operational trust in key directories, delivery servers, and backup policy.

## Failure modes

- Endpoint compromise.
- Cloud backups exposing plaintext or keys.
- Users ignoring key-change warnings.
- Metadata retained by servers.
- Multi-device synchronization weakening assumptions.

## Related concepts

- [Secure Channels](/docs/protocols/secure-channels)
- [Key-Committing Encryption](/docs/primitives/key-committing-encryption)
- [Deniability](/docs/taxonomy/additional-security-goals#deniability)

## Further reading

- [Signal X3DH](https://signal.org/docs/specifications/x3dh/).
- [Signal Double Ratchet](https://signal.org/docs/specifications/doubleratchet/).
- [RFC 9420: Messaging Layer Security](https://www.rfc-editor.org/rfc/rfc9420).
