---
title: Oblivious Pseudorandom Functions
type: protocol
level: protocol
template: protocol
status: current
last_reviewed: '2026-06-04'
difficulty: intermediate
maturity: emerging
tags:
  - oprf
  - privacy
  - protocols
post_quantum_posture: depends
confidence_model:
  type: mathematical-assumption
---

# Oblivious Pseudorandom Functions

## Goal

An oblivious pseudorandom function (OPRF) lets a client learn `F(k, x)` for its private input `x` and a server-held key `k`, without the server learning `x` or the output and without the client learning `k`.

## Participants

- Client: holds the private input.
- Server: holds the PRF key.
- Optional verifier role: in verifiable variants, the client checks that the server used the expected key.

## Inputs and outputs

- Client input: private value `x`.
- Server input: secret PRF key `k`.
- Output: the client learns `F(k, x)`.
- Public parameters: group, hash-to-group/hash-to-scalar rules, domain separation tags, and protocol mode.

## Building blocks

- A pseudorandom function abstraction.
- A group or other algebraic structure suitable for the construction.
- Blinding and unblinding operations.
- Hash-to-group or encoding rules.
- Optional zero-knowledge proof of correct evaluation for verifiable OPRFs.

## Security goals

- Client input privacy from the server.
- Server key privacy from the client.
- Pseudorandomness of the output to parties without the key.
- Verifiability in VOPRF variants, where the client can check the server used the advertised key.

## Non-goals

- Hiding that a client contacted the server.
- Preventing online rate limits or denial of service.
- Protecting low-entropy inputs from guessing once outputs are exposed.
- Providing anonymity by itself.
- Making the server stateless or non-censoring.

## Threat model

The usual model considers a malicious or curious server that should not learn the client's input and a malicious client that should not learn the server key or evaluate the PRF on arbitrary values without interaction. Application-level privacy also depends on transport privacy, rate limiting, replay rules, and whether inputs have enough entropy.

## Protocol sketch

1. The client maps `x` into the protocol domain and blinds it.
2. The client sends the blinded value to the server.
3. The server evaluates using key `k` on the blinded value.
4. The server returns the evaluated value, and in verifiable modes also returns a proof.
5. The client verifies any proof, unblinds the response, and derives `F(k, x)`.

## Trust assumptions

The algebraic assumptions for the chosen construction must hold, encodings and domain separation must be unambiguous, the server key must remain secret, and implementations must validate group elements and reject malformed inputs.

## Post-quantum posture

Depends on the construction. Standard prime-order-group OPRFs inherit discrete-logarithm vulnerability to large quantum computers. Post-quantum OPRF designs exist as research and engineering work, but posture must be assessed per construction and parameter set.

## Confidence model

Confidence comes from mathematical-assumption hardness, server key secrecy, public parameter correctness, and client-side verification in VOPRF or POPRF modes. Operational confidence also depends on server availability and abuse controls.

## Metadata leaks

- Client-server contact timing.
- Server identity.
- Request volume and retry patterns.
- Public input in partially oblivious variants.
- Account, network, or payment metadata outside the OPRF transcript.

## Failure modes

- Reusing an OPRF output as if it were an authentication token without binding it to context.
- Forgetting domain separation between applications.
- Accepting invalid group elements or non-canonical encodings.
- Using low-entropy inputs without a rate-limited or password-hardened design.
- Assuming OPRFs provide anonymity or hide network metadata.
- Treating a non-verifiable OPRF as if the server key were publicly committed.

## Variants

- OPRF: client learns the PRF output; server learns neither input nor output.
- VOPRF: client can verify the server used the expected key.
- POPRF: public input is included in the PRF computation, useful for context binding.
- Application-specific designs: password-hardening services, privacy-preserving tokens, and private set intersection variants.

## Where it is used

- Password-hardened authentication and secret recovery.
- Privacy-preserving rate limits or token issuance.
- Private set intersection.
- Credential and anonymous-token systems.
- Some privacy-preserving contact discovery designs.

## Further reading

- RFC 9497, [Oblivious Pseudorandom Functions (OPRFs) Using Prime-Order Groups](https://www.rfc-editor.org/rfc/rfc9497).
- Jarecki and Liu, [Efficient Oblivious Pseudorandom Function with Applications to Adaptive OT and Secure Computation of Set Intersection](https://doi.org/10.1007/978-3-642-00457-5_34).
- Boneh and Shoup, [A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/).
