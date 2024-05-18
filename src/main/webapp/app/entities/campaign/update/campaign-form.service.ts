import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICampaign, NewCampaign } from '../campaign.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICampaign for edit and NewCampaignFormGroupInput for create.
 */
type CampaignFormGroupInput = ICampaign | PartialWithRequiredKeyOf<NewCampaign>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICampaign | NewCampaign> = Omit<T, 'campaignStartedDate'> & {
  campaignStartedDate?: string | null;
};

type CampaignFormRawValue = FormValueOf<ICampaign>;

type NewCampaignFormRawValue = FormValueOf<NewCampaign>;

type CampaignFormDefaults = Pick<NewCampaign, 'id' | 'campaignStartedDate' | 'enabled'>;

type CampaignFormGroupContent = {
  id: FormControl<CampaignFormRawValue['id'] | NewCampaign['id']>;
  campaignCode: FormControl<CampaignFormRawValue['campaignCode']>;
  campaignStartedDate: FormControl<CampaignFormRawValue['campaignStartedDate']>;
  campaignDays: FormControl<CampaignFormRawValue['campaignDays']>;
  campaignYear: FormControl<CampaignFormRawValue['campaignYear']>;
  campaignNote: FormControl<CampaignFormRawValue['campaignNote']>;
  enabled: FormControl<CampaignFormRawValue['enabled']>;
  campaignType: FormControl<CampaignFormRawValue['campaignType']>;
};

export type CampaignFormGroup = FormGroup<CampaignFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CampaignFormService {
  createCampaignFormGroup(campaign: CampaignFormGroupInput = { id: null }): CampaignFormGroup {
    const campaignRawValue = this.convertCampaignToCampaignRawValue({
      ...this.getFormDefaults(),
      ...campaign,
    });
    return new FormGroup<CampaignFormGroupContent>({
      id: new FormControl(
        { value: campaignRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      campaignCode: new FormControl(campaignRawValue.campaignCode, {
        validators: [Validators.required],
      }),
      campaignStartedDate: new FormControl(campaignRawValue.campaignStartedDate, {
        validators: [Validators.required],
      }),
      campaignDays: new FormControl(campaignRawValue.campaignDays, {
        validators: [Validators.min(0)],
      }),
      campaignYear: new FormControl(campaignRawValue.campaignYear, {
        validators: [Validators.min(0)],
      }),
      campaignNote: new FormControl(campaignRawValue.campaignNote),
      enabled: new FormControl(campaignRawValue.enabled, {
        validators: [Validators.required],
      }),
      campaignType: new FormControl(campaignRawValue.campaignType),
    });
  }

  getCampaign(form: CampaignFormGroup): ICampaign | NewCampaign {
    return this.convertCampaignRawValueToCampaign(form.getRawValue() as CampaignFormRawValue | NewCampaignFormRawValue);
  }

  resetForm(form: CampaignFormGroup, campaign: CampaignFormGroupInput): void {
    const campaignRawValue = this.convertCampaignToCampaignRawValue({ ...this.getFormDefaults(), ...campaign });
    form.reset(
      {
        ...campaignRawValue,
        id: { value: campaignRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CampaignFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      campaignStartedDate: currentTime,
      enabled: false,
    };
  }

  private convertCampaignRawValueToCampaign(rawCampaign: CampaignFormRawValue | NewCampaignFormRawValue): ICampaign | NewCampaign {
    return {
      ...rawCampaign,
      campaignStartedDate: dayjs(rawCampaign.campaignStartedDate, DATE_TIME_FORMAT),
    };
  }

  private convertCampaignToCampaignRawValue(
    campaign: ICampaign | (Partial<NewCampaign> & CampaignFormDefaults),
  ): CampaignFormRawValue | PartialWithRequiredKeyOf<NewCampaignFormRawValue> {
    return {
      ...campaign,
      campaignStartedDate: campaign.campaignStartedDate ? campaign.campaignStartedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
