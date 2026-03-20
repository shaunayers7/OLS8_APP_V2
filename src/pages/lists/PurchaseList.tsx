import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface PurchaseItem { id: string; label: string; qty: string; done: boolean; }

let _uid = 0;
const uid = () => `pur_${Date.now()}_${_uid++}`;

const DEFAULTS: PurchaseItem[] = [
  { id: 'pur_d1', label: 'Extra BBs (0.28g+ bag)', qty: '2 bags', done: false },
  { id: 'pur_d2', label: 'HPA tank fill / CO2 cartridges', qty: '', done: false },
  { id: 'pur_d3', label: 'Spare radio batteries (AA/AAA)', qty: '4+', done: false },
  { id: 'pur_d4', label: 'Electrolyte packets / Gatorade powder', qty: '1 box', done: false },
  { id: 'pur_d5', label: 'Sunscreen SPF 50+', qty: '1', done: false },
  { id: 'pur_d6', label: 'Bug repellent (DEET)', qty: '1', done: false },
  { id: 'pur_d7', label: 'Camp food / MREs for 2 days', qty: '2 days', done: false },
  { id: 'pur_d8', label: 'Ziplock bags (gear waterproofing)', qty: '1 box', done: false },
  { id: 'pur_d9', label: 'Duct tape', qty: '1 roll', done: false },
  { id: 'pur_d10', label: 'Cable ties / zip ties', qty: '50+', done: false },
];

export default function PurchaseList() {
  const [items, setItems] = useLocalStorage<PurchaseItem[]>('ols8_purchase', DEFAULTS);
  const [label, setLabel] = useState('');
  const [qty, setQty] = useState('');
  const [adding, setAdding] = useState(false);

  const toggle = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const remove  = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const add = () => {
    if (!label.trim()) return;
    setItems(prev => [...prev, { id: uid(), label: label.trim(), qty: qty.trim(), done: false }]);
    setLabel(''); setQty(''); setAdding(false);
  };

  const done  = items.filter(i => i.done).length;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          {done} / {items.length} purchased
        </span>
      </div>
      <div className="page-content" style={{ paddingTop: 10 }}>
        {items.length === 0 && <div className="empty"><div className="empty-icon">🛒</div>Nothing to buy yet</div>}
        {items.map(item => (
          <div key={item.id} className={`check-row ${item.done ? 'check-row--done' : ''}`} onClick={() => toggle(item.id)}>
            <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} onClick={e => e.stopPropagation()} />
            <span className="check-label" style={{ flex: 1, fontSize: '0.88rem' }}>{item.label}</span>
            {item.qty && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)', marginRight: 6 }}>{item.qty}</span>}
            <button onClick={e => { e.stopPropagation(); remove(item.id); }} style={{ background: 'none', border: 'none', color: 'var(--text-faint)', fontSize: '1rem', cursor: 'pointer', padding: '0 4px' }}>×</button>
          </div>
        ))}

        {adding ? (
          <div className="card" style={{ marginTop: 16 }}>
            <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Item to buy" style={{ marginBottom: 10 }} autoFocus onKeyDown={e => e.key === 'Enter' && add()} />
            <input value={qty} onChange={e => setQty(e.target.value)} placeholder="Qty (optional)" style={{ marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn--primary btn--full" onClick={add}>Add</button>
              <button className="btn btn--ghost" onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button className="fab" onClick={() => setAdding(true)} title="Add item">+</button>
        )}
      </div>
    </div>
  );
}
