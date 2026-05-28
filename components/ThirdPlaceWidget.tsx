'use client';

import { useTournamentStore } from '@/lib/store';
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react';

export default function ThirdPlaceWidget() {
  const getThirdPlaceTeams = useTournamentStore(s => s.getThirdPlaceTeams);
  const selectedThirdPlace = useTournamentStore(s => s.selectedThirdPlace);
  const toggleThirdPlace = useTournamentStore(s => s.toggleThirdPlace);
  const thirds = getThirdPlaceTeams();
  
  // If no manual selection, the top 8 are selected by default.
  const isSelected = (teamId: string, index: number) => {
    if (selectedThirdPlace.length === 0) return index < 8;
    return selectedThirdPlace.includes(teamId);
  };

  const selectedCount = selectedThirdPlace.length === 0 ? 8 : selectedThirdPlace.length;

  return (
    <div className="w-full rounded-xl border border-slate-700/50 bg-gradient-to-b from-slate-800/80 to-slate-900/90 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700/40 bg-slate-800/50 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-bold text-white tracking-wider uppercase">
          Best 3rd-Place Teams
        </h3>
        <span className="ml-auto text-[10px] text-slate-500 font-medium uppercase tracking-widest bg-slate-900/50 px-2 py-1 rounded">
          Selected: {selectedCount}/8
        </span>
      </div>

      {/* Team list */}
      <div className="p-3 space-y-1">
        {thirds.map((entry, i) => {
          const advances = isSelected(entry.team.id, i);
          return (
            <div
              key={entry.team.id}
              onClick={() => toggleThirdPlace(entry.team.id)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer
                ${advances
                  ? 'border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                  : 'border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 opacity-60 hover:opacity-100'
                }
              `}
            >
              {/* Rank */}
              <span className={`
                w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold
                ${advances ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}
              `}>
                {i + 1}
              </span>

              {/* Flag */}
              <img src={entry.team.flag} alt={`${entry.team.code} flag`} className="w-6 h-4 object-cover rounded-[2px] shadow-sm shrink-0" />

              {/* Team name */}
              <span className={`flex-1 text-sm font-bold truncate bg-gradient-to-r ${entry.team.color} text-transparent bg-clip-text drop-shadow-sm`}>
                {entry.team.name}
              </span>

              {/* Group badge */}
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/60 border border-slate-700/30 text-slate-500">
                Grp {entry.group}
              </span>

              {/* Points */}
              <span className="text-xs font-mono text-slate-400">
                {entry.points}pts
              </span>

              {/* Status icon */}
              {advances ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-slate-700/30 bg-slate-800/30">
        <p className="text-[11px] text-slate-400">
          Click teams to manually select which 8 advance. Default selection uses points/alphabetical tiebreakers.
        </p>
      </div>
    </div>
  );
}
