import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  atlasSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Taxonomy',
      items: [
        'taxonomy/overview',
        'taxonomy/security-goals',
        'taxonomy/assumptions',
        'taxonomy/primitives-vs-protocols',
        'taxonomy/composability',
      ],
    },
    {
      type: 'category',
      label: 'Assumptions and Substrates',
      items: [
        'assumptions/discrete-logarithm',
        'assumptions/factoring-rsa',
        'assumptions/pairings',
        'assumptions/lattices',
        'assumptions/random-oracle-model',
        'assumptions/trusted-setup',
      ],
    },
    {
      type: 'category',
      label: 'Basic Primitives',
      items: [
        'primitives/overview',
        'primitives/hash-functions',
        'primitives/symmetric-encryption',
        'primitives/message-authentication-codes',
        'primitives/key-derivation-functions',
        'primitives/randomness-and-nonces',
        'primitives/commitments',
        'primitives/pedersen-commitments',
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
        'protocols/anonymous-credentials',
        'protocols/nullifiers',
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
        'appendices/comparison-matrices',
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
