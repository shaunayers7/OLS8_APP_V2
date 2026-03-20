import React, { useState } from 'react';
import { GUN_CLASSES, COMMON_BB_WEIGHTS, calculateJoules, fpsFromJoules } from '../../data/fpsData';

export default function FPSCalculator() {
  const [fps, setFps] = useState('');
  const [bbGrams, setBbGrams] = useState('0.25');
  const [gunClass, setGunClass] = useState('aeg');
  const [mode, setMode] = useState<'fps2j' | 'j2fps'>('fps2j');

  const [jouleInput, setJouleInput] = useState('');

  const cls = GUN_CLASSES.find(g => g.id === gunClass)!;
  const bbG = parseFloat(bbGrams) || 0.25;
  const fpsNum = parseFloat(fps) || 0;
  const jouleNum = parseFloat(jouleInput) || 0;

  const resultJoules = mode === 'fps2j' ? calculateJoules(fpsNum, bbG) : 0;
  const resultFps    = mode === 'j2fps' ? fpsFromJoules(jouleNum, bbG) : 0;
  const displayJ     = mode === 'fps2j' ? resultJoules : jouleNum;
  const displayFPS   = mode === 'fps2j' ? fpsNum : resultFps;

  const pass = displayJ > 0 && displayJ <= cls.maxJoules;
  const fail = displayJ > 0 && displayJ > cls.maxJoules;

  return (
    <div className="page-content">
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button className={`btn btn--full ${mode === 'fps2j' ? 'btn--primary' : 'btn--ghost'}`} onClick={() => setMode('fps2j')}>FPS → Joules</button>
        <button className={`btn btn--full ${mode === 'j2fps' ? 'btn--primary' : 'btn--ghost'}`} onClick={() => setMode('j2fps')}>Joules → FPS</button>
      </div>

      {/* Gun class */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Gun Class</label>
        <select value={gunClass} onChange={e => setGunClass(e.target.value)}>
          {GUN_CLASSES.map(g => <option key={g.id} value={g.id}>{g.label} (max {g.maxFPS}fps / {g.maxJoules}J)</option>)}
        </select>
      </div>

      {/* BB weight */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>BB Weight</label>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {COMMON_BB_WEIGHTS.map(w => (
            <button key={w} onClick={() => setBbGrams(String(w))} style={{
              whiteSpace: 'nowrap', background: bbGrams === String(w) ? 'var(--amber)' : 'var(--bg-card)',
              color: bbGrams === String(w) ? '#000' : 'var(--text-dim)', border: '1px solid var(--border)',
              borderRadius: 6, padding: '5px 10px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', cursor: 'pointer', minWidth: 48,
            }}>{w}g</button>
          ))}
        </div>
      </div>

      {/* Input */}
      {mode === 'fps2j' ? (
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>FPS (feet per second)</label>
          <input type="number" value={fps} onChange={e => setFps(e.target.value)} placeholder="e.g. 380" inputMode="numeric" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', textAlign: 'center' }} />
        </div>
      ) : (
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Joules</label>
          <input type="number" value={jouleInput} onChange={e => setJouleInput(e.target.value)} placeholder="e.g. 1.49" inputMode="decimal" step="0.01" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', textAlign: 'center' }} />
        </div>
      )}

      {/* Result */}
      {(fpsNum > 0 || jouleNum > 0) && (
        <div className={`fps-result ${pass ? 'pass' : fail ? 'fail' : ''}`}>
          {mode === 'fps2j' ? (
            <>
              <div className="fps-joule-value">{resultJoules.toFixed(3)}J</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: 8 }}>{fpsNum} fps · {bbG}g</div>
            </>
          ) : (
            <>
              <div className="fps-joule-value">{resultFps.toFixed(0)} fps</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: 8 }}>{jouleNum}J · {bbG}g</div>
            </>
          )}
          {(pass || fail) && (
            <span style={{ fontFamily: 'var(--font-head)', fontSize: '1rem', color: pass ? 'var(--green)' : 'var(--red)' }}>
              {pass ? '✓ PASS' : '✗ FAIL'}
            </span>
          )}
          {fail && <span style={{ fontSize: '0.75rem', color: 'var(--red)', marginTop: 4 }}>Exceeds {cls.label} limit of {cls.maxJoules}J</span>}
        </div>
      )}

      {/* Class table */}
      <div style={{ marginTop: 24 }}>
        <div className="section-head" style={{ marginBottom: 10 }}><h2>OLS8 CLASS LIMITS</h2></div>
        {GUN_CLASSES.map(g => (
          <div key={g.id} className={`card ${gunClass === g.id ? 'card--amber' : ''}`} onClick={() => setGunClass(g.id)} style={{ cursor: 'pointer', padding: '10px 14px', marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.8rem' }}>{g.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--amber)' }}>{g.maxFPS}fps / {g.maxJoules}J</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              <span>MED: {g.minEngagement}</span>
              <span>Min BB: {g.bbWeightMin}</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: 4 }}>{g.notes}</p>
          </div>
        ))}
        <p style={{ fontSize: '0.68rem', color: 'var(--text-faint)', marginTop: 8, textAlign: 'center' }}>
          * Limits sourced from OLS Rules 9.6.pdf — verify at chrono
        </p>
      </div>
    </div>
  );
}
