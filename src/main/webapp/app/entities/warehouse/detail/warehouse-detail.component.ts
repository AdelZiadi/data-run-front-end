import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IWarehouse } from '../warehouse.model';

@Component({
  standalone: true,
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class WarehouseDetailComponent {
  warehouse = input<IWarehouse | null>(null);

  previousState(): void {
    window.history.back();
  }
}
