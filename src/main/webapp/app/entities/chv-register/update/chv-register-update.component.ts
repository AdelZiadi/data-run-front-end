import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { IActivity } from 'app/entities/activity/activity.model';
import { ActivityService } from 'app/entities/activity/service/activity.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { Gender } from 'app/entities/enumerations/gender.model';
import { MTestResult } from 'app/entities/enumerations/m-test-result.model';
import { MDetectionType } from 'app/entities/enumerations/m-detection-type.model';
import { MSeverity } from 'app/entities/enumerations/m-severity.model';
import { MTreatment } from 'app/entities/enumerations/m-treatment.model';
import { SyncableStatus } from 'app/entities/enumerations/syncable-status.model';
import { ChvRegisterService } from '../service/chv-register.service';
import { IChvRegister } from '../chv-register.model';
import { ChvRegisterFormService, ChvRegisterFormGroup } from './chv-register-form.service';

@Component({
  standalone: true,
  selector: 'app-chv-register-update',
  templateUrl: './chv-register-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ChvRegisterUpdateComponent implements OnInit {
  isSaving = false;
  chvRegister: IChvRegister | null = null;
  genderValues = Object.keys(Gender);
  mTestResultValues = Object.keys(MTestResult);
  mDetectionTypeValues = Object.keys(MDetectionType);
  mSeverityValues = Object.keys(MSeverity);
  mTreatmentValues = Object.keys(MTreatment);
  syncableStatusValues = Object.keys(SyncableStatus);

  assignmentsSharedCollection: IAssignment[] = [];
  activitiesSharedCollection: IActivity[] = [];
  teamsSharedCollection: ITeam[] = [];

  protected chvRegisterService = inject(ChvRegisterService);
  protected chvRegisterFormService = inject(ChvRegisterFormService);
  protected assignmentService = inject(AssignmentService);
  protected activityService = inject(ActivityService);
  protected teamService = inject(TeamService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ChvRegisterFormGroup = this.chvRegisterFormService.createChvRegisterFormGroup();

  compareAssignment = (o1: IAssignment | null, o2: IAssignment | null): boolean => this.assignmentService.compareAssignment(o1, o2);

  compareActivity = (o1: IActivity | null, o2: IActivity | null): boolean => this.activityService.compareActivity(o1, o2);

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chvRegister }) => {
      this.chvRegister = chvRegister;
      if (chvRegister) {
        this.updateForm(chvRegister);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chvRegister = this.chvRegisterFormService.getChvRegister(this.editForm);
    if (chvRegister.id !== null) {
      this.subscribeToSaveResponse(this.chvRegisterService.update(chvRegister));
    } else {
      this.subscribeToSaveResponse(this.chvRegisterService.create(chvRegister));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChvRegister>>): void {
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

  protected updateForm(chvRegister: IChvRegister): void {
    this.chvRegister = chvRegister;
    this.chvRegisterFormService.resetForm(this.editForm, chvRegister);

    this.assignmentsSharedCollection = this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(
      this.assignmentsSharedCollection,
      chvRegister.location,
    );
    this.activitiesSharedCollection = this.activityService.addActivityToCollectionIfMissing<IActivity>(
      this.activitiesSharedCollection,
      chvRegister.activity,
    );
    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(this.teamsSharedCollection, chvRegister.team);
  }

  protected loadRelationshipsOptions(): void {
    this.assignmentService
      .query()
      .pipe(map((res: HttpResponse<IAssignment[]>) => res.body ?? []))
      .pipe(
        map((assignments: IAssignment[]) =>
          this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(assignments, this.chvRegister?.location),
        ),
      )
      .subscribe((assignments: IAssignment[]) => (this.assignmentsSharedCollection = assignments));

    this.activityService
      .query()
      .pipe(map((res: HttpResponse<IActivity[]>) => res.body ?? []))
      .pipe(
        map((activities: IActivity[]) =>
          this.activityService.addActivityToCollectionIfMissing<IActivity>(activities, this.chvRegister?.activity),
        ),
      )
      .subscribe((activities: IActivity[]) => (this.activitiesSharedCollection = activities));

    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
      .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, this.chvRegister?.team)))
      .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));
  }
}
