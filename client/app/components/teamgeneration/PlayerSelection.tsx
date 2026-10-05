import PlayerCard from '~/components/PlayerCard';
import type { Player } from '~/types/player';

type PlayerSelectionProps = {
  players: Player[];
  selectedPlayers: number[];
  onSelectionChange: (ids: number[]) => void;
};

export default function PlayerSelection({
  players,
  selectedPlayers,
  onSelectionChange,
}: PlayerSelectionProps) {
  function togglePlayer(playerId: number) {
    if (selectedPlayers.includes(playerId)) {
      onSelectionChange(selectedPlayers.filter((id) => id !== playerId));
      return;
    }

    onSelectionChange([...selectedPlayers, playerId]);
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        justify-items-center
        gap-x-7
        gap-y-12
        min-[500px]:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
      "
    >
      {players.map((player) => {
        const selected = selectedPlayers.includes(player.id);

        return (
          <button
            key={player.id}
            type="button"
            onClick={() => togglePlayer(player.id)}
            aria-pressed={selected}
            className={`
              relative
              rounded-[30px]
              transition-all
              duration-300
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300
              focus-visible:ring-offset-4
              focus-visible:ring-offset-[#070b12]
              ${
                selected
                  ? 'scale-[1.04] ring-2 ring-cyan-300 ring-offset-4 ring-offset-[#070b12]'
                  : 'hover:scale-[1.03]'
              }
            `}
          >
            <PlayerCard player={player} />

            {selected && (
              <>
                <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-cyan-300/10" />

                <div
                  className="
                    absolute
                    right-3
                    top-3
                    z-50
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-cyan-300
                    text-sm
                    font-black
                    text-slate-950
                    shadow-[0_0_20px_rgba(34,211,238,0.7)]
                  "
                >
                  ✓
                </div>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
