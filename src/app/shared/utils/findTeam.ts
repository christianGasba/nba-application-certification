import { Game } from '../models/games';
import { TeamGameScore } from '../models/teams';

export function findCurrentTeam(teamIds: number, game: Game): TeamGameScore {
  return game['home_team'].id === teamIds
    ? {
        team: game['home_team'],
        score: game['home_team_score'],
        teamType: 'home_team',
      }
    : {
        team: game['visitor_team'],
        score: game['visitor_team_score'],
        teamType: 'visitor_team',
      };
}

export function findOpponentTeam(teamIds: number, game: Game): TeamGameScore {
  return game['home_team'].id !== teamIds
    ? {
        team: game['home_team'],
        score: game['home_team_score'],
        teamType: 'home_team',
      }
    : {
        team: game['visitor_team'],
        score: game['visitor_team_score'],
        teamType: 'visitor_team',
      };
}
