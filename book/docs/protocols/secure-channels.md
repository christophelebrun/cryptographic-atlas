---
title: Secure Channels
type: protocol
level: protocol
template: protocol
status: current
coverage_depth: standalone
last_reviewed: '2026-06-04'
review:
  structural:
    status: current
    last_reviewed: '2026-06-04'
  sources:
    status: current
    last_reviewed: '2026-06-04'
    next_review_due: '2026-12-04'
  expert:
    status: not-reviewed
    last_reviewed: null
    reviewer: null
difficulty: intermediate
maturity: deployed
tags:
  - secure-channels
  - key-exchange
  - transport-security
post_quantum_posture: depends
confidence_model:
  type: mixed
source_review:
  window_months: 6
  next_review_due: '2026-12-04'
  notes: Re-check TLS, HPKE, MLS, Signal, Noise, DIDComm, and hybrid post-quantum channel profiles.
---

# Secure Channels

## Goal

Establish an authenticated, encrypted session between endpoints so application data has confidentiality, integrity, replay protection, and usually forward secrecy under a stated endpoint-authentication model.

## Participants

- Client or initiator.
- Server or responder.
- Optional certificate authority, identity provider, pre-shared-key issuer, or key-transparency service.
- Network adversary that can observe, delay, replay, drop, and inject messages.

## Inputs and outputs

Inputs:

- Endpoint identities, public keys, certificates, pre-shared keys, or trust anchors.
- Supported algorithm suites and protocol versions.
- Fresh randomness and ephemeral key shares.
- Application context such as hostnames, service names, or channel bindings.

Outputs:

- Session traffic keys.
- Authenticated handshake transcript.
- Exported channel bindings or application keys, when supported.
- Failure if authentication, negotiation, or transcript checks fail.

## Building blocks

- Key exchange or key encapsulation.
- Digital signatures, certificates, pre-shared keys, or authenticated public keys.
- Key derivation functions.
- Authenticated encryption with associated data.
- Transcript binding and domain separation.

![Secure-channel handshake](/img/diagrams/secure-channel-handshake.svg)

## Security goals

- Confidentiality and integrity for session data.
- Endpoint authentication according to the configured identity model.
- Forward secrecy when fresh ephemeral secrets are used and erased.
- Replay and downgrade resistance when the protocol binds transcript, version, and suite choices.
- Key separation between handshake, application data, and exported keys.

## Non-goals

- Hiding endpoint IP addresses, packet timing, or traffic volume.
- Protecting compromised endpoints.
- Solving application authorization.
- Making every transcript deniable.
- Preventing all denial of service.

## Threat model

The usual model assumes an active network attacker. The attacker can observe and modify traffic but cannot break the selected cryptographic assumptions, compromise endpoint secrets during the protected session, or subvert the trust anchor. Stronger models add post-compromise recovery, key transparency, delegated credentials, anonymity networks, or post-quantum hybrid key establishment.

## Protocol sketch

