import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import PackingList from './lists/PackingList';
import PurchaseList from './lists/PurchaseList';
import TodoList from './lists/TodoList';
import PrintList from './lists/PrintList';

const SUBTABS = [
  { id: 'packing',   label: 'Packing' },
  { id: 'purchase',  label: 'Purchase' },
  { id: 'todo',      label: 'To-Do' },
  { id: 'print',     label: '3D Print' },
];

export default function Lists() {
  const location = useLocation();
  const navigate = useNavigate();
  const hash = location.hash.replace('#', '') || 'packing';
  const [tab, setTab] = useState(hash);

  const switchTab = (id: string) => {
    setTab(id);
    navigate(`/lists#${id}`, { replace: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PageHeader icon="☰" title="Lists" />
      <div className="sub-tabs">
        {SUBTABS.map(t => (
          <button
            key={t.id}
            className={`sub-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => switchTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {tab === 'packing'  && <PackingList />}
        {tab === 'purchase' && <PurchaseList />}
        {tab === 'todo'     && <TodoList />}
        {tab === 'print'    && <PrintList />}
      </div>
    </div>
  );
}
