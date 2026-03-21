import { useState, useEffect, useRef } from 'react';
import { spectreSquad, subSquad, SquadMember } from '../../data/roster';

const REVEAL_MS = 2500;

type RevealState = { memberId: string; type: 'name' | 'emergency' } | null;

function MemberCard({ member }: { member: SquadMember }) {
  const [revealing, setRevealing] = useState<null | 'name' | 'emergency'>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function reveal(type: 'name' | 'emergency') {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRevealing(type);
    timerRef.current = setTimeout(() => {
      setRevealing(null);
    }, REVEAL_MS);
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const hasEmergency = !!(member.emergencyContact?.name);

  return (
    <div className="callsign-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Callsign / name reveal */}
        <button
          onClick={() => reveal('name')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', flex: 1, padding: 0 }}
          aria-label={`Reveal identity for ${member.callsign}`}
        >
          <div className="callsign-text">{member.callsign}</div>
          <div
            className="real-name"
            style={{
              opacity: revealing === 'name' ? 1 : 0,
              transform: revealing === 'name' ? 'translateY(0)' : 'translateY(-4px)',
              transition: 'opacity 0.2s, transform 0.2s',
              pointerEvents: 'none',
            }}
          >
            {member.name}
          </div>
          {revealing !== 'name' && (
            <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>tap to reveal</div>
          )}
        </button>

        {/* Squad / role badge + emergency button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' }}>

            {member.has3DPrinter && (
              <span style={{ background: 'var(--olive)', color: '#fff', fontFamily: 'var(--font-head)', fontSize: '0.6rem', padding: '2px 6px', borderRadius: 3, letterSpacing: '0.06em' }}>3D🖨</span>
            )}
          </div>
          {hasEmergency && (
            <button
              className="emergency-btn"
              onClick={e => { e.stopPropagation(); reveal('emergency'); }}
              title="Emergency contact"
              aria-label="Show emergency contact"
            >
              🚨
            </button>
          )}
        </div>
      </div>

      {/* Emergency reveal overlay */}
      {revealing === 'emergency' && hasEmergency && (
        <div style={{
          marginTop: 10,
          padding: '8px 10px',
          background: 'rgba(220,50,47,0.12)',
          border: '1px solid rgba(220,50,47,0.4)',
          borderRadius: 6,
          animation: 'fadeIn 0.15s ease',
        }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.68rem', color: 'var(--red)', marginBottom: 4, letterSpacing: '0.06em' }}>EMERGENCY CONTACT</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text)' }}>{member.emergencyContact!.name}</div>
          {member.emergencyContact?.phone && (
            <a href={`tel:${member.emergencyContact.phone.replace(/\D/g, '')}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--red)', textDecoration: 'none', display: 'block', marginTop: 2 }}>
              📞 {member.emergencyContact.phone}
            </a>
          )}

        </div>
      )}
    </div>
  );
}

export default function Roster() {
  return (
    <div className="page-content">
      <div className="section-head" style={{ marginBottom: 12 }}>
        <h2>SPECTRE</h2>
        <span className="section-count">{spectreSquad.length}</span>
      </div>
      {spectreSquad.map(m => (
        <MemberCard key={m.id} member={m} />
      ))}

      <div className="section-head" style={{ marginBottom: 12, marginTop: 24 }}>
        <h2>ATTACHED</h2>
        <span className="section-count">{subSquad.length}</span>
      </div>
      {subSquad.map(m => (
        <MemberCard key={m.id} member={m} />
      ))}

      <div className="card" style={{ marginTop: 16, textAlign: 'center', background: 'transparent', border: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-faint)', lineHeight: 1.7 }}>
          Tap callsign card to reveal identity (2.5 sec)<br />
          Tap 🚨 to reveal emergency contact
        </p>
      </div>
    </div>
  );
}
