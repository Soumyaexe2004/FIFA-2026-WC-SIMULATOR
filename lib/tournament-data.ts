// ============================================================
// FIFA World Cup 2026 — Tournament Data & Configuration
// ============================================================

export interface Team {
  id: string;
  name: string;
  code: string;
  flag: string;
  group: string;
  color: string;
}

export interface Group {
  id: string;
  name: string;
  teams: Team[];
}

// ── Flag image helper (FlagCDN) ──
const isoCodes: Record<string, string> = {
  MEX: 'mx', ZAF: 'za', KOR: 'kr', CZE: 'cz',
  CAN: 'ca', BIH: 'ba', QAT: 'qa', SUI: 'ch',
  BRA: 'br', MAR: 'ma', HAI: 'ht', SCO: 'gb-sct',
  USA: 'us', PAR: 'py', AUS: 'au', TUR: 'tr',
  GER: 'de', CUW: 'cw', CIV: 'ci', ECU: 'ec',
  NED: 'nl', JPN: 'jp', SWE: 'se', TUN: 'tn',
  BEL: 'be', EGY: 'eg', IRN: 'ir', NZL: 'nz',
  ESP: 'es', CPV: 'cv', KSA: 'sa', URU: 'uy',
  FRA: 'fr', SEN: 'sn', IRQ: 'iq', NOR: 'no',
  ARG: 'ar', ALG: 'dz', AUT: 'at', JOR: 'jo',
  POR: 'pt', COD: 'cd', UZB: 'uz', COL: 'co',
  ENG: 'gb-eng', CRO: 'hr', GHA: 'gh', PAN: 'pa',
};

// ── Team colors for gradients ──
const teamColors: Record<string, string> = {
  MEX: 'from-green-500 to-red-500', ZAF: 'from-yellow-400 to-green-600', KOR: 'from-red-500 to-blue-500', CZE: 'from-blue-500 to-red-500',
  CAN: 'from-red-500 to-red-600', BIH: 'from-blue-500 to-yellow-400', QAT: 'from-rose-800 to-rose-900', SUI: 'from-red-500 to-red-600',
  BRA: 'from-yellow-400 to-green-500', MAR: 'from-red-600 to-green-600', HAI: 'from-blue-600 to-red-600', SCO: 'from-blue-700 to-blue-900',
  USA: 'from-red-500 to-blue-600', PAR: 'from-red-500 to-blue-500', AUS: 'from-yellow-400 to-green-600', TUR: 'from-red-500 to-red-700',
  GER: 'from-slate-200 to-slate-400', CUW: 'from-blue-500 to-yellow-400', CIV: 'from-orange-500 to-green-500', ECU: 'from-yellow-400 to-red-500',
  NED: 'from-orange-500 to-orange-600', JPN: 'from-blue-500 to-blue-700', SWE: 'from-yellow-400 to-blue-500', TUN: 'from-red-500 to-red-600',
  BEL: 'from-red-500 to-yellow-500', EGY: 'from-red-500 to-slate-200', IRN: 'from-green-500 to-red-500', NZL: 'from-slate-200 to-slate-400',
  ESP: 'from-red-500 to-yellow-500', CPV: 'from-blue-600 to-red-600', KSA: 'from-green-500 to-green-700', URU: 'from-sky-400 to-yellow-400',
  FRA: 'from-blue-500 to-red-500', SEN: 'from-green-500 to-yellow-500', IRQ: 'from-green-500 to-slate-200', NOR: 'from-red-500 to-blue-600',
  ARG: 'from-sky-400 to-slate-200', ALG: 'from-green-500 to-slate-200', AUT: 'from-red-500 to-red-600', JOR: 'from-green-500 to-red-500',
  POR: 'from-red-500 to-green-600', COD: 'from-sky-400 to-red-500', UZB: 'from-blue-500 to-green-500', COL: 'from-yellow-400 to-red-500',
  ENG: 'from-slate-200 to-red-500', CRO: 'from-red-500 to-slate-200', GHA: 'from-yellow-400 to-green-500', PAN: 'from-red-500 to-blue-500',
};

