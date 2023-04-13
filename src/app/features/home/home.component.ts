import { Team, TeamData, TeamTracked } from 'src/app/shared/models/teams';
import { NbaService } from './../../shared/services/nba.service';
import { Component, OnInit } from '@angular/core';
import { GameResultsLastDays, GamesData } from 'src/app/shared/models/games';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  teamsData: TeamData | null = null;
  teams: Team[] = [];
  teamsTracked: TeamTracked[] = [];
  constructor(
    private readonly nbaService: NbaService,
    private readonly homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.getNbaTeams();
    this.homeService.getTeamsTracked().subscribe((res: TeamTracked[]) => {
      this.teamsTracked = res;
    });
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
        this.homeService.addTeamTracked(teamToTrack.id);
        const teamTracked = { ...teamToTrack, gameResultsLastDays: res };
        this.teamsTracked = [...this.teamsTracked, teamTracked];
      });
  }

  removeTeamTrackedHandler(teamToRemoveId: number): void {
    this.teamsTracked = this.teamsTracked.filter(
      (el) => el.id !== teamToRemoveId
    );
    this.homeService.delTeamTracked(teamToRemoveId);
  }
}
