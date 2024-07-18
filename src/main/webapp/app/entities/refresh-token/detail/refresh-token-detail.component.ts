import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IRefreshToken } from '../refresh-token.model';

@Component({
  standalone: true,
  selector: 'app-refresh-token-detail',
  templateUrl: './refresh-token-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class RefreshTokenDetailComponent {
  refreshToken = input<IRefreshToken | null>(null);

  previousState(): void {
    window.history.back();
  }
}
