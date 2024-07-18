import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IWarehouseTransaction } from '../warehouse-transaction.model';

@Component({
  standalone: true,
  selector: 'app-warehouse-transaction-detail',
  templateUrl: './warehouse-transaction-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class WarehouseTransactionDetailComponent {
  warehouseTransaction = input<IWarehouseTransaction | null>(null);

  previousState(): void {
    window.history.back();
  }
}
