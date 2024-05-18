import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICampaignType } from 'app/entities/campaign-type/campaign-type.model';
import { CampaignTypeService } from 'app/entities/campaign-type/service/campaign-type.service';
import { ICampaign } from '../campaign.model';
import { CampaignService } from '../service/campaign.service';
import { CampaignFormService, CampaignFormGroup } from './campaign-form.service';

@Component({
  standalone: true,
  selector: 'app-campaign-update',
  templateUrl: './campaign-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CampaignUpdateComponent implements OnInit {
  isSaving = false;
  campaign: ICampaign | null = null;

  campaignTypesSharedCollection: ICampaignType[] = [];

  protected campaignService = inject(CampaignService);
  protected campaignFormService = inject(CampaignFormService);
  protected campaignTypeService = inject(CampaignTypeService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CampaignFormGroup = this.campaignFormService.createCampaignFormGroup();

  compareCampaignType = (o1: ICampaignType | null, o2: ICampaignType | null): boolean =>
    this.campaignTypeService.compareCampaignType(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ campaign }) => {
      this.campaign = campaign;
      if (campaign) {
        this.updateForm(campaign);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const campaign = this.campaignFormService.getCampaign(this.editForm);
    if (campaign.id !== null) {
      this.subscribeToSaveResponse(this.campaignService.update(campaign));
    } else {
      this.subscribeToSaveResponse(this.campaignService.create(campaign));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICampaign>>): void {
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

  protected updateForm(campaign: ICampaign): void {
    this.campaign = campaign;
    this.campaignFormService.resetForm(this.editForm, campaign);

    this.campaignTypesSharedCollection = this.campaignTypeService.addCampaignTypeToCollectionIfMissing<ICampaignType>(
      this.campaignTypesSharedCollection,
      campaign.campaignType,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.campaignTypeService
      .query()
      .pipe(map((res: HttpResponse<ICampaignType[]>) => res.body ?? []))
      .pipe(
        map((campaignTypes: ICampaignType[]) =>
          this.campaignTypeService.addCampaignTypeToCollectionIfMissing<ICampaignType>(campaignTypes, this.campaign?.campaignType),
        ),
      )
      .subscribe((campaignTypes: ICampaignType[]) => (this.campaignTypesSharedCollection = campaignTypes));
  }
}
