import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IPatientInfo } from '../patient-info.model';
import { PatientInfoService } from '../service/patient-info.service';

@Component({
  standalone: true,
  templateUrl: './patient-info-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class PatientInfoDeleteDialogComponent {
  patientInfo?: IPatientInfo;

  protected patientInfoService = inject(PatientInfoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.patientInfoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
