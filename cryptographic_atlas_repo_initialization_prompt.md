# Prompt — Initialize and Publish *The Cryptographic Atlas* Repository

You are an autonomous coding and documentation agent. Your task is to initialize a new public GitHub repository for a living online book titled:

> **The Cryptographic Atlas**  
> *A practical map of modern cryptographic primitives, protocols, guarantees, and design patterns.*

The goal is to create a clean, extensible, publishable first version of the repository and book website. The book should help technically literate readers understand cryptographic concepts as composable building blocks, without pretending that cryptography can be safely assembled without expert review.

This repository is educational. Do not present the project as a source of production-ready cryptographic protocols. Emphasize threat models, assumptions, failure modes, and composability risks.

---

## 1. High-level mission

Create a living online book that serves as an atlas of modern cryptographic concepts.

The book should classify concepts into clear levels:

1. Security goals
2. Mathematical assumptions and substrates
3. Basic primitives
4. Structured or advanced primitives
5. Proof systems
6. Protocols
7. Systems and applications
8. Design patterns

The project should explain:

- what each primitive or protocol does;
- what it does not do;
- what assumptions it relies on;
- what can go wrong;
- how it composes with other tools;
- where it is used;
- how mature it is.

The intended audience includes:

- software engineers;
- blockchain builders;
- security architects;
- technical founders;
- students;
- applied cryptography beginners;
- product designers working with privacy-preserving systems.

The reader is technical but not an advanced cryptographer.

---

## 2. Technology choice

Use **Docusaurus** as the initial publishing framework.

Reasons:

- Markdown/MDX support;
- good documentation experience;
- easy GitHub Pages deployment;
- React components can be added later;
- supports versioning, sidebars, and tags;
- appropriate for a living, web-first book.

Use TypeScript where configuration requires JavaScript/TypeScript.

The first version must be easy to build locally and deploy to GitHub Pages.

---

## 3. Repository name and branding

Preferred repository name:

```text
cryptographic-atlas
```

Book title:

```text
The Cryptographic Atlas
```

Subtitle:

```text
A practical map of modern cryptographic primitives, protocols, guarantees, and design patterns.
```

Tone:

- precise;
- educational;
- humble;
- sober;
- practical;
- not hype-driven.

Avoid language such as:

- “military-grade crypto”;
- “unbreakable”;
- “trustless” unless carefully qualified;
- “no-code cryptography” as a safety claim;
- “build secure protocols without cryptographers”.

Acceptable framing:

```text
A design-oriented atlas for understanding cryptographic building blocks and their trade-offs.
```

---

## 4. Required repository structure

Create the following structure:

```text
cryptographic-atlas/
  README.md
  LICENSE
  CONTRIBUTING.md
  CODE_OF_CONDUCT.md
  AGENTS.md
  package.json
  docusaurus.config.ts
  sidebars.ts
  tsconfig.json
  docs/
    intro.md
    taxonomy/
      overview.md
      security-goals.md
      assumptions.md
      primitives-vs-protocols.md
      composability.md
    primitives/
      overview.md
      hash-functions.md
      commitments.md
      pedersen-commitments.md
      digital-signatures.md
      public-key-encryption.md
      secret-sharing.md
    structured-primitives/
      overview.md
      homomorphic-commitments.md
      homomorphic-encryption.md
      threshold-cryptography.md
      functional-encryption.md
      timelock-and-vdfs.md
      accumulators-and-merkle-trees.md
    proof-systems/
      overview.md
      zero-knowledge-proofs.md
      snarks-starks-bulletproofs.md
      range-proofs.md
      membership-proofs.md
    protocols/
      overview.md
      anonymous-credentials.md
      nullifiers.md
      secure-aggregation.md
      mpc.md
      mixnets.md
      e-voting.md
    design-patterns/
      overview.md
      anonymous-membership.md
      anti-double-use-nullifiers.md
      private-aggregation.md
      delayed-reveal.md
      reveal-only-a-function.md
      make-receipts-useless.md
    case-studies/
      overview.md
      private-dao-voting.md
      coercion-resistant-voting.md
      anonymous-airdrop.md
    glossary/
      glossary.md
    appendices/
      reading-list.md
      notation.md
      maturity-scale.md
  data/
    concept-cards/
      pedersen-commitment.yml
      zero-knowledge-proof.yml
      nullifier.yml
      homomorphic-encryption.yml
      functional-encryption.yml
      vdf.yml
  src/
    components/
      ConceptCard.tsx
      MaturityBadge.tsx
      WarningBox.tsx
    css/
      custom.css
  static/
    img/
      logo-placeholder.svg
  .github/
    workflows/
      deploy.yml
```

You may adjust paths only if there is a strong technical reason, but keep the conceptual organization intact.

---

## 5. Docusaurus setup requirements

Initialize Docusaurus with:

- site title: `The Cryptographic Atlas`
- tagline: `A practical map of modern cryptographic primitives, protocols, guarantees, and design patterns.`
- documentation route as the main experience;
- GitHub Pages deployment workflow;
- clean sidebar organization matching the book structure.

