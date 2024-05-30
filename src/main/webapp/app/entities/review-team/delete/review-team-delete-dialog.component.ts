import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IReviewTeam } from '../review-team.model';
import { ReviewTeamService } from '../service/review-team.service';

@Component({
  standalone: true,
  templateUrl: './review-team-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ReviewTeamDeleteDialogComponent {
  reviewTeam?: IReviewTeam;

  protected reviewTeamService = inject(ReviewTeamService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reviewTeamService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
