import { Team, TeamData, TeamTracked } from 'src/app/shared/models/teams';
import { NbaService } from './../../shared/services/nba.service';
import { Component, OnInit } from '@angular/core';
import { GameResultsLastDays, GamesData } from 'src/app/shared/models/games';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  teamsData: TeamData | null = null;
  teams: Team[] = [];
  teamsTracked: TeamTracked[] = [];
  constructor(private readonly nbaService: NbaService) {}

  ngOnInit(): void {
    this.getNbaTeams();
  }

  getNbaTeams(): void {
    this.nbaService.getTeams().subscribe((res) => {
      this.teams = res['data'];
    });
  }

  teamTrackHandler(teamToTrack: Team): void {
    this.nbaService
      .getTrackedTeamLastResults(teamToTrack.id)
      .subscribe((res: GameResultsLastDays) => {
        const teamTracked: TeamTracked = {
          ...teamToTrack,
          gameResultsLastDays: res,
        };
        this.teamsTracked = [teamTracked, ...this.teamsTracked];
      });
  }

  removeTeamTrackedHandler(teamToRemoveId: number): void {
    this.teamsTracked = this.teamsTracked.filter(
      (el) => el.id !== teamToRemoveId
    );
  }
}
