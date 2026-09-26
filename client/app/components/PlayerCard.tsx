import type { Player } from "~/types/player";

type PlayerCardProps = {
  player: Player;
};

function getCardStyle(rating: number) {
  if (rating >= 80) {
    return {
      tier: "Gold",
      background:
        "bg-[linear-gradient(135deg,#8f6817_0%,#f8e38a_18%,#c99b2e_38%,#fff1a8_52%,#b88620_72%,#f5d76e_88%,#8f6817_100%)]",
      border: "border-yellow-600/60",
    };
  }

  if (rating >= 65) {
    return {
      tier: "Silver",
      background:
        "bg-[linear-gradient(135deg,#73777c_0%,#e8ebed_18%,#9da2a6_38%,#f8f9fa_52%,#858a8f_72%,#d9dcdf_88%,#74787c_100%)]",
      border: "border-gray-400/70",
    };
  }

  return {
    tier: "Bronze",
    background:
      "bg-[linear-gradient(135deg,#6f351d_0%,#e6a06f_18%,#9c5431_38%,#f1b482_52%,#8b4729_72%,#d88b5c_88%,#68301c_100%)]",
    border: "border-orange-800/60",
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const card = getCardStyle(player.rating);

  return (
    <div
      className={`
        group relative h-72 w-52 overflow-hidden
        rounded-[28px] border
        ${card.background}
        ${card.border}
        shadow-xl transition-all duration-300
        hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
      `}
    >
      {/* Metallic texture */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-20
          bg-[repeating-linear-gradient(125deg,transparent_0px,transparent_8px,rgba(255,255,255,0.4)_9px,transparent_10px)]
        "
      />

      {/* Metallic light reflection */}
      <div
        className="
          pointer-events-none absolute -left-20 top-20
          h-32 w-[150%] -rotate-12
          bg-gradient-to-b from-white/5 via-white/35 to-white/5
        "
      />

      {/* Animated shine */}
      <div
        className="
          pointer-events-none absolute -left-[120%] top-0 z-20
          h-full w-1/2 skew-x-[-20deg]
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          transition-all duration-700
          group-hover:left-[140%]
        "
      />

      {/* Overall Rating */}
      <div className="absolute left-5 top-5 z-10">
        <div className="text-4xl font-black leading-none text-black/85">
          {player.rating}
        </div>

        <div className="mt-1 text-xs font-bold uppercase tracking-widest text-black/60">
          OVR
        </div>
      </div>

      {/* Avatar */}
      <div className="relative z-10 flex h-48 items-end justify-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-black/10">
          <span className="text-5xl font-black text-black/25">
            {player.name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Player Info */}
      <div className="relative z-10 px-4 pt-4 text-center">
        <h2 className="truncate text-xl font-black uppercase tracking-wide text-black/85">
          {player.name}
        </h2>

        <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-black/50">
          {card.tier}
        </p>
      </div>
    </div>
  );
}

// import type { Player } from '~/types/player';

// type PlayerCardProps = {
//   player: Player;
// };

// export default function PlayerCard({ player }: PlayerCardProps) {
//   return (
//     <div className="w-48 rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
//       <div className="relative">
//         <div className="flex h-48 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800">
//           <span className="text-4xl font-bold">{player.rating}</span>
//         </div>
//       </div>

//       <div className="mt-2 text-center">
//         <h2 className="font-bold">{player.name}</h2>
//       </div>
//     </div>
//   );
// }
