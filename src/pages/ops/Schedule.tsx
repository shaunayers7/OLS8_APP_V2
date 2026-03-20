import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DEFAULT_SCHEDULE, DAY_LABELS, type ScheduleItem } from '../../data/scheduleData';
import { useProfile } from '../../hooks/useProfile';

export default function Schedule() {
  const { profile } = useProfile();
  const isAdmin = profile.role === 'admin';
  const [items, setItems] = useLocalStorage<ScheduleItem[]>('ols8_schedule', DEFAULT_SCHEDULE);
  const [editing, setEditing] = useState<ScheduleItem | null>(null);
  const [activeDay, setActiveDay] = useState<string>('all');

  const days = ['all', 'pre', 'day1', 'day2', 'post'];
  const visible = items.filter(i => activeDay === 'all' || i.day === activeDay);

  const saveEdit = () => {
    if (!editing) return;
    setItems(prev => prev.map(i => i.id === editing.id ? editing : i));
    setEditing(null);
  };

  const isGameOn = (title: string) => title.toLowerCase().includes('game on');
  const isGameOff = (title: string) => title.toLowerCase().includes('game off') || title.toLowerCase().includes('final');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', overflowX: 'auto', gap: 6, padding: '8px 16px', borderBottom: '1px solid var(--border)', scrollbarWidth: 'none' }}>
        {days.map(d => (
          <button key={d} onClick={() => setActiveDay(d)} style={{
            whiteSpace: 'nowrap', background: activeDay === d ? 'var(--olive)' : 'var(--bg-card)',
            color: activeDay === d ? '#fff' : 'var(--text-dim)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '5px 12px', fontFamily: 'var(--font-head)', fontSize: '0.62rem',
            letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
          }}>{d === 'all' ? 'All' : DAY_LABELS[d]?.split('—')[0]?.trim() || d}</button>
        ))}
      </div>

      <div className="page-content" style={{ paddingTop: 16 }}>
        {Object.entries(DAY_LABELS).filter(([k]) => activeDay === 'all' || activeDay === k).map(([day, dayLabel]) => {
          const dayItems = visible.filter(i => i.day === day);
          if (!dayItems.length) return null;
          return (
            <div key={day} style={{ marginBottom: 24 }}>
              <div style={{ marginBottom: 14 }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '0.75rem', color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{dayLabel}</h2>
                <div style={{ height: 1, background: 'var(--border)', marginTop: 6 }} />
              </div>
              {dayItems.map(item => (
                <div key={item.id} className="timeline-item">
                  <div className={`timeline-dot ${isGameOn(item.title) ? 'active' : ''}`} style={{
                    borderColor: isGameOn(item.title) ? 'var(--green)' : isGameOff(item.title) ? 'var(--red)' : 'var(--olive)',
                    background: isGameOn(item.title) ? 'rgba(76,175,80,0.15)' : isGameOff(item.title) ? 'rgba(198,40,40,0.1)' : 'var(--bg-card)',
                  }}>
                    {item.emoji}
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-time">{item.time === 'TBD' ? '⏰ TIME TBD' : item.time}</div>
                    <div className="timeline-title">{item.title}</div>
                    {item.notes && <div className="timeline-note">{item.notes}</div>}
                    {isAdmin && (
                      <button onClick={() => setEditing({ ...item })} style={{ marginTop: 6, background: 'none', border: 'none', color: 'var(--text-faint)', fontSize: '0.68rem', cursor: 'pointer', fontFamily: 'var(--font-head)', letterSpacing: '0.04em', textTransform: 'uppercase', padding: 0 }}>
                        ✎ Edit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {editing && (
        <div className="overlay" onClick={() => setEditing(null)}>
          <div className="sheet slide-up" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <h2 style={{ marginBottom: 14 }}>Edit Schedule Item</h2>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginBottom: 4, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Time</label>
            <input value={editing.time} onChange={e => setEditing(p => p ? { ...p, time: e.target.value } : null)} placeholder="e.g. 09:00" style={{ marginBottom: 10 }} />
            <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginBottom: 4, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Title</label>
            <input value={editing.title} onChange={e => setEditing(p => p ? { ...p, title: e.target.value } : null)} style={{ marginBottom: 10 }} />
            <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginBottom: 4, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Notes</label>
            <textarea value={editing.notes} onChange={e => setEditing(p => p ? { ...p, notes: e.target.value } : null)} rows={3} style={{ marginBottom: 16, resize: 'none' }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn--amber btn--full" onClick={saveEdit}>Save</button>
              <button className="btn btn--ghost" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
