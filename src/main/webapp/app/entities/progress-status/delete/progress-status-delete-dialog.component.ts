import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IProgressStatus } from '../progress-status.model';
import { ProgressStatusService } from '../service/progress-status.service';

@Component({
  standalone: true,
  templateUrl: './progress-status-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ProgressStatusDeleteDialogComponent {
  progressStatus?: IProgressStatus;

  protected progressStatusService = inject(ProgressStatusService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.progressStatusService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
