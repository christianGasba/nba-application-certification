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
  ) {
    this.homeService.getTeamsTracked().subscribe((res: TeamTracked[]) => {
      this.teamsTracked = res;
    });
  }

  ngOnInit(): void {
    this.getNbaTeams();
  }

  getNbaTeams(): void {
    this.nbaService.getTeams().subscribe((res) => {
      this.teams = res['data'];
    });
  }

  teamTrackHandler(teamToTrack: Team): void {
    this.homeService.addTeamTracked(teamToTrack.id);
  }

  removeTeamTrackedHandler(teamToRemoveId: number): void {
    this.homeService.delTeamTracked(teamToRemoveId);
  }
}
