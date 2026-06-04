---
title: Additional Protocol Families
type: protocol
level: protocol
template: overview
status: current
coverage_depth: grouped-first-pass
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - protocols
  - secure-channels
  - privacy
post_quantum_posture: depends
confidence_model:
  type: depends
---

# Additional Protocol Families

This page covers protocol families that appear repeatedly in privacy-preserving systems, secure messaging, identity, and private payments.

This is a grouped overview. [Secure Channels](/docs/protocols/secure-channels), [Oblivious Transfer](/docs/protocols/oblivious-transfer), [Private Information Retrieval](/docs/protocols/private-information-retrieval), and [Password-Authenticated Key Exchange](/docs/protocols/password-authenticated-key-exchange) now have standalone pages.

## Protocol matrix

| Protocol family | Goal | Typical building blocks | Main caution |
| --- | --- | --- | --- |
| [Oblivious transfer](/docs/protocols/oblivious-transfer) | Receiver obtains one of several sender messages without revealing which one | public-key crypto, OPRFs, OT extension | Core MPC building block; adversary model matters. |
| [Private information retrieval](/docs/protocols/private-information-retrieval) | Client retrieves a database item without revealing which item | coding, homomorphic encryption, PIR-specific protocols | Server/database size and access-pattern assumptions matter. |
| [Password-authenticated key exchange](/docs/protocols/password-authenticated-key-exchange) | Parties derive a strong session key from a password without exposing it to offline guessing | PAKE protocol, KDF, authenticated transcript | Not the same as password hashing. |
| [Secure channels](/docs/protocols/secure-channels) | Establish authenticated, encrypted sessions | key exchange, signatures/PSKs, KDFs, AEAD | Metadata and endpoint compromise remain. |
| Anonymous tokens | Issue or redeem tokens without stable identity linkage | blind signatures, OPRFs, accumulators, rate limits | Token privacy depends on issuance, redemption, and transport metadata. |
| Blind-signature credentials | Issue credentials using blind signatures | blind signatures, selective disclosure, issuer policy | Blind issuance does not solve revocation or misuse. |
| Private-payment protocols | Transfer value while hiding payer, payee, amount, or linkage under a model | commitments, nullifiers, ZKPs, e-cash, ledgers | Ledger metadata and double-spend rules dominate. |

## Oblivious transfer

Oblivious transfer (OT) lets a receiver learn one selected message from a sender while the sender does not learn the selection and the receiver does not learn the other messages.

Security goals:

- Receiver choice privacy.
- Sender message privacy for unchosen messages.
- Correctness under the stated adversary model.

Non-goals:

- Hiding that an interaction occurred.
- Fairness or guaranteed delivery by itself.
- General MPC without additional protocol structure.

Assumptions and failure modes:

- OT protocols vary from public-key-based base OT to efficient OT extension.
- Failures include using semi-honest OT in malicious settings, weak correlation checks, and failing to authenticate channels.

## Private information retrieval

Private information retrieval (PIR) lets a client retrieve an item from a database without revealing which item was requested.

Security goals:

- Query privacy from one or more servers.
- Correctness of returned data under the protocol model.
- Sometimes database privacy, depending on symmetric PIR variants.

Non-goals:

- Hiding client identity or timing.
- Protecting writes or updates by default.
- Avoiding all leakage from repeated queries.

Assumptions and failure modes:

- Single-server computational PIR relies on cryptographic assumptions; multi-server PIR often relies on non-collusion.
- Failures include server collusion, repeated-query linkage, and database-version ambiguity.

## Password-authenticated key exchange

Password-authenticated key exchange (PAKE) lets parties derive a strong shared key using a password while resisting offline dictionary attacks from passive transcripts.

Security goals:

- Session key establishment.
- Resistance to offline password guessing from recorded handshakes.
- Mutual or asymmetric authentication, depending on the PAKE.

Non-goals:

- Protection against online guessing without rate limits.
- Password storage policy.
- Metadata privacy.

Assumptions and failure modes:

- PAKEs must bind identities, transcript, and protocol parameters into the derived key.
- Failures include downgrade, missing identity binding, weak password reset flows, and treating PAKE as a password manager.

## Secure channels

