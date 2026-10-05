import type { Team } from '~/types/team';
import PlayerCard from '~/components/PlayerCard';

type SoccerPitchProps = {
  teams: Team[];
};

export default function SoccerPitch({ teams }: SoccerPitchProps) {
  if (teams.length < 2) {
    return null;
  }

  const teamA = teams[0];
  const teamB = teams[1];

  return (
    <div className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Grass */}
        <rect width="1200" height="700" fill="#176b3a" />

        {/* Grass stripes */}
        <rect x="0" y="0" width="150" height="700" fill="#1a7540" />
        <rect x="300" y="0" width="150" height="700" fill="#1a7540" />
        <rect x="600" y="0" width="150" height="700" fill="#1a7540" />
        <rect x="900" y="0" width="150" height="700" fill="#1a7540" />

        {/* Outer boundary */}
        <rect x="25" y="25" width="1150" height="650" fill="none" stroke="white" strokeWidth="4" />

        {/* Halfway line */}
        <line x1="600" y1="25" x2="600" y2="675" stroke="white" strokeWidth="4" />

        {/* Center circle */}
        <circle cx="600" cy="350" r="90" fill="none" stroke="white" strokeWidth="4" />

        {/* Center spot */}
        <circle cx="600" cy="350" r="6" fill="white" />

        {/* Left penalty area */}
        <rect x="25" y="190" width="170" height="320" fill="none" stroke="white" strokeWidth="4" />

        {/* Left six-yard box */}
        <rect x="25" y="265" width="65" height="170" fill="none" stroke="white" strokeWidth="4" />

        {/* Left penalty spot */}
        <circle cx="135" cy="350" r="5" fill="white" />

        {/* Right penalty area */}
        <rect
          x="1005"
          y="190"
          width="170"
          height="320"
          fill="none"
          stroke="white"
          strokeWidth="4"
        />

        {/* Right six-yard box */}
        <rect x="1110" y="265" width="65" height="170" fill="none" stroke="white" strokeWidth="4" />

        {/* Right penalty spot */}
        <circle cx="1065" cy="350" r="5" fill="white" />

        {/* Goals */}
        <rect x="0" y="285" width="25" height="130" fill="none" stroke="white" strokeWidth="4" />

        <rect x="1175" y="285" width="25" height="130" fill="none" stroke="white" strokeWidth="4" />
      </svg>

      <div className="relative aspect-[12/7]">
        {/* Team A */}
        <div className="absolute inset-y-0 left-0 w-1/2">
          <div className="absolute left-5 top-5 z-20">
            <div className="rounded-xl bg-black/50 px-4 py-2 backdrop-blur-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Team A</p>

              <p className="text-sm font-bold text-white">Average {teamA.averageRating}</p>
            </div>
          </div>

          <div className="absolute inset-0 grid grid-cols-2 content-center justify-items-center gap-y-8 px-10 pt-10">
            {teamA.players.map((player) => (
              <div key={player.id} className="h-[105px] w-[76px]">
                <div className="origin-top-left scale-[0.365]">
                  <PlayerCard player={player} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team B */}
        <div className="absolute inset-y-0 right-0 w-1/2">
          <div className="absolute right-5 top-5 z-20">
            <div className="rounded-xl bg-black/50 px-4 py-2 text-right backdrop-blur-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Team B</p>

              <p className="text-sm font-bold text-white">Average {teamB.averageRating}</p>
            </div>
          </div>

          <div className="absolute inset-0 grid grid-cols-2 content-center justify-items-center gap-y-8 px-10 pt-10">
            {teamB.players.map((player) => (
              <div key={player.id} className="h-[105px] w-[76px]">
                <div className="origin-top-left scale-[0.365]">
                  <PlayerCard player={player} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
