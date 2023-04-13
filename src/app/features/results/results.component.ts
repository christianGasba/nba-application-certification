import { ActivatedRoute, ParamMap } from '@angular/router';
import { NbaService } from './../../shared/services/nba.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/shared/models/teams';
import { GameResultsLastDays } from 'src/app/shared/models/games';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  currentTeam: Team | null = null;
  gameResultsLastDays: GameResultsLastDays | null = null;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly nbaService: NbaService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res: ParamMap) => {
      const teamcode: string = res.get('teamcode')!;
      this.nbaService
        .getTrackedTeamLastResults(parseInt(teamcode))
        .subscribe((res: GameResultsLastDays) => {
          this.gameResultsLastDays = res;
          this.currentTeam = res.identifiedTeams[0].currentTeam.team;
        });
    });
  }
}
