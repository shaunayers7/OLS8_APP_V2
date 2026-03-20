import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';

// OLS8 Day 1 game start — update when official schedule confirmed
const EVENT_START = new Date('2026-07-11T09:00:00');

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const total = Math.max(0, diff);
  const days   = Math.floor(total / 86400000);
  const hours  = Math.floor((total % 86400000) / 3600000);
  const mins   = Math.floor((total % 3600000) / 60000);
  const secs   = Math.floor((total % 60000) / 1000);
  return { days, hours, mins, secs, past: diff <= 0 };
}

const TILES = [
  { label: 'Lists',    icon: '☰',  path: '/lists',        color: 'var(--olive)' },
  { label: 'Ops',      icon: '⚡', path: '/ops',          color: 'var(--amber)' },
  { label: 'Team',     icon: '◉',  path: '/team',         color: 'var(--olive)' },
  { label: 'Radio',    icon: '📡', path: '/ref#radio',    color: 'var(--olive)' },
  { label: 'Rules',    icon: '📋', path: '/ref#rules',    color: 'var(--olive)' },
  { label: 'FPS Calc', icon: '🔫', path: '/ref#fps',      color: 'var(--olive)' },
  { label: 'Schedule', icon: '📅', path: '/ops#schedule', color: 'var(--olive)' },
  { label: 'FCU Calc', icon: '#',  path: '/ref#fcu',      color: 'var(--olive)' },
];

export default function Dashboard() {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const cd = useCountdown(EVENT_START);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="page-content">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <img
            src="/images/New_Spectre_Patch-removebg-preview.svg"
            alt="Spectre"
            style={{ width: 44, height: 44 }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div>
            <h1 style={{ fontSize: '1rem', lineHeight: 1.2 }}>OLS8</h1>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              SPECTRE — {profile.callsign || 'OPERATOR'}
            </p>
          </div>
          <img
            src="/images/OLS8 R&R.png"
            alt="OLS8"
            style={{ width: 44, height: 44, marginLeft: 'auto', objectFit: 'contain' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        {/* Countdown */}
        <div className="card card--amber" style={{ marginBottom: 16 }}>
          <h3 style={{ marginBottom: 10, fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            {cd.past ? '🟢 EVENT IS LIVE' : '⏱ GAME ON COUNTDOWN'}
          </h3>
          {!cd.past && (
            <div className="countdown">
              {[{ n: cd.days, l: 'Days' }, { n: cd.hours, l: 'Hrs' }, { n: cd.mins, l: 'Min' }, { n: cd.secs, l: 'Sec' }].map(u => (
                <div key={u.l} className="countdown-unit">
                  <span className="countdown-num">{String(u.n).padStart(2, '0')}</span>
                  <span className="countdown-label">{u.l}</span>
                </div>
              ))}
            </div>
          )}
          <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textAlign: 'center' }}>
            OLS8 · Saskatchewan, Canada · July 2026
          </p>
        </div>

        {/* Nav tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {TILES.map(t => (
            <button
              key={t.path}
              onClick={() => navigate(t.path)}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 8,
                cursor: 'pointer',
                border: 'none',
                borderLeft: `3px solid ${t.color}`,
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
              <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.75rem', color: 'var(--text)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {/* Spectre motto */}
        <p style={{ textAlign: 'center', marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)', letterSpacing: '0.1em' }}>
          SPECTRE — SILENT · LETHAL · PRECISE
        </p>
      </div>
    </div>
  );
}
