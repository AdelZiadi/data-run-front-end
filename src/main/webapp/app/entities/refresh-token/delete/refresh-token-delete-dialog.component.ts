import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IRefreshToken } from '../refresh-token.model';
import { RefreshTokenService } from '../service/refresh-token.service';

@Component({
  standalone: true,
  templateUrl: './refresh-token-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class RefreshTokenDeleteDialogComponent {
  refreshToken?: IRefreshToken;

  protected refreshTokenService = inject(RefreshTokenService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refreshTokenService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
