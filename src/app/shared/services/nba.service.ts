import { environment } from './../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IdentifiedTeams, TeamData, TeamGameScore } from '../models/teams';
import { Game, GameResultsLastDays, GamesData } from '../models/games';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  constructor(private readonly httpClient: HttpClient) {}

  getTeams(): Observable<TeamData> {
    const url: string = `${environment.baseUrl}/teams`;
    return this.httpClient.get<TeamData>(url);
  }

  getTrackedTeamLastResults(teamIds: number): Observable<GameResultsLastDays> {
    const fromPage: number = 0;
    const toPage: number = 12;
    const lastResultsDates: string[] = this.getLastResultDatesInString();
    let params = new HttpParams().append('page', fromPage);
    lastResultsDates.forEach((date: string) => {
      params = params.append('dates[]', date);
    });
    params = params.append('per_page', toPage).append('team_ids[]', teamIds);
    const url: string = `${environment.baseUrl}/games`;
    return this.httpClient.get<GamesData>(url, { params }).pipe(
      map((res: GamesData) => {
        const identifiedTeams: IdentifiedTeams[] = res['data'].map(
          (game: Game) => {
            const currentTeam: TeamGameScore = this.findCurrentTeam(
              teamIds,
              game
            );
            const opponentTeam: TeamGameScore = this.findOpponentTeam(
              teamIds,
              game
            );
            return { currentTeam, opponentTeam };
          }
        );
        const resultsGames: ('W' | 'L')[] = identifiedTeams.map((el) =>
          el.currentTeam.score > el.opponentTeam.score ? 'W' : 'L'
        );

        const gameResultsLastDays: GameResultsLastDays = {
          currentTeamId: teamIds,
          resultsGames,
          avgPtsScored: this.calculateAvgPts('currentTeam', identifiedTeams),
          avgPtsConcede: this.calculateAvgPts('opponentTeam', identifiedTeams),
        };

        return gameResultsLastDays;
      })
    );
  }

  getLastResultDatesInString(arrayLength: number = 12): string[] {
    return Array.from({ length: arrayLength }, (_, index) => index + 1)
      .map((el: number) => {
        const today: Date = new Date();
        const result: Date = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - el
        );
        return result;
      })
      .map((el) => `${el.getFullYear()}-${el.getMonth() + 1}-${el.getDate()}`);
  }

  findCurrentTeam(teamIds: number, game: Game): TeamGameScore {
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

  findOpponentTeam(teamIds: number, game: Game): TeamGameScore {
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

  calculateAvgPts(
    team: 'currentTeam' | 'opponentTeam',
    identifiedTeams: IdentifiedTeams[]
  ): number {
    const teamScores: number[] = identifiedTeams.map((el) => el[team].score);
    const avgPts: number =
      teamScores.reduce((acc, val) => acc + val, 0) / teamScores.length;
    return avgPts;
  }
}
