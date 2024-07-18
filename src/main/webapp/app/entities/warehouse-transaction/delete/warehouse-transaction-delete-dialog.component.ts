import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IWarehouseTransaction } from '../warehouse-transaction.model';
import { WarehouseTransactionService } from '../service/warehouse-transaction.service';

@Component({
  standalone: true,
  templateUrl: './warehouse-transaction-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class WarehouseTransactionDeleteDialogComponent {
  warehouseTransaction?: IWarehouseTransaction;

  protected warehouseTransactionService = inject(WarehouseTransactionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.warehouseTransactionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
