export interface ScheduleItem {
  id: string;
  day: 'pre' | 'day1' | 'day2' | 'post';
  time: string;
  title: string;
  emoji: string;
  notes: string;
  squad: 'all' | 'spectre' | 'subsquad';
}

export const DEFAULT_SCHEDULE: ScheduleItem[] = [
  // Pre-event
  { id: 's0',  day: 'pre',  time: 'TBD',    emoji: '📦', title: 'Packing Deadline',         notes: 'All gear packed and ready to load', squad: 'all' },
  { id: 's1',  day: 'pre',  time: 'TBD',    emoji: '🚗', title: 'Convoy Depart',             notes: 'Meet at designated rally point. Fuel up. Confirm radio comms before leaving.', squad: 'all' },
  { id: 's2',  day: 'pre',  time: 'TBD',    emoji: '🅿️', title: 'Arrival & Parking',         notes: 'Follow event parking directions. Unload gear at designated drop-off.', squad: 'all' },
  { id: 's3',  day: 'pre',  time: 'TBD',    emoji: '⛺', title: 'Camp Setup',                notes: 'Tents, canopy, staging area. Establish Spectre HQ.', squad: 'all' },
  // Day 1
  { id: 's4',  day: 'day1', time: 'TBD',    emoji: '⏰', title: 'Wake Up',                   notes: 'Breakfast and kit up', squad: 'all' },
  { id: 's5',  day: 'day1', time: 'TBD',    emoji: '🔫', title: 'Chrono Window Opens',       notes: 'All guns must pass chrono before playing. Barrel bags required in staging.', squad: 'all' },
  { id: 's6',  day: 'day1', time: 'TBD',    emoji: '📋', title: 'Player Check-in / Waiver', notes: 'Bring registration confirmation and valid eye protection.', squad: 'all' },
  { id: 's7',  day: 'day1', time: 'TBD',    emoji: '🎙️', title: 'Mission Briefing',          notes: 'Attend full briefing. Rules of engagement reviewed.', squad: 'all' },
  { id: 's8',  day: 'day1', time: 'TBD',    emoji: '🟢', title: 'GAME ON — Day 1',           notes: 'First game starts. All comms on Spectre channel.', squad: 'all' },
  { id: 's9',  day: 'day1', time: 'TBD',    emoji: '🍽️',  title: 'Lunch Break',               notes: 'Rotate back to camp in squads. Resupply ammo and water.', squad: 'all' },
  { id: 's10', day: 'day1', time: 'TBD',    emoji: '🔴', title: 'GAME OFF — Day 1',          notes: 'Clear and safe all weapons. Safe Spectre channel.', squad: 'all' },
  { id: 's11', day: 'day1', time: 'TBD',    emoji: '🔥', title: 'Camp Dinner + Debrief',    notes: 'Team debrief. Review objectives. Rest and recover.', squad: 'all' },
  // Day 2
  { id: 's12', day: 'day2', time: 'TBD',    emoji: '⏰', title: 'Wake Up',                   notes: 'Breakfast and kit up for final day', squad: 'all' },
  { id: 's13', day: 'day2', time: 'TBD',    emoji: '🔫', title: 'Re-chrono (if required)',  notes: 'Re-chrono any guns modified overnight', squad: 'all' },
  { id: 's14', day: 'day2', time: 'TBD',    emoji: '🎙️', title: 'Day 2 Mission Briefing',   notes: 'New objectives announced', squad: 'all' },
  { id: 's15', day: 'day2', time: 'TBD',    emoji: '🟢', title: 'GAME ON — Day 2',           notes: 'Final day of play begins', squad: 'all' },
  { id: 's16', day: 'day2', time: 'TBD',    emoji: '🔴', title: 'GAME OFF — Final',          notes: 'End of event. Safe all weapons.', squad: 'all' },
  { id: 's17', day: 'day2', time: 'TBD',    emoji: '🏆', title: 'Awards / Closing Ceremony', notes: 'Results and awards announced by event staff', squad: 'all' },
  // Post-event
  { id: 's18', day: 'post', time: 'TBD',    emoji: '🧹', title: 'Break Camp',                notes: 'Pack down tents, clean site, load vehicles.', squad: 'all' },
  { id: 's19', day: 'post', time: 'TBD',    emoji: '🚗', title: 'Convoy Home',               notes: 'Confirm head count before departing.', squad: 'all' },
];

export const DAY_LABELS: Record<string, string> = {
  pre:  'Pre-Event',
  day1: 'Day 1 — Saturday',
  day2: 'Day 2 — Sunday',
  post: 'Post-Event',
};
