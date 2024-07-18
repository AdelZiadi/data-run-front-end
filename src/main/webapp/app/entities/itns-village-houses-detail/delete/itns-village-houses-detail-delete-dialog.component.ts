import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IItnsVillageHousesDetail } from '../itns-village-houses-detail.model';
import { ItnsVillageHousesDetailService } from '../service/itns-village-houses-detail.service';

@Component({
  standalone: true,
  templateUrl: './itns-village-houses-detail-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ItnsVillageHousesDetailDeleteDialogComponent {
  itnsVillageHousesDetail?: IItnsVillageHousesDetail;

  protected itnsVillageHousesDetailService = inject(ItnsVillageHousesDetailService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.itnsVillageHousesDetailService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
