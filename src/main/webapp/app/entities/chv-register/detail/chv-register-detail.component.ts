import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IChvRegister } from '../chv-register.model';

@Component({
  standalone: true,
  selector: 'app-chv-register-detail',
  templateUrl: './chv-register-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ChvRegisterDetailComponent {
  chvRegister = input<IChvRegister | null>(null);

  previousState(): void {
    window.history.back();
  }
}
