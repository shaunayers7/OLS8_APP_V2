import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DEFAULT_PRINT_ITEMS, PRINT_CATEGORIES, type PrintItem } from '../../data/printList';

interface PrintState { [id: string]: boolean }

let _uid = 0;
const uid = () => `prt_${Date.now()}_${_uid++}`;

export default function PrintList() {
  const [items, setItems] = useLocalStorage<PrintItem[]>('ols8_print', DEFAULT_PRINT_ITEMS);
  const [printed, setPrinted] = useLocalStorage<PrintState>('ols8_print_done', {});
  const [filterCat, setFilterCat] = useState('All');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ label: '', category: PRINT_CATEGORIES[0], quantity: '1', assignedTo: 'either' as PrintItem['assignedTo'], filament: '', notes: '' });

  const toggle = (id: string) => setPrinted(prev => ({ ...prev, [id]: !prev[id] }));
  const remove  = (id: string) => { setItems(prev => prev.filter(i => i.id !== id)); setPrinted(prev => { const n = { ...prev }; delete n[id]; return n; }); };

  const addItem = () => {
    if (!form.label.trim()) return;
    setItems(prev => [...prev, { id: uid(), label: form.label.trim(), category: form.category, quantity: Number(form.quantity) || 1, assignedTo: form.assignedTo, filament: form.filament, notes: form.notes }]);
    setForm({ label: '', category: PRINT_CATEGORIES[0], quantity: '1', assignedTo: 'either', filament: '', notes: '' });
    setAdding(false);
  };

  const cats = ['All', ...PRINT_CATEGORIES];
  const visible = items.filter(i => filterCat === 'All' || i.category === filterCat);
  const doneCount = visible.filter(i => printed[i.id]).length;

  const assignColor = (a: string) => a === 'FOX' ? 'var(--amber)' : a === 'COLDSMOKE' ? 'var(--olive-lt)' : 'var(--text-faint)';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', overflowX: 'auto', gap: 6, padding: '8px 16px', borderBottom: '1px solid var(--border)', scrollbarWidth: 'none' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilterCat(c)} style={{
            whiteSpace: 'nowrap', background: filterCat === c ? 'var(--olive)' : 'var(--bg-card)',
            color: filterCat === c ? '#fff' : 'var(--text-dim)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '5px 12px', fontFamily: 'var(--font-head)', fontSize: '0.62rem',
            letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>
      <div style={{ padding: '6px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>{doneCount}/{visible.length} printed</span>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-faint)' }}>
          <span style={{ color: 'var(--amber)' }}>■</span> FOX&nbsp;&nbsp;<span style={{ color: 'var(--olive-lt)' }}>■</span> COLDSMOKE
        </span>
      </div>
      <div className="page-content" style={{ paddingTop: 10 }}>
        {PRINT_CATEGORIES.filter(c => filterCat === 'All' || c === filterCat).map(cat => {
          const catItems = visible.filter(i => i.category === cat);
          if (!catItems.length) return null;
          return (
            <div key={cat}>
              <div className="section-head"><h2>{cat}</h2></div>
              {catItems.map(item => (
                <div key={item.id} className={`check-row ${printed[item.id] ? 'check-row--done' : ''}`} onClick={() => toggle(item.id)}>
                  <input type="checkbox" checked={!!printed[item.id]} onChange={() => toggle(item.id)} onClick={e => e.stopPropagation()} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span className="check-label" style={{ fontSize: '0.85rem', display: 'block' }}>{item.label}</span>
                    <div style={{ display: 'flex', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)' }}>×{item.quantity}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: assignColor(item.assignedTo) }}>{item.assignedTo.toUpperCase()}</span>
                      {item.filament && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)' }}>{item.filament}</span>}
                    </div>
                    {item.notes && <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)', fontStyle: 'italic' }}>{item.notes}</span>}
                  </div>
                  <button onClick={e => { e.stopPropagation(); remove(item.id); }} style={{ background: 'none', border: 'none', color: 'var(--text-faint)', fontSize: '1rem', cursor: 'pointer', padding: '0 4px' }}>×</button>
                </div>
              ))}
            </div>
          );
        })}

        {adding ? (
          <div className="card" style={{ marginTop: 16 }}>
            <input value={form.label} onChange={e => setForm(p => ({ ...p, label: e.target.value }))} placeholder="Part to print" style={{ marginBottom: 8 }} autoFocus />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {PRINT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input value={form.quantity} onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))} placeholder="Qty" type="number" min="1" />
            </div>
            <select value={form.assignedTo} onChange={e => setForm(p => ({ ...p, assignedTo: e.target.value as PrintItem['assignedTo'] }))} style={{ marginBottom: 8 }}>
              <option value="either">FOX or COLDSMOKE</option>
              <option value="FOX">FOX</option>
              <option value="COLDSMOKE">COLDSMOKE</option>
            </select>
            <input value={form.filament} onChange={e => setForm(p => ({ ...p, filament: e.target.value }))} placeholder="Filament (optional)" style={{ marginBottom: 8 }} />
            <input value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Notes (optional)" style={{ marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn--primary btn--full" onClick={addItem}>Add</button>
              <button className="btn btn--ghost" onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button className="fab" onClick={() => setAdding(true)} title="Add print item">+</button>
        )}
      </div>
    </div>
  );
}
