import React from 'react';

type ReviewDimension = {
  status?: string;
  last_reviewed?: string | null;
  next_review_due?: string | null;
  reviewer?: string | null;
};

export type ReviewMetadata = {
  structural?: ReviewDimension;
  sources?: ReviewDimension;
  expert?: ReviewDimension;
};

function humanize(value: string | null | undefined): string {
  if (!value) return 'Unknown';
  return value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function dateLabel(value: string | null | undefined): string {
  return value || 'not recorded';
}

function ReviewItem({
  label,
  dimension,
  detail,
}: {
  label: string;
  dimension?: ReviewDimension;
  detail?: string;
}): JSX.Element {
  const status = dimension?.status || 'unknown';

  return (
    <div className="reviewStatusPanel__item">
      <dt>{label}</dt>
      <dd>
        <span className={`reviewStatusPanel__badge reviewStatusPanel__badge--${status}`}>{humanize(status)}</span>
        <span className="reviewStatusPanel__meta">
          Last reviewed: {dateLabel(dimension?.last_reviewed)}
          {dimension?.next_review_due ? ` · Next due: ${dimension.next_review_due}` : ''}
          {detail ? ` · ${detail}` : ''}
        </span>
      </dd>
    </div>
  );
}

export default function ReviewStatusPanel({review}: {review?: ReviewMetadata}): JSX.Element | null {
  if (!review) return null;

  const expertDetail =
    review.expert?.status === 'reviewed' && review.expert.reviewer
      ? `Reviewer: ${review.expert.reviewer}`
      : 'No named expert reviewer recorded';

  return (
    <aside className="reviewStatusPanel" aria-label="Review status">
      <h2>Review Status</h2>
      <dl>
        <ReviewItem label="Structural" dimension={review.structural} />
        <ReviewItem label="Sources" dimension={review.sources} />
        <ReviewItem label="Expert" dimension={review.expert} detail={expertDetail} />
      </dl>
    </aside>
  );
}
