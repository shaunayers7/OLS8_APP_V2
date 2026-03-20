import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import TaskBoard from './ops/TaskBoard';
import Schedule from './ops/Schedule';

const SUBTABS = [
  { id: 'tasks',    label: 'Task Board' },
  { id: 'schedule', label: 'Schedule' },
];

export default function Ops() {
  const location = useLocation();
  const navigate = useNavigate();
  const hash = location.hash.replace('#', '') || 'tasks';
  const [tab, setTab] = useState(hash);

  const switchTab = (id: string) => {
    setTab(id);
    navigate(`/ops#${id}`, { replace: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PageHeader icon="⚡" title="Operations" />
      <div className="sub-tabs">
        {SUBTABS.map(t => (
          <button key={t.id} className={`sub-tab ${tab === t.id ? 'active' : ''}`} onClick={() => switchTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {tab === 'tasks'    && <TaskBoard />}
        {tab === 'schedule' && <Schedule />}
      </div>
    </div>
  );
}
