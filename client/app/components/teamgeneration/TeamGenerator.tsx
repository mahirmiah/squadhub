import { useState } from 'react';
import PlayerSelection from '~/components/teamgeneration/PlayerSelection';
import SoccerPitch from '../SoccerPitch';
import type { Player } from '~/types/player';
import type { Team } from '~/types/team';

type TeamGeneratorProps = {
  players: Player[];
};

export default function TeamGenerator({ players }: TeamGeneratorProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  async function generateTeams() {
    const response = await fetch('http://localhost:3000/teams/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerIds: selectedPlayers,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate teams');
    }

    const data = (await response.json()) as Team[];

    setTeams(data);
  }

  function reset() {
    setSelectedPlayers([]);
    setTeams([]);
  }

  return (
    <div>
      <header className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 bg-cyan-400/60" />

          <span className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
            Match Setup
          </span>
        </div>

        <h1 className="text-4xl font-black tracking-tight md:text-5xl">Generate Teams</h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
          Select the players for this game and SquadHub will generate balanced teams based on player
          ratings.
        </p>
      </header>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-black">Select Players</h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose the players participating in this match.
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
              Selected
            </span>

            <span className="ml-2 text-sm font-black text-white">{selectedPlayers.length}</span>
          </div>
        </div>

        <PlayerSelection
          players={players}
          selectedPlayers={selectedPlayers}
          onSelectionChange={setSelectedPlayers}
        />
      </section>

      <section
        className="
          mt-10
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-white/10
          bg-white/[0.025]
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <p className="text-sm font-bold text-white">Ready to generate?</p>

          <p className="mt-1 text-xs text-slate-500">
            {selectedPlayers.length === 0
              ? 'Select players to continue.'
              : `${selectedPlayers.length} players selected.`}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-5
              py-3
              text-sm
              font-bold
              text-slate-300
              transition
              hover:border-white/20
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            Reset
          </button>

          <button
            type="button"
            onClick={generateTeams}
            disabled={selectedPlayers.length === 0}
            className="
              rounded-xl
              border
              border-cyan-300/30
              bg-cyan-400
              px-6
              py-3
              text-sm
              font-black
              text-slate-950
              shadow-[0_0_25px_rgba(34,211,238,0.20)]
              transition
              hover:bg-cyan-300
              disabled:cursor-not-allowed
              disabled:border-white/5
              disabled:bg-white/10
              disabled:text-slate-600
              disabled:shadow-none
            "
          >
            Generate Teams
          </button>
        </div>
      </section>

      {teams.length > 0 && (
        <section className="mt-14">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="h-px w-8 bg-cyan-400/60" />

                <span className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                  Match Result
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight">Generated Teams</h2>
            </div>

            <p className="hidden text-xs font-bold uppercase tracking-[0.15em] text-slate-600 sm:block">
              Balanced by rating
            </p>
          </div>

          <SoccerPitch teams={teams} />
        </section>
      )}
    </div>
  );
}
