'use client';

import { useTournamentStore, type KnockoutMatchState } from '@/lib/store';
import type { Team } from '@/lib/tournament-data';

interface BracketMatchProps {
  matchId: string;
  roundLabel: string;
  matchState: KnockoutMatchState;
  compact?: boolean;
}

function TeamSlot({
  team,
  isWinner,
  onClick,
  position,
}: {
  team: Team | null;
  isWinner: boolean;
  onClick: () => void;
  position: 'home' | 'away';
}) {
  if (!team) {
    return (
      <div className={`
        flex items-center gap-2 px-3 py-2 
        ${position === 'home' ? 'rounded-t-lg' : 'rounded-b-lg'}
        bg-slate-800/30
        text-slate-600 text-xs italic
      `}>
        <span className="w-5 h-3.5 rounded-sm bg-slate-700/40 border border-dashed border-slate-600/30 shrink-0" />
        <span>TBD</span>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2 px-3 py-2 transition-all duration-200
        ${position === 'home' ? 'rounded-t-lg' : 'rounded-b-lg'}
        ${isWinner
          ? 'bg-cyan-950/80 border border-cyan-500/40 text-white'
          : 'bg-slate-800/50 border border-transparent text-slate-300 hover:bg-slate-700/60 hover:text-white'
        }
        group cursor-pointer
      `}
      aria-label={`Select ${team.name} as winner`}
    >
      <img src={team.flag} alt={team.code} crossOrigin="anonymous" className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm shrink-0" />
      <span className={`flex-1 text-left text-xs font-bold truncate ${isWinner ? 'text-cyan-200' : 'text-slate-200'} min-w-0`}>{team.code}</span>
      <span className={`text-[10px] truncate hidden sm:inline shrink-0 ${isWinner ? 'text-cyan-300/70' : 'text-slate-500 group-hover:text-slate-400'}`}>
        {team.name}
      </span>
      {isWinner && (
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
      )}
    </button>
  );
}

export default function BracketMatch({ matchId, matchState, compact }: BracketMatchProps) {
  const advanceTeam = useTournamentStore(s => s.advanceTeam);
  const hasWinner = matchState.winner !== null;

  const handleClick = (team: Team | null) => {
    if (!team) return;
    if (matchState.winner?.id === team.id) return;
    advanceTeam(matchId, team);
  };

  return (
    <div className={`
      bracket-match relative
      ${compact ? 'w-[160px]' : 'w-[200px]'}
      rounded-lg overflow-hidden
      ${hasWinner
        ? 'border border-cyan-500/25 shadow-md shadow-cyan-500/5'
        : 'border border-slate-700/40 shadow-md shadow-black/20'
      }
      bg-slate-900/90
      hover:border-slate-600/60 transition-all duration-200
    `}>
      {/* Match ID label */}
      <div className="absolute -top-5 left-0 text-[9px] font-mono text-slate-600 uppercase">
        {matchId}
      </div>

      <TeamSlot
        team={matchState.home}
        isWinner={matchState.winner?.id === matchState.home?.id && matchState.winner !== null}
        onClick={() => handleClick(matchState.home)}
        position="home"
      />
      <div className="h-px bg-slate-700/30" />
      <TeamSlot
        team={matchState.away}
        isWinner={matchState.winner?.id === matchState.away?.id && matchState.winner !== null}
        onClick={() => handleClick(matchState.away)}
        position="away"
      />
    </div>
  );
}
