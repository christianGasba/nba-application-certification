import { NbaService } from './../../../shared/services/nba.service';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  forkJoin,
  of,
  map,
} from 'rxjs';
import { GameResultsLastDays } from 'src/app/shared/models/games';
import { Team, TeamTracked } from 'src/app/shared/models/teams';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly teamsTrackedKey: 'teamsTracked' = 'teamsTracked';
  private readonly teamsTrackedSubject: BehaviorSubject<number[]>;

  constructor(private readonly nbaService: NbaService) {
    this.teamsTrackedSubject = new BehaviorSubject<number[]>(
      this.getTeamsTrackedLocalStorage()
    );
  }

  getTeamsTracked(): Observable<TeamTracked[]> {
    return this.teamsTrackedSubject
      .pipe(
        concatMap((teamsTrackedIds: number[]) => {
          if (teamsTrackedIds.length === 0) {
            return of([]);
          }
          const teams: Observable<Team>[] = teamsTrackedIds.map(
            (teamTrackedId) =>
              this.nbaService.getSingleTeam(teamTrackedId).pipe((el) => el)
          );
          return forkJoin(teams);
        })
      )
      .pipe(
        concatMap((teams: Team[]) => {
          if (teams.length === 0) {
            return of([]);
          }
          const teamsTrackedLastResults: Observable<TeamTracked>[] = teams.map(
            (team) =>
              this.nbaService.getTrackedTeamLastResults(team.id).pipe(
                map((gameResultsLastDays: GameResultsLastDays) => {
                  const teamTracked: TeamTracked = {
                    ...team,
                    gameResultsLastDays,
                  };
                  return teamTracked;
                })
              )
          );
          return forkJoin(teamsTrackedLastResults);
        })
      );
  }

  addTeamTracked(teamTrackedToAdd: number): void {
    const currentTeamsTracked: number[] = this.getTeamsTrackedLocalStorage();
    const newteamsTracked: number[] = [
      ...currentTeamsTracked,
      teamTrackedToAdd,
    ];
    this.setTeamsTrackedLocalStorage(newteamsTracked);
  }

  delTeamTracked(teamTrackedToDel: number): void {
    const currentTeamsTracked: number[] = this.getTeamsTrackedLocalStorage();
    const newteamsTracked: number[] = currentTeamsTracked.filter(
      (el) => el !== teamTrackedToDel
    );
    this.setTeamsTrackedLocalStorage(newteamsTracked);
  }

  getTeamsTrackedLocalStorage(): number[] {
    return JSON.parse(localStorage.getItem(this.teamsTrackedKey)!) ?? [];
  }

  setTeamsTrackedLocalStorage(newteamsTracked: number[]): void {
    this.teamsTrackedSubject.next(newteamsTracked);
    const data: string = JSON.stringify(newteamsTracked);
    localStorage.setItem(this.teamsTrackedKey, data);
  }
}
