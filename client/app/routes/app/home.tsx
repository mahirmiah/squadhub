import { useMemo, useState } from "react";

import type { Route } from "./+types/home";
import PlayerCard from "~/components/PlayerCard";
import SquadHeader from "~/components/SquadHeader";
import RosterFilters, { type PositionFilter } from "~/components/RosterFilters";
import EmptyRoster from "~/components/EmptyRoster";

import type { Player } from "~/types/player";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SquadHub" },
    {
      name: "description",
      content: "SquadHub team roster",
    },
  ];
}

export async function loader() {
  const response = await fetch("http://localhost:3000/players");

  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }

  return (await response.json()) as Player[];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const players = loaderData;

  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState<PositionFilter>("ALL");

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch = player.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPosition =
        positionFilter === "ALL" || player.position === positionFilter;

      return matchesSearch && matchesPosition;
    });
  }, [players, search, positionFilter]);

  function clearFilters() {
    setSearch("");
    setPositionFilter("ALL");
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      <SquadHeader />

      <div className="mx-auto max-w-[1600px] px-6 pb-2 lg:px-10">
        <RosterFilters
          search={search}
          positionFilter={positionFilter}
          onSearchChange={setSearch}
          onPositionChange={setPositionFilter}
        />

        <section className="mt-7">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
              {positionFilter === "ALL"
                ? "All Players"
                : positionFilter === "ATT"
                ? "Attackers"
                : positionFilter === "MID"
                ? "Midfielders"
                : "Defenders"}
            </p>

            <p className="text-xs text-slate-600">
              {filteredPlayers.length} shown
            </p>
          </div>
        </section>

        {filteredPlayers.length > 0 ? (
          <section
            className="
              mt-8 grid grid-cols-1
              justify-items-center
              gap-x-7 gap-y-12
              min-[500px]:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
            "
          >
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </section>
        ) : (
          <EmptyRoster onClear={clearFilters} />
        )}
      </div>
    </main>
  );
}
