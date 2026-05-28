'use client';

import { create } from 'zustand';
import { GROUPS, KNOCKOUT_MATCHES, POSITION_POINTS, type Team, type KnockoutMatchDef } from './tournament-data';

// ── Types ──
export interface ThirdPlaceEntry {
  team: Team;
  points: number;
  group: string;
  rank: number;
}

export interface KnockoutMatchState {
  home: Team | null;
  away: Team | null;
  winner: Team | null;
}

interface TournamentState {
  // Group rankings: groupId -> ordered array of team IDs (index 0 = 1st place)
  groupRankings: Record<string, string[]>;

  // Knockout bracket: matchId -> match state
  knockoutBracket: Record<string, KnockoutMatchState>;

  // Active tab
  activeTab: 'groups' | 'bracket';

  // Champion
  champion: Team | null;

  // Selected 3rd place teams (manual override)
  selectedThirdPlace: string[];

  // Dirty flag for save
  isDirty: boolean;

  // Actions
  setGroupRanking: (groupId: string, teamIds: string[]) => void;
  getTeamById: (teamId: string) => Team | undefined;
  getGroupRankings: (groupId: string) => Team[];
  getThirdPlaceTeams: () => ThirdPlaceEntry[];
  getBestThirdPlace: () => ThirdPlaceEntry[];
  toggleThirdPlace: (teamId: string) => void;
  populateKnockout: () => void;
  advanceTeam: (matchId: string, team: Team) => void;
  setActiveTab: (tab: 'groups' | 'bracket') => void;
  resetBracket: () => void;
  saveBracket: () => string;
}

// Build lookup maps
const allTeams: Team[] = GROUPS.flatMap(g => g.teams);
const teamMap = new Map(allTeams.map(t => [t.id, t]));

// Initialize default rankings (teams in original order)
function getInitialRankings(): Record<string, string[]> {
  const rankings: Record<string, string[]> = {};
  for (const group of GROUPS) {
    rankings[group.id] = group.teams.map(t => t.id);
  }
  return rankings;
}

// Initialize empty knockout bracket
function getInitialKnockout(): Record<string, KnockoutMatchState> {
  const bracket: Record<string, KnockoutMatchState> = {};
  for (const match of KNOCKOUT_MATCHES) {
    bracket[match.id] = { home: null, away: null, winner: null };
  }
  return bracket;
}

