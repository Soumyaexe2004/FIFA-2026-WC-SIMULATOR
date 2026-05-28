'use client';

import GroupCard from './GroupCard';
import { GROUPS } from '@/lib/tournament-data';

export default function GroupStage() {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
        <h2 className="text-lg font-bold text-slate-200 tracking-wide uppercase">
          Group Stage Predictions
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </div>
      <p className="text-center text-sm text-slate-500 mb-6">
        Click the rank numbers [1] [2] [3] [4] to set your predicted finishing order. 1st place = 9pts, 2nd = 6pts, 3rd = 3pts.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {GROUPS.map(group => (
          <GroupCard key={group.id} groupId={group.id} groupName={group.name} />
        ))}
      </div>
    </div>
  );
}
