import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TeamSelectComponent } from './components/team-select/team-select.component';
import { FormsModule } from '@angular/forms';
import { ListTeamsTrackedComponent } from './components/list-teams-tracked/list-teams-tracked.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, TeamSelectComponent, ListTeamsTrackedComponent],
  imports: [CommonModule, HomeRoutingModule, FormsModule, SharedModule],
})
export class HomeModule {}
