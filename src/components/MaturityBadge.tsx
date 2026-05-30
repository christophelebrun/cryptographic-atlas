import React from 'react';

export type Maturity =
  | 'deployed'
  | 'mature'
  | 'emerging'
  | 'research'
  | 'theoretical'
  | 'not-applicable';

const labels: Record<Maturity, string> = {
  deployed: 'Deployed',
  mature: 'Mature',
  emerging: 'Emerging',
  research: 'Research',
  theoretical: 'Theoretical',
  'not-applicable': 'N/A',
};

export default function MaturityBadge({
  maturity,
}: {
  maturity: Maturity;
}): JSX.Element {
  return (
    <span className={`maturityBadge maturityBadge--${maturity}`}>
      {labels[maturity]}
    </span>
  );
}
