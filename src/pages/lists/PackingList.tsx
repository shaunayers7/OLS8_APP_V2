import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DEFAULT_PACKING_ITEMS, PACKING_CATEGORIES, type PackingItem } from '../../data/packingList';

interface CheckedState { [id: string]: boolean }

let _uid = 0;
const uid = () => `custom_${Date.now()}_${_uid++}`;

export default function PackingList() {
  const [items, setItems] = useLocalStorage<PackingItem[]>('ols8_packing', DEFAULT_PACKING_ITEMS);
  const [checked, setChecked] = useLocalStorage<CheckedState>('ols8_packing_checked', {});
  const [newLabel, setNewLabel] = useState('');
  const [newCat, setNewCat] = useState(PACKING_CATEGORIES[0]);
  const [adding, setAdding] = useState(false);
  const [filterCat, setFilterCat] = useState('All');

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const addItem = () => {
    if (!newLabel.trim()) return;
    setItems(prev => [...prev, { id: uid(), label: newLabel.trim(), category: newCat }]);
    setNewLabel('');
    setAdding(false);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    setChecked(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const cats = ['All', ...PACKING_CATEGORIES];
  const visible = items.filter(i => filterCat === 'All' || i.category === filterCat);
  const doneCount = visible.filter(i => checked[i.id]).length;

  const resetAll = () => setChecked({});

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Category scroll filter */}
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

      {/* Progress */}
      <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          {doneCount} / {visible.length} packed
        </span>
        <button onClick={resetAll} className="btn btn--ghost" style={{ fontSize: '0.65rem', padding: '4px 10px' }}>Reset</button>
      </div>
      <div style={{ height: 3, background: 'var(--border)', margin: '0 16px' }}>
        <div style={{ height: '100%', background: 'var(--green)', width: `${visible.length ? (doneCount / visible.length) * 100 : 0}%`, transition: 'width 0.3s', borderRadius: 2 }} />
      </div>

      {/* List */}
      <div className="page-content" style={{ paddingTop: 10 }}>
        {PACKING_CATEGORIES.filter(c => filterCat === 'All' || c === filterCat).map(cat => {
          const catItems = visible.filter(i => i.category === cat);
          if (!catItems.length) return null;
          return (
            <div key={cat}>
              <div className="section-head"><h2>{cat}</h2></div>
              {catItems.map(item => (
                <div key={item.id} className={`check-row ${checked[item.id] ? 'check-row--done' : ''}`} onClick={() => toggle(item.id)}>
                  <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggle(item.id)} onClick={e => e.stopPropagation()} />
                  <span className="check-label" style={{ flex: 1, fontSize: '0.88rem' }}>{item.label}</span>
                  {!item.default && (
                    <button onClick={e => { e.stopPropagation(); removeItem(item.id); }} style={{ background: 'none', border: 'none', color: 'var(--text-faint)', fontSize: '1rem', cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}>×</button>
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {/* Add item form */}
        {adding ? (
          <div className="card" style={{ marginTop: 16 }}>
            <input
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              placeholder="Item description"
              style={{ marginBottom: 10 }}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && addItem()}
            />
            <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{ marginBottom: 12 }}>
              {PACKING_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn--primary btn--full" onClick={addItem}>Add</button>
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
