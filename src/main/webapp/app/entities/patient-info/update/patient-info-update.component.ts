import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { Gender } from 'app/entities/enumerations/gender.model';
import { PatientInfoService } from '../service/patient-info.service';
import { IPatientInfo } from '../patient-info.model';
import { PatientInfoFormService, PatientInfoFormGroup } from './patient-info-form.service';

@Component({
  standalone: true,
  selector: 'app-patient-info-update',
  templateUrl: './patient-info-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PatientInfoUpdateComponent implements OnInit {
  isSaving = false;
  patientInfo: IPatientInfo | null = null;
  genderValues = Object.keys(Gender);

  assignmentsSharedCollection: IAssignment[] = [];

  protected patientInfoService = inject(PatientInfoService);
  protected patientInfoFormService = inject(PatientInfoFormService);
  protected assignmentService = inject(AssignmentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PatientInfoFormGroup = this.patientInfoFormService.createPatientInfoFormGroup();

  compareAssignment = (o1: IAssignment | null, o2: IAssignment | null): boolean => this.assignmentService.compareAssignment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patientInfo }) => {
      this.patientInfo = patientInfo;
      if (patientInfo) {
        this.updateForm(patientInfo);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const patientInfo = this.patientInfoFormService.getPatientInfo(this.editForm);
    if (patientInfo.id !== null) {
      this.subscribeToSaveResponse(this.patientInfoService.update(patientInfo));
    } else {
      this.subscribeToSaveResponse(this.patientInfoService.create(patientInfo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatientInfo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(patientInfo: IPatientInfo): void {
    this.patientInfo = patientInfo;
    this.patientInfoFormService.resetForm(this.editForm, patientInfo);

    this.assignmentsSharedCollection = this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(
      this.assignmentsSharedCollection,
      patientInfo.location,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.assignmentService
      .query()
      .pipe(map((res: HttpResponse<IAssignment[]>) => res.body ?? []))
      .pipe(
        map((assignments: IAssignment[]) =>
          this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(assignments, this.patientInfo?.location),
        ),
      )
      .subscribe((assignments: IAssignment[]) => (this.assignmentsSharedCollection = assignments));
  }
}