The site should have:

- a homepage with a short mission statement;
- a “Start reading” button linking to `/docs/intro`;
- a “Taxonomy” button linking to `/docs/taxonomy/overview`;
- a clear disclaimer that the book is educational and not production cryptography guidance.

Use minimal custom styling. Keep the design sober, readable, and technical.

---

## 6. License

Use:

```text
Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
```

for book content.

If the repository contains source code for website components, include a note that website code is licensed under MIT unless otherwise specified.

If maintaining dual licensing is too complex for the initial commit, use CC BY-SA 4.0 for the whole repository and add a TODO to split code/content licensing later.

---

## 7. README.md content

Create a strong README with these sections:

```markdown
# The Cryptographic Atlas

A practical map of modern cryptographic primitives, protocols, guarantees, and design patterns.

## What this project is

## What this project is not

## Audience

## Core taxonomy

## Repository structure

## Local development

## Contributing

## License

## Safety note
```

The README must explicitly say:

- this is an educational project;
- it is not a source of production-ready cryptographic implementations;
- readers should not design or deploy custom cryptographic protocols without expert review;
- the project is meant to clarify concepts, assumptions, trade-offs, and composition risks.

Add local development commands:

```bash
npm install
npm run start
npm run build
```

---

## 8. AGENTS.md content

Create a complete `AGENTS.md` with the following content, adapting formatting if needed:

```markdown
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
type: primitive | protocol | pattern | system | glossary | appendix | taxonomy
level:
status: draft
last_reviewed:
difficulty: beginner | intermediate | advanced
maturity: deployed | mature | emerging | research | theoretical | not-applicable
tags:
  -
---
```

## Concept card schema

When adding a major concept, also create a YAML card in `/data/concept-cards`.

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
typical_uses:
does_not_provide:
composition_risks:
maturity:
related:
references:
```

## Quality checklist before committing

Before committing, verify:

- The concept is classified at the correct taxonomy level.
- The page states what the primitive/protocol does not provide.
- Trust assumptions are explicit.
- Failure modes are included.
- Related concepts are linked.
- Terminology is consistent.
- No production deployment advice is given without caveats.
- Sources are included for nontrivial claims.
- The page can be understood by a technical non-cryptographer.

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
```

---

## 9. Required initial book content

Create meaningful first drafts for the following pages. They do not need to be exhaustive, but they must be useful, coherent, and aligned with the project mission.

### `docs/intro.md`

Title: `Welcome to The Cryptographic Atlas`

Must include:

- the mission;
- what the book is;
- what the book is not;
- how to read it;
- the core taxonomy;
- an example using private voting as a motivating case.

Use this motivating example:

```text
A private voting system may require anonymous eligibility, anti-double-vote protection, ballot secrecy, valid ballot proofs, private tallying, delayed reveal, and coercion mitigation. No single primitive provides all of these. The system must compose several tools, each with different assumptions and failure modes.
```

### `docs/taxonomy/overview.md`

Explain the taxonomy:

```text
Security goals → assumptions → primitives → structured primitives → proof systems → protocols → systems → design patterns
```

Include a table with examples.

### `docs/taxonomy/composability.md`

Explain why cryptographic tools do not compose automatically.

Mention examples:

- encryption does not prove validity;
- commitments do not authenticate users;
- zero-knowledge proofs do not hide metadata;
- threshold cryptography is not trustlessness;
- anonymous credentials do not automatically prevent coercion.

### `docs/primitives/commitments.md`

Explain commitments:

- hiding;
- binding;
- commit/open lifecycle;
- hash commitments;
- Pedersen commitments;
- use cases;
- failure modes.

### `docs/primitives/pedersen-commitments.md`

Explain:

- mental model;
- formula `C = g^m h^r`;
- hiding;
- binding under discrete logarithm assumptions;
- additive homomorphism;
- why bad randomness is dangerous;
- use in confidential transactions, range proofs, and private tallying.

### `docs/proof-systems/zero-knowledge-proofs.md`

Explain:

- statement vs witness;
- completeness, soundness, zero-knowledge;
- what ZKPs do and do not provide;
- examples: membership, valid vote, range proof;
- distinction between ZKP as a family and SNARK/STARK/Bulletproof as concrete proof systems.

### `docs/protocols/nullifiers.md`

Explain:

- one-person-one-action without revealing identity;
- `nullifier = Hash(secret, context)` mental model;
- use in voting and anonymous airdrops;
- linkability risks across contexts;
- why nullifiers do not by themselves prove eligibility.

### `docs/design-patterns/private-aggregation.md`

Explain:

- revealing an aggregate without revealing individual values;
- approaches: homomorphic encryption, homomorphic commitments, MPC, secure aggregation;
- use cases: voting, telemetry, private statistics;
- risks: small groups, differencing attacks, invalid inputs.

### `docs/case-studies/private-dao-voting.md`

Create a case study showing how a private DAO vote might be designed.

Include:

- goals;
- non-goals;
- possible building blocks;
- simple architecture;
- privacy leaks;
- coercion limitations;
- maturity warning.

