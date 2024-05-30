import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IChvRegister } from '../chv-register.model';
import { ChvRegisterService } from '../service/chv-register.service';

@Component({
  standalone: true,
  templateUrl: './chv-register-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ChvRegisterDeleteDialogComponent {
  chvRegister?: IChvRegister;

  protected chvRegisterService = inject(ChvRegisterService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chvRegisterService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
