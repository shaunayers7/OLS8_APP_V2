import React, { useState } from 'react';
import { useTasks, type TaskStatus, type TaskSquad } from '../../hooks/useTasks';
import { useProfile } from '../../hooks/useProfile';
import { supabaseConfigured } from '../../lib/supabase';
import type { Task } from '../../hooks/useTasks';

const STATUS_CONFIG: Record<TaskStatus, { label: string; cls: string; next: TaskStatus[] }> = {
  pending:   { label: 'Pending',   cls: 'badge--pending',   next: ['inplay', 'cancelled'] },
  inplay:    { label: 'In Play',   cls: 'badge--inplay',    next: ['completed', 'failed', 'cancelled'] },
  completed: { label: 'Completed', cls: 'badge--done',      next: [] },
  cancelled: { label: 'Cancelled', cls: 'badge--cancelled', next: [] },
  failed:    { label: 'Failed',    cls: 'badge--failed',    next: [] },
};

const SQUAD_LABELS: Record<TaskSquad, string> = {
  spectre: 'SPECTRE',
  subsquad: 'SUB-SQUAD',
  both: 'ALL UNITS',
};

interface NewTaskForm {
  title: string;
  description: string;
  assigned_to: TaskSquad;
}

export default function TaskBoard() {
  const { tasks, loading, createTask, updateTaskStatus, deleteTask } = useTasks();
  const { profile } = useProfile();
  const isAdmin = profile.role === 'admin';

  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState<NewTaskForm>({ title: '', description: '', assigned_to: 'both' });
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterSquad, setFilterSquad] = useState<'all' | TaskSquad>('all');

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    await createTask({
      title: form.title.trim(),
      description: form.description.trim(),
      status: 'pending',
      assigned_to: form.assigned_to,
      created_by: profile.callsign,
    });
    setForm({ title: '', description: '', assigned_to: 'both' });
    setShowNew(false);
  };

  const visibleTasks = tasks.filter(t =>
    filterSquad === 'all' || t.assigned_to === filterSquad || t.assigned_to === 'both'
  );

  const active   = visibleTasks.filter(t => t.status === 'pending' || t.status === 'inplay');
  const resolved = visibleTasks.filter(t => t.status === 'completed' || t.status === 'cancelled' || t.status === 'failed');

  if (!supabaseConfigured) {
    return (
      <div className="page-content">
        <div className="card card--amber" style={{ textAlign: 'center', padding: 24 }}>
          <p style={{ fontFamily: 'var(--font-head)', fontSize: '0.85rem', color: 'var(--amber)', marginBottom: 8 }}>SUPABASE NOT CONFIGURED</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
            Create a <code>.env</code> file with your Supabase URL and anon key to enable real-time task sync.<br />
            See <code>.env.example</code> for the required variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Filter */}
      <div style={{ display: 'flex', gap: 6, padding: '8px 16px', borderBottom: '1px solid var(--border)', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {(['all', 'spectre', 'subsquad', 'both'] as const).map(f => (
          <button key={f} onClick={() => setFilterSquad(f)} style={{
            whiteSpace: 'nowrap', background: filterSquad === f ? 'var(--olive)' : 'var(--bg-card)',
            color: filterSquad === f ? '#fff' : 'var(--text-dim)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '5px 12px', fontFamily: 'var(--font-head)', fontSize: '0.62rem',
            letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
          }}>
            {f === 'all' ? 'All' : SQUAD_LABELS[f as TaskSquad]}
          </button>
        ))}
      </div>

      <div className="page-content" style={{ paddingTop: 12 }}>
        {loading && <p style={{ color: 'var(--text-dim)', textAlign: 'center', padding: 24 }}>Loading tasks...</p>}

        {!loading && active.length === 0 && (
          <div className="empty"><div className="empty-icon">🎯</div>No active tasks</div>
        )}

        {active.map(task => (
          <TaskCard key={task.id} task={task} expanded={expanded === task.id} onToggle={() => setExpanded(expanded === task.id ? null : task.id)} onStatus={updateTaskStatus} onDelete={deleteTask} isAdmin={isAdmin} />
        ))}

        {resolved.length > 0 && (
          <>
            <div className="section-head"><h2>Resolved</h2></div>
            {resolved.map(task => (
              <TaskCard key={task.id} task={task} expanded={expanded === task.id} onToggle={() => setExpanded(expanded === task.id ? null : task.id)} onStatus={updateTaskStatus} onDelete={deleteTask} isAdmin={isAdmin} />
            ))}
          </>
        )}
      </div>

      {isAdmin && (
        <button className="fab" onClick={() => setShowNew(true)} title="Create task">+</button>
      )}

      {showNew && (
        <div className="overlay" onClick={() => setShowNew(false)}>
          <div className="sheet slide-up" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <h2 style={{ marginBottom: 16 }}>New Objective</h2>
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Objective title" style={{ marginBottom: 10 }} autoFocus />
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Details / briefing notes..." rows={3} style={{ marginBottom: 10, resize: 'none' }} />
            <select value={form.assigned_to} onChange={e => setForm(p => ({ ...p, assigned_to: e.target.value as TaskSquad }))} style={{ marginBottom: 16 }}>
              <option value="both">All Units</option>
              <option value="spectre">Spectre Only</option>
              <option value="subsquad">Sub-Squad Only</option>
            </select>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn--amber btn--full" onClick={handleCreate}>Deploy Objective</button>
              <button className="btn btn--ghost" onClick={() => setShowNew(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, expanded, onToggle, onStatus, onDelete, isAdmin }: {
  task: Task;
  expanded: boolean;
  onToggle: () => void;
  onStatus: (id: string, s: TaskStatus) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}) {
  const cfg = STATUS_CONFIG[task.status];
  return (
    <div className="card" style={{ marginBottom: 8, borderLeft: `3px solid ${task.status === 'inplay' ? 'var(--green)' : task.status === 'pending' ? 'var(--amber)' : task.status === 'failed' ? 'var(--orange)' : 'var(--gray)'}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={onToggle}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-head)', fontSize: '0.88rem', marginBottom: 4 }}>{task.title}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className={`badge ${cfg.cls}`}>{cfg.label}</span>
            <span className="badge" style={{ background: 'rgba(74,92,58,0.15)', color: 'var(--olive-lt)', border: '1px solid rgba(74,92,58,0.3)' }}>
              {SQUAD_LABELS[task.assigned_to]}
            </span>
          </div>
        </div>
        <span style={{ color: 'var(--text-faint)', fontSize: '0.8rem', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
      </div>

      {expanded && (
        <div className="fade-in" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          {task.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: 12, lineHeight: 1.6 }}>{task.description}</p>}
          <p style={{ fontSize: '0.68rem', color: 'var(--text-faint)', marginBottom: 12 }}>
            Issued by {task.created_by} · {new Date(task.created_at).toLocaleDateString()}
          </p>
          {isAdmin && cfg.next.length > 0 && (
            <div className="status-row" style={{ marginBottom: 8 }}>
              {cfg.next.map(s => (
                <button key={s} className={`btn badge ${STATUS_CONFIG[s].cls}`} style={{ cursor: 'pointer', padding: '5px 12px', fontSize: '0.72rem' }} onClick={() => onStatus(task.id, s)}>
                  → {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>
          )}
          {isAdmin && (
            <button onClick={() => onDelete(task.id)} className="btn btn--ghost" style={{ fontSize: '0.68rem', color: 'var(--red)', borderColor: 'var(--red)', padding: '4px 10px', marginTop: 4 }}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
