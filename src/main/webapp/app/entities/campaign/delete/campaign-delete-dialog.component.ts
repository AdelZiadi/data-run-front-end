import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICampaign } from '../campaign.model';
import { CampaignService } from '../service/campaign.service';

@Component({
  standalone: true,
  templateUrl: './campaign-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CampaignDeleteDialogComponent {
  campaign?: ICampaign;

  protected campaignService = inject(CampaignService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.campaignService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
