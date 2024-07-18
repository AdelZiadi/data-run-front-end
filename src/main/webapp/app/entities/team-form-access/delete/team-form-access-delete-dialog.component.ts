import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITeamFormAccess } from '../team-form-access.model';
import { TeamFormAccessService } from '../service/team-form-access.service';

@Component({
  standalone: true,
  templateUrl: './team-form-access-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TeamFormAccessDeleteDialogComponent {
  teamFormAccess?: ITeamFormAccess;

  protected teamFormAccessService = inject(TeamFormAccessService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.teamFormAccessService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
