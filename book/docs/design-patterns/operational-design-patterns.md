---
title: Operational Design Patterns
type: pattern
level: design-pattern
template: overview
status: needs-review
coverage_depth: routing-overview
last_reviewed: '2026-06-04'
review:
  structural:
    status: needs-review
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: intermediate
maturity: mature
tags:
  - design-patterns
  - operations
  - composition
post_quantum_posture: not-applicable
confidence_model:
  type: depends
---

# Operational Design Patterns

These design patterns are recurring ways to compose primitives, bind context, and manage cryptographic state over time. This page is now a routing overview.

This is a grouped overview. [Domain Separation](/docs/design-patterns/domain-separation), [Transcript Binding](/docs/design-patterns/transcript-binding), and [Privacy-Preserving Revocation](/docs/design-patterns/privacy-preserving-revocation) now have standalone pages.

## Pattern matrix

| Pattern | Main purpose | Common building blocks | Main failure |
| --- | --- | --- | --- |
| [Encrypt-then-prove](/docs/design-patterns/encrypt-then-prove) | Prove a statement about encrypted data | encryption, commitments, ZKPs | proof not bound to ciphertext or recipient |
| [Threshold issuance](/docs/design-patterns/threshold-issuance) | Avoid one issuer/key having unilateral power | threshold signatures, MPC, DKG | quorum collusion or availability failure |
| [Privacy-preserving revocation](/docs/design-patterns/privacy-preserving-revocation) | Revoke access or credentials without tracking everyone | accumulators, status lists, ZKPs | revocation checks become tracking beacons |
| [Domain separation](/docs/design-patterns/domain-separation) | Prevent cross-protocol confusion | labels, transcript hashes, KDF contexts | reusing keys or hashes across domains |
| [Transcript binding](/docs/design-patterns/transcript-binding) | Bind outputs to the full protocol transcript | KDFs, signatures, Fiat-Shamir, AEAD associated data | omitting identities, algorithms, or public inputs |
| [Key rotation and migration](/docs/design-patterns/key-rotation-and-migration) | Replace keys or algorithms over time | versioning, re-encryption, signatures, KDFs | stale keys, downgrade, or split trust roots |

## Encrypt-then-prove

Encrypt-then-prove combines encryption with a proof that the encrypted plaintext satisfies a public statement.

Typical use:

- Encrypted ballots with validity proofs.
- Encrypted bids or orders with range constraints.
- Verifiable encryption for dispute or recovery workflows.

Security properties:

- Plaintext confidentiality.
- Public or verifier-local evidence about a property of the plaintext.
- Binding between ciphertext, recipient key, statement, and context.

What it does not provide:

- Correct decryption behavior.
- Fairness after the proof verifies.
- Metadata privacy for sender, recipient, size, or timing.

Failure modes:

- Proving a statement about a commitment but not the actual ciphertext.
- Forgetting to bind recipient public key or election/order ID.
- Revealing too much through public inputs.

## Threshold issuance

Threshold issuance splits credential, token, or signature issuance across multiple parties so no single issuer can act alone.

Typical use:

- Anonymous credentials.
- Threshold signatures for custody.
- E-cash or token issuance.
- DAO or governance authorization.

Security properties:

- Issuance requires a threshold of participants.
- Some designs provide public verification of issuer participation.
- Reduces single-key compromise risk.

What it does not provide:

- Trustlessness.
- Availability if too many issuers are offline.
- Privacy if issuers collude or log metadata.

Failure modes:

- Treating threshold as decentralization without governance.
- No key-refresh or recovery process.
- Issuers share infrastructure or operational control.

## Revocation with privacy

Revocation with privacy lets a verifier reject revoked credentials, keys, or notes without turning every check into a tracking event.

Typical use:

- Anonymous credentials.
- Identity wallets.
- E-cash and private payments.
- Access tokens.

Security properties:

- Revoked items should fail.
- Non-revoked holders should avoid unnecessary linkage.
- Revocation evidence should be fresh enough for the threat model.

What it does not provide:

- Perfect privacy if revocation sets are small or checks are online.
- Recovery from issuer abuse.
- Non-transferability.

