'use client';

import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { useTournamentStore } from '@/lib/store';
import { POSITION_POINTS, type Team } from '@/lib/tournament-data';

// ── Position badge colors (Gold, Silver, Bronze, Slate) ──
const badgeStyles = [
  'bg-yellow-500/10 border-yellow-500/50 text-yellow-500',
  'bg-slate-300/10 border-slate-400/50 text-slate-300',
  'bg-amber-700/10 border-amber-600/50 text-amber-500',
  'bg-slate-700/20 border-slate-600/40 text-slate-400',
];

const positionIcons = [
  <Trophy key="1" className="w-4 h-4" />,
  <Medal key="2" className="w-4 h-4" />,
  <Award key="3" className="w-4 h-4" />,
  null,
];

// ── Team Row ──
function TeamRow({ team, position, onRankClick }: { team: Team; position: number; onRankClick: (newPos: number) => void }) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 sm:gap-3 px-3 py-2.5 border-b border-slate-700/30 last:border-0 hover:bg-slate-800/40 transition-colors"
    >
      {/* Position badge */}
      <div className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border text-xs font-bold shrink-0 ${badgeStyles[position]}`}>
        {position + 1}
      </div>

      {/* Flag */}
      <img src={team.flag} alt={`${team.code} flag`} className="w-6 h-4 object-cover rounded-[2px] shadow-sm shrink-0" />

      {/* Team name */}
      <span className={`flex-1 text-sm font-bold leading-tight whitespace-normal break-words bg-gradient-to-r ${team.color || 'from-slate-300 to-slate-500'} text-transparent bg-clip-text drop-shadow-sm min-w-[80px]`}>
        {team.name}
      </span>

      {/* Position icon */}
      <span className="opacity-60 hidden sm:block shrink-0">{positionIcons[position]}</span>

      {/* Points */}
      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/40 border border-slate-700/30 text-slate-400 hidden sm:block shrink-0">
        {POSITION_POINTS[position]}pts
      </span>

      {/* Rank Assignment Buttons */}
      <div className="flex flex-wrap gap-1 ml-auto shrink-0 w-14 sm:w-auto sm:flex-nowrap justify-end">
        {[0, 1, 2, 3].map((pos) => (
          <button
            key={pos}
            onClick={() => onRankClick(pos)}
            className={`
              w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-colors
              ${position === pos 
                ? 'bg-cyan-500 text-white shadow-[0_0_8px_rgba(6,182,212,0.5)] border border-cyan-400' 
                : 'bg-slate-800/80 text-slate-500 hover:bg-slate-700 hover:text-slate-300 border border-slate-700/50'
              }
            `}
            aria-label={`Rank ${team.name} at position ${pos + 1}`}
          >
            {pos + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Group Card ──
export default function GroupCard({ groupId, groupName }: { groupId: string; groupName: string }) {
  const rankings = useTournamentStore(state => state.groupRankings[groupId]);
  const setGroupRanking = useTournamentStore(state => state.setGroupRanking);
  const getTeamById = useTournamentStore(state => state.getTeamById);

  const teams = rankings.map(id => getTeamById(id)).filter(Boolean) as Team[];

  function handleRankClick(teamId: string, newPos: number) {
    const oldPos = rankings.indexOf(teamId);
    if (oldPos === newPos) return;

    // Create a copy of the current rankings
    const newRankings = [...rankings];
    
    // Swap the teams
    const temp = newRankings[newPos];
    newRankings[newPos] = teamId;
    newRankings[oldPos] = temp;

    setGroupRanking(groupId, newRankings);
  }

  return (
    <div className="group-card relative rounded-xl border border-slate-700/50 bg-gradient-to-b from-slate-800/80 to-slate-900/90 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-slate-600/60 hover:shadow-lg hover:shadow-cyan-950/20">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700/40 bg-slate-800/50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-wider uppercase">
            {groupName}
          </h3>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
            Click # to Rank
          </span>
        </div>
      </div>

      {/* Team list */}
      <div className="p-1 sm:p-2 flex flex-col">
        {teams.map((team, index) => (
          <TeamRow 
            key={team.id} 
            team={team} 
            position={index} 
            onRankClick={(newPos) => handleRankClick(team.id, newPos)}
          />
        ))}
      </div>
    </div>
  );
}
