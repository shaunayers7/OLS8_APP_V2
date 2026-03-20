import { useState } from 'react';

const REGISTERS = [
  { id: 'rof',    label: 'ROF',           desc: 'Rate of fire (0x00 – 0xFF = 0–255 cycles/sec)' },
  { id: 'burst',  label: 'Burst Count',   desc: 'Rounds per burst (0x00 = semi, 0x02–0x1E)' },
  { id: 'dwell',  label: 'Dwell',         desc: 'Nozzle dwell time in ms (typical 0x0A–0x32)' },
  { id: 'delay',  label: 'Delay',         desc: 'Firing delay offset in ms' },
  { id: 'preemp', label: 'Pre-Nozzle',    desc: 'Pre-nozzle time before firing (ms)' },
  { id: 'bb',     label: 'BB Count',      desc: 'Round counter — mag-change tracking' },
];

function toHex(n: number, pads = 4) {
  if (isNaN(n) || n < 0) return '??';
  return '0x' + Math.floor(n).toString(16).toUpperCase().padStart(pads, '0');
}

function parseInput(val: string): number | null {
  const trimmed = val.trim();
  if (!trimmed) return null;
  if (trimmed.toLowerCase().startsWith('0x')) {
    const n = parseInt(trimmed, 16);
    return isNaN(n) ? null : n;
  }
  const n = parseInt(trimmed, 10);
  return isNaN(n) ? null : n;
}

