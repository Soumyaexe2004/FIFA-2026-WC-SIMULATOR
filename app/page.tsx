'use client';

import { useCallback, useState } from 'react';
import { useTournamentStore } from '@/lib/store';
import GroupStage from '@/components/GroupStage';
import ThirdPlaceWidget from '@/components/ThirdPlaceWidget';
import KnockoutBracket from '@/components/KnockoutBracket';
import ExportButtons from '@/components/ExportButtons';
import {
  Trophy,
  LayoutGrid,
  GitBranch,
  ArrowRight,
  Save,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export default function Home() {
  const activeTab = useTournamentStore(s => s.activeTab);
  const setActiveTab = useTournamentStore(s => s.setActiveTab);
  const populateKnockout = useTournamentStore(s => s.populateKnockout);
  const resetBracket = useTournamentStore(s => s.resetBracket);
  const saveBracket = useTournamentStore(s => s.saveBracket);
  const isDirty = useTournamentStore(s => s.isDirty);

  const [showSaveToast, setShowSaveToast] = useState(false);

  const handleProceedToBracket = useCallback(() => {
    populateKnockout();
    setActiveTab('bracket');
  }, [populateKnockout, setActiveTab]);

  const handleSave = useCallback(() => {
    const json = saveBracket();
    // Store to localStorage as a pluggable save handler
    try {
      localStorage.setItem('fifa-2026-bracket', json);
    } catch { /* no-op */ }
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2500);
  }, [saveBracket]);

  const handleReset = useCallback(() => {
    if (window.confirm('Reset all predictions? This cannot be undone.')) {
      resetBracket();
    }
  }, [resetBracket]);

  return (
    <main className="min-h-screen">
      {/* ── Hero Header ── */}
      <header className="relative overflow-hidden border-b border-slate-800/50">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-cyan-500/8 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400/80 uppercase tracking-[0.3em]">
                FIFA World Cup
              </span>
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-black gradient-text mb-3">
              2026 Bracket Builder
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-lg mb-6">
              Predict your group winners, fill the knockout bracket, and export your
              predictions. 48 teams. 12 groups. One champion.
            </p>

            {/* Tab navigation */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-800/40 border border-slate-700/30">
              <button
                id="tab-groups"
                onClick={() => setActiveTab('groups')}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                  ${activeTab === 'groups'
                    ? 'tab-active text-cyan-300 border border-cyan-500/20'
                    : 'text-slate-500 hover:text-slate-300'
                  }
                `}
              >
                <LayoutGrid className="w-4 h-4" />
                Group Stage
              </button>
              <button
                id="tab-bracket"
                onClick={() => setActiveTab('bracket')}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                  ${activeTab === 'bracket'
                    ? 'tab-active text-cyan-300 border border-cyan-500/20'
                    : 'text-slate-500 hover:text-slate-300'
                  }
                `}
              >
                <GitBranch className="w-4 h-4" />
                Knockout Bracket
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Groups Tab */}
        {activeTab === 'groups' && (
          <div className="animate-fade-in">
            <GroupStage />

            {/* Third Place Widget */}
            <div className="mt-8">
              <ThirdPlaceWidget />
            </div>

            {/* Proceed button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="btn-proceed-bracket"
                onClick={handleProceedToBracket}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold
                  bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                  hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25
                  active:scale-[0.98] transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                Generate Knockout Bracket
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-slate-500">
                This will auto-populate the Round of 32 based on your group rankings
              </p>
            </div>
          </div>
        )}

        {/* Bracket Tab */}
        {activeTab === 'bracket' && (
          <div className="animate-fade-in">
            {/* Top action bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setActiveTab('groups')}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to Groups
              </button>

              <div className="flex items-center gap-3">
                <ExportButtons />

                <button
                  id="btn-save-bracket"
                  onClick={handleSave}
                  disabled={!isDirty}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                    bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30
                    text-emerald-300 hover:from-emerald-500/30 hover:to-green-500/30
                    disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  Save Bracket
                </button>

                <button
                  id="btn-reset"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                    bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20
                    text-red-400 hover:from-red-500/20 hover:to-rose-500/20
                    transition-all duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            {/* Bracket */}
            <KnockoutBracket />
          </div>
        )}
      </div>

      {/* ── Save Toast ── */}
      {showSaveToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium shadow-lg shadow-emerald-500/10">
            <Save className="w-4 h-4" />
            Bracket saved successfully!
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-xs text-slate-600">
            FIFA World Cup 2026 Bracket Builder — Built for fun. Not affiliated with FIFA.
          </p>
        </div>
      </footer>
    </main>
  );
}
