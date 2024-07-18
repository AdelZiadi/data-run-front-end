import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IWarehouseItem } from 'app/entities/warehouse-item/warehouse-item.model';
import { WarehouseItemService } from 'app/entities/warehouse-item/service/warehouse-item.service';
import { IWarehouse } from 'app/entities/warehouse/warehouse.model';
import { WarehouseService } from 'app/entities/warehouse/service/warehouse.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { IActivity } from 'app/entities/activity/activity.model';
import { ActivityService } from 'app/entities/activity/service/activity.service';
import { SyncableStatus } from 'app/entities/enumerations/syncable-status.model';
import { WarehouseTransactionService } from '../service/warehouse-transaction.service';
import { IWarehouseTransaction } from '../warehouse-transaction.model';
import { WarehouseTransactionFormService, WarehouseTransactionFormGroup } from './warehouse-transaction-form.service';

@Component({
  standalone: true,
  selector: 'app-warehouse-transaction-update',
  templateUrl: './warehouse-transaction-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class WarehouseTransactionUpdateComponent implements OnInit {
  isSaving = false;
  warehouseTransaction: IWarehouseTransaction | null = null;
  syncableStatusValues = Object.keys(SyncableStatus);

  warehouseItemsSharedCollection: IWarehouseItem[] = [];
  warehousesSharedCollection: IWarehouse[] = [];
  teamsSharedCollection: ITeam[] = [];
  activitiesSharedCollection: IActivity[] = [];

  protected warehouseTransactionService = inject(WarehouseTransactionService);
  protected warehouseTransactionFormService = inject(WarehouseTransactionFormService);
  protected warehouseItemService = inject(WarehouseItemService);
  protected warehouseService = inject(WarehouseService);
  protected teamService = inject(TeamService);
  protected activityService = inject(ActivityService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: WarehouseTransactionFormGroup = this.warehouseTransactionFormService.createWarehouseTransactionFormGroup();

  compareWarehouseItem = (o1: IWarehouseItem | null, o2: IWarehouseItem | null): boolean =>
    this.warehouseItemService.compareWarehouseItem(o1, o2);

  compareWarehouse = (o1: IWarehouse | null, o2: IWarehouse | null): boolean => this.warehouseService.compareWarehouse(o1, o2);

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  compareActivity = (o1: IActivity | null, o2: IActivity | null): boolean => this.activityService.compareActivity(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ warehouseTransaction }) => {
      this.warehouseTransaction = warehouseTransaction;
      if (warehouseTransaction) {
        this.updateForm(warehouseTransaction);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const warehouseTransaction = this.warehouseTransactionFormService.getWarehouseTransaction(this.editForm);
    if (warehouseTransaction.id !== null) {
      this.subscribeToSaveResponse(this.warehouseTransactionService.update(warehouseTransaction));
    } else {
      this.subscribeToSaveResponse(this.warehouseTransactionService.create(warehouseTransaction));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWarehouseTransaction>>): void {
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

  protected updateForm(warehouseTransaction: IWarehouseTransaction): void {
    this.warehouseTransaction = warehouseTransaction;
    this.warehouseTransactionFormService.resetForm(this.editForm, warehouseTransaction);

    this.warehouseItemsSharedCollection = this.warehouseItemService.addWarehouseItemToCollectionIfMissing<IWarehouseItem>(
      this.warehouseItemsSharedCollection,
      warehouseTransaction.item,
    );
    this.warehousesSharedCollection = this.warehouseService.addWarehouseToCollectionIfMissing<IWarehouse>(
      this.warehousesSharedCollection,
      warehouseTransaction.sourceWarehouse,
      warehouseTransaction.warehouse,
    );
    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(
      this.teamsSharedCollection,
      warehouseTransaction.team,
    );
    this.activitiesSharedCollection = this.activityService.addActivityToCollectionIfMissing<IActivity>(
      this.activitiesSharedCollection,
      warehouseTransaction.activity,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.warehouseItemService
      .query()
      .pipe(map((res: HttpResponse<IWarehouseItem[]>) => res.body ?? []))
      .pipe(
        map((warehouseItems: IWarehouseItem[]) =>
          this.warehouseItemService.addWarehouseItemToCollectionIfMissing<IWarehouseItem>(warehouseItems, this.warehouseTransaction?.item),
        ),
      )
      .subscribe((warehouseItems: IWarehouseItem[]) => (this.warehouseItemsSharedCollection = warehouseItems));

    this.warehouseService
      .query()
      .pipe(map((res: HttpResponse<IWarehouse[]>) => res.body ?? []))
      .pipe(
        map((warehouses: IWarehouse[]) =>
          this.warehouseService.addWarehouseToCollectionIfMissing<IWarehouse>(
            warehouses,
            this.warehouseTransaction?.sourceWarehouse,
            this.warehouseTransaction?.warehouse,
          ),
        ),
      )
      .subscribe((warehouses: IWarehouse[]) => (this.warehousesSharedCollection = warehouses));

    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
      .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, this.warehouseTransaction?.team)))
      .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));

    this.activityService
      .query()
      .pipe(map((res: HttpResponse<IActivity[]>) => res.body ?? []))
      .pipe(
        map((activities: IActivity[]) =>
          this.activityService.addActivityToCollectionIfMissing<IActivity>(activities, this.warehouseTransaction?.activity),
        ),
      )
      .subscribe((activities: IActivity[]) => (this.activitiesSharedCollection = activities));
  }
}
