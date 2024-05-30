import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IVillageLocation } from '../village-location.model';
import { VillageLocationService } from '../service/village-location.service';

@Component({
  standalone: true,
  templateUrl: './village-location-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class VillageLocationDeleteDialogComponent {
  villageLocation?: IVillageLocation;

  protected villageLocationService = inject(VillageLocationService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.villageLocationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
