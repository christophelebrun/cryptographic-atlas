import React from 'react';
import WarningBox from './WarningBox';
import conceptCards from '../generated/conceptCards';

type FrontMatter = {
  confidence_model?: {
    type?: string;
  };
  maturity?: string;
  post_quantum_posture?: string;
};

type RouteWarningRule = {
  routes: string[];
  message: string;
};

const targetedWarningRules: RouteWarningRule[] = [
  {
    routes: [
      '/docs/assumptions/trusted-setup',
      '/docs/assumptions/common-reference-strings',
      '/docs/proof-systems/snarks-starks-bulletproofs',
      '/docs/proof-systems/zero-knowledge-proofs',
      '/docs/structured-primitives/polynomial-commitments',
    ],
    message:
      'Trusted setup and common-reference-string choices are part of the threat model; toxic-waste handling, ceremony assumptions, and transcript verification must be reviewed before deployment.',
  },
  {
    routes: [
      '/docs/primitives/randomness-and-nonces',
      '/docs/primitives/authenticated-encryption',
      '/docs/primitives/symmetric-encryption',
      '/docs/protocols/secure-channels',
      '/docs/primitives/digital-signatures',
    ],
    message:
      'Nonce misuse can break confidentiality, authenticity, or signing-key secrecy depending on the scheme; never treat nonces as interchangeable randomness.',
  },
  {
    routes: [
      '/docs/primitives/symmetric-encryption',
      '/docs/primitives/authenticated-encryption',
      '/docs/primitives/public-key-encryption',
      '/docs/taxonomy/confidentiality',
    ],
    message:
      'Encryption without authentication does not provide ciphertext integrity; active attackers can often tamper with unauthenticated ciphertexts.',
  },
  {
    routes: [
      '/docs/primitives/digital-signatures',
      '/docs/design-patterns/domain-separation',
      '/docs/design-patterns/transcript-binding',
      '/docs/protocols/secure-channels',
      '/docs/structured-primitives/threshold-cryptography',
    ],
    message:
      'Signature checks must bind domain, protocol, context, and transcript data; a valid signature on the wrong statement can still be a system failure.',
  },
  {
    routes: [
      '/docs/design-patterns/privacy-preserving-revocation',
      '/docs/protocols/anonymous-credentials',
      '/docs/systems-and-applications/identity-wallets',
      '/docs/protocols/blind-signature-credentials',
    ],
    message:
      'Revocation and status checks can reintroduce linkability; review freshness, batching, caching, issuer contact, and verifier-visible status metadata.',
  },
  {
    routes: [
      '/docs/appendices/metadata-leakage',
      '/docs/taxonomy/anonymity',
      '/docs/taxonomy/unlinkability',
      '/docs/proof-systems/zero-knowledge-proofs',
      '/docs/systems-and-applications/private-payments',
      '/docs/systems-and-applications/anonymous-airdrop',
      '/docs/systems-and-applications/secure-messaging',
      '/docs/systems-and-applications/zk-rollups',
    ],
    message:
      'Payload privacy does not hide timing, size, routing, public-input, account, wallet, or network metadata unless the system explicitly protects those channels.',
  },
  {
    routes: [
      '/docs/proof-systems/arithmetization',
      '/docs/proof-systems/zero-knowledge-proofs',
      '/docs/proof-systems/snarks-starks-bulletproofs',
      '/docs/proof-systems/lookup-arguments',
      '/docs/systems-and-applications/zk-rollups',
    ],
    message:
      'A zero-knowledge proof only proves the encoded relation; underconstrained circuits or missing public-input checks can make an invalid computation look valid.',
  },
  {
    routes: [
      '/docs/assumptions/trusted-setup',
      '/docs/primitives/randomness-and-nonces',
      '/docs/primitives/symmetric-encryption',
      '/docs/primitives/authenticated-encryption',
      '/docs/primitives/public-key-encryption',
      '/docs/primitives/digital-signatures',
      '/docs/protocols/secure-channels',
      '/docs/protocols/anonymous-credentials',
      '/docs/proof-systems/zero-knowledge-proofs',
      '/docs/proof-systems/snarks-starks-bulletproofs',
      '/docs/proof-systems/arithmetization',
      '/docs/systems-and-applications/private-payments',
      '/docs/systems-and-applications/zk-rollups',
    ],
    message:
      'This page is educational analysis, not production deployment guidance; concrete systems need reviewed libraries, threat modeling, tests, and expert audit.',
  },
];

function humanize(value: string | boolean | null | undefined): string {
  if (value === true) return 'required';
  if (value === false) return 'not required';
  if (value == null) return 'unknown';
  return String(value).replace(/-/g, ' ');
}

function normalizeDocRoute(route: string): string {
  return route.split(/[?#]/)[0].replace(/\.html$/, '').replace(/\/$/, '');
}

function routeFromPermalink(permalink: string | undefined): string | undefined {
  if (!permalink) return undefined;
  const index = permalink.indexOf('/docs/');
  return index === -1 ? undefined : normalizeDocRoute(permalink.slice(index));
}

function matchingCard(permalink: string | undefined) {
  const route = routeFromPermalink(permalink);
  if (!route) return undefined;
  return conceptCards.find((card) => card.pageLink === route);
}

function setupSensitive(value: string | undefined): boolean {
  return Boolean(
    value &&
      [
        'trusted-setup',
        'trusted-issuer',
        'one-honest-party',
        't-of-n-threshold',
        'honest-majority',
        'non-collusion',
        'external-timing',
      ].includes(value),
  );
}

function setupDepends(value: boolean | string | undefined): boolean {
  return value === true || value === 'depends' || value === 'varies';
}

export default function DocumentRiskWarnings({
  frontMatter,
  permalink,
}: {
  frontMatter: FrontMatter;
  permalink?: string;
}): JSX.Element | null {
  const route = routeFromPermalink(permalink);
  const card = matchingCard(permalink);
  const warnings = new Set<string>();
  const maturity = card?.maturity || frontMatter.maturity;
  const postQuantumPosture = card?.postQuantumPosture || frontMatter.post_quantum_posture;

  if (card?.implementationRisk === 'expert-only' || card?.implementationRisk === 'high') {
    warnings.add(
      `Implementation risk is ${humanize(card.implementationRisk)}; use this page as an evaluation aid, not as deployment guidance.`,
    );
  }

  if (card?.auditability === 'requires-expert-review') {
    warnings.add('Correct use requires expert cryptographic review of the concrete construction and its composition.');
  }

  if (maturity === 'research' || maturity === 'theoretical') {
    warnings.add(`Maturity is ${humanize(maturity)}; do not treat the technique as production-ready without stronger evidence.`);
  }

  if (setupDepends(card?.requiresTrustedSetup) || setupSensitive(frontMatter.confidence_model?.type)) {
    warnings.add('Security depends on setup, issuer, committee, timing, or non-collusion assumptions that must be stated and audited.');
  }

  if (postQuantumPosture === 'vulnerable') {
    warnings.add('The common assumptions are quantum-vulnerable; do not present this as post-quantum safe.');
  }

  for (const rule of targetedWarningRules) {
    if (route && rule.routes.includes(route)) {
      warnings.add(rule.message);
    }
  }

  if (warnings.size === 0) return null;

  return (
    <WarningBox>
      <ul className="warningBox__list">
        {Array.from(warnings).map((warning) => (
          <li key={warning}>{warning}</li>
        ))}
      </ul>
    </WarningBox>
  );
}
