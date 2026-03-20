import React, { useState } from 'react';
import { GUN_CLASSES, calculateJoules } from '../../data/fpsData';
import { UV5R_PROG_STEPS } from '../../data/radioChannels';

type Tab = 'fps' | 'radio' | 'chrono' | 'signals';

const TABS: { id: Tab; label: string }[] = [
  { id: 'fps',     label: 'FPS / Joules' },
  { id: 'radio',   label: 'UV-5R'        },
  { id: 'chrono',  label: 'Chrono'       },
  { id: 'signals', label: 'Signals'      },
];

function FpsCheatSheet() {
  const selectedWeights = [0.20, 0.25, 0.28, 0.32, 0.36];
  return (
    <div>
      <div className="section-head" style={{ marginBottom: 10 }}><h2>FPS → JOULES QUICK TABLE</h2></div>
      {GUN_CLASSES.map(g => (
        <div key={g.id} style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.78rem', color: 'var(--amber)', marginBottom: 6 }}>
            {g.label.toUpperCase()} — max {g.maxFPS}fps / {g.maxJoules}J
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-lift)' }}>
                    <th style={{ padding: '6px 8px', textAlign: 'left', color: 'var(--amber)', whiteSpace: 'nowrap' }}>FPS</th>
                    {selectedWeights.map(w => <th key={w} style={{ padding: '6px 8px', textAlign: 'right', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{w}g</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[g.maxFPS - 50, g.maxFPS - 25, g.maxFPS, g.maxFPS + 10].map(fps => {
                    const atLimit = fps === g.maxFPS;
                    const overLimit = fps > g.maxFPS;
                    return (
                      <tr key={fps} style={{ borderTop: '1px solid var(--border)', background: overLimit ? 'rgba(220,50,47,0.08)' : atLimit ? 'rgba(245,166,35,0.06)' : undefined }}>
                        <td style={{ padding: '6px 8px', color: overLimit ? 'var(--red)' : atLimit ? 'var(--amber)' : 'var(--text)' }}>{fps}</td>
                        {selectedWeights.map(w => {
                          const j = calculateJoules(fps, w);
                          const bad = j > g.maxJoules;
                          return <td key={w} style={{ padding: '6px 8px', textAlign: 'right', color: bad ? 'var(--red)' : 'var(--text-dim)' }}>{j.toFixed(3)}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
      <p style={{ fontSize: '0.68rem', color: 'var(--text-faint)', textAlign: 'center' }}>
        Formula: J = (mass_kg × (fps × 0.3048)²) / 2
      </p>
    </div>
  );
}

function RadioCheatSheet() {
  return (
    <div>
      <div className="section-head" style={{ marginBottom: 10 }}><h2>UV-5R PROGRAMMING</h2></div>
      {UV5R_PROG_STEPS.map((step, i) => (
        <div key={i} className="card" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8, padding: '10px 12px' }}>
          <div style={{ background: 'var(--amber)', color: '#000', borderRadius: 4, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontSize: '0.7rem', flexShrink: 0 }}>{i + 1}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.76rem', marginBottom: 2 }}>{step.title}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{step.detail}</div>
          </div>
        </div>
      ))}

      <div className="section-head" style={{ marginBottom: 10, marginTop: 16 }}><h2>RADIO TIPS</h2></div>
      {[
        ['Call format', 'CALLSIGN this is CALLSIGN, over'],
        ['Acknowledge', '"Copy" or "Roger"'],
        ['End of msg', '"Out" (done talking) / "Over" (reply expected)'],
        ['Channel busy', 'Wait for gap, then call'],
        ['Poor signal', '"Say again" (not "repeat" — military = fire again)'],
        ['Emergency', '"BREAK BREAK BREAK" clears all traffic'],
        ['Dead zone', 'Move to high ground, re-broadcast'],
      ].map(([label, val], i) => (
        <div key={i} className="card" style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 8, padding: '8px 12px', marginBottom: 6, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.68rem', color: 'var(--amber)' }}>{label}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>{val}</span>
        </div>
      ))}
    </div>
  );
}

function ChronoRef() {
  return (
    <div>
      <div className="section-head" style={{ marginBottom: 10 }}><h2>CHRONO PROCEDURE</h2></div>
      {[
        { step: '1', title: 'Remove magazine', detail: 'Remove mag and clear the chamber before approaching chrono station.' },
        { step: '2', title: 'Insert test BB weight', detail: 'Use the minimum BB weight required for your class. Load 3–5 BBs.' },
        { step: 'i', title: 'Pistol: 0.20g', detail: 'Max 350fps / 1.14J for pistols.' },
        { step: 'i', title: 'AEG/Support: 0.20g', detail: 'Max 400fps / 1.49J for AEGs.' },
        { step: 'i', title: 'DMR: 0.20g', detail: 'Max 450fps / 1.88J, semi-auto only.' },
        { step: 'i', title: 'Sniper: 0.20g', detail: 'Max 550fps / 2.81J, bolt-action only.' },
        { step: '3', title: 'Three shots', detail: 'Fire 3 shots at the chrono. All 3 must be within the limit.' },
        { step: '4', title: 'Get stickered', detail: 'Admin applies chrono pass sticker. Sticker must be visible during play.' },
        { step: '5', title: 'Do NOT alter after', detail: 'Swapping springs or internals after chrono = ban offence.' },
      ].map((item, i) => (
        <div key={i} className="card" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 6, padding: '10px 12px' }}>
          <div style={{ background: item.step === 'i' ? 'var(--bg-lift)' : 'var(--amber)', color: item.step === 'i' ? 'var(--text-dim)' : '#000', borderRadius: 4, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontSize: '0.7rem', flexShrink: 0 }}>{item.step}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.76rem', marginBottom: 2 }}>{item.title}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{item.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Signals() {
  const signals = [
    { signal: '✋ Hand raised + "HIT"', meaning: 'I am hit — dead man walking' },
    { signal: '🔴 Red dead rag', meaning: 'Insert dead rag after being hit' },
    { signal: '"MEDIC"', meaning: 'Requesting in-field medic revival' },
    { signal: '"BANG BANG"', meaning: 'Safety emergency — all play stops' },
    { signal: '"GAME ON"', meaning: 'Admin start — play begins' },
    { signal: '"GAME OFF"', meaning: 'Admin stop — all play ceases immediately' },
    { signal: '"CEASE FIRE"', meaning: 'Emergency stop, safety issue' },
    { signal: 'Whistle ×1', meaning: 'Admin attention — freeze' },
    { signal: 'Whistle ×3', meaning: 'Emergency — all stop, stand by' },
    { signal: '"SURRENDER"', meaning: 'Offer at ≤3m to unaware opponent' },
    { signal: '"KNIFE KILL"', meaning: 'Tap opponent + call within arm\'s reach' },
  ];
  return (
    <div>
      <div className="section-head" style={{ marginBottom: 10 }}><h2>IN-FIELD SIGNALS</h2></div>
      {signals.map((s, i) => (
        <div key={i} className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '8px 12px', marginBottom: 6, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--amber)' }}>{s.signal}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>{s.meaning}</span>
        </div>
      ))}
    </div>
  );
}

export default function QuickRef() {
  const [tab, setTab] = useState<Tab>('fps');

  return (
    <div className="page-content">
      <div className="sub-tabs" style={{ marginBottom: 16 }}>
        {TABS.map(t => (
          <button key={t.id} className={`sub-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>
      {tab === 'fps'     && <FpsCheatSheet />}
      {tab === 'radio'   && <RadioCheatSheet />}
      {tab === 'chrono'  && <ChronoRef />}
      {tab === 'signals' && <Signals />}
    </div>
  );
}
