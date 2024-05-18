import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICampaignType } from '../campaign-type.model';
import { CampaignTypeService } from '../service/campaign-type.service';

@Component({
  standalone: true,
  templateUrl: './campaign-type-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CampaignTypeDeleteDialogComponent {
  campaignType?: ICampaignType;

  protected campaignTypeService = inject(CampaignTypeService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.campaignTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
