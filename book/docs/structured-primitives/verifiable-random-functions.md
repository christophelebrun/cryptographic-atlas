---
title: Verifiable Random Functions
type: primitive
level: structured-primitive
template: concept
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: deployed
tags:
  - vrf
  - randomness
  - public-verifiability
post_quantum_posture: vulnerable
confidence_model:
  type: mathematical-assumption
---

# Verifiable Random Functions

## One-sentence intuition

A verifiable random function (VRF) produces pseudorandom output plus a public proof that the output came from a specific key and input.

## Where it sits in the taxonomy

- Level: structured primitive.
- Parent category: pseudorandom functions and digital signatures.
- Related concepts: [Digital Signatures](/docs/primitives/digital-signatures), [Randomness and Nonces](/docs/primitives/randomness-and-nonces), [Domain Separation](/docs/design-patterns/domain-separation).

## Problem it solves

Some systems need randomness that is unpredictable before evaluation but publicly checkable afterward, such as leader election, lotteries, and transparency mechanisms.

## Mental model

A VRF is like a private dice roll with a receipt. The key holder rolls, and anyone can verify that this was the unique roll for that input and key.

## Minimal example

A validator evaluates a VRF on an epoch number. If the output falls below a threshold, the validator is eligible to propose a block and publishes the proof.

## Security properties

- Pseudorandom output to parties without the secret key.
- Public verifiability of correct evaluation.
- Uniqueness under the scheme's model.

## What it does not provide

- Unbiased public randomness if the key holder can withhold outputs.
- Anonymity of the key holder.
- Protection after secret-key compromise.
- Domain separation unless the input is labeled.

## Assumptions

- The VRF construction and group assumptions hold.
- Inputs include protocol, version, and context labels.
- Key holders cannot gain advantage by grinding inputs or withholding outputs.

## Post-quantum posture

Common elliptic-curve VRFs are quantum-vulnerable. Post-quantum VRFs are less deployed and should be treated as specialized.

## Confidence model

Confidence comes from mathematical-assumption security, public-verifiability, key protection, and anti-grinding protocol rules.

## Common constructions

- ECVRF-style constructions.
- Signature-like VRFs.
- VRFs embedded in consensus or lottery protocols.

## Use cases

- Blockchain leader election.
- Randomized committee selection.
- Transparency logs.
- Privacy-preserving rate limits.

## Composition patterns

VRFs are composed with eligibility rules, threshold checks, public transcripts, and sometimes slashing or accountability. Protocols must address withholding and grinding.

## Failure modes and anti-patterns

- Missing domain separation.
- Treating VRFs as unbiased randomness beacons.
- Allowing input grinding.
- Ignoring key compromise or rotation.

## Maturity and deployment

Deployed, but mostly in specialized protocols. Most common deployments inherit elliptic-curve quantum vulnerability.

## Related concepts

- [Digital Signatures](/docs/primitives/digital-signatures)
- [Domain Separation](/docs/design-patterns/domain-separation)
- [Secure Channels](/docs/protocols/secure-channels)

## Further reading

- [Micali, Rabin, and Vadhan, "Verifiable Random Functions"](https://people.seas.harvard.edu/~salil/research/VRF-abs.html).
- [RFC 9381: Verifiable Random Functions](https://www.rfc-editor.org/rfc/rfc9381).