Failure modes:

- Online status checks that reveal every presentation.
- Tiny revocation anonymity sets.
- Stale accumulators or status lists.
- Revocation identifiers that become stable trackers.

## Domain separation

Domain separation labels cryptographic operations so values from one protocol, purpose, chain, or version cannot be replayed as another.

Typical use:

- Hash inputs.
- KDF context strings.
- Signature messages.
- Fiat-Shamir transcripts.
- AEAD associated data.

Security properties:

- Prevents cross-protocol replay or confusion.
- Makes encodings unambiguous.
- Allows safe key and primitive reuse within designed limits.

What it does not provide:

- Security if the underlying primitive is broken.
- Protection from omitted fields.
- A substitute for key separation where separate keys are required.

Failure modes:

- Signing a message without chain, protocol, or version.
- Hashing concatenated fields without length encoding.
- Reusing the same label across incompatible contexts.

## Transcript binding

Transcript binding feeds the full protocol context into signatures, KDFs, AEAD associated data, or Fiat-Shamir challenges.

Typical use:

- Secure-channel handshakes.
- Key exchange.
- Zero-knowledge proofs.
- Threshold signing.
- Rollup and bridge proofs.

Security properties:

- Outputs are tied to the identities, algorithms, messages, and public inputs that produced them.
- Downgrade and unknown-key-share attacks are harder.
- Verifiers check the intended statement.

What it does not provide:

- Correctness if the transcript omits critical data.
- Privacy for public transcript fields.
- Protection from endpoint compromise.

Failure modes:

- Omitting algorithm choices.
- Not binding peer identities.
- Proving or signing a transcript hash computed by an untrusted party without reconstruction.

## Key rotation and migration

Key rotation and migration replaces keys, parameters, or algorithms while preserving continuity and limiting damage from compromise.

Typical use:

- Certificate and signing-key rotation.
- Post-quantum hybrid migration.
- Re-encryption of stored data.
- Credential issuer key updates.

Security properties:

- Limits exposure from old keys.
- Creates a controlled path to stronger algorithms.
- Allows revocation or deprecation of unsafe material.

What it does not provide:

- Automatic security for data already exposed.
- Trust continuity without authentic migration records.
- User recovery by itself.

Failure modes:

- Old and new keys both accepted indefinitely.
- Downgrade to legacy algorithms.
- Re-encryption without authenticating metadata.
- Lost ability to verify historical artifacts.

## Post-quantum posture

Not applicable to the patterns themselves. Rotation and migration are especially important for post-quantum transition because a system may need hybrid operation, algorithm agility, and a plan for deprecating quantum-vulnerable keys.

## Confidence model

Confidence depends on the pattern: public-verifiability for transcripts and proofs, t-of-n-threshold for threshold issuance, client-side-secret for rotation state, and operational audit for revocation and migration.

## Related concepts

- [Composability](/docs/taxonomy/composability)
- [Authenticated Encryption](/docs/primitives/authenticated-encryption)
- [Threshold Cryptography](/docs/structured-primitives/threshold-cryptography)
- [Encrypt-then-prove](/docs/design-patterns/encrypt-then-prove)
- [Threshold Issuance](/docs/design-patterns/threshold-issuance)
- [Key Rotation and Migration](/docs/design-patterns/key-rotation-and-migration)
- [Additional Security Goals](/docs/taxonomy/additional-security-goals)
- [Post-Quantum Posture](/docs/appendices/post-quantum-posture)

## Further reading

- Boneh and Shoup, ["A Graduate Course in Applied Cryptography"](https://toc.cryptobook.us/).
- Canetti, ["Universally Composable Security; A New Paradigm for Cryptographic Protocols"](https://eprint.iacr.org/2000/067).
- RFC 8446, ["The Transport Layer Security (TLS) Protocol Version 1.3"](https://www.rfc-editor.org/rfc/rfc8446).
- RFC 9380, ["Hashing to Elliptic Curves"](https://www.rfc-editor.org/rfc/rfc9380).
- NIST SP 800-57, ["Recommendation for Key Management"](https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final).
