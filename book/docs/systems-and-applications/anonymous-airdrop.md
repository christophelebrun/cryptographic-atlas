---
title: Anonymous Airdrop
type: system
level: system
template: case-study
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - airdrops
  - nullifiers
  - anonymity
post_quantum_posture: depends
confidence_model:
  type: mixed
---

# Anonymous Airdrop

## Overview

An anonymous airdrop lets eligible users claim once without publicly linking the claim to their original identity.

## Goals

- Eligibility.
- One claim per eligible user.
- Claim privacy.
- Public auditability of the spent claim set.

## Non-goals

- Network anonymity.
- Protection from identity leaks during funding or withdrawal.
- Sybil resistance beyond the eligibility source.

## Possible building blocks

- Eligibility set commitment.
- Membership proof.
- Nullifier.
- Zero-knowledge proof.
- Private withdrawal or shielding mechanism.

## Concrete composition options

| Requirement | Concrete options | Main caution |
| --- | --- | --- |
| Eligibility commitment | Merkle tree, sparse Merkle tree, accumulator | The set root must be authenticated and deduplicated. |
| Membership proof | Merkle proof inside ZK, accumulator witness, credential presentation | Proof choice determines setup, posture, and witness update risk. |
| One-claim enforcement | Hash nullifier, ZK-derived nullifier, credential serial number | Nullifier context must be campaign-specific. |
| Claim privacy | Shielded pool, delayed withdrawal, mixnet-style relay | Public ledger metadata can still identify claimants. |
| Validity proof | Groth16, PLONK-style, STARK-style proof | The proof must include eligibility, nullifier correctness, and claim rules. |

## Privacy leaks

Claim timing, gas funding, wallet reuse, and exchange withdrawals can identify claimants.

## Post-quantum posture

Depends on the selected membership proof, nullifier construction, signatures, shielding mechanism, and transaction layer. A hash-based nullifier does not make the whole airdrop post-quantum if the credential or proof system is quantum-vulnerable.

## Confidence model

Confidence combines a trusted or publicly auditable eligibility source, holder-controlled secrets, public spent-nullifier checks, proof-system soundness, and operational controls around funding and withdrawal privacy.

## Failure modes

- Eligibility set contains duplicates.
- Nullifiers are linkable across campaigns.
- Claims reveal wallet funding patterns.
- The proof omits a required context.

## Related concepts

- [Nullifiers](/docs/protocols/nullifiers)
- [Anonymous membership](/docs/design-patterns/anonymous-membership)
- [Anti-double-use nullifiers](/docs/design-patterns/anti-double-use-nullifiers)

## Further reading

- [Nullifiers](/docs/protocols/nullifiers)
- [Membership proofs](/docs/proof-systems/membership-proofs)