Secure-channel protocols protect streams or sessions between endpoints. TLS 1.3, HPKE-based application channels, Noise patterns, Signal X3DH, and Double Ratchet are common examples or components.

Security goals:

- Confidentiality and integrity for session data.
- Endpoint authentication under a certificate, key, pre-shared key, or identity model.
- Forward secrecy when ephemeral secrets and key evolution are used correctly.
- Replay and downgrade protection, depending on protocol.

Non-goals:

- Hiding endpoint IP addresses or timing.
- Protecting compromised endpoints.
- Making all application messages deniable.

Assumptions and failure modes:

- Confidence comes from authenticated key exchange, transcript binding, KDFs, AEAD, and implementation review.
- Failures include certificate/key misbinding, transcript truncation, downgrade negotiation, nonce misuse, and storing session keys too long.

## Anonymous tokens

Anonymous-token protocols let a user obtain or redeem authorization tokens while limiting linkability between issuance and redemption.

Security goals:

- Unlinkability between issuance and redemption under the protocol model.
- Issuer authenticity.
- Rate limiting or one-token-per-event controls.

Non-goals:

- Network anonymity.
- Sybil resistance beyond the issuance policy.
- Revocation without extra machinery.

Assumptions and failure modes:

- Tokens may use blind signatures, OPRFs, accumulators, or public redemption logs.
- Failures include unique token metadata, timing linkage, shared browser/device identifiers, and issuer/verifier collusion.

## Blind-signature credentials

Blind-signature credentials use blind signatures as an issuance mechanism so the issuer can authorize a holder without seeing the exact token or credential presented later.

Security goals:

- Blind issuance.
- Credential authenticity.
- Limited disclosure or unlinkability when combined with a suitable presentation protocol.

Non-goals:

- Attribute privacy by default.
- Revocation.
- Non-transferability without a holder secret or device binding.

Assumptions and failure modes:

- Confidence comes from blind-signature unforgeability, issuer policy, holder secret protection, and presentation design.
- Failures include over-issuing credentials, linking by metadata, and treating blind signatures as complete anonymous credentials.

## Private-payment protocols

Private-payment protocols transfer value while hiding selected transaction details such as payer, payee, amount, or linkage.

Security goals:

- Value conservation.
- Double-spend prevention or detection.
- Transaction privacy under a stated ledger or issuer model.
- Public auditability where needed.

Non-goals:

- Network anonymity by default.
- Compliance, recovery, or governance.
- Protection from amount, timing, or exchange metadata unless designed.

Assumptions and failure modes:

- Designs may use e-cash, blind signatures, commitments, nullifiers, zero-knowledge proofs, accumulators, or threshold decryption.
- Failures include metadata linkage, trusted-issuer abuse, weak note/nullifier design, and confusing local privacy with ledger-wide anonymity.

## Post-quantum posture

Depends on the concrete protocol. Many deployed secure-channel, blind-signature, OT, OPRF, and private-payment systems rely on RSA, elliptic curves, pairings, or discrete-log assumptions. Symmetric components may be plausible, but authentication and proof layers must be reviewed separately.

## Confidence model

Confidence may come from mathematical-assumption security, public-verifiability, trusted issuers, non-colluding servers, one-honest-party, or client-side secrets. Every protocol page using these families should state the exact model.

## Related concepts

- [MPC](/docs/protocols/mpc)
- [Oblivious Pseudorandom Functions](/docs/protocols/oblivious-pseudorandom-functions)
- [Private Set Intersection](/docs/protocols/private-set-intersection)
- [Authenticated Encryption](/docs/primitives/authenticated-encryption)
- [Advanced Structured Primitives](/docs/structured-primitives/advanced-structured-primitives)

## Further reading

- Rabin, "How to Exchange Secrets by Oblivious Transfer."
- Chor et al., "Private Information Retrieval."
- RFC 9383, "OPAQUE: An Asymmetric PAKE Protocol."
- RFC 8446, "The Transport Layer Security (TLS) Protocol Version 1.3."
- RFC 9180, "Hybrid Public Key Encryption."
- Signal, "The X3DH Key Agreement Protocol" and "The Double Ratchet Algorithm."
- RFC 9576, "The Privacy Pass Architecture."
- Chaum, "Blind Signatures for Untraceable Payments."
- Zerocash, "Decentralized Anonymous Payments from Bitcoin."
