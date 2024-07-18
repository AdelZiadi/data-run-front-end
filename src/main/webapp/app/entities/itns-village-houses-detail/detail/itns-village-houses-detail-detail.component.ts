import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IItnsVillageHousesDetail } from '../itns-village-houses-detail.model';

@Component({
  standalone: true,
  selector: 'app-itns-village-houses-detail-detail',
  templateUrl: './itns-village-houses-detail-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ItnsVillageHousesDetailDetailComponent {
  itnsVillageHousesDetail = input<IItnsVillageHousesDetail | null>(null);

  previousState(): void {
    window.history.back();
  }
}