function t(code: string, name: string, group: string): Team {
  return { 
    id: `${group}-${code}`, 
    name, 
    code, 
    flag: isoCodes[code] ? `https://flagcdn.com/w40/${isoCodes[code]}.png` : '', 
    group,
    color: teamColors[code] || 'from-slate-300 to-slate-500'
  };
}

export const GROUPS: Group[] = [
  { id: 'A', name: 'Group A', teams: [t('MEX','Mexico','A'), t('ZAF','South Africa','A'), t('KOR','South Korea','A'), t('CZE','Czech Republic','A')] },
  { id: 'B', name: 'Group B', teams: [t('CAN','Canada','B'), t('BIH','Bosnia and Herzegovina','B'), t('QAT','Qatar','B'), t('SUI','Switzerland','B')] },
  { id: 'C', name: 'Group C', teams: [t('BRA','Brazil','C'), t('MAR','Morocco','C'), t('HAI','Haiti','C'), t('SCO','Scotland','C')] },
  { id: 'D', name: 'Group D', teams: [t('USA','USA','D'), t('PAR','Paraguay','D'), t('AUS','Australia','D'), t('TUR','Türkiye','D')] },
  { id: 'E', name: 'Group E', teams: [t('GER','Germany','E'), t('CUW','Curaçao','E'), t('CIV','Ivory Coast','E'), t('ECU','Ecuador','E')] },
  { id: 'F', name: 'Group F', teams: [t('NED','Netherlands','F'), t('JPN','Japan','F'), t('SWE','Sweden','F'), t('TUN','Tunisia','F')] },
  { id: 'G', name: 'Group G', teams: [t('BEL','Belgium','G'), t('EGY','Egypt','G'), t('IRN','Iran','G'), t('NZL','New Zealand','G')] },
  { id: 'H', name: 'Group H', teams: [t('ESP','Spain','H'), t('CPV','Cape Verde','H'), t('KSA','Saudi Arabia','H'), t('URU','Uruguay','H')] },
  { id: 'I', name: 'Group I', teams: [t('FRA','France','I'), t('SEN','Senegal','I'), t('IRQ','Iraq','I'), t('NOR','Norway','I')] },
  { id: 'J', name: 'Group J', teams: [t('ARG','Argentina','J'), t('ALG','Algeria','J'), t('AUT','Austria','J'), t('JOR','Jordan','J')] },
  { id: 'K', name: 'Group K', teams: [t('POR','Portugal','K'), t('COD','DR Congo','K'), t('UZB','Uzbekistan','K'), t('COL','Colombia','K')] },
  { id: 'L', name: 'Group L', teams: [t('ENG','England','L'), t('CRO','Croatia','L'), t('GHA','Ghana','L'), t('PAN','Panama','L')] },
];

/** Points implied by finishing position */
export const POSITION_POINTS = [9, 6, 3, 0] as const;

// ── Knockout Bracket Structure ──
// 32 teams advance: 12 group winners + 12 runners-up + 8 best 3rd-place
// Round of 32 matchups (16 matches)
// Format: each match has a slot for home & away, sourced from group results
export type KnockoutSlotSource =
  | { type: 'group'; group: string; position: 1 | 2 }
  | { type: 'third'; rank: number } // rank 1-8 of best 3rd-place teams
  | { type: 'winner'; matchId: string };

export interface KnockoutMatchDef {
  id: string;
  round: 'R32' | 'R16' | 'QF' | 'SF' | 'F';
  homeSource: KnockoutSlotSource;
  awaySource: KnockoutSlotSource;
  nextMatchId?: string;
  nextSlot?: 'home' | 'away';
}

