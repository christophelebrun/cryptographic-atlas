import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  atlasSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Taxonomy',
      items: [
        'taxonomy/overview',
        {
          type: 'category',
          label: 'Security Goals',
          link: {
            type: 'doc',
            id: 'taxonomy/security-goals',
          },
          items: [
            'taxonomy/confidentiality',
            'taxonomy/integrity',
            'taxonomy/authenticity',
            'taxonomy/anonymity',
            'taxonomy/unlinkability',
            'taxonomy/forward-secrecy',
            'taxonomy/verifiability',
            'taxonomy/auditability',
            'taxonomy/accountability',
            'taxonomy/deniability',
            'taxonomy/non-repudiation',
            'taxonomy/availability',
            'taxonomy/censorship-resistance',
            'taxonomy/additional-security-goals',
          ],
        },
        'taxonomy/assumptions',
        'taxonomy/primitives-vs-protocols',
        'taxonomy/composability',
      ],
    },
    {
      type: 'category',
      label: 'Assumptions and Substrates',
      items: [
        {
          type: 'category',
          label: 'Discrete Logarithm',
          link: {
            type: 'doc',
            id: 'assumptions/discrete-logarithm',
          },
          items: ['assumptions/elliptic-curves'],
        },
        'assumptions/factoring-rsa',
        'assumptions/code-based-assumptions',
        'assumptions/pairings',
        'assumptions/lattices',
        'assumptions/random-oracle-model',
        {
          type: 'category',
          label: 'Trusted Setup',
          link: {
            type: 'doc',
            id: 'assumptions/trusted-setup',
          },
          items: ['assumptions/common-reference-strings'],
        },
        'assumptions/additional-substrates',
      ],
    },
    {
      type: 'category',
      label: 'Basic Primitives',
      items: [
        'primitives/overview',
        'primitives/primitive-engineering-concepts',
        'primitives/hash-functions',
        {
          type: 'category',
          label: 'Symmetric Encryption',
          link: {
            type: 'doc',
            id: 'primitives/symmetric-encryption',
          },
          items: [
            {
              type: 'category',
              label: 'Authenticated Encryption',
              link: {
                type: 'doc',
                id: 'primitives/authenticated-encryption',
              },
              items: ['primitives/key-committing-encryption'],
            },
          ],
        },
        'primitives/message-authentication-codes',
        {
          type: 'category',
          label: 'Key Derivation Functions',
          link: {
            type: 'doc',
            id: 'primitives/key-derivation-functions',
          },
          items: ['primitives/password-hashing'],
        },
        'primitives/randomness-and-nonces',
        {
          type: 'category',
          label: 'Commitments',
          link: {
            type: 'doc',
            id: 'primitives/commitments',
          },
          items: ['primitives/pedersen-commitments'],
        },
        'primitives/digital-signatures',
        'primitives/public-key-encryption',
        'primitives/key-encapsulation-and-exchange',
        'primitives/secret-sharing',
      ],
    },
    {
      type: 'category',
      label: 'Structured Primitives',
      items: [
        'structured-primitives/overview',
        {
          type: 'category',
          label: 'Advanced Structured Primitives',
          link: {
            type: 'doc',
            id: 'structured-primitives/advanced-structured-primitives',
          },
          items: [
            'structured-primitives/polynomial-commitments',
            'structured-primitives/vector-commitments',
            'structured-primitives/blind-signatures',
            'structured-primitives/verifiable-random-functions',
            'structured-primitives/verifiable-encryption',
            'structured-primitives/e-cash-primitives',
          ],
        },
        'structured-primitives/homomorphic-commitments',
        'structured-primitives/homomorphic-encryption',
        'structured-primitives/threshold-cryptography',
        'structured-primitives/functional-encryption',
        'structured-primitives/timelock-and-vdfs',
        'structured-primitives/accumulators-and-merkle-trees',
      ],
    },
    {
      type: 'category',
      label: 'Proof Systems',
      items: [
        'proof-systems/overview',
        {
          type: 'category',
          label: 'Proof-System Components',
          link: {
            type: 'doc',
            id: 'proof-systems/proof-system-components',
          },
          items: [
            'proof-systems/fri',
            'proof-systems/folding-schemes',
            {
              type: 'category',
              label: 'Arithmetization',
              link: {
                type: 'doc',
                id: 'proof-systems/arithmetization',
              },
              items: ['proof-systems/lookup-arguments'],
            },
            'proof-systems/sumcheck',
            'proof-systems/recursive-proofs',
          ],
        },
        'proof-systems/zero-knowledge-proofs',
        'proof-systems/snarks-starks-bulletproofs',
        'proof-systems/range-proofs',
        'proof-systems/membership-proofs',
      ],
    },
    {
      type: 'category',
      label: 'Protocols',
      items: [
        'protocols/overview',
        {
          type: 'category',
          label: 'Additional Protocol Families',
          link: {
            type: 'doc',
            id: 'protocols/additional-protocol-families',
          },
          items: [
            'protocols/secure-channels',
            'protocols/password-authenticated-key-exchange',
            'protocols/oblivious-transfer',
            'protocols/private-information-retrieval',
            'protocols/anonymous-tokens',
            'protocols/blind-signature-credentials',
          ],
        },
        'protocols/anonymous-credentials',
        'protocols/nullifiers',
        'protocols/oblivious-pseudorandom-functions',
        'protocols/private-set-intersection',
        'protocols/secure-aggregation',
        'protocols/mpc',
        'protocols/mixnets',
        'protocols/e-voting',
      ],
    },
    {
      type: 'category',
      label: 'Design Patterns',
      items: [
        'design-patterns/overview',
        {
          type: 'category',
          label: 'Operational Design Patterns',
          link: {
            type: 'doc',
            id: 'design-patterns/operational-design-patterns',
          },
          items: [
            'design-patterns/domain-separation',
            'design-patterns/transcript-binding',
            'design-patterns/privacy-preserving-revocation',
            'design-patterns/encrypt-then-prove',
            'design-patterns/threshold-issuance',
            'design-patterns/key-rotation-and-migration',
          ],
        },
        'design-patterns/anonymous-membership',
        'design-patterns/anti-double-use-nullifiers',
        'design-patterns/private-aggregation',
        'design-patterns/delayed-reveal',
        'design-patterns/reveal-only-a-function',
        'design-patterns/make-receipts-useless',
      ],
    },
    {
      type: 'category',
      label: 'Case Studies',
      items: [
        'case-studies/overview',
        {
          type: 'category',
          label: 'Additional Systems and Applications',
          link: {
            type: 'doc',
            id: 'case-studies/additional-systems',
          },
          items: [
            'case-studies/private-payments',
            'case-studies/zk-rollups',
            'case-studies/secure-messaging',
            'case-studies/identity-wallets',
            'case-studies/encrypted-mempools',
            'case-studies/private-machine-learning-analytics',
          ],
        },
        'case-studies/private-dao-voting',
        'case-studies/coercion-resistant-voting',
        'case-studies/anonymous-airdrop',
      ],
    },
    {
      type: 'category',
      label: 'Glossary',
      items: ['glossary/glossary'],
    },
    {
      type: 'category',
      label: 'Appendices',
      items: [
        'appendices/reading-list',
        'appendices/notation',
        'appendices/maturity-scale',
        'appendices/editorial-maturity-and-coverage',
        {
          type: 'category',
          label: 'Comparison Matrices',
          link: {
            type: 'doc',
            id: 'appendices/comparison-matrices',
          },
          items: ['appendices/generated-comparison-matrices'],
        },
        'appendices/generated-relationship-graph',
        'appendices/concrete-algorithms-and-schemes',
        'appendices/diagram-authoring',
        'appendices/post-quantum-posture',
        'appendices/confidence-models',
        'appendices/metadata-leakage',
        'appendices/threat-model-checklist',
      ],
    },
  ],
};

export default sidebars;
