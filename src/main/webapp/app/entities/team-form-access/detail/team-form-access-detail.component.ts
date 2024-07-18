import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITeamFormAccess } from '../team-form-access.model';

@Component({
  standalone: true,
  selector: 'app-team-form-access-detail',
  templateUrl: './team-form-access-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TeamFormAccessDetailComponent {
  teamFormAccess = input<ITeamFormAccess | null>(null);

  previousState(): void {
    window.history.back();
  }
}
