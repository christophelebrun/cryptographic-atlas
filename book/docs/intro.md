---
title: Welcome to The Cryptographic Atlas
type: taxonomy
level: not-applicable
template: overview
status: draft
last_reviewed: '2026-06-04'
difficulty: beginner
maturity: not-applicable
tags:
  - introduction
  - taxonomy
post_quantum_posture: not-applicable
confidence_model:
  type: not-applicable
---

# Welcome to The Cryptographic Atlas

The Cryptographic Atlas is a living map of cryptographic concepts: what they do, what they do not do, what assumptions they rely on, and how they are commonly composed into larger systems.

This book is written for technical readers who need practical conceptual clarity before they evaluate designs, read protocol documentation, or talk with cryptographers.

## Mission

The mission is to explain cryptographic building blocks as parts of a system design vocabulary. A reader should leave with sharper questions about threat models, assumptions, failure modes, maturity, and composition risks.

## What this book is

This book is:

- an educational atlas of cryptographic ideas;
- a guide to categories, guarantees, and trade-offs;
- a place to compare primitives, protocols, proof systems, and design patterns;
- a reminder that real systems depend on more than mathematical primitives.

## What this book is not

This book is not production cryptography guidance. It is not a source of copy-paste implementations, audited protocols, or deployment recipes.

Do not design or deploy custom cryptographic protocols without expert review.

## AI generation disclosure

The content in this book was generated and iteratively revised with AI agents. Treat it as educational draft material: verify technical claims against the cited sources, and do not rely on it as a substitute for expert cryptographic review.

## How to read it

Start with the taxonomy, then move from goals to building blocks:

1. Identify the security goal.
2. Identify the assumptions and trust model.
3. Pick the primitive, proof system, protocol, or pattern being discussed.
4. Check what it does not provide.
5. Look for failure modes and composition risks.
6. Check its post-quantum posture and confidence model.

## Core taxonomy

The atlas uses eight levels:

| Level | What it describes | Examples |
| --- | --- | --- |
| Security goals | Desired properties | confidentiality, integrity, anonymity |
| Assumptions and substrates | Mathematical or operational foundations | discrete logarithm, random oracle model, trusted setup |
| Basic primitives | Small cryptographic building blocks | hashes, commitments, signatures |
| Structured primitives | Building blocks with richer structure | homomorphic encryption, threshold signatures |
| Proof systems | Ways to prove statements under constraints | zero-knowledge proofs, range proofs |
| Protocols | Multi-step interactions between parties | MPC, secure aggregation, anonymous credentials |
| Systems | End-to-end applications | e-voting, private payments, anonymous airdrops |
| Design patterns | Reusable composition ideas | anonymous membership, delayed reveal, private aggregation |

Concrete algorithms, named schemes, parameter families, and protocol suites are treated as instances of these concepts, not as a ninth top-level category. For example, Ed25519 is a concrete instance of digital signatures, Groth16 is a concrete instance of a proof system, and TLS 1.3 is a concrete protocol suite. See [Concrete Algorithms and Schemes](/docs/appendices/concrete-algorithms-and-schemes).

## Motivating example: private voting

A private voting system may require anonymous eligibility, anti-double-vote protection, ballot secrecy, valid ballot proofs, private tallying, delayed reveal, and coercion mitigation. No single primitive provides all of these. The system must compose several tools, each with different assumptions and failure modes.

For example:

- anonymous credentials can help prove eligibility without directly revealing identity;
- nullifiers can help detect double use without naming the voter;
- commitments can bind a voter to a ballot before it is opened or tallied;
- zero-knowledge proofs can show that a hidden ballot is valid;
- homomorphic encryption or multi-party computation can support private tallying;
- coercion resistance requires protocol and user-experience properties beyond ballot secrecy.

The central lesson is composability: each tool contributes a narrow guarantee, and the system must make the gaps explicit.

## Cross-cutting questions

For every major concept, ask:

- Is the construction quantum-vulnerable, plausibly post-quantum, or dependent on instantiation?
- Does confidence come from a mathematical assumption, public verification, one honest party, a `t-of-n` threshold, an honest majority, non-collusion, or a trusted issuer?
- Which part of the system has the weakest posture or most centralized confidence model?

## Safety note

Cryptography is easy to misuse because guarantees are precise and conditional. This atlas tries to make those conditions visible.

## Further reading

- Boneh and Shoup, "A Graduate Course in Applied Cryptography."
- Katz and Lindell, "Introduction to Modern Cryptography."
