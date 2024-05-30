import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IAssignment } from '../assignment.model';

@Component({
  standalone: true,
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AssignmentDetailComponent {
  assignment = input<IAssignment | null>(null);

  previousState(): void {
    window.history.back();
  }
}
