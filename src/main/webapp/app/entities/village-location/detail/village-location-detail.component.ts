import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IVillageLocation } from '../village-location.model';

@Component({
  standalone: true,
  selector: 'app-village-location-detail',
  templateUrl: './village-location-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class VillageLocationDetailComponent {
  villageLocation = input<IVillageLocation | null>(null);

  previousState(): void {
    window.history.back();
  }
}
