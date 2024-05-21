import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IActivity } from '../activity.model';

@Component({
  standalone: true,
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ActivityDetailComponent {
  activity = input<IActivity | null>(null);

  previousState(): void {
    window.history.back();
  }
}
