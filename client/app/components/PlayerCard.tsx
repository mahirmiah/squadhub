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

import type { Player } from "~/types/player";

type PlayerCardProps = {
  player: Player;
};

export default function PlayerCard({ player }: PlayerCardProps) {
  const tier = getPlayerTier(player.rating);

  return (
    <div
      className={`group w-52 overflow-hidden rounded-2xl border-2 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900 ${tier.border}`}
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-4xl font-black text-gray-900 dark:text-white">
            {player.rating}
          </span>

          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Overall
          </p>
        </div>

        <button className="text-xl text-gray-400 transition hover:text-gray-900 dark:hover:text-white">
          •••
        </button>
      </div>

      {/* Avatar */}
      <div className="my-6 flex justify-center">
        <div
          className={`flex h-28 w-28 items-center justify-center rounded-full text-4xl font-black transition group-hover:scale-105 ${tier.avatar}`}
        >
          {player.name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Player Info */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {player.name}
        </h2>

        <div className="mt-3 flex justify-center">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${tier.badge}`}
          >
            {tier.name}
          </span>
        </div>
      </div>
    </div>
  );
}

function getPlayerTier(rating: number) {
  switch (rating) {
    case 3:
      return {
        name: "Gold",
        border: "border-yellow-500/60",
        avatar:
          "bg-gradient-to-br from-yellow-300 to-yellow-600 text-yellow-950",
        badge: "bg-yellow-500/15 text-yellow-500",
      };

    case 2:
      return {
        name: "Silver",
        border: "border-slate-400/60",
        avatar: "bg-gradient-to-br from-slate-200 to-slate-500 text-slate-800",
        badge: "bg-slate-400/15 text-slate-400",
      };

    default:
      return {
        name: "Bronze",
        border: "border-orange-700/60",
        avatar:
          "bg-gradient-to-br from-orange-400 to-orange-800 text-orange-950",
        badge: "bg-orange-700/15 text-orange-500",
      };
  }
}
