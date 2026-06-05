---
title: Anti-Double-Use Nullifiers
type: pattern
level: design-pattern
template: concept
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - nullifiers
  - rate-limiting
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Anti-Double-Use Nullifiers

## One-sentence intuition

Anti-double-use nullifiers let a system reject repeated anonymous actions in the same context.

## Where it sits in the taxonomy

- Level: design-pattern
- Parent category: design-pattern
- Related concepts: [Nullifiers](/docs/protocols/nullifiers), [Anonymous Membership](/docs/design-patterns/anonymous-membership), [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs)

## Problem it solves

Anonymous systems often need to stop a credential, coin, or eligibility proof from being used twice without learning who used it. Anti-double-use nullifiers give verifiers a public, context-bound value they can compare for repeats while keeping the underlying identity or secret hidden.

## Mental model

Think of a private ticket that stamps the same public mark whenever it is used for one event, while hiding who held the ticket.

## Minimal example

An airdrop claim includes a nullifier derived from the claimant secret and the airdrop ID; the contract rejects a second claim with the same nullifier.

## Security properties

- double use prevention
- limited linkability
- anonymous rate limiting

## What it does not provide

- Eligibility by itself.
- Protection against stolen secrets.
- Privacy if contexts are reused badly.
- Coercion resistance.

## Assumptions

The private secret must have enough entropy, the context must be domain-separated, and the system must check a public spent-nullifier set before accepting an action.

## Post-quantum posture

Not applicable to the pattern by itself. A concrete nullifier design inherits posture from the hash function, proof system, credential scheme, and public registry mechanism.

## Confidence model

Confidence comes from client-side secret control, deterministic context binding, public duplicate detection, and a proof that the nullifier is derived from an eligible secret.

## Common constructions

### Pattern

1. Bind the action to a context.
2. Derive a public nullifier from a private secret and that context.
3. Prove the nullifier is well formed and eligible.
4. Reject the action if the nullifier was already used.

### Concrete compositions

| Composition | Typical role | Main caution |
| --- | --- | --- |
| Hash secret plus context | Simple one-use marker | Only safe when the secret has high entropy and the context is domain-separated. |
| ZK proof plus nullifier | Anonymous voting, airdrops, signaling | The proof must bind membership, context, and nullifier into one statement. |
| Credential serial number | Anonymous credential spending or presentation limits | Revocation and issuer linkability need separate treatment. |
| Epoch-scoped nullifier | Rate limits per time window or application | Epoch design controls whether users are linkable across periods. |

## Use cases

- private voting
- anonymous airdrops
- anonymous signaling

## Composition patterns

- The nullifier must be bound to an eligibility proof.
- Context reuse can link actions across systems.

Common adjacent concepts: [Nullifiers](/docs/protocols/nullifiers), [Anonymous Membership](/docs/design-patterns/anonymous-membership), [Zero-Knowledge Proofs](/docs/proof-systems/zero-knowledge-proofs).

## Failure modes and anti-patterns

- Reusing the same context links actions.
- Omitting domain separation.
- Storing side metadata that identifies the user.
- Accepting nullifiers without proving eligibility.

## Maturity and deployment

Classified as emerging. This label describes the concept category, not a blanket endorsement of every construction or implementation. Implementation risk: high. Parameter sensitivity: medium.

## Related concepts

- [Nullifiers](/docs/protocols/nullifiers)

## Further reading

- [Nullifiers](/docs/protocols/nullifiers)
- [Anonymous membership](/docs/design-patterns/anonymous-membership)
