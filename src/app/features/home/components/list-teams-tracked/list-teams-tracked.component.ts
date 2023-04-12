import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamTracked } from 'src/app/shared/models/teams';

@Component({
  selector: 'app-list-teams-tracked',
  templateUrl: './list-teams-tracked.component.html',
  styleUrls: ['./list-teams-tracked.component.scss'],
})
export class ListTeamsTrackedComponent {
  @Input() teamsTracked: TeamTracked[] = [];
  @Output() removeTeamTrackedEmitter: EventEmitter<number> =
    new EventEmitter<number>();

  removeTeamTrackedHandler(teamId: number): void {
    this.removeTeamTrackedEmitter.emit(teamId);
  }
}
