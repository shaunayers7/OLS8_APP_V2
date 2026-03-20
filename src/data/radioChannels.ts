export interface RadioChannel {
  ch: string;
  name: string;
  txFreq: string;
  rxFreq: string;
  tone?: string;
  notes?: string;
}

// Canadian FRS/GMRS channels (license-free in Canada up to 2W)
export const FRS_CHANNELS: RadioChannel[] = [
  { ch: '1',  name: 'FRS 1',  txFreq: '462.5625', rxFreq: '462.5625', tone: '—' },
  { ch: '2',  name: 'FRS 2',  txFreq: '462.5875', rxFreq: '462.5875', tone: '—' },
  { ch: '3',  name: 'FRS 3',  txFreq: '462.6125', rxFreq: '462.6125', tone: '—' },
  { ch: '4',  name: 'FRS 4',  txFreq: '462.6375', rxFreq: '462.6375', tone: '—' },
  { ch: '5',  name: 'FRS 5',  txFreq: '462.6625', rxFreq: '462.6625', tone: '—' },
  { ch: '6',  name: 'FRS 6',  txFreq: '462.6875', rxFreq: '462.6875', tone: '—' },
  { ch: '7',  name: 'FRS 7',  txFreq: '462.7125', rxFreq: '462.7125', tone: '—' },
  { ch: '8',  name: 'FRS 8',  txFreq: '467.5625', rxFreq: '467.5625', tone: '—' },
  { ch: '9',  name: 'FRS 9',  txFreq: '467.5875', rxFreq: '467.5875', tone: '—' },
  { ch: '10', name: 'FRS 10', txFreq: '467.6125', rxFreq: '467.6125', tone: '—' },
  { ch: '11', name: 'FRS 11', txFreq: '467.6375', rxFreq: '467.6375', tone: '—' },
  { ch: '12', name: 'FRS 12', txFreq: '467.6625', rxFreq: '467.6625', tone: '—' },
  { ch: '13', name: 'FRS 13', txFreq: '467.6875', rxFreq: '467.6875', tone: '—' },
  { ch: '14', name: 'FRS 14', txFreq: '467.7125', rxFreq: '467.7125', tone: '—' },
  { ch: '15', name: 'GMRS 15',txFreq: '462.5500', rxFreq: '462.5500', tone: '—', notes: 'GMRS only' },
  { ch: '16', name: 'GMRS 16',txFreq: '462.5750', rxFreq: '462.5750', tone: '—', notes: 'GMRS only' },
  { ch: '17', name: 'GMRS 17',txFreq: '462.6000', rxFreq: '462.6000', tone: '—', notes: 'GMRS only' },
  { ch: '18', name: 'GMRS 18',txFreq: '462.6250', rxFreq: '462.6250', tone: '—', notes: 'GMRS only' },
  { ch: '19', name: 'GMRS 19',txFreq: '462.6500', rxFreq: '462.6500', tone: '—', notes: 'GMRS only' },
  { ch: '20', name: 'GMRS 20',txFreq: '462.6750', rxFreq: '462.6750', tone: '—', notes: 'GMRS only' },
  { ch: '21', name: 'GMRS 21',txFreq: '462.7000', rxFreq: '462.7000', tone: '—', notes: 'GMRS only' },
  { ch: '22', name: 'GMRS 22',txFreq: '462.7250', rxFreq: '462.7250', tone: '—', notes: 'GMRS only' },
];

export const MURS_CHANNELS: RadioChannel[] = [
  { ch: 'M1', name: 'MURS 1', txFreq: '151.8200', rxFreq: '151.8200', tone: '—', notes: '2W max, no tone required' },
  { ch: 'M2', name: 'MURS 2', txFreq: '151.8800', rxFreq: '151.8800', tone: '—' },
  { ch: 'M3', name: 'MURS 3', txFreq: '151.9400', rxFreq: '151.9400', tone: '—' },
  { ch: 'M4', name: 'MURS 4', txFreq: '154.5700', rxFreq: '154.5700', tone: '—', notes: '2W, wide-band' },
  { ch: 'M5', name: 'MURS 5', txFreq: '154.6000', rxFreq: '154.6000', tone: '—', notes: '2W, wide-band' },
];

// OLS8 event-assigned channels — update when confirmed by organizers
export const OLS_CHANNELS: RadioChannel[] = [
  { ch: 'OLS-1', name: 'Command Net',       txFreq: 'TBD', rxFreq: 'TBD', isOls: true, notes: 'Event HQ / TO channel — confirm from OLS8 event brief' },
  { ch: 'OLS-2', name: 'Tan/Allies Net',    txFreq: 'TBD', rxFreq: 'TBD', isOls: true, notes: 'Confirm from OLS8 event brief' },
  { ch: 'OLS-3', name: 'Green/OpFor Net',   txFreq: 'TBD', rxFreq: 'TBD', isOls: true, notes: 'Confirm from OLS8 event brief' },
  { ch: 'OLS-4', name: 'Medic / Respawn',   txFreq: 'TBD', rxFreq: 'TBD', isOls: true, notes: 'Confirm from OLS8 event brief' },
];

// Spectre team internal channels — update with actual frequency
export const SPECTRE_CHANNELS: RadioChannel[] = [
  { ch: 'S1', name: 'SPECTRE PRIMARY', txFreq: 'TBD', rxFreq: 'TBD', isSpectre: true, notes: 'Update in Settings → Radio when confirmed' },
  { ch: 'S2', name: 'SPECTRE SECONDARY', txFreq: 'TBD', rxFreq: 'TBD', isSpectre: true, notes: 'Backup / sub-squad channel' },
];

// UV-5R programming quick steps
export const UV5R_PROG_STEPS = [
  { step: 1, title: 'Enter Frequency Mode', detail: 'Press [VFO/MR] to switch to VFO (frequency) mode. The display shows a frequency.' },
  { step: 2, title: 'Select VFO A or B', detail: 'Press [A/B] to select the VFO you want to program (A = upper display).' },
  { step: 3, title: 'Enter the Frequency', detail: 'Type the TX frequency on the keypad (e.g. 4625625 for 462.5625 MHz). Confirm with [MENU].' },
  { step: 4, title: 'Set CTCSS Tone (if needed)', detail: 'Press [MENU] → 13 (CTCSS) → Select tone → [MENU] to confirm → [EXIT].' },
  { step: 5, title: 'Save to Channel', detail: 'Press [MENU] → 27 (MEM-CH) → Enter channel number → [MENU] to confirm → [EXIT].' },
  { step: 6, title: 'Name the Channel', detail: 'Press [MENU] → 48 (CH-NAME) → Enter name → [MENU] → [EXIT].' },
  { step: 7, title: 'Switch to Channel Mode', detail: 'Press [VFO/MR] to switch back to channel (MR) mode. Scroll channels with the knob.' },
  { step: 8, title: 'Adjust Squelch', detail: 'Press [MENU] → 0 (SQL) → Set to 5 for field use → [MENU] → [EXIT].' },
];
