import { useState } from 'react';
import { allMembers } from '../data/roster';
import type { Squad, Role, UserProfile } from '../hooks/useProfile';

interface Props {
  onComplete: (data: Omit<UserProfile, 'onboarded'>) => void;
}

export default function Onboarding({ onComplete }: Props) {
  const [callsign, setCallsign] = useState('');
  const [name, setName] = useState('');
  const [squad, setSquad] = useState<Squad>('spectre');
  const [role, setRole] = useState<Role>('member');

  const knownMember = allMembers.find(m => m.callsign === callsign.toUpperCase().trim());

  const handleSelectMember = (callsignVal: string) => {
    const m = allMembers.find(m => m.callsign === callsignVal);
    if (m) {
      setCallsign(m.callsign);
      setName(m.name);
      setSquad(m.squad);
    }
  };

  const handleFinish = () => {
    if (!callsign.trim()) return;
    onComplete({
      callsign: callsign.toUpperCase().trim(),
      name: name.trim(),
      squad,
      role,
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
    }}>
      <img
        src="/images/New_Spectre_Patch-removebg-preview.svg"
        alt="Spectre"
        style={{ width: 96, height: 96, marginBottom: 16, opacity: 0.9 }}
        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <h1 style={{ fontSize: '1.3rem', marginBottom: 4, textAlign: 'center' }}>OPERATION LOYAL SERPENT 8</h1>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 32, textAlign: 'center' }}>
        SPECTRE SQUAD — JULY 2026
      </p>

      <div style={{ width: '100%', maxWidth: 360 }} className="fade-in">
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: 18, textAlign: 'center' }}>
            Select your callsign or enter it manually
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20, justifyContent: 'center' }}>
            {allMembers.map(m => (
              <button
                key={m.id}
                onClick={() => handleSelectMember(m.callsign)}
                className="btn"
                style={{
                  background: callsign === m.callsign ? 'var(--amber)' : 'var(--bg-card)',
                  color: callsign === m.callsign ? '#000' : 'var(--text-dim)',
                  border: `1px solid ${callsign === m.callsign ? 'var(--amber)' : 'var(--border)'}`,
                  fontSize: '0.75rem',
                  padding: '8px 14px',
                }}
              >
                {m.callsign}
              </button>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Callsign
            </label>
            <input
              value={callsign}
              onChange={e => setCallsign(e.target.value)}
              placeholder="e.g. FOX"
              style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', letterSpacing: '0.12em' }}
            />
          </div>
          {!knownMember && callsign && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Your Name
              </label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="First name" />
            </div>
          )}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Squad
            </label>
            <select value={squad} onChange={e => setSquad(e.target.value as Squad)}>
              <option value="spectre">SPECTRE (Main)</option>
              <option value="subsquad">Sub-Squad</option>
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: 6, fontFamily: 'var(--font-head)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Role
            </label>
            <select value={role} onChange={e => setRole(e.target.value as Role)}>
              <option value="member">Member</option>
              <option value="admin">Squad Leader (Admin)</option>
            </select>
          </div>
          <button
            className="btn btn--amber btn--full"
            onClick={handleFinish}
            disabled={!callsign.trim()}
            style={{ opacity: callsign.trim() ? 1 : 0.4 }}
          >
            ENTER SPECTRE
          </button>
        </div>
    </div>
  );
}