export default function FCUCalculator() {
  const [regId, setRegId] = useState('bb');
  const [inputVal, setInputVal] = useState('');
  const [inputMode, setInputMode] = useState<'dec' | 'hex'>('dec');

  const parsed = parseInput(inputVal);
  const displayDec = parsed !== null ? parsed : null;
  const displayHex = parsed !== null ? toHex(parsed) : null;

  const [quickDec, setQuickDec] = useState('');
  const [quickHex, setQuickHex] = useState('');

  function handleQuickDec(v: string) {
    setQuickDec(v);
    const n = parseInt(v, 10);
    if (!isNaN(n) && n >= 0) setQuickHex('0x' + n.toString(16).toUpperCase().padStart(4, '0'));
    else setQuickHex('');
  }
  function handleQuickHex(v: string) {
    setQuickHex(v);
    const n = parseInt(v.replace(/^0x/i, ''), 16);
    if (!isNaN(n)) setQuickDec(String(n));
    else setQuickDec('');
  }

  const reg = REGISTERS.find(r => r.id === regId)!;

  return (
    <div className="page-content">
      {/* Quick converter */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="section-head" style={{ marginBottom: 10 }}><h2>QUICK HEX ↔ DECIMAL</h2></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8 }}>
          <div>
            <label style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-head)', letterSpacing: '0.05em' }}>DECIMAL</label>
            <input
              type="number"
              value={quickDec}
              onChange={e => handleQuickDec(e.target.value)}
              placeholder="e.g. 500"
              inputMode="numeric"
              style={{ fontFamily: 'var(--font-mono)', textAlign: 'center' }}
            />
          </div>
          <span style={{ fontFamily: 'var(--font-head)', color: 'var(--amber)', fontSize: '1.2rem' }}>⇄</span>
          <div>
            <label style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-head)', letterSpacing: '0.05em' }}>HEX</label>
            <input
              type="text"
              value={quickHex}
              onChange={e => handleQuickHex(e.target.value)}
              placeholder="e.g. 0x01F4"
              style={{ fontFamily: 'var(--font-mono)', textAlign: 'center' }}
            />
          </div>
        </div>
      </div>

      {/* Register reference */}
      <div className="section-head" style={{ marginBottom: 10 }}><h2>F2 FCU REGISTERS</h2></div>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 12, paddingBottom: 4, scrollbarWidth: 'none' }}>
        {REGISTERS.map(r => (
          <button key={r.id} onClick={() => setRegId(r.id)} style={{
            whiteSpace: 'nowrap', background: regId === r.id ? 'var(--amber)' : 'var(--bg-card)',
            color: regId === r.id ? '#000' : 'var(--text-dim)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '5px 10px', fontFamily: 'var(--font-head)', fontSize: '0.68rem',
            letterSpacing: '0.05em', cursor: 'pointer',
          }}>{r.label}</button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button className={`btn ${inputMode === 'dec' ? 'btn--primary' : 'btn--ghost'}`} onClick={() => setInputMode('dec')}>Enter Decimal</button>
          <button className={`btn ${inputMode === 'hex' ? 'btn--primary' : 'btn--ghost'}`} onClick={() => setInputMode('hex')}>Enter Hex</button>
        </div>
        <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-head)', letterSpacing: '0.05em' }}>
          {reg.label} — {inputMode === 'dec' ? 'Decimal' : 'Hex (0x…)'}
        </label>
        <input
          key={inputMode}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder={inputMode === 'dec' ? '0 – 65535' : '0x0000 – 0xFFFF'}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', textAlign: 'center', marginBottom: 8 }}
          inputMode={inputMode === 'dec' ? 'numeric' : 'text'}
        />
        <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{reg.desc}</p>
      </div>

      {parsed !== null && (
        <div className="hex-display">
          <div className="hex-display__row">
            <span className="hex-display__label">HEX</span>
            <span className="hex-display__value">{displayHex}</span>
          </div>
          <div className="hex-display__row">
            <span className="hex-display__label">DEC</span>
            <span className="hex-display__value">{displayDec}</span>
          </div>
          <div className="hex-display__row">
            <span className="hex-display__label">BIN</span>
            <span className="hex-display__value" style={{ fontSize: '0.82rem' }}>{parsed.toString(2).padStart(Math.max(8, Math.ceil(parsed.toString(2).length / 4) * 4), '0')}</span>
          </div>
        </div>
      )}

      {/* F2 quick ref */}
      <div style={{ marginTop: 24 }}>
        <div className="section-head" style={{ marginBottom: 10 }}><h2>F2 QUICK REFERENCE</h2></div>
        <div className="card">
          <p style={{ fontSize: '0.72rem', lineHeight: 1.7, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--amber)' }}>BB COUNT reset:</span> Hold trigger while turning power on<br/>
            <span style={{ color: 'var(--amber)' }}>Reg write mode:</span> Enter via FCU PC software or OLED menu<br/>
            <span style={{ color: 'var(--amber)' }}>0x00</span> = 0 &nbsp;|&nbsp; <span style={{ color: 'var(--amber)' }}>0xFF</span> = 255 &nbsp;|&nbsp; <span style={{ color: 'var(--amber)' }}>0x01F4</span> = 500<br/>
            <span style={{ color: 'var(--amber)' }}>0x0190</span> = 400 &nbsp;|&nbsp; <span style={{ color: 'var(--amber)' }}>0x0064</span> = 100 &nbsp;|&nbsp; <span style={{ color: 'var(--amber)' }}>0x03E8</span> = 1000
          </p>
        </div>
      </div>

      {/* Full register table */}
      <div style={{ marginTop: 16 }}>
        <div className="section-head" style={{ marginBottom: 10 }}><h2>ALL REGISTERS</h2></div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
            <thead>
              <tr style={{ background: 'var(--bg-lift)', color: 'var(--amber)' }}>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Register</th>
                <th style={{ padding: '8px 10px', textAlign: 'left' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {REGISTERS.map((r, i) => (
                <tr key={r.id} style={{ borderTop: '1px solid var(--border)', background: r.id === regId ? 'rgba(245,166,35,0.08)' : i % 2 ? 'var(--bg-card)' : 'transparent' }} onClick={() => setRegId(r.id)}>
                  <td style={{ padding: '8px 10px', color: r.id === regId ? 'var(--amber)' : 'var(--text)' }}>{r.label}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--text-dim)' }}>{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
