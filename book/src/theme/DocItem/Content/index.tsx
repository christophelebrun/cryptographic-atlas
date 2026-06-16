import React from 'react';
import OriginalContent from '@theme-original/DocItem/Content';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocumentRiskWarnings from '../../../components/DocumentRiskWarnings';
import ReviewStatusPanel from '../../../components/ReviewStatusPanel';

export default function DocItemContentWrapper(props: object): JSX.Element {
  const {frontMatter, metadata} = useDoc();
  const reviewFrontMatter = frontMatter as {
    confidence_model?: {type?: string};
    maturity?: string;
    post_quantum_posture?: string;
    review?: Parameters<typeof ReviewStatusPanel>[0]['review'];
  };

  return (
    <>
      <DocumentRiskWarnings frontMatter={reviewFrontMatter} permalink={metadata.permalink} />
      <ReviewStatusPanel review={reviewFrontMatter.review} />
      <OriginalContent {...props} />
    </>
  );
}
