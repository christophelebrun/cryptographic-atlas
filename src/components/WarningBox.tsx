import React, {type ReactNode} from 'react';

export default function WarningBox({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <aside className="warningBox" role="note">
      <strong>Warning.</strong> {children}
    </aside>
  );
}
