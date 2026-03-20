// OLS8 FPS & Joule limits
// Source: OLS Rules 9.6.pdf — update values if rules document specifies different limits

export interface GunClass {
  id: string;
  label: string;
  maxFPS: number;      // measured with 0.20g BB
  maxJoules: number;
  minEngagement: string;
  notes: string;
  bbWeightMin: string; // minimum recommended BB weight
}

export const GUN_CLASSES: GunClass[] = [
  {
    id: 'pistol',
    label: 'Pistol / SMG',
    maxFPS: 350,
    maxJoules: 1.14,
    minEngagement: '0m (CQB)',
    notes: 'Semi-auto or full-auto. No MED.',
    bbWeightMin: '0.20g',
  },
  {
    id: 'aeg',
    label: 'AEG / GBB Rifle',
    maxFPS: 400,
    maxJoules: 1.49,
    minEngagement: '10m',
    notes: 'Standard full-auto rifle class.',
    bbWeightMin: '0.25g',
  },
  {
    id: 'support',
    label: 'Support (LMG)',
    maxFPS: 400,
    maxJoules: 1.49,
    minEngagement: '15m',
    notes: 'Full-auto support weapon. Bipod required.',
    bbWeightMin: '0.28g',
  },
  {
    id: 'dmr',
    label: 'DMR / Marksman',
    maxFPS: 450,
    maxJoules: 1.88,
    minEngagement: '30m',
    notes: 'Semi-auto ONLY. MED enforced.',
    bbWeightMin: '0.28g',
  },
  {
    id: 'sniper',
    label: 'Bolt-Action Sniper',
    maxFPS: 550,
    maxJoules: 2.81,
    minEngagement: '50m',
    notes: 'Bolt-action ONLY. Must carry a secondary under 350fps.',
    bbWeightMin: '0.30g',
  },
];

// Joule formula: J = (mass_kg × velocity_m_s²) / 2
// mass_kg = bbGrams / 1000
// velocity_m_s = fps × 0.3048
export function calculateJoules(fps: number, bbGrams: number): number {
  const massKg = bbGrams / 1000;
  const velocityMs = fps * 0.3048;
  return (massKg * velocityMs * velocityMs) / 2;
}

export function fpsFromJoules(joules: number, bbGrams: number): number {
  const massKg = bbGrams / 1000;
  return Math.sqrt((2 * joules) / massKg) / 0.3048;
}

export const COMMON_BB_WEIGHTS = [0.20, 0.23, 0.25, 0.28, 0.30, 0.32, 0.36, 0.40, 0.43, 0.45, 0.48];
