import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IWarehouseItem } from '../warehouse-item.model';
import { WarehouseItemService } from '../service/warehouse-item.service';

@Component({
  standalone: true,
  templateUrl: './warehouse-item-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class WarehouseItemDeleteDialogComponent {
  warehouseItem?: IWarehouseItem;

  protected warehouseItemService = inject(WarehouseItemService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.warehouseItemService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