// Round of 32 — 16 matches
// Using FIFA-style bracket mapping
const R32: KnockoutMatchDef[] = [
  // Top half
  { id: 'R32-1',  round: 'R32', homeSource: { type: 'group', group: 'A', position: 1 }, awaySource: { type: 'third', rank: 3 }, nextMatchId: 'R16-1', nextSlot: 'home' },
  { id: 'R32-2',  round: 'R32', homeSource: { type: 'group', group: 'B', position: 2 }, awaySource: { type: 'group', group: 'C', position: 2 }, nextMatchId: 'R16-1', nextSlot: 'away' },
  { id: 'R32-3',  round: 'R32', homeSource: { type: 'group', group: 'D', position: 1 }, awaySource: { type: 'third', rank: 6 }, nextMatchId: 'R16-2', nextSlot: 'home' },
  { id: 'R32-4',  round: 'R32', homeSource: { type: 'group', group: 'E', position: 2 }, awaySource: { type: 'group', group: 'F', position: 2 }, nextMatchId: 'R16-2', nextSlot: 'away' },
  { id: 'R32-5',  round: 'R32', homeSource: { type: 'group', group: 'B', position: 1 }, awaySource: { type: 'third', rank: 4 }, nextMatchId: 'R16-3', nextSlot: 'home' },
  { id: 'R32-6',  round: 'R32', homeSource: { type: 'group', group: 'A', position: 2 }, awaySource: { type: 'group', group: 'D', position: 2 }, nextMatchId: 'R16-3', nextSlot: 'away' },
  { id: 'R32-7',  round: 'R32', homeSource: { type: 'group', group: 'C', position: 1 }, awaySource: { type: 'third', rank: 1 }, nextMatchId: 'R16-4', nextSlot: 'home' },
  { id: 'R32-8',  round: 'R32', homeSource: { type: 'group', group: 'F', position: 1 }, awaySource: { type: 'group', group: 'E', position: 1 }, nextMatchId: 'R16-4', nextSlot: 'away' },
  // Bottom half
  { id: 'R32-9',  round: 'R32', homeSource: { type: 'group', group: 'G', position: 1 }, awaySource: { type: 'third', rank: 5 }, nextMatchId: 'R16-5', nextSlot: 'home' },
  { id: 'R32-10', round: 'R32', homeSource: { type: 'group', group: 'H', position: 2 }, awaySource: { type: 'group', group: 'I', position: 2 }, nextMatchId: 'R16-5', nextSlot: 'away' },
  { id: 'R32-11', round: 'R32', homeSource: { type: 'group', group: 'J', position: 1 }, awaySource: { type: 'third', rank: 8 }, nextMatchId: 'R16-6', nextSlot: 'home' },
  { id: 'R32-12', round: 'R32', homeSource: { type: 'group', group: 'K', position: 2 }, awaySource: { type: 'group', group: 'L', position: 2 }, nextMatchId: 'R16-6', nextSlot: 'away' },
  { id: 'R32-13', round: 'R32', homeSource: { type: 'group', group: 'H', position: 1 }, awaySource: { type: 'third', rank: 7 }, nextMatchId: 'R16-7', nextSlot: 'home' },
  { id: 'R32-14', round: 'R32', homeSource: { type: 'group', group: 'G', position: 2 }, awaySource: { type: 'group', group: 'J', position: 2 }, nextMatchId: 'R16-7', nextSlot: 'away' },
  { id: 'R32-15', round: 'R32', homeSource: { type: 'group', group: 'I', position: 1 }, awaySource: { type: 'third', rank: 2 }, nextMatchId: 'R16-8', nextSlot: 'home' },
  { id: 'R32-16', round: 'R32', homeSource: { type: 'group', group: 'L', position: 1 }, awaySource: { type: 'group', group: 'K', position: 1 }, nextMatchId: 'R16-8', nextSlot: 'away' },
];

