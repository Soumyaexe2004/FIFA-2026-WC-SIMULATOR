'use client';

import { useRef } from 'react';
import BracketMatch from './BracketMatch';
import { useTournamentStore } from '@/lib/store';
import { ROUNDS, ROUND_LABELS, getMatchesByRound, type Round } from '@/lib/tournament-data';
import { Trophy, Sparkles } from 'lucide-react';

export default function KnockoutBracket() {
  const knockoutBracket = useTournamentStore(s => s.knockoutBracket);
  const champion = useTournamentStore(s => s.champion);
  const bracketRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full" id="bracket-container">
      {/* ── Compact Infographic Header ── */}
      <div className="text-center mb-6 pb-4 border-b border-slate-700/30">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-[10px] font-bold text-yellow-400/80 uppercase tracking-[0.3em]">
            FIFA World Cup 2026
          </span>
          <Trophy className="w-4 h-4 text-yellow-400" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-slate-100">
          Bracket Predictor
        </h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-2 rounded-full" />
      </div>

      {/* Champion banner */}
      {champion && (
        <div className="mb-6 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 text-center animate-fade-in max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">
              Your Predicted Champion
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="flex items-center justify-center gap-3">
            <img src={champion.flag} alt={`${champion.code} flag`} crossOrigin="anonymous" className="w-10 h-7 object-cover rounded-sm shadow-md" />
            <span className="text-2xl font-black text-white drop-shadow-md">{champion.name}</span>
          </div>
        </div>
      )}

      {/* Bracket tree - horizontal scroll wrapper */}
      <div className="overflow-x-auto pb-4 scrollbar-thin" ref={bracketRef}>
        <div className="bracket-tree flex items-start gap-0 min-w-max px-2 py-8">
          {ROUNDS.map((round: Round) => {
            const matches = getMatchesByRound(round);
            const isFinal = round === 'F';

            return (
              <div key={round} className="flex flex-col items-center flex-shrink-0">
                {/* Round header */}
                <div className={`
                  mb-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest
                  ${isFinal
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/25'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/30'
                  }
                `}>
                  {ROUND_LABELS[round]}
                </div>

                {/* Matches column */}
                <div className={`
                  flex flex-col items-center
                  ${round === 'R32' ? 'gap-4' : ''}
                  ${round === 'R16' ? 'gap-12' : ''}
                  ${round === 'QF' ? 'gap-28' : ''}
                  ${round === 'SF' ? 'gap-60' : ''}
                  ${round === 'F' ? 'gap-0' : ''}
                `}
                  style={{
                    paddingTop: round === 'R16' ? '28px'
                      : round === 'QF' ? '76px'
                      : round === 'SF' ? '170px'
                      : round === 'F' ? '362px'
                      : '0px',
                  }}
                >
                  {matches.map(match => (
                    <BracketMatch
                      key={match.id}
                      matchId={match.id}
                      roundLabel={ROUND_LABELS[round]}
                      matchState={knockoutBracket[match.id] || { home: null, away: null, winner: null }}
                      compact={round === 'R32'}
                    />
                  ))}
                </div>

                {/* Connector lines (via CSS) */}
                {!isFinal && <div className="bracket-connectors" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Compact Infographic Footer ── */}
      <div className="text-center mt-6 pt-4 border-t border-slate-700/30">
        <p className="text-[10px] text-slate-500 font-medium tracking-[0.2em] uppercase">
          Predicted via <span className="text-cyan-400 font-bold">FIFA 2026 Bracket Builder</span>
        </p>
      </div>
    </div>
  );
}
