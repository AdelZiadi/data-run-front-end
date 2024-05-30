import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IPatientInfo } from '../patient-info.model';

@Component({
  standalone: true,
  selector: 'app-patient-info-detail',
  templateUrl: './patient-info-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class PatientInfoDetailComponent {
  patientInfo = input<IPatientInfo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