---

## 10. Required concept cards

Create YAML concept cards for:

1. Pedersen Commitment
2. Zero-Knowledge Proof
3. Nullifier
4. Homomorphic Encryption
5. Functional Encryption
6. Verifiable Delay Function

Example format:

```yaml
id: pedersen-commitment
name: Pedersen Commitment
category: commitment
level: structured-primitive
short_intuition: A commitment scheme that hides a value while preserving additive structure.
security_goals:
  - hiding
  - binding
assumptions:
  - discrete-logarithm-hardness
requires_trusted_setup: false
post_quantum: false
typical_uses:
  - confidential-transactions
  - range-proofs
  - private-tallying
does_not_provide:
  - authentication
  - validity-of-committed-value
  - protection-against-bad-randomness
composition_risks:
  - If the randomness is revealed, the committed value may be exposed.
  - If the discrete logarithm relation between generators is known, binding can fail.
maturity: mature
related:
  - commitments
  - homomorphic-commitments
  - range-proofs
references:
  - TODO
```

Do not invent precise citations. If sources have not been verified, use `TODO`.

---

## 11. Required components

Create simple React components:

### `ConceptCard.tsx`

A presentational component that can display:

- name;
- category;
- level;
- short intuition;
- maturity;
- security goals;
- what it does not provide.

It does not need to dynamically load YAML yet. Hardcoded props are fine.

### `MaturityBadge.tsx`

Display a small badge for maturity:

- deployed;
- mature;
- emerging;
- research;
- theoretical;
- not-applicable.

### `WarningBox.tsx`

A simple callout component for warnings such as:

```text
This technique is research-stage and should not be deployed without expert review.
```

---

## 12. Visual style

Keep the style:

- clean;
- readable;
- minimal;
- academic but accessible;
- not crypto-hype.

Use:

- strong headings;
- concise paragraphs;
- callout boxes;
- comparison tables;
- monospace only for formulas, identifiers, and snippets.

---

## 13. GitHub Actions deployment

Create `.github/workflows/deploy.yml` for GitHub Pages deployment.

Use a standard Docusaurus deployment workflow.

The workflow should:

- run on push to `main`;
- install dependencies;
- build the site;
- upload GitHub Pages artifact;
- deploy to GitHub Pages.

If exact GitHub Pages settings depend on the repository owner, include clear TODO comments.

---

## 14. First commit quality bar

The repository should be buildable.

Before finishing:

1. Run formatting if available.
2. Run `npm run build`.
3. Fix build errors.
4. Ensure the sidebar works.
5. Ensure there is no broken internal link in the initial pages if Docusaurus reports them.
6. Ensure all files are committed.
7. Print final instructions for the human:
   - how to run locally;
   - how to create the GitHub repository;
   - how to push;
   - how to enable GitHub Pages;
   - what to edit next.

---

## 15. GitHub publication instructions

After creating the local repository, provide the user with commands similar to:

```bash
git init
git add .
git commit -m "Initial version of The Cryptographic Atlas"
git branch -M main
git remote add origin git@github.com:USERNAME/cryptographic-atlas.git
git push -u origin main
```

Also explain:

1. Create a new GitHub repository named `cryptographic-atlas`.
2. Push the local repository.
3. In GitHub, go to Settings → Pages.
4. Set source to GitHub Actions.
5. Wait for the deployment workflow to complete.

Do not claim that the repository has been published unless you actually have credentials and have pushed it.

---

## 16. Editorial roadmap

Create `docs/appendices/reading-list.md` with a first reading list containing categories rather than exhaustive citations.

Include TODO placeholders for verified references:

```markdown
## General applied cryptography
- TODO: Real-World Cryptography — David Wong
- TODO: Serious Cryptography — Jean-Philippe Aumasson
- TODO: A Graduate Course in Applied Cryptography — Boneh and Shoup
- TODO: Introduction to Modern Cryptography — Katz and Lindell

## Zero-knowledge proofs
- TODO

## Electronic voting
- TODO

## MPC and secure aggregation
- TODO

## Functional encryption
- TODO

## VDFs and timelock encryption
- TODO
```

Create a `TODO.md` or a section in the README with next steps:

```text
- Add verified citations.
- Add diagrams for the taxonomy.
- Add concept-card rendering from YAML.
- Add more case studies.
- Add comparison matrices.
- Add glossary backlinks.
```

---

## 17. Safety disclaimer to include in the site

Include this disclaimer in the homepage, README, and intro page:

```text
The Cryptographic Atlas is an educational resource. It explains concepts, assumptions, trade-offs, and known failure modes. It is not a source of production-ready cryptographic implementations or protocols. Do not design or deploy custom cryptographic systems without expert review and independent security audits.
```

---

## 18. Final output expected from the agent

When finished, summarize:

- repository structure created;
- site framework used;
- key pages drafted;
- how to run locally;
- how to push to GitHub;
- how to deploy with GitHub Pages;
- known TODOs and limitations.

Do not overclaim completeness. This is version 0.1 of a living book.
