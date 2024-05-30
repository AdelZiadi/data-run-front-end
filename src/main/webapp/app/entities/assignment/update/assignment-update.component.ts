import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IActivity } from 'app/entities/activity/activity.model';
import { ActivityService } from 'app/entities/activity/service/activity.service';
import { IVillageLocation } from 'app/entities/village-location/village-location.model';
import { VillageLocationService } from 'app/entities/village-location/service/village-location.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { IWarehouse } from 'app/entities/warehouse/warehouse.model';
import { WarehouseService } from 'app/entities/warehouse/service/warehouse.service';
import { AssignmentService } from '../service/assignment.service';
import { IAssignment } from '../assignment.model';
import { AssignmentFormService, AssignmentFormGroup } from './assignment-form.service';

@Component({
  standalone: true,
  selector: 'app-assignment-update',
  templateUrl: './assignment-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AssignmentUpdateComponent implements OnInit {
  isSaving = false;
  assignment: IAssignment | null = null;

  activitiesSharedCollection: IActivity[] = [];
  villageLocationsSharedCollection: IVillageLocation[] = [];
  teamsSharedCollection: ITeam[] = [];
  warehousesSharedCollection: IWarehouse[] = [];

  protected assignmentService = inject(AssignmentService);
  protected assignmentFormService = inject(AssignmentFormService);
  protected activityService = inject(ActivityService);
  protected villageLocationService = inject(VillageLocationService);
  protected teamService = inject(TeamService);
  protected warehouseService = inject(WarehouseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AssignmentFormGroup = this.assignmentFormService.createAssignmentFormGroup();

  compareActivity = (o1: IActivity | null, o2: IActivity | null): boolean => this.activityService.compareActivity(o1, o2);

  compareVillageLocation = (o1: IVillageLocation | null, o2: IVillageLocation | null): boolean =>
    this.villageLocationService.compareVillageLocation(o1, o2);

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  compareWarehouse = (o1: IWarehouse | null, o2: IWarehouse | null): boolean => this.warehouseService.compareWarehouse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assignment }) => {
      this.assignment = assignment;
      if (assignment) {
        this.updateForm(assignment);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const assignment = this.assignmentFormService.getAssignment(this.editForm);
    if (assignment.id !== null) {
      this.subscribeToSaveResponse(this.assignmentService.update(assignment));
    } else {
      this.subscribeToSaveResponse(this.assignmentService.create(assignment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssignment>>): void {
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

  protected updateForm(assignment: IAssignment): void {
    this.assignment = assignment;
    this.assignmentFormService.resetForm(this.editForm, assignment);

    this.activitiesSharedCollection = this.activityService.addActivityToCollectionIfMissing<IActivity>(
      this.activitiesSharedCollection,
      assignment.activity,
    );
    this.villageLocationsSharedCollection = this.villageLocationService.addVillageLocationToCollectionIfMissing<IVillageLocation>(
      this.villageLocationsSharedCollection,
      assignment.organisationUnit,
    );
    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(this.teamsSharedCollection, assignment.team);
    this.warehousesSharedCollection = this.warehouseService.addWarehouseToCollectionIfMissing<IWarehouse>(
      this.warehousesSharedCollection,
      assignment.warehouse,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.activityService
      .query()
      .pipe(map((res: HttpResponse<IActivity[]>) => res.body ?? []))
      .pipe(
        map((activities: IActivity[]) =>
          this.activityService.addActivityToCollectionIfMissing<IActivity>(activities, this.assignment?.activity),
        ),
      )
      .subscribe((activities: IActivity[]) => (this.activitiesSharedCollection = activities));

    this.villageLocationService
      .query()
      .pipe(map((res: HttpResponse<IVillageLocation[]>) => res.body ?? []))
      .pipe(
        map((villageLocations: IVillageLocation[]) =>
          this.villageLocationService.addVillageLocationToCollectionIfMissing<IVillageLocation>(
            villageLocations,
            this.assignment?.organisationUnit,
          ),
        ),
      )
      .subscribe((villageLocations: IVillageLocation[]) => (this.villageLocationsSharedCollection = villageLocations));

    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
      .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, this.assignment?.team)))
      .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));

    this.warehouseService
      .query()
      .pipe(map((res: HttpResponse<IWarehouse[]>) => res.body ?? []))
      .pipe(
        map((warehouses: IWarehouse[]) =>
          this.warehouseService.addWarehouseToCollectionIfMissing<IWarehouse>(warehouses, this.assignment?.warehouse),
        ),
      )
      .subscribe((warehouses: IWarehouse[]) => (this.warehousesSharedCollection = warehouses));
  }
}
