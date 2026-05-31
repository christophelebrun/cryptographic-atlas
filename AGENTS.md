# AGENTS.md — The Cryptographic Atlas

## Project mission

This project is a living, structured atlas of modern cryptographic primitives, protocols, security goals, assumptions, design patterns, and system-level trade-offs.

Its goal is not to teach readers how to invent new cryptography. Its goal is to help technically literate readers understand what cryptographic building blocks exist, what they guarantee, what they do not guarantee, and how they are commonly composed in real systems.

The target audience includes software engineers, blockchain builders, security architects, technical founders, students, and applied cryptography beginners.

## Core editorial principles

1. Explain intuition before formalism.
2. Separate security goals, assumptions, primitives, protocols, and systems.
3. Never present a primitive as a magic box.
4. Always state what a primitive does not provide.
5. Always include trust assumptions and failure modes.
6. Prefer clear diagrams, examples, and comparison tables.
7. Avoid recommending custom cryptography for production use.
8. Distinguish mature, deployed, experimental, and research-stage techniques.
9. Use precise terminology consistently.
10. When uncertain, mark content as uncertain and add a verification TODO.

## Language

Primary language: English.

Use standard English cryptographic terminology.

## Reader level

Assume the reader:

- can program;
- understands basic algebra and probability;
- is not an advanced cryptographer;
- wants to design or evaluate systems;
- needs conceptual clarity more than full proofs.

Avoid unnecessary mathematical density in the main text. Put deeper formal material in appendices.

## Content taxonomy

Every concept must be classified into one of these levels:

1. Security goal  
   Examples: confidentiality, integrity, anonymity, unlinkability, receipt-freeness.

2. Mathematical assumption or substrate  
   Examples: discrete logarithm, RSA assumption, lattices, pairings, random oracle model.

3. Basic primitive  
   Examples: hash function, MAC, digital signature, encryption, commitment, secret sharing.

4. Structured or advanced primitive  
   Examples: homomorphic encryption, homomorphic commitments, threshold signatures, VDFs, functional encryption.

5. Proof system  
   Examples: zero-knowledge proof, SNARK, STARK, Bulletproof, range proof, membership proof.

6. Protocol  
   Examples: MPC, secure aggregation, anonymous credentials, mixnets, private set intersection.

7. System or application  
   Examples: electronic voting, private payments, ZK rollups, anonymous airdrops.

8. Design pattern  
   Examples: commit-reveal, anonymous membership, anti-double-use nullifiers, delayed reveal.

Do not mix levels without explicitly explaining the relationship.

## Required structure for concept pages

Each concept page must follow this template unless there is a strong reason not to:

# [Concept name]

## One-sentence intuition

Explain the concept in one sentence.

## Where it sits in the taxonomy

- Level:
- Parent category:
- Related concepts:

## Problem it solves

Explain the problem the concept addresses.

## Mental model

Give an analogy or operational model.

## Minimal example

Provide a small conceptual example. Avoid production code unless the page is explicitly implementation-oriented.

## Security properties

List what the concept guarantees, using precise terms.

## What it does not provide

List common misconceptions and missing guarantees.

## Assumptions

List cryptographic, setup, network, timing, or trust assumptions.

## Post-quantum posture

Classify as vulnerable, plausible, depends, unknown, or not-applicable. Explain what concrete assumptions determine the label.

## Confidence model

State who or what must remain honest, independent, hard, available, or publicly verifiable. Use terms such as mathematical-assumption, public-verifiability, trusted-setup, trusted-issuer, one-honest-party, t-of-n-threshold, honest-majority, non-collusion, client-side-secret, or external-timing.

## Common constructions

Mention well-known constructions or families.

## Use cases

List typical real-world uses.

## Composition patterns

Explain how the concept is commonly combined with others.

## Failure modes and anti-patterns

Explain how systems using this concept fail.

## Maturity and deployment

Classify as:

- widely deployed;
- mature but specialized;
- emerging;
- research-stage;
- mostly theoretical.

## Related concepts

Link to adjacent pages.

## Further reading

Prefer primary sources, reputable textbooks, surveys, and official documentation.

## Required structure for protocol pages

Each protocol page must include:

# [Protocol name]

## Goal

## Participants

## Inputs and outputs

## Building blocks

## Security goals

## Non-goals

## Threat model

## Protocol sketch

## Trust assumptions

## Post-quantum posture

## Confidence model

## Metadata leaks

## Failure modes

## Variants

## Where it is used

## Further reading

## Writing style

Use:

- short sections;
- precise definitions;
- diagrams where useful;
- tables for comparisons;
- concrete examples;
- warnings for common mistakes.

Avoid:

- hype;
- vague claims like “military-grade”;
- saying “secure” without specifying the threat model;
- unexplained acronyms;
- presenting research-stage tools as production-ready;
- encouraging readers to deploy unaudited custom cryptography.