const R16: KnockoutMatchDef[] = [
  { id: 'R16-1', round: 'R16', homeSource: { type: 'winner', matchId: 'R32-1' }, awaySource: { type: 'winner', matchId: 'R32-2' }, nextMatchId: 'QF-1', nextSlot: 'home' },
  { id: 'R16-2', round: 'R16', homeSource: { type: 'winner', matchId: 'R32-3' }, awaySource: { type: 'winner', matchId: 'R32-4' }, nextMatchId: 'QF-1', nextSlot: 'away' },
  { id: 'R16-3', round: 'R16', homeSource: { type: 'winner', matchId: 'R32-5' }, awaySource: { type: 'winner', matchId: 'R32-6' }, nextMatchId: 'QF-2', nextSlot: 'home' },
  { id: 'R16-4', round: 'R16', homeSource: { type: 'winner', matchId: 'R32-7' }, awaySource: { type: 'winner', matchId: 'R32-8' }, nextMatchId: 'QF-2', nextSlot: 'away' },
  { id: 'R16-5', round: 'R16', homeSource: { type: 'winner', matchId: 'R32-9' }, awaySource: { type: 'winner', matchId: 'R32-10' }, nextMatchId: 'QF-3', nextSlot: 'home' },
  { id: 'R16-6', round: 'R16', homeSource: { type: 'winner', matchId: 'R32-11' }, awaySource: { type: 'winner', matchId: 'R32-12' }, nextMatchId: 'QF-3', nextSlot: 'away' },
  { id: 'R16-7', round: 'R16', homeSource: { type: 'winner', matchId: 'R32-13' }, awaySource: { type: 'winner', matchId: 'R32-14' }, nextMatchId: 'QF-4', nextSlot: 'home' },
  { id: 'R16-8', round: 'R16', homeSource: { type: 'winner', matchId: 'R32-15' }, awaySource: { type: 'winner', matchId: 'R32-16' }, nextMatchId: 'QF-4', nextSlot: 'away' },
];

const QF: KnockoutMatchDef[] = [
  { id: 'QF-1', round: 'QF', homeSource: { type: 'winner', matchId: 'R16-1' }, awaySource: { type: 'winner', matchId: 'R16-2' }, nextMatchId: 'SF-1', nextSlot: 'home' },
  { id: 'QF-2', round: 'QF', homeSource: { type: 'winner', matchId: 'R16-3' }, awaySource: { type: 'winner', matchId: 'R16-4' }, nextMatchId: 'SF-1', nextSlot: 'away' },
  { id: 'QF-3', round: 'QF', homeSource: { type: 'winner', matchId: 'R16-5' }, awaySource: { type: 'winner', matchId: 'R16-6' }, nextMatchId: 'SF-2', nextSlot: 'home' },
  { id: 'QF-4', round: 'QF', homeSource: { type: 'winner', matchId: 'R16-7' }, awaySource: { type: 'winner', matchId: 'R16-8' }, nextMatchId: 'SF-2', nextSlot: 'away' },
];

const SF: KnockoutMatchDef[] = [
  { id: 'SF-1', round: 'SF', homeSource: { type: 'winner', matchId: 'QF-1' }, awaySource: { type: 'winner', matchId: 'QF-2' }, nextMatchId: 'F-1', nextSlot: 'home' },
  { id: 'SF-2', round: 'SF', homeSource: { type: 'winner', matchId: 'QF-3' }, awaySource: { type: 'winner', matchId: 'QF-4' }, nextMatchId: 'F-1', nextSlot: 'away' },
];

const FINAL: KnockoutMatchDef[] = [
  { id: 'F-1', round: 'F', homeSource: { type: 'winner', matchId: 'SF-1' }, awaySource: { type: 'winner', matchId: 'SF-2' } },
];

export const KNOCKOUT_MATCHES: KnockoutMatchDef[] = [...R32, ...R16, ...QF, ...SF, ...FINAL];

export const ROUNDS = ['R32', 'R16', 'QF', 'SF', 'F'] as const;
export type Round = (typeof ROUNDS)[number];

export const ROUND_LABELS: Record<Round, string> = {
  R32: 'Round of 32',
  R16: 'Round of 16',
  QF: 'Quarter-Finals',
  SF: 'Semi-Finals',
  F: 'Final',
};

export function getMatchesByRound(round: Round): KnockoutMatchDef[] {
  return KNOCKOUT_MATCHES.filter(m => m.round === round);
}
