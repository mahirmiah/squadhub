import { Player } from '../domain/Player';
import { GeneratedTeam } from '../domain/GeneratedTeam';
import { prisma } from '../db/prisma';

export async function generateTeams(playerIds: number[]): Promise<[GeneratedTeam, GeneratedTeam]> {
  const players = await prisma.player.findMany({
    where: {
      id: {
        in: playerIds,
      },
    },
    select: {
      id: true,
      userId: true,
      name: true,
      rating: true,
      position: true,
    },
  });

  if (players.some((player) => player.rating === null)) {
    throw new Error('All selected players must have a rating.');
  }

  const sortedPlayers = players.sort((playerA, playerB) => playerB.rating! - playerA.rating!);

  const teamA: Player[] = [];
  const teamB: Player[] = [];

  const maxTeamSize = Math.ceil(sortedPlayers.length / 2);

  for (const player of sortedPlayers) {
    const teamATotal = getTotalRating(teamA);
    const teamBTotal = getTotalRating(teamB);

    if (teamATotal <= teamBTotal && teamA.length < maxTeamSize) {
      teamA.push(player);
    } else {
      teamB.push(player);
    }
  }

  return [createTeam(1, teamA), createTeam(2, teamB)];
}

function getTotalRating(players: Player[]): number {
  return players.reduce((total, player) => total + player.rating!, 0);
}

function createTeam(id: number, players: Player[]): GeneratedTeam {
  const totalRating = getTotalRating(players);

  return {
    id,
    totalRating,
    averageRating: totalRating / players.length,
    players,
  };
}
