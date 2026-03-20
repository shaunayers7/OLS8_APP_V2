import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import FPSCalculator from './ref/FPSCalculator';
import FCUCalculator from './ref/FCUCalculator';
import RadioReference from './ref/RadioReference';
import Rules from './ref/Rules';
import QuickRef from './ref/QuickRef';

const SUBTABS = [
  { id: 'radio',   label: 'Radio' },
  { id: 'rules',   label: 'Rules' },
  { id: 'fps',     label: 'FPS/J' },
  { id: 'fcu',     label: 'FCU Hex' },
  { id: 'quickref',label: 'Quick Ref' },
];

export default function Ref() {
  const location = useLocation();
  const navigate = useNavigate();
  const hash = location.hash.replace('#', '') || 'radio';
  const [tab, setTab] = useState(hash);

  const switchTab = (id: string) => {
    setTab(id);
    navigate(`/ref#${id}`, { replace: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PageHeader icon="📡" title="Reference" />
      <div className="sub-tabs">
        {SUBTABS.map(t => (
          <button key={t.id} className={`sub-tab ${tab === t.id ? 'active' : ''}`} onClick={() => switchTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {tab === 'radio'    && <RadioReference />}
        {tab === 'rules'    && <Rules />}
        {tab === 'fps'      && <FPSCalculator />}
        {tab === 'fcu'      && <FCUCalculator />}
        {tab === 'quickref' && <QuickRef />}
      </div>
    </div>
  );
}
