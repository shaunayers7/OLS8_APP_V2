import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface TodoItem { id: string; label: string; done: boolean; created: number; }

let _uid = 0;
const uid = () => `todo_${Date.now()}_${_uid++}`;

export default function TodoList() {
  const [items, setItems] = useLocalStorage<TodoItem[]>('ols8_todo', []);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setItems(prev => [{ id: uid(), label: text.trim(), done: false, created: Date.now() }, ...prev]);
    setText('');
  };
  const toggle = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const remove  = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const clearDone = () => setItems(prev => prev.filter(i => !i.done));

  const active = items.filter(i => !i.done);
  const done   = items.filter(i => i.done);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a personal to-do..."
          onKeyDown={e => e.key === 'Enter' && add()}
          style={{ flex: 1 }}
        />
        <button className="btn btn--amber" onClick={add} style={{ whiteSpace: 'nowrap', padding: '8px 14px' }}>+ Add</button>
      </div>
      <div className="page-content" style={{ paddingTop: 10 }}>
        {items.length === 0 && <div className="empty"><div className="empty-icon">✅</div>All clear, nothing to do</div>}

        {active.map(item => (
          <div key={item.id} className="check-row" onClick={() => toggle(item.id)}>
            <input type="checkbox" checked={false} onChange={() => toggle(item.id)} onClick={e => e.stopPropagation()} />
            <span style={{ flex: 1, fontSize: '0.88rem' }}>{item.label}</span>
            <button onClick={e => { e.stopPropagation(); remove(item.id); }} style={{ background: 'none', border: 'none', color: 'var(--text-faint)', fontSize: '1rem', cursor: 'pointer', padding: '0 4px' }}>×</button>
          </div>
        ))}

        {done.length > 0 && (
          <>
            <div className="section-head" style={{ marginTop: 16 }}>
              <h2>Completed</h2>
              <button className="btn btn--ghost" onClick={clearDone} style={{ fontSize: '0.65rem', padding: '4px 10px' }}>Clear</button>
            </div>
            {done.map(item => (
              <div key={item.id} className="check-row check-row--done" onClick={() => toggle(item.id)}>
                <input type="checkbox" checked={true} onChange={() => toggle(item.id)} onClick={e => e.stopPropagation()} />
                <span className="check-label" style={{ flex: 1, fontSize: '0.88rem' }}>{item.label}</span>
                <button onClick={e => { e.stopPropagation(); remove(item.id); }} style={{ background: 'none', border: 'none', color: 'var(--text-faint)', fontSize: '1rem', cursor: 'pointer', padding: '0 4px' }}>×</button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
