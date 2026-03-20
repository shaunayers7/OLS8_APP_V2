import React, { useState } from 'react';

type Section = {
  id: string;
  title: string;
  content: string[];
};

const RULES_SECTIONS: Section[] = [
  {
    id: 'safety',
    title: 'SAFETY RULES',
    content: [
      'Eye protection must be ANSI Z87.1 rated at minimum. No exceptions — ever.',
      'Barrel socks / barrel covers required when not actively playing.',
      'Safe zone: magazines removed, barrel sock on, no dry-firing.',
      'Lower face protection strongly recommended. Mesh or rated lower mask.',
      'Call "HIT" loudly and clearly. Do not argue hits in the field.',
      'Blind firing is prohibited — you must be able to see your target.',
      'Do not shoot wildlife, vehicles, or equipment not part of the game.',
      'Medical / safety word: "BANG BANG" stops all nearby play immediately.',
    ],
  },
  {
    id: 'fps',
    title: 'FPS / CHRONO RULES',
    content: [
      'ALL weapons must be chronographed before entering play.',
      'Pistols: ≤350fps (1.14J) with 0.20g BB. No MED.',
      'AEG / Support: ≤400fps (1.49J) with 0.20g BB. MED: 0m (no minimum).',
      'DMR: ≤450fps (1.88J) with 0.20g BB. Semi-auto only. MED: 15m.',
      'Sniper: ≤550fps (2.81J) with 0.20g BB. Bolt-action only. MED: 30m.',
      'Overshooting is strictly prohibited. Burst at close range = hit + penalty.',
      'Swapping springs / internals after chrono is a ban offence.',
      'Event staff may re-chrono any weapon at any time.',
      '* Always confirm limits from official OLS8 event brief — rules v9.6.',
    ],
  },
  {
    id: 'hit',
    title: 'HIT RULES',
    content: [
      'Any hit to body, gear, gun or equipment counts as a hit.',
      'Ricochet hits do NOT count.',
      'Friendly fire counts — watch your fire.',
      'Upon being hit: raise hand, call "HIT" loudly, insert dead rag, proceed to respawn.',
      'You may not communicate game info while dead (radio silence).',
      'Dead players walk directly to respawn — no loitering near active players.',
      'Knife kills: tap opponent and say "knife kill" — call "HIT" & go to respawn.',
      'Surrender rule: if within 3m and opponent is unaware, offer surrender first.',
    ],
  },
  {
    id: 'respawn',
    title: 'RESPAWN RULES',
    content: [
      'Respawn location and timing determined per scenario brief.',
      'Default respawn: 10-minute wait at designated respawn point.',
      'Medic rules (if applicable): a designated medic may tap you to revive in-field.',
      'Once revived by medic, you may continue play without going to respawn.',
      'Each player may be revived by medic once per life.',
      'Medics: one medic bag with 3 bandages. Each bandage = one revive.',
      'Admin staff will brief any special respawn rules at mission start.',
    ],
  },
  {
    id: 'pyro',
    title: 'PYROTECHNICS',
    content: [
      'Only approved pyrotechnics may be used — check event brief for list.',
      'Thunder Bs / Taginn grenades: anyone within 5m (line of sight) = hit.',
      'Smoke grenades: non-lethal unless local rules state otherwise.',
      'Do NOT throw pyro at standing height — roll or throw low.',
      'No pyro inside structures unless event admin specifically permits it.',
      'No pyro in dry brush / long grass — fire hazard.',
      'Retrieve spent pyro casings — do not leave them on-site.',
    ],
  },
  {
    id: 'conduct',
    title: 'CONDUCT & SPORTSMANSHIP',
    content: [
      'Cheating / aggressive behaviour = immediate ejection, no refund.',
      'Treat all players with respect including opposing teams.',
      'Disputes go to an admin — do not confront players directly.',
      'Admins\' decisions are final during the event.',
      'No alcohol or impairment during active play.',
      'Leave the site cleaner than you found it — pack out all trash.',
      'Protect the landowner relationship — this site enables future events.',
    ],
  },
  {
    id: 'radio',
    title: 'RADIO & COMMUNICATION',
    content: [
      'All communications on designated channels only — no scanning during play.',
      'Use proper radio etiquette: callsign → callsign, over / out.',
      'Admin channel must remain clear of non-admin traffic.',
      'Encrypted or coded communications must be approved by event admin.',
      'Do not transmit on frequencies outside legal FRS/GMRS limits.',
      'Report any channel conflict to your squad leader immediately.',
    ],
  },
  {
    id: 'vehicles',
    title: 'VEHICLES',
    content: [
      'No shooting into or out of moving vehicles.',
      'Vehicles are props only unless event admin explicitly states otherwise.',
      'Do not damage, vandalize or unauthorized-access any vehicle.',
      'Parking in designated areas only — do not block emergency access.',
    ],
  },
];

export default function Rules() {
  const [openId, setOpenId] = useState<string | null>('safety');

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  return (
    <div className="page-content">
      <div className="card" style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.3)', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.2rem' }}>📄</span>
          <div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.8rem', marginBottom: 4 }}>OLS RULES v9.6</div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 6 }}>
              Summary below based on OLS Rules 9.6. The full PDF is available in-app.
              Always verify the official brief at check-in.
            </p>
            <a
              href="/src/data/rules/OLS Rules 9.6.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', color: 'var(--amber)', fontFamily: 'var(--font-head)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
            >
              ↗ Open Full PDF
            </a>
          </div>
        </div>
      </div>

      {RULES_SECTIONS.map(section => (
        <div key={section.id} className="card" style={{ marginBottom: 8, padding: 0, overflow: 'hidden' }}>
          <button
            onClick={() => toggle(section.id)}
            style={{
              width: '100%', background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left',
            }}
          >
            <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.82rem', color: openId === section.id ? 'var(--amber)' : 'var(--text)', letterSpacing: '0.04em' }}>
              {section.title}
            </span>
            <span style={{ color: 'var(--amber)', fontSize: '1rem', transform: openId === section.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>▾</span>
          </button>

          {openId === section.id && (
            <div style={{ borderTop: '1px solid var(--border)', padding: '10px 14px 14px' }}>
              {section.content.map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--amber)', fontSize: '0.6rem', marginTop: 4, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: '0.76rem', color: line.startsWith('*') ? 'var(--text-faint)' : 'var(--text-dim)', lineHeight: 1.55 }}>{line}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--text-faint)', marginTop: 12 }}>
        Rules subject to change. Admin brief at check-in is final.
      </p>
    </div>
  );
}
