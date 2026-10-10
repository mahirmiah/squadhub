export type Position = 'ATT' | 'MID' | 'DEF';

export interface Player {
  id: number;
  userId: number | null;
  name: string;
  rating: number;
  position: Position;
}
