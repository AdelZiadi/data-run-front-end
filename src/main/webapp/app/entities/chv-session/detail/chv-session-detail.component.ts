import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IChvSession } from '../chv-session.model';

@Component({
  standalone: true,
  selector: 'app-chv-session-detail',
  templateUrl: './chv-session-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ChvSessionDetailComponent {
  chvSession = input<IChvSession | null>(null);

  previousState(): void {
    window.history.back();
  }
}
