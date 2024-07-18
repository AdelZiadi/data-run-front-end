import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IActivity } from 'app/entities/activity/activity.model';
import { ActivityService } from 'app/entities/activity/service/activity.service';
import { IReviewTeam } from 'app/entities/review-team/review-team.model';
import { ReviewTeamService } from 'app/entities/review-team/service/review-team.service';
import { IWarehouse } from 'app/entities/warehouse/warehouse.model';
import { WarehouseService } from 'app/entities/warehouse/service/warehouse.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { TeamType } from 'app/entities/enumerations/team-type.model';
import { TeamService } from '../service/team.service';
import { ITeam } from '../team.model';
import { TeamFormService, TeamFormGroup } from './team-form.service';

@Component({
  standalone: true,
  selector: 'app-team-update',
  templateUrl: './team-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TeamUpdateComponent implements OnInit {
  isSaving = false;
  team: ITeam | null = null;
  teamTypeValues = Object.keys(TeamType);

  activitiesSharedCollection: IActivity[] = [];
  reviewTeamsSharedCollection: IReviewTeam[] = [];
  warehousesSharedCollection: IWarehouse[] = [];
  usersSharedCollection: IUser[] = [];

  protected teamService = inject(TeamService);
  protected teamFormService = inject(TeamFormService);
  protected activityService = inject(ActivityService);
  protected reviewTeamService = inject(ReviewTeamService);
  protected warehouseService = inject(WarehouseService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TeamFormGroup = this.teamFormService.createTeamFormGroup();

  compareActivity = (o1: IActivity | null, o2: IActivity | null): boolean => this.activityService.compareActivity(o1, o2);

  compareReviewTeam = (o1: IReviewTeam | null, o2: IReviewTeam | null): boolean => this.reviewTeamService.compareReviewTeam(o1, o2);

  compareWarehouse = (o1: IWarehouse | null, o2: IWarehouse | null): boolean => this.warehouseService.compareWarehouse(o1, o2);

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ team }) => {
      this.team = team;
      if (team) {
        this.updateForm(team);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const team = this.teamFormService.getTeam(this.editForm);
    if (team.id !== null) {
      this.subscribeToSaveResponse(this.teamService.update(team));
    } else {
      this.subscribeToSaveResponse(this.teamService.create(team));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeam>>): void {
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

  protected updateForm(team: ITeam): void {
    this.team = team;
    this.teamFormService.resetForm(this.editForm, team);

    this.activitiesSharedCollection = this.activityService.addActivityToCollectionIfMissing<IActivity>(
      this.activitiesSharedCollection,
      team.activity,
    );
    this.reviewTeamsSharedCollection = this.reviewTeamService.addReviewTeamToCollectionIfMissing<IReviewTeam>(
      this.reviewTeamsSharedCollection,
      team.operationRoom,
    );
    this.warehousesSharedCollection = this.warehouseService.addWarehouseToCollectionIfMissing<IWarehouse>(
      this.warehousesSharedCollection,
      team.warehouse,
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, team.userInfo);
  }

  protected loadRelationshipsOptions(): void {
    this.activityService
      .query()
      .pipe(map((res: HttpResponse<IActivity[]>) => res.body ?? []))
      .pipe(
        map((activities: IActivity[]) => this.activityService.addActivityToCollectionIfMissing<IActivity>(activities, this.team?.activity)),
      )
      .subscribe((activities: IActivity[]) => (this.activitiesSharedCollection = activities));

    this.reviewTeamService
      .query()
      .pipe(map((res: HttpResponse<IReviewTeam[]>) => res.body ?? []))
      .pipe(
        map((reviewTeams: IReviewTeam[]) =>
          this.reviewTeamService.addReviewTeamToCollectionIfMissing<IReviewTeam>(reviewTeams, this.team?.operationRoom),
        ),
      )
      .subscribe((reviewTeams: IReviewTeam[]) => (this.reviewTeamsSharedCollection = reviewTeams));

    this.warehouseService
      .query()
      .pipe(map((res: HttpResponse<IWarehouse[]>) => res.body ?? []))
      .pipe(
        map((warehouses: IWarehouse[]) =>
          this.warehouseService.addWarehouseToCollectionIfMissing<IWarehouse>(warehouses, this.team?.warehouse),
        ),
      )
      .subscribe((warehouses: IWarehouse[]) => (this.warehousesSharedCollection = warehouses));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.team?.userInfo)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
