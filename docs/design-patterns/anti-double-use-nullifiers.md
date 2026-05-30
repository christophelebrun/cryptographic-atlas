---
title: Anti-Double-Use Nullifiers
type: pattern
level: design-pattern
status: draft
last_reviewed: 2026-05-30
difficulty: intermediate
maturity: emerging
tags:
  - nullifiers
  - rate-limiting
---

# Anti-Double-Use Nullifiers

## One-sentence intuition

Anti-double-use nullifiers let a system reject repeated anonymous actions in the same context.

## Pattern

1. Bind the action to a context.
2. Derive a public nullifier from a private secret and that context.
3. Prove the nullifier is well formed and eligible.
4. Reject the action if the nullifier was already used.

## What it does not provide

- Eligibility by itself.
- Protection against stolen secrets.
- Privacy if contexts are reused badly.
- Coercion resistance.

## Failure modes

- Reusing the same context links actions.
- Omitting domain separation.
- Storing side metadata that identifies the user.
- Accepting nullifiers without proving eligibility.

## Related concepts

- [Nullifiers](/docs/protocols/nullifiers)

## Further reading

- TODO: Add verified references for nullifier patterns.
