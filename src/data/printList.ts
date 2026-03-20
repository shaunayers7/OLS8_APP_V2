export interface PrintItem {
  id: string;
  label: string;
  category: string;
  quantity: number;
  assignedTo: 'FOX' | 'COLDSMOKE' | 'either';
  filament?: string;
  notes?: string;
}

export const DEFAULT_PRINT_ITEMS: PrintItem[] = [
  // Mag & Ammo Accessories
  { id: 'pr1', label: 'M4 mag coupler / double-mag clamp', category: 'Mags & Ammo', quantity: 4, assignedTo: 'either', filament: 'PETG Black', notes: 'Speeds up reloads in field' },
  { id: 'pr2', label: 'Speedloader funnel adapter', category: 'Mags & Ammo', quantity: 2, assignedTo: 'either', filament: 'PETG Black' },
  { id: 'pr3', label: 'BB storage tube cap set', category: 'Mags & Ammo', quantity: 6, assignedTo: 'either', filament: 'PETG Black' },
  // Rail & Handguard Accessories
  { id: 'pr4', label: 'Picatinny rail covers (set of 4)', category: 'Rail Accessories', quantity: 8, assignedTo: 'either', filament: 'PETG OD Green' },
  { id: 'pr5', label: 'Angled foregrip (Keymod/M-LOK)', category: 'Rail Accessories', quantity: 2, assignedTo: 'either', filament: 'PETG Black' },
  { id: 'pr6', label: 'QD sling mount adapter', category: 'Rail Accessories', quantity: 2, assignedTo: 'either', filament: 'PETG Black', notes: 'Verify fit for your platform' },
  // Helmet & Head Gear
  { id: 'pr7', label: 'Helmet NVG mount (dummy/rail)', category: 'Helmet Accessories', quantity: 2, assignedTo: 'either', filament: 'PETG Black' },
  { id: 'pr8', label: 'Helmet side rail adapter (Wilcox-style)', category: 'Helmet Accessories', quantity: 4, assignedTo: 'either', filament: 'PETG Black' },
  { id: 'pr9', label: 'GoPro helmet mount', category: 'Helmet Accessories', quantity: 2, assignedTo: 'either', filament: 'PETG Black' },
  // Chest Rig / Plate Carrier
  { id: 'pr10', label: 'MOLLE panel attachment clips (set of 10)', category: 'Chest Rig', quantity: 20, assignedTo: 'either', filament: 'PETG Black' },
  { id: 'pr11', label: 'Radio / phone pouch holder', category: 'Chest Rig', quantity: 2, assignedTo: 'either', filament: 'PETG Coyote', notes: 'Check pocket dimensions first' },
  { id: 'pr12', label: 'PTT button clip / holder', category: 'Chest Rig', quantity: 2, assignedTo: 'either', filament: 'PETG Black' },
  // Misc Field Gear
  { id: 'pr13', label: 'Tank cover / HPA tank protector cap', category: 'Misc', quantity: 2, assignedTo: 'FOX', filament: 'PETG Black', notes: 'Polarstar tank thread protector' },
  { id: 'pr14', label: 'Gear labels / name tags (SPECTRE + callsigns)', category: 'Misc', quantity: 11, assignedTo: 'either', filament: 'PETG White + Black', notes: 'One per squad member' },
  { id: 'pr15', label: 'Tourniquet holder (MOLLE)', category: 'Misc', quantity: 4, assignedTo: 'either', filament: 'PETG Black' },
  { id: 'pr16', label: 'Tritium vial holder / glow stick clip', category: 'Misc', quantity: 4, assignedTo: 'either', filament: 'PETG Black', notes: 'For night-op IFF markers' },
];

export const PRINT_CATEGORIES = ['Mags & Ammo', 'Rail Accessories', 'Helmet Accessories', 'Chest Rig', 'Misc'];
