import { GameResultsLastDays } from './games';
import { Pagination } from './pagination';

export interface TeamData {
  data: Team[];
  meta: Pagination;
}

export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface TeamGameScore {
  team: Team;
  score: number;
  teamType: 'home_team' | 'visitor_team';
}

export interface IdentifiedTeams {
  currentTeam: TeamGameScore;
  opponentTeam: TeamGameScore;
}

export interface TeamTracked extends Team {
  gameResultsLastDays: GameResultsLastDays;
}
