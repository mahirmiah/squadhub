// import type { Route } from './+types/home';
// import PlayerCard from '~/components/PlayerCard';
// import type { Player } from '~/types/player';

// export function meta({}: Route.MetaArgs) {
//   return [{ title: 'SquadHub' }, { name: 'description', content: 'SquadHub player database' }];
// }

// export async function loader() {
//   const response = await fetch('http://localhost:3000/players');

//   if (!response.ok) {
//     throw new Error('Failed to fetch players');
//   }

//   const result = (await response.json()) as Player[];

//   return result;
// }

// export default function Home({ loaderData }: Route.ComponentProps) {
//   const players = loaderData;

//   return (
//     <main className="p-8">
//       <h1 className="mb-6 text-3xl font-bold">Players</h1>

//       <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//         {players.map((player) => (
//           <PlayerCard key={player.id} player={player} />
//         ))}
//       </div>
//     </main>
//   );
// }

import { useMemo, useState } from "react";
import PlayerCard from "~/components/PlayerCard";
import type { Player } from "~/types/player";

const players: Player[] = [
  { id: 1, name: "Monu", rating: 3 },
  { id: 2, name: "Jarif", rating: 3 },
  { id: 3, name: "Munem", rating: 3 },
  { id: 4, name: "Tahsin", rating: 3 },
  { id: 5, name: "Rafael", rating: 2 },
  { id: 6, name: "Mirbz", rating: 2 },
  { id: 7, name: "Adoo", rating: 1 },
  { id: 8, name: "Effie", rating: 1 },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch = player.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesRating =
        ratingFilter === null || player.rating === ratingFilter;

      return matchesSearch && matchesRating;
    });
  }, [search, ratingFilter]);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-gray-400">
              SQUADHUB
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
              My Squad
            </h1>

            <p className="mt-1 text-gray-500">{players.length} Players</p>
          </div>

          <button className="rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900">
            + Add Player
          </button>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          {/* Rating filters */}
          <div className="flex gap-2">
            <FilterButton
              active={ratingFilter === null}
              onClick={() => setRatingFilter(null)}
            >
              All
            </FilterButton>

            <FilterButton
              active={ratingFilter === 3}
              onClick={() => setRatingFilter(3)}
            >
              ★★★
            </FilterButton>

            <FilterButton
              active={ratingFilter === 2}
              onClick={() => setRatingFilter(2)}
            >
              ★★
            </FilterButton>

            <FilterButton
              active={ratingFilter === 1}
              onClick={() => setRatingFilter(1)}
            >
              ★
            </FilterButton>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-gray-400 md:w-64 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          />
        </div>

        {/* Player Cards */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              No players found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or rating filter.
            </p>
          </div>
        )}

        {/* Generate Teams */}
        <div className="mt-12 flex justify-center">
          <button className="rounded-xl bg-green-600 px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-700">
            ⚽ Generate Teams
          </button>
        </div>
      </div>
    </main>
  );
}

type FilterButtonProps = {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

function FilterButton({ children, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
          : "bg-white text-gray-500 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </button>
  );
}
