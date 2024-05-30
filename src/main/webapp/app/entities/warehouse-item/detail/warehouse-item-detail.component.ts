import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IWarehouseItem } from '../warehouse-item.model';

@Component({
  standalone: true,
  selector: 'app-warehouse-item-detail',
  templateUrl: './warehouse-item-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class WarehouseItemDetailComponent {
  warehouseItem = input<IWarehouseItem | null>(null);

  previousState(): void {
    window.history.back();
  }
}
