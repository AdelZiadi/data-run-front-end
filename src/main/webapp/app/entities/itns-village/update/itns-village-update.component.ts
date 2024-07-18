import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProgressStatus } from 'app/entities/progress-status/progress-status.model';
import { ProgressStatusService } from 'app/entities/progress-status/service/progress-status.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { IActivity } from 'app/entities/activity/activity.model';
import { ActivityService } from 'app/entities/activity/service/activity.service';
import { SurveyTypeEnum } from 'app/entities/enumerations/survey-type-enum.model';
import { SettlementEnum } from 'app/entities/enumerations/settlement-enum.model';
import { SyncableStatus } from 'app/entities/enumerations/syncable-status.model';
import { ItnsVillageService } from '../service/itns-village.service';
import { IItnsVillage } from '../itns-village.model';
import { ItnsVillageFormService, ItnsVillageFormGroup } from './itns-village-form.service';

@Component({
  standalone: true,
  selector: 'app-itns-village-update',
  templateUrl: './itns-village-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ItnsVillageUpdateComponent implements OnInit {
  isSaving = false;
  itnsVillage: IItnsVillage | null = null;
  surveyTypeEnumValues = Object.keys(SurveyTypeEnum);
  settlementEnumValues = Object.keys(SettlementEnum);
  syncableStatusValues = Object.keys(SyncableStatus);

  progressStatusesSharedCollection: IProgressStatus[] = [];
  teamsSharedCollection: ITeam[] = [];
  assignmentsSharedCollection: IAssignment[] = [];
  activitiesSharedCollection: IActivity[] = [];

  protected itnsVillageService = inject(ItnsVillageService);
  protected itnsVillageFormService = inject(ItnsVillageFormService);
  protected progressStatusService = inject(ProgressStatusService);
  protected teamService = inject(TeamService);
  protected assignmentService = inject(AssignmentService);
  protected activityService = inject(ActivityService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ItnsVillageFormGroup = this.itnsVillageFormService.createItnsVillageFormGroup();

  compareProgressStatus = (o1: IProgressStatus | null, o2: IProgressStatus | null): boolean =>
    this.progressStatusService.compareProgressStatus(o1, o2);

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  compareAssignment = (o1: IAssignment | null, o2: IAssignment | null): boolean => this.assignmentService.compareAssignment(o1, o2);

  compareActivity = (o1: IActivity | null, o2: IActivity | null): boolean => this.activityService.compareActivity(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itnsVillage }) => {
      this.itnsVillage = itnsVillage;
      if (itnsVillage) {
        this.updateForm(itnsVillage);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const itnsVillage = this.itnsVillageFormService.getItnsVillage(this.editForm);
    if (itnsVillage.id !== null) {
      this.subscribeToSaveResponse(this.itnsVillageService.update(itnsVillage));
    } else {
      this.subscribeToSaveResponse(this.itnsVillageService.create(itnsVillage));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItnsVillage>>): void {
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

  protected updateForm(itnsVillage: IItnsVillage): void {
    this.itnsVillage = itnsVillage;
    this.itnsVillageFormService.resetForm(this.editForm, itnsVillage);

    this.progressStatusesSharedCollection = this.progressStatusService.addProgressStatusToCollectionIfMissing<IProgressStatus>(
      this.progressStatusesSharedCollection,
      itnsVillage.progressStatus,
    );
    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(this.teamsSharedCollection, itnsVillage.team);
    this.assignmentsSharedCollection = this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(
      this.assignmentsSharedCollection,
      itnsVillage.assignment,
    );
    this.activitiesSharedCollection = this.activityService.addActivityToCollectionIfMissing<IActivity>(
      this.activitiesSharedCollection,
      itnsVillage.activity,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.progressStatusService
      .query()
      .pipe(map((res: HttpResponse<IProgressStatus[]>) => res.body ?? []))
      .pipe(
        map((progressStatuses: IProgressStatus[]) =>
          this.progressStatusService.addProgressStatusToCollectionIfMissing<IProgressStatus>(
            progressStatuses,
            this.itnsVillage?.progressStatus,
          ),
        ),
      )
      .subscribe((progressStatuses: IProgressStatus[]) => (this.progressStatusesSharedCollection = progressStatuses));

    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
      .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, this.itnsVillage?.team)))
      .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));

    this.assignmentService
      .query()
      .pipe(map((res: HttpResponse<IAssignment[]>) => res.body ?? []))
      .pipe(
        map((assignments: IAssignment[]) =>
          this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(assignments, this.itnsVillage?.assignment),
        ),
      )
      .subscribe((assignments: IAssignment[]) => (this.assignmentsSharedCollection = assignments));

    this.activityService
      .query()
      .pipe(map((res: HttpResponse<IActivity[]>) => res.body ?? []))
      .pipe(
        map((activities: IActivity[]) =>
          this.activityService.addActivityToCollectionIfMissing<IActivity>(activities, this.itnsVillage?.activity),
        ),
      )
      .subscribe((activities: IActivity[]) => (this.activitiesSharedCollection = activities));
  }
}
