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

function humanize(value: string | boolean | null | undefined): string {
  if (value === true) return 'required';
  if (value === false) return 'not required';
  if (value == null) return 'unknown';
  return String(value).replace(/-/g, ' ');
}

function routeFromPermalink(permalink: string | undefined): string | undefined {
  if (!permalink) return undefined;
  const index = permalink.indexOf('/docs/');
  return index === -1 ? undefined : permalink.slice(index);
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
  const card = matchingCard(permalink);
  const warnings: string[] = [];
  const maturity = card?.maturity || frontMatter.maturity;
  const postQuantumPosture = card?.postQuantumPosture || frontMatter.post_quantum_posture;

  if (card?.implementationRisk === 'expert-only' || card?.implementationRisk === 'high') {
    warnings.push(
      `Implementation risk is ${humanize(card.implementationRisk)}; use this page as an evaluation aid, not as deployment guidance.`,
    );
  }

  if (card?.auditability === 'requires-expert-review') {
    warnings.push('Correct use requires expert cryptographic review of the concrete construction and its composition.');
  }

  if (maturity === 'research' || maturity === 'theoretical') {
    warnings.push(`Maturity is ${humanize(maturity)}; do not treat the technique as production-ready without stronger evidence.`);
  }

  if (setupDepends(card?.requiresTrustedSetup) || setupSensitive(frontMatter.confidence_model?.type)) {
    warnings.push('Security depends on setup, issuer, committee, timing, or non-collusion assumptions that must be stated and audited.');
  }

  if (postQuantumPosture === 'vulnerable') {
    warnings.push('The common assumptions are quantum-vulnerable; do not present this as post-quantum safe.');
  }

  if (warnings.length === 0) return null;

  return (
    <WarningBox>
      <ul className="warningBox__list">
        {warnings.map((warning) => (
          <li key={warning}>{warning}</li>
        ))}
      </ul>
    </WarningBox>
  );
}
