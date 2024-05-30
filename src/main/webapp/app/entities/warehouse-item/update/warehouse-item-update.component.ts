import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IWarehouseItem } from '../warehouse-item.model';
import { WarehouseItemService } from '../service/warehouse-item.service';
import { WarehouseItemFormService, WarehouseItemFormGroup } from './warehouse-item-form.service';

@Component({
  standalone: true,
  selector: 'app-warehouse-item-update',
  templateUrl: './warehouse-item-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class WarehouseItemUpdateComponent implements OnInit {
  isSaving = false;
  warehouseItem: IWarehouseItem | null = null;

  protected warehouseItemService = inject(WarehouseItemService);
  protected warehouseItemFormService = inject(WarehouseItemFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: WarehouseItemFormGroup = this.warehouseItemFormService.createWarehouseItemFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ warehouseItem }) => {
      this.warehouseItem = warehouseItem;
      if (warehouseItem) {
        this.updateForm(warehouseItem);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const warehouseItem = this.warehouseItemFormService.getWarehouseItem(this.editForm);
    if (warehouseItem.id !== null) {
      this.subscribeToSaveResponse(this.warehouseItemService.update(warehouseItem));
    } else {
      this.subscribeToSaveResponse(this.warehouseItemService.create(warehouseItem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWarehouseItem>>): void {
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

  protected updateForm(warehouseItem: IWarehouseItem): void {
    this.warehouseItem = warehouseItem;
    this.warehouseItemFormService.resetForm(this.editForm, warehouseItem);
  }
}
