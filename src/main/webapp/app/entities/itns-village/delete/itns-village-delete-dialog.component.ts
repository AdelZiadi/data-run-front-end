import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IItnsVillage } from '../itns-village.model';
import { ItnsVillageService } from '../service/itns-village.service';

@Component({
  standalone: true,
  templateUrl: './itns-village-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ItnsVillageDeleteDialogComponent {
  itnsVillage?: IItnsVillage;

  protected itnsVillageService = inject(ItnsVillageService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.itnsVillageService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
