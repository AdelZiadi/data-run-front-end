import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICampaignType } from '../campaign-type.model';
import { CampaignTypeService } from '../service/campaign-type.service';
import { CampaignTypeFormService, CampaignTypeFormGroup } from './campaign-type-form.service';

@Component({
  standalone: true,
  selector: 'app-campaign-type-update',
  templateUrl: './campaign-type-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CampaignTypeUpdateComponent implements OnInit {
  isSaving = false;
  campaignType: ICampaignType | null = null;

  protected campaignTypeService = inject(CampaignTypeService);
  protected campaignTypeFormService = inject(CampaignTypeFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CampaignTypeFormGroup = this.campaignTypeFormService.createCampaignTypeFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ campaignType }) => {
      this.campaignType = campaignType;
      if (campaignType) {
        this.updateForm(campaignType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const campaignType = this.campaignTypeFormService.getCampaignType(this.editForm);
    if (campaignType.id !== null) {
      this.subscribeToSaveResponse(this.campaignTypeService.update(campaignType));
    } else {
      this.subscribeToSaveResponse(this.campaignTypeService.create(campaignType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICampaignType>>): void {
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

  protected updateForm(campaignType: ICampaignType): void {
    this.campaignType = campaignType;
    this.campaignTypeFormService.resetForm(this.editForm, campaignType);
  }
}
