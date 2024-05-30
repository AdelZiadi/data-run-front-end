import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IChvSession } from '../chv-session.model';
import { ChvSessionService } from '../service/chv-session.service';

@Component({
  standalone: true,
  templateUrl: './chv-session-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ChvSessionDeleteDialogComponent {
  chvSession?: IChvSession;

  protected chvSessionService = inject(ChvSessionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chvSessionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
