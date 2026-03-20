import { useState } from 'react';
import {
  FRS_CHANNELS,
  MURS_CHANNELS,
  OLS_CHANNELS,
  SPECTRE_CHANNELS,
  UV5R_PROG_STEPS,
  type RadioChannel,
} from '../../data/radioChannels';

type Tab = 'spectre' | 'ols' | 'frs' | 'murs' | 'prog';

const TABS: { id: Tab; label: string }[] = [
  { id: 'spectre', label: 'Spectre' },
  { id: 'ols',     label: 'OLS8'   },
  { id: 'frs',     label: 'FRS'    },
  { id: 'murs',    label: 'MURS'   },
  { id: 'prog',    label: 'UV-5R'  },
];

function ChannelRow({ ch, highlight }: { ch: RadioChannel; highlight?: boolean }) {
  return (
    <tr style={{ borderTop: '1px solid var(--border)', background: highlight ? 'rgba(245,166,35,0.06)' : undefined }}>
      <td style={{ padding: '8px 10px', fontFamily: 'var(--font-head)', fontSize: '0.78rem', color: highlight ? 'var(--amber)' : 'var(--text)', whiteSpace: 'nowrap' }}>
        {ch.name}
      </td>
      <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--green)' }}>
        {ch.txFreq}
      </td>
      <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
        {ch.rxFreq || ch.txFreq}
      </td>
      <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-faint)' }}>
        {ch.tone || '—'}
      </td>
      <td style={{ padding: '8px 6px', fontSize: '0.68rem', color: 'var(--text-faint)', maxWidth: 100 }}>
        {ch.notes || '—'}
      </td>
    </tr>
  );
}

function ChannelTable({ channels, highlight }: { channels: RadioChannel[]; highlight?: boolean }) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-lift)' }}>
              <th style={{ padding: '8px 10px', textAlign: 'left', color: 'var(--amber)', fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.06em' }}>CH</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', color: 'var(--amber)', fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.06em' }}>TX</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', color: 'var(--amber)', fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.06em' }}>RX</th>
              <th style={{ padding: '8px 10px', textAlign: 'left', color: 'var(--amber)', fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.06em' }}>CTCSS</th>
              <th style={{ padding: '8px 6px', textAlign: 'left', color: 'var(--amber)', fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.06em' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((ch, i) => <ChannelRow key={i} ch={ch} highlight={highlight} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RadioReference() {
  const [tab, setTab] = useState<Tab>('spectre');

  return (
    <div className="page-content">
      <div className="sub-tabs" style={{ marginBottom: 16 }}>
        {TABS.map(t => (
          <button key={t.id} className={`sub-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {tab === 'spectre' && (
        <>
          <div className="section-head" style={{ marginBottom: 10 }}><h2>SPECTRE CHANNELS</h2></div>
          <ChannelTable channels={SPECTRE_CHANNELS} highlight />
          <div className="card" style={{ marginTop: 4, marginBottom: 0 }}>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-faint) ', lineHeight: 1.7 }}>
              Spectre primary and secondary channels are TBD pending OLS8 event brief.<br/>
              <span style={{ color: 'var(--amber)' }}>Confirm frequencies before game day.</span>
            </p>
          </div>
        </>
      )}

      {tab === 'ols' && (
        <>
          <div className="section-head" style={{ marginBottom: 10 }}><h2>OLS8 EVENT CHANNELS</h2></div>
          <ChannelTable channels={OLS_CHANNELS} />
          <div className="card" style={{ marginTop: 4 }}>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)', lineHeight: 1.7 }}>
              OLS8 coordination channels TBD — check event brief and admin channels.<br/>
              <span style={{ color: 'var(--amber)' }}>Frequencies will be assigned at check-in.</span>
            </p>
          </div>
        </>
      )}

      {tab === 'frs' && (
        <>
          <div className="section-head" style={{ marginBottom: 10 }}><h2>FRS/GMRS CHANNELS</h2></div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 10 }}>
            FRS channels 1–14 are shared FRS/GMRS. Channels 15–22 are FRS simplex only. All license-free in Canada up to 0.5W.
          </p>
          <ChannelTable channels={FRS_CHANNELS} />
        </>
      )}

      {tab === 'murs' && (
        <>
          <div className="section-head" style={{ marginBottom: 10 }}><h2>MURS CHANNELS</h2></div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 10 }}>
            Multi-Use Radio Service — 5 channels, 151–154 MHz VHF, 2W max, license-free in Canada.
          </p>
          <ChannelTable channels={MURS_CHANNELS} />
        </>
      )}

      {tab === 'prog' && (
        <>
          <div className="section-head" style={{ marginBottom: 10 }}><h2>UV-5R PROGRAMMING</h2></div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 10 }}>
            Manual channel programming steps for Baofeng UV-5R / UV-5R Mini.
          </p>
          {UV5R_PROG_STEPS.map((step, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ background: 'var(--amber)', color: '#000', borderRadius: 4, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontSize: '0.75rem', flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.8rem', marginBottom: 2 }}>{step.title}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{step.detail}</div>
              </div>
            </div>
          ))}
          <div className="card" style={{ marginTop: 8 }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-faint)', lineHeight: 1.7 }}>
              Full manual: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber)' }}>baofeng_uv-5r_mini_user_manual.pdf</span><br/>
              Available in app data folder for offline reference.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