1. Endpoints negotiate a version, cipher suite, and authentication mode.
2. They exchange ephemeral key material or encapsulated secrets.
3. Each side derives handshake secrets from the key exchange and transcript.
4. The authenticated party proves control of a private key, certificate chain, or pre-shared key.
5. Both sides derive traffic keys and bind them to the transcript.
6. Application data is encrypted with AEAD under monotonically managed nonces or sequence numbers ([RFC 5116](https://www.rfc-editor.org/rfc/rfc5116)).

## Trust assumptions

- Trust anchors, public keys, or pre-shared keys are authentic.
- Ephemeral secrets are generated with strong randomness and erased when required.
- Transcript hashes include identities, algorithms, public keys, and negotiation choices.
- Implementations reject downgrade, replay, certificate, and hostname failures.

## Post-quantum posture

Depends on the concrete suite. Classical TLS 1.3, Noise, X25519, ECDSA, EdDSA, and many Signal-style deployments rely on discrete-logarithm assumptions and are quantum-vulnerable under Shor's algorithm ([Shor 1994](https://doi.org/10.1109/SFCS.1994.365700)). Symmetric encryption and KDF layers can be plausible with conservative parameters, but authentication and key establishment need post-quantum or hybrid migration; ML-KEM and ML-DSA are the relevant finalized NIST standards for those migration paths ([NIST FIPS 203](https://doi.org/10.6028/NIST.FIPS.203), [NIST FIPS 204](https://doi.org/10.6028/NIST.FIPS.204)).

## Confidence model

Confidence is mixed: mathematical-assumption for key exchange and authentication, public-key infrastructure or pinned-key trust for endpoint identity, client-side-secret for endpoint private keys, and implementation review for parsing, transcript binding, and state-machine correctness.

## Metadata leaks

- Endpoint addresses and routing metadata.
- Server name or certificate metadata unless hidden by additional mechanisms.
- Timing, packet sizes, connection counts, and session duration.
- Authentication method and sometimes client identity.

## Failure modes

- Accepting a certificate or public key for the wrong identity.
- Omitting algorithm choices or identities from the transcript.
- Reusing nonces or sequence numbers under an AEAD key ([RFC 5116](https://www.rfc-editor.org/rfc/rfc5116)).
- Supporting downgrade to legacy versions or weak suites.
- Storing session secrets too long.
- Treating HPKE or raw Diffie-Hellman as a complete secure channel without authentication and replay handling; HPKE is an encryption framework, not a full transport protocol ([RFC 9180](https://www.rfc-editor.org/rfc/rfc9180)).

## Variants

- TLS 1.3 for web and service transport ([RFC 8446](https://www.rfc-editor.org/rfc/rfc8446)).
- HPKE-based application encryption, often as a component rather than a full channel ([RFC 9180](https://www.rfc-editor.org/rfc/rfc9180)).
- Noise handshakes for explicitly selected peer-to-peer patterns.
- Signal X3DH plus Double Ratchet for asynchronous secure messaging ([X3DH](https://signal.org/docs/specifications/x3dh/), [Double Ratchet](https://signal.org/docs/specifications/doubleratchet/)).
- Post-quantum or hybrid handshakes that combine classical and post-quantum key establishment.

## Source-depth notes

Secure-channel source coverage should distinguish transport standards, application encryption components, and messaging protocols. TLS 1.3 is a complete channel protocol ([RFC 8446](https://www.rfc-editor.org/rfc/rfc8446)); HPKE is a building block for application encryption ([RFC 9180](https://www.rfc-editor.org/rfc/rfc9180)); MLS standardizes group messaging key management ([RFC 9420](https://www.rfc-editor.org/rfc/rfc9420)); Signal X3DH and Double Ratchet cover asynchronous messaging patterns ([X3DH](https://signal.org/docs/specifications/x3dh/), [Double Ratchet](https://signal.org/docs/specifications/doubleratchet/)). Post-quantum migration requires reviewing key establishment and authentication separately.

## Where it is used

- Web transport security.
- API and service-to-service calls.
- Secure messaging.
- Blockchain peer-to-peer networking.
- Application-layer encrypted objects and session establishment.

## Further reading

- [RFC 8446: The Transport Layer Security Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446).
- [RFC 5116: An Interface and Algorithms for Authenticated Encryption](https://www.rfc-editor.org/rfc/rfc5116).
- [RFC 9180: Hybrid Public Key Encryption](https://www.rfc-editor.org/rfc/rfc9180).
- [RFC 9420: The Messaging Layer Security Protocol](https://www.rfc-editor.org/rfc/rfc9420).
- [RFC 9750: The Messaging Layer Security Architecture](https://www.rfc-editor.org/rfc/rfc9750).
- [The Noise Protocol Framework](https://noiseprotocol.org/noise.html).
- [Signal X3DH](https://signal.org/docs/specifications/x3dh/) and [Double Ratchet](https://signal.org/docs/specifications/doubleratchet/).
- [RFC 5869: HKDF](https://www.rfc-editor.org/rfc/rfc5869).
