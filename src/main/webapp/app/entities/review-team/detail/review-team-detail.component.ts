import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IReviewTeam } from '../review-team.model';

@Component({
  standalone: true,
  selector: 'app-review-team-detail',
  templateUrl: './review-team-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ReviewTeamDetailComponent {
  reviewTeam = input<IReviewTeam | null>(null);

  previousState(): void {
    window.history.back();
  }
}
