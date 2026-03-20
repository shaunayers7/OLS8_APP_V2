export interface PackingItem {
  id: string;
  label: string;
  category: string;
  default?: boolean;
}

// Seeded from OLS8 official suggested gear list
export const DEFAULT_PACKING_ITEMS: PackingItem[] = [
  // Airsoft Kit
  { id: 'p1',  label: 'Primary AEG / HPA rifle', category: 'Airsoft Kit', default: true },
  { id: 'p2',  label: 'Secondary pistol', category: 'Airsoft Kit', default: true },
  { id: 'p3',  label: 'BB ammo (0.28g+ recommended)', category: 'Airsoft Kit', default: true },
  { id: 'p4',  label: 'Spare hi-cap / mid-cap magazines', category: 'Airsoft Kit', default: true },
  { id: 'p5',  label: 'Battery + smart charger', category: 'Airsoft Kit', default: true },
  { id: 'p6',  label: 'HPA tank (filled) + line + regulator', category: 'Airsoft Kit', default: true },
  { id: 'p7',  label: 'Barrel bag for chrono area', category: 'Airsoft Kit', default: true },
  { id: 'p8',  label: 'Speedloader', category: 'Airsoft Kit', default: true },
  { id: 'p9',  label: 'Tools / Allen keys / gun repair kit', category: 'Airsoft Kit', default: true },
  { id: 'p10', label: 'Eye protection (full seal ANSI Z87.1)', category: 'Airsoft Kit', default: true },
  { id: 'p11', label: 'Face protection / mesh lower', category: 'Airsoft Kit', default: true },
  // Clothing & Gear
  { id: 'c1',  label: 'BDU top + bottom (camo or OD)', category: 'Clothing & Gear', default: true },
  { id: 'c2',  label: 'Plate carrier / chest rig / vest', category: 'Clothing & Gear', default: true },
  { id: 'c3',  label: 'Helmet or hat', category: 'Clothing & Gear', default: true },
  { id: 'c4',  label: 'Combat/hiking boots (broken in)', category: 'Clothing & Gear', default: true },
  { id: 'c5',  label: 'Knee pads + elbow pads', category: 'Clothing & Gear', default: true },
  { id: 'c6',  label: 'Gloves (tactical)', category: 'Clothing & Gear', default: true },
  { id: 'c7',  label: 'Base layer (moisture wicking)', category: 'Clothing & Gear', default: true },
  { id: 'c8',  label: 'Rain/wind layer', category: 'Clothing & Gear', default: true },
  { id: 'c9',  label: 'Extra socks + underwear (2 days)', category: 'Clothing & Gear', default: true },
  { id: 'c10', label: 'Balaclava / neck gaiter', category: 'Clothing & Gear', default: true },
  // Camping
  { id: 'ca1', label: 'Tent or sleeping setup', category: 'Camping', default: true },
  { id: 'ca2', label: 'Sleeping bag (rated for night temps)', category: 'Camping', default: true },
  { id: 'ca3', label: 'Sleeping pad / cot', category: 'Camping', default: true },
  { id: 'ca4', label: 'Camp chair + small table', category: 'Camping', default: true },
  { id: 'ca5', label: 'Lantern / headlamp + batteries', category: 'Camping', default: true },
  { id: 'ca6', label: 'Night-op red light / IR source', category: 'Camping', default: true },
  { id: 'ca7', label: 'Tarp / canopy for shade', category: 'Camping', default: true },
  // Food & Water
  { id: 'fw1', label: 'Water (min 4L per day)', category: 'Food & Water', default: true },
  { id: 'fw2', label: 'Hydration pack / bladder (filled)', category: 'Food & Water', default: true },
  { id: 'fw3', label: 'MREs / field food for 2 days', category: 'Food & Water', default: true },
  { id: 'fw4', label: 'Snacks (trail mix, jerky, bars)', category: 'Food & Water', default: true },
  { id: 'fw5', label: 'Camp stove + fuel + utensils', category: 'Food & Water', default: true },
  { id: 'fw6', label: 'Electrolyte packets', category: 'Food & Water', default: true },
  // Medical
  { id: 'm1',  label: 'Personal first aid kit (IFAK)', category: 'Medical', default: true },
  { id: 'm2',  label: 'Tourniquet (CAT or SOFT-T)', category: 'Medical', default: true },
  { id: 'm3',  label: 'Blister treatment / moleskin', category: 'Medical', default: true },
  { id: 'm4',  label: 'Pain reliever / anti-inflammatory', category: 'Medical', default: true },
  { id: 'm5',  label: 'Sunscreen SPF 50+', category: 'Medical', default: true },
  { id: 'm6',  label: 'Insect repellent (DEET)', category: 'Medical', default: true },
  { id: 'm7',  label: 'Any personal prescription meds', category: 'Medical', default: true },
  // Electronics & Comms
  { id: 'e1',  label: 'Baofeng UV-5R / UV-5R Mini radio', category: 'Electronics', default: true },
  { id: 'e2',  label: 'Radio earpiece / PTT cable', category: 'Electronics', default: true },
  { id: 'e3',  label: 'Spare radio batteries / charger', category: 'Electronics', default: true },
  { id: 'e4',  label: 'Phone + power bank (20,000mAh)', category: 'Electronics', default: true },
  { id: 'e5',  label: 'Phone charging cable', category: 'Electronics', default: true },
  { id: 'e6',  label: 'HPA fill station / adapters', category: 'Electronics', default: true },
  // Misc
  { id: 'x1',  label: 'Duct tape + zip ties', category: 'Misc', default: true },
  { id: 'x2',  label: 'Paracord (50ft+)', category: 'Misc', default: true },
  { id: 'x3',  label: 'Camo netting / burlap strips', category: 'Misc', default: true },
  { id: 'x4',  label: 'Sharpie + notepad', category: 'Misc', default: true },
  { id: 'x5',  label: 'Cash for gate / merch', category: 'Misc', default: true },
  { id: 'x6',  label: 'Printed or digital waiver (if required)', category: 'Misc', default: true },
  { id: 'x7',  label: 'Player ID card / registration confirmation', category: 'Misc', default: true },
];

export const PACKING_CATEGORIES = [
  'Airsoft Kit',
  'Clothing & Gear',
  'Camping',
  'Food & Water',
  'Medical',
  'Electronics',
  'Misc',
];
