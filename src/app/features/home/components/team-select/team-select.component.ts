import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from 'src/app/shared/models/teams';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.scss'],
})
export class TeamSelectComponent {
  @Input() teams: Team[] = [];
  @Output() teamTrackEmitter: EventEmitter<Team> = new EventEmitter<Team>();

  clickTrackBtn(teamToTrack: Team): void {
    this.teamTrackEmitter.emit(teamToTrack);
  }
}
