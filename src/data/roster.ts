export type MemberStatus = 'active' | 'inactive';

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface SquadMember {
  id: string;
  callsign: string;
  name: string;
  squad: 'spectre' | 'subsquad';
  role?: string;
  radioChannel?: string;
  has3DPrinter?: boolean;
  emergencyContact?: EmergencyContact;
  notes?: string;
}

export const spectreSquad: SquadMember[] = [
  {
    id: 'manchild',
    callsign: 'MANCHILD',
    name: 'Shaun Senniker',
    squad: 'spectre',
  },
  {
    id: 'sixx',
    callsign: 'SIXX',
    name: 'Nick Scattergood',
    squad: 'spectre',
  },
  {
    id: 'razor',
    callsign: 'RAZOR',
    name: 'Ramie Vinall',
    squad: 'spectre',
  },
  {
    id: 'ribs',
    callsign: 'RIBS',
    name: 'Brett Wandler',
    squad: 'spectre',
  },
  {
    id: 'danger',
    callsign: 'DANGER',
    name: 'AJ Danger',
    squad: 'spectre',
  },
  {
    id: 'fox',
    callsign: 'FOX',
    name: 'Shaun Ayers',
    squad: 'spectre',
    has3DPrinter: true,
  },
  {
    id: 'coldsmoke',
    callsign: 'COLDSMOKE',
    name: 'Josh Young',
    squad: 'spectre',
    has3DPrinter: true,
  },
];

export const subSquad: SquadMember[] = [
  {
    id: 'madhatter',
    callsign: 'MADHATTER',
    name: 'Ryder Senniker',
    squad: 'subsquad',
  },
  {
    id: '3cho',
    callsign: '3CHO',
    name: 'Callie Ayers',
    squad: 'subsquad',
  },
  {
    id: 'poison',
    callsign: 'POISON',
    name: 'Tyler',
    squad: 'subsquad',
  },
  {
    id: 'butters',
    callsign: 'BUTTERS',
    name: '',
    squad: 'subsquad',
  },
];

export const allMembers: SquadMember[] = [...spectreSquad, ...subSquad];