## Diagram policy

Diagrams must be editable and reviewable as structured data:

- Use `book/data/diagrams/*.yml` as the source of truth.
- Validate diagram files with `book/schemas/diagram.schema.json`.
- Generate SVG outputs with `npm run generate:diagrams` from the `book/` directory.
- Use generated SVGs from `book/static/img/diagrams/` in pages.
- Keep optional generated Mermaid files in `book/static/diagrams/` for simple flow inspection.
- Do not hand-edit generated SVG or Mermaid outputs.

Prefer diagrams for taxonomy boundaries, assumption dependencies, protocol flows, composition paths, lifecycle steps, and failure modes involving setup, metadata, trust, or omitted checks.

## Terminology rules

Use the following terms consistently:

- “primitive” for basic cryptographic building blocks.
- “protocol” for multi-step constructions involving one or more parties.
- “security goal” for desired properties.
- “assumption” for mathematical or trust requirements.
- “scheme” for a concrete construction.
- “system” for an end-to-end application.

On first use, expand acronyms:

- zero-knowledge proof (ZKP)
- multi-party computation (MPC)
- fully homomorphic encryption (FHE)
- verifiable delay function (VDF)
- public-key encryption (PKE)

## Safety and responsibility

This project is educational.

Do not provide copy-paste production cryptography unless it uses established, audited libraries and the section is explicitly about safe implementation.

Always include warnings when:

- a primitive is easy to misuse;
- a protocol has subtle composability issues;
- a construction is research-stage;
- implementation requires expert audit;
- security depends on setup ceremonies, trusted parties, honest-majority assumptions, or timing assumptions.

## Source quality

Prefer sources in this order:

1. Peer-reviewed papers or preprints by recognized authors.
2. Standard textbooks.
3. Official project documentation.
4. Reputable engineering blogs by cryptographers or security teams.
5. Wikipedia only for quick orientation, not as a main reference.

Every technical claim that is not common knowledge should be backed by a source or marked TODO.

## Freshness policy

For fast-moving areas such as ZK systems, FHE, post-quantum cryptography, MPC frameworks, and blockchain privacy, check whether the page needs updating at least every 6 months.

Add a frontmatter field:

```yaml
last_reviewed: YYYY-MM-DD
status: current | needs-review | outdated | draft
```

## Frontmatter schema

Each page should start with:

```yaml
---
title:
type: assumption | primitive | protocol | pattern | system | glossary | appendix | taxonomy
level:
template: concept | protocol | case-study | overview | reference | glossary
status: draft
last_reviewed:
difficulty: beginner | intermediate | advanced
maturity: deployed | mature | emerging | research | theoretical | not-applicable
tags:
  -
post_quantum_posture: vulnerable | plausible | depends | unknown | not-applicable
confidence_model:
  type:
---
```

## Concept card schema

When adding a major concept, also create a YAML card in `/book/data/concept-cards`.

Required fields:

```yaml
id:
name:
category:
level:
short_intuition:
security_goals:
assumptions:
requires_trusted_setup:
post_quantum:
post_quantum_posture:
confidence_model:
  type:
  threshold:
  breaks_if:
  setup:
typical_uses:
does_not_provide:
composition_risks:
metadata_leaks:
implementation_risk: low | medium | high | expert-only | not-applicable
auditability: publicly-verifiable | locally-verifiable | requires-expert-review | requires-operational-audit | not-applicable
parameter_sensitivity: low | medium | high | scheme-dependent | not-applicable
revocation_story:
operational_failure_modes:
maturity:
related:
references:
```

## Quality checklist before committing

Before committing, verify:

- The concept is classified at the correct taxonomy level.
- The page states what the primitive/protocol does not provide.
- Trust assumptions are explicit.
- Post-quantum posture is explicit for major cryptographic concepts.
- The confidence model states who or what must remain honest, independent, hard, or verifiable.
- Failure modes are included.
- Related concepts are linked.
- Terminology is consistent.
- No production deployment advice is given without caveats.
- Sources are included for nontrivial claims.
- The page can be understood by a technical non-cryptographer.
- `npm run validate:content` passes from the `book/` directory.

## Agent workflow

When asked to create or update content:

1. Identify the concept type.
2. Place it in the taxonomy.
3. Draft the page using the required template.
4. Add or update the concept card if applicable.
5. Add cross-links to related pages.
6. Add warnings and failure modes.
7. Add references.
8. Mark uncertain claims with TODO.
9. Keep explanations practical and system-oriented.

## Forbidden behavior

Do not:

- invent citations;
- overstate security guarantees;
- omit assumptions;
- present experimental cryptography as production-ready;
- recommend rolling custom cryptography;
- conflate privacy, anonymity, confidentiality, and unlinkability;
- conflate zero-knowledge proofs with encryption;
- conflate commitments with encryption;
- conflate threshold cryptography with trustlessness;
- ignore metadata leaks.
