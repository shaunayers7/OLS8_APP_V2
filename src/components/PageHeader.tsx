import React from 'react';

interface Props {
  icon: string;
  title: string;
  right?: React.ReactNode;
}

export default function PageHeader({ icon, title, right }: Props) {
  return (
    <div className="page-header">
      <span className="page-header-icon">{icon}</span>
      <h1 style={{ flex: 1 }}>{title}</h1>
      {right}
    </div>
  );
}