export const useTournamentStore = create<TournamentState>((set, get) => ({
  groupRankings: getInitialRankings(),
  knockoutBracket: getInitialKnockout(),
  activeTab: 'groups',
  champion: null,
  selectedThirdPlace: [],
  isDirty: false,

  setGroupRanking: (groupId, teamIds) => {
    set(state => ({
      groupRankings: { ...state.groupRankings, [groupId]: teamIds },
      isDirty: true,
    }));
  },

  getTeamById: (teamId) => teamMap.get(teamId),

  getGroupRankings: (groupId) => {
    const ids = get().groupRankings[groupId] || [];
    return ids.map(id => teamMap.get(id)).filter(Boolean) as Team[];
  },

  getThirdPlaceTeams: () => {
    const rankings = get().groupRankings;
    const thirds: ThirdPlaceEntry[] = [];

    for (const group of GROUPS) {
      const ids = rankings[group.id];
      if (ids && ids.length >= 3) {
        const thirdId = ids[2]; // 0-indexed, position 3
        const team = teamMap.get(thirdId);
        if (team) {
          thirds.push({
            team,
            points: POSITION_POINTS[2], // 3 points for 3rd place
            group: group.id,
            rank: 0,
          });
        }
      }
    }

    // Sort by points (all equal here at 3), then alphabetically by group
    thirds.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return a.group.localeCompare(b.group);
    });

    // Assign ranks
    thirds.forEach((entry, i) => { entry.rank = i + 1; });

    return thirds;
  },

  getBestThirdPlace: () => {
    const thirds = get().getThirdPlaceTeams();
    const selectedIds = get().selectedThirdPlace;
    
    if (selectedIds.length === 0) return thirds.slice(0, 8);
    
    const validSelected = thirds.filter(t => selectedIds.includes(t.team.id));
    
    if (validSelected.length < 8) {
      const remainingNeeded = 8 - validSelected.length;
      const nonSelected = thirds.filter(t => !selectedIds.includes(t.team.id));
      validSelected.push(...nonSelected.slice(0, remainingNeeded));
    }
    
    return validSelected.sort((a, b) => a.rank - b.rank);
  },

  toggleThirdPlace: (teamId) => {
    set(state => {
      let currentSelected = [...state.selectedThirdPlace];
      
      if (currentSelected.length === 0) {
        const thirds = state.getThirdPlaceTeams();
        currentSelected = thirds.slice(0, 8).map(t => t.team.id);
      }
      
      if (currentSelected.includes(teamId)) {
        currentSelected = currentSelected.filter(id => id !== teamId);
      } else {
        if (currentSelected.length < 8) {
          currentSelected.push(teamId);
        }
      }
      
      return { selectedThirdPlace: currentSelected, isDirty: true };
    });
  },

  populateKnockout: () => {
    const state = get();
    const rankings = state.groupRankings;
    const bestThird = state.getBestThirdPlace();
    const newBracket = getInitialKnockout();

    // Helper to resolve a source slot to a Team
    function resolveSource(source: KnockoutMatchDef['homeSource']): Team | null {
      if (source.type === 'group') {
        const ids = rankings[source.group];
        if (!ids) return null;
        const idx = source.position - 1;
        return teamMap.get(ids[idx]) || null;
      }
      if (source.type === 'third') {
        const entry = bestThird[source.rank - 1];
        return entry?.team || null;
      }
      return null; // 'winner' type resolved later
    }

    // Populate R32 matches from group results
    for (const match of KNOCKOUT_MATCHES) {
      if (match.round === 'R32') {
        newBracket[match.id] = {
          home: resolveSource(match.homeSource),
          away: resolveSource(match.awaySource),
          winner: null,
        };
      }
    }

    set({ knockoutBracket: newBracket, champion: null, isDirty: true });
  },

  advanceTeam: (matchId, team) => {
    const state = get();
    const matchDef = KNOCKOUT_MATCHES.find(m => m.id === matchId);
    if (!matchDef) return;

    const newBracket = { ...state.knockoutBracket };

    // Set winner
    newBracket[matchId] = { ...newBracket[matchId], winner: team };

    // Clear downstream recursively
    function clearDownstream(mId: string) {
      const def = KNOCKOUT_MATCHES.find(m => m.id === mId);
      if (!def?.nextMatchId) return;

      const nextMatch = { ...newBracket[def.nextMatchId] };
      if (def.nextSlot === 'home') {
        nextMatch.home = null;
      } else {
        nextMatch.away = null;
      }
      nextMatch.winner = null;
      newBracket[def.nextMatchId] = nextMatch;

      // Continue clearing further downstream
      clearDownstream(def.nextMatchId);
    }

    // Place winner in next match
    if (matchDef.nextMatchId && matchDef.nextSlot) {
      // First, clear any existing downstream from the next match
      clearDownstream(matchId);

      // Then place the winner
      const nextMatch = { ...newBracket[matchDef.nextMatchId] };
      if (matchDef.nextSlot === 'home') {
        nextMatch.home = team;
      } else {
        nextMatch.away = team;
      }
      newBracket[matchDef.nextMatchId] = nextMatch;
    }

    // Check for champion
    let champion: Team | null = null;
    if (matchDef.round === 'F') {
      champion = team;
    }

    set({ knockoutBracket: newBracket, champion, isDirty: true });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  resetBracket: () => {
    set({
      groupRankings: getInitialRankings(),
      knockoutBracket: getInitialKnockout(),
      champion: null,
      selectedThirdPlace: [],
      isDirty: false,
    });
  },

  saveBracket: () => {
    const state = get();
    const data = {
      groupRankings: state.groupRankings,
      knockoutBracket: state.knockoutBracket,
      champion: state.champion,
      selectedThirdPlace: state.selectedThirdPlace,
      savedAt: new Date().toISOString(),
    };
    const json = JSON.stringify(data, null, 2);
    set({ isDirty: false });
    return json;
  },
}));
