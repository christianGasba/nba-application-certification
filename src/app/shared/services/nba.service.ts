import { environment } from './../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  IdentifiedTeams,
  Team,
  TeamData,
  TeamGameScore,
} from '../models/teams';
import { Game, GameResultsLastDays, GamesData } from '../models/games';
import { calculateAvgGamePts } from '../utils/calculateAvgPts';
import { findCurrentTeam, findOpponentTeam } from '../utils/findTeam';
import { findLastDates } from '../utils/findLastDates';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  constructor(private readonly httpClient: HttpClient) {}

  getTeams(): Observable<TeamData> {
    const url: string = `${environment.baseUrl}/teams`;
    return this.httpClient.get<TeamData>(url);
  }

  getSingleTeam(id: number): Observable<Team> {
    const url: string = `${environment.baseUrl}/teams/${id}`;
    return this.httpClient.get<Team>(url);
  }

  getTrackedTeamLastResults(
    teamIds: number,
    fromPage: number = 0,
    toPage: number = 12
  ): Observable<GameResultsLastDays> {
    const url: string = `${environment.baseUrl}/games`;
    const lastResultsDates: string[] = findLastDates();
    let params: HttpParams = this.setParamsTrackedTeamLastResults(
      lastResultsDates,
      fromPage,
      toPage,
      teamIds
    );
    return this.httpClient.get<GamesData>(url, { params }).pipe(
      map((res: GamesData) => {
        const identifiedTeams: IdentifiedTeams[] = res['data'].map(
          (game: Game) => {
            const currentTeam: TeamGameScore = findCurrentTeam(teamIds, game);
            const opponentTeam: TeamGameScore = findOpponentTeam(teamIds, game);
            return { currentTeam, opponentTeam };
          }
        );

        const resultsGames: ('W' | 'L')[] = identifiedTeams.map((el) =>
          el.currentTeam.score > el.opponentTeam.score ? 'W' : 'L'
        );

        const gameResultsLastDays: GameResultsLastDays = {
          identifiedTeams,
          currentTeamId: teamIds,
          resultsGames,
          avgPtsScored: calculateAvgGamePts('currentTeam', identifiedTeams),
          avgPtsConcede: calculateAvgGamePts('opponentTeam', identifiedTeams),
        };

        return gameResultsLastDays;
      })
    );
  }

  private setParamsTrackedTeamLastResults(
    lastResultsDates: string[],
    fromPage: number,
    toPage: number,
    teamIds: number
  ): HttpParams {
    let params: HttpParams = new HttpParams().append('page', fromPage);
    lastResultsDates.forEach((date: string) => {
      params = params.append('dates[]', date);
    });
    params = params.append('per_page', toPage).append('team_ids[]', teamIds);
    return params;
  }
}
