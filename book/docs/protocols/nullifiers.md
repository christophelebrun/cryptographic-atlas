---
title: Nullifiers
type: protocol
level: protocol
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: emerging
tags:
  - nullifiers
  - anonymity
  - anti-double-use
---

# Nullifiers

## Goal

A nullifier helps enforce one-person-one-action, or one-secret-one-action, without directly revealing the identity behind the action.

## Participants

- User: holds a secret or credential.
- Verifier or system: checks whether the action is valid.
- Public registry or ledger: records used nullifiers to prevent reuse.

## Inputs and outputs

- Input: a user secret and a context such as an election, airdrop, or application identifier.
- Output: a public nullifier value.

A common mental model is:

```text
nullifier = Hash(secret, context)
```

Real systems normally derive nullifiers inside a larger protocol and may prove correctness with a zero-knowledge proof.

## Building blocks

- Hash functions.
- Anonymous credentials or membership proofs.
- Zero-knowledge proofs.
- A public spent-nullifier set.

## Security goals

- Prevent double use in the same context.
- Avoid revealing the user's identity directly.
- Avoid linking actions across different contexts when domain separation is correct.

## Non-goals

- A nullifier does not by itself prove eligibility.
- A nullifier does not hide network metadata.
- A nullifier does not prevent coercion.
- A nullifier does not protect a user whose secret is compromised.

## Threat model

The system assumes adversaries may observe public nullifiers and try to link them to users or reuse credentials. The design must prevent cross-context linkage and reject duplicate nullifiers.

## Protocol sketch

1. A user obtains or holds an eligibility secret.
2. For a specific context, the user derives a nullifier.
3. The user proves, often in zero knowledge, that the nullifier was derived from an eligible secret.
4. The system checks that the nullifier has not appeared before.
5. The system records the nullifier after accepting the action.

## Trust assumptions

Trust assumptions depend on the issuer, eligibility registry, proof system, and public registry. If the issuer can deanonymize credentials or the registry censors submissions, privacy and availability may fail.

## Metadata leaks

Nullifiers can still be linked through timing, network address, account funding, transaction fees, wallet behavior, or reused contexts.

## Failure modes

- Reusing a context across applications links actions.
- Omitting eligibility proofs allows arbitrary nullifiers.
- Weak secrets allow guessing attacks.
- Poor domain separation creates accidental cross-context linkage.
- Public ordering can expose behavioral patterns.

## Variants

- Per-application nullifiers.
- Per-election nullifiers.
- Rate-limited nullifiers.
- Nullifiers derived from anonymous credentials.

## Where it is used

- Private voting.
- Anonymous airdrops.
- Anonymous signaling.
- Private access systems with rate limits.

## Further reading

- TODO: Add verified references for nullifiers in anonymous credential and privacy-protocol systems.
