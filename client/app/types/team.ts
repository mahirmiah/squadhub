import type { Player } from './player';

export type Team = {
  id: number;
  totalRating: number;
  averageRating: number;
  players: Player[];
};
