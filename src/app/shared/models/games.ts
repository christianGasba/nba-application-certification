import { Pagination } from './pagination';
import { Team } from './teams';
export interface GamesData {
  data: Game[];
  meta: Pagination;
}

export interface Game {
  id: number;
  date: string;
  home_team: Team;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: Team;
  visitor_team_score: number;
}

export interface GameResultsLastDays {
  currentTeamId: number;
  resultsGames: ('W' | 'L')[];
  avgPtsScored: number;
  avgPtsConcede: number;
}

