import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicLocationType } from 'app/entities/enumerations/public-location-type.model';
import { IVillageLocation } from '../village-location.model';
import { VillageLocationService } from '../service/village-location.service';
import { VillageLocationFormService, VillageLocationFormGroup } from './village-location-form.service';

@Component({
  standalone: true,
  selector: 'app-village-location-update',
  templateUrl: './village-location-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class VillageLocationUpdateComponent implements OnInit {
  isSaving = false;
  villageLocation: IVillageLocation | null = null;
  publicLocationTypeValues = Object.keys(PublicLocationType);

  protected villageLocationService = inject(VillageLocationService);
  protected villageLocationFormService = inject(VillageLocationFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: VillageLocationFormGroup = this.villageLocationFormService.createVillageLocationFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ villageLocation }) => {
      this.villageLocation = villageLocation;
      if (villageLocation) {
        this.updateForm(villageLocation);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const villageLocation = this.villageLocationFormService.getVillageLocation(this.editForm);
    if (villageLocation.id !== null) {
      this.subscribeToSaveResponse(this.villageLocationService.update(villageLocation));
    } else {
      this.subscribeToSaveResponse(this.villageLocationService.create(villageLocation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVillageLocation>>): void {
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

  protected updateForm(villageLocation: IVillageLocation): void {
    this.villageLocation = villageLocation;
    this.villageLocationFormService.resetForm(this.editForm, villageLocation);
  }
}
