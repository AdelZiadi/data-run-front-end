import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IItnsVillage } from 'app/entities/itns-village/itns-village.model';
import { ItnsVillageService } from 'app/entities/itns-village/service/itns-village.service';
import { IItnsVillageHousesDetail } from '../itns-village-houses-detail.model';
import { ItnsVillageHousesDetailService } from '../service/itns-village-houses-detail.service';
import { ItnsVillageHousesDetailFormService, ItnsVillageHousesDetailFormGroup } from './itns-village-houses-detail-form.service';

@Component({
  standalone: true,
  selector: 'app-itns-village-houses-detail-update',
  templateUrl: './itns-village-houses-detail-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ItnsVillageHousesDetailUpdateComponent implements OnInit {
  isSaving = false;
  itnsVillageHousesDetail: IItnsVillageHousesDetail | null = null;

  itnsVillagesSharedCollection: IItnsVillage[] = [];

  protected itnsVillageHousesDetailService = inject(ItnsVillageHousesDetailService);
  protected itnsVillageHousesDetailFormService = inject(ItnsVillageHousesDetailFormService);
  protected itnsVillageService = inject(ItnsVillageService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ItnsVillageHousesDetailFormGroup = this.itnsVillageHousesDetailFormService.createItnsVillageHousesDetailFormGroup();

  compareItnsVillage = (o1: IItnsVillage | null, o2: IItnsVillage | null): boolean => this.itnsVillageService.compareItnsVillage(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itnsVillageHousesDetail }) => {
      this.itnsVillageHousesDetail = itnsVillageHousesDetail;
      if (itnsVillageHousesDetail) {
        this.updateForm(itnsVillageHousesDetail);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const itnsVillageHousesDetail = this.itnsVillageHousesDetailFormService.getItnsVillageHousesDetail(this.editForm);
    if (itnsVillageHousesDetail.id !== null) {
      this.subscribeToSaveResponse(this.itnsVillageHousesDetailService.update(itnsVillageHousesDetail));
    } else {
      this.subscribeToSaveResponse(this.itnsVillageHousesDetailService.create(itnsVillageHousesDetail));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItnsVillageHousesDetail>>): void {
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

  protected updateForm(itnsVillageHousesDetail: IItnsVillageHousesDetail): void {
    this.itnsVillageHousesDetail = itnsVillageHousesDetail;
    this.itnsVillageHousesDetailFormService.resetForm(this.editForm, itnsVillageHousesDetail);

    this.itnsVillagesSharedCollection = this.itnsVillageService.addItnsVillageToCollectionIfMissing<IItnsVillage>(
      this.itnsVillagesSharedCollection,
      itnsVillageHousesDetail.itnsVillage,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.itnsVillageService
      .query()
      .pipe(map((res: HttpResponse<IItnsVillage[]>) => res.body ?? []))
      .pipe(
        map((itnsVillages: IItnsVillage[]) =>
          this.itnsVillageService.addItnsVillageToCollectionIfMissing<IItnsVillage>(
            itnsVillages,
            this.itnsVillageHousesDetail?.itnsVillage,
          ),
        ),
      )
      .subscribe((itnsVillages: IItnsVillage[]) => (this.itnsVillagesSharedCollection = itnsVillages));
  }
}
