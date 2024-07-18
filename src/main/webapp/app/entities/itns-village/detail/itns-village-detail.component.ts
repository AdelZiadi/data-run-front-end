import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IItnsVillage } from '../itns-village.model';

@Component({
  standalone: true,
  selector: 'app-itns-village-detail',
  templateUrl: './itns-village-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ItnsVillageDetailComponent {
  itnsVillage = input<IItnsVillage | null>(null);

  previousState(): void {
    window.history.back();
  }
}
