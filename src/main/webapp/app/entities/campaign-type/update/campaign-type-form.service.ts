import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICampaignType, NewCampaignType } from '../campaign-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICampaignType for edit and NewCampaignTypeFormGroupInput for create.
 */
type CampaignTypeFormGroupInput = ICampaignType | PartialWithRequiredKeyOf<NewCampaignType>;

type CampaignTypeFormDefaults = Pick<NewCampaignType, 'id'>;

type CampaignTypeFormGroupContent = {
  id: FormControl<ICampaignType['id'] | NewCampaignType['id']>;
  campaignType: FormControl<ICampaignType['campaignType']>;
  description: FormControl<ICampaignType['description']>;
};

export type CampaignTypeFormGroup = FormGroup<CampaignTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CampaignTypeFormService {
  createCampaignTypeFormGroup(campaignType: CampaignTypeFormGroupInput = { id: null }): CampaignTypeFormGroup {
    const campaignTypeRawValue = {
      ...this.getFormDefaults(),
      ...campaignType,
    };
    return new FormGroup<CampaignTypeFormGroupContent>({
      id: new FormControl(
        { value: campaignTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      campaignType: new FormControl(campaignTypeRawValue.campaignType, {
        validators: [Validators.required],
      }),
      description: new FormControl(campaignTypeRawValue.description),
    });
  }

  getCampaignType(form: CampaignTypeFormGroup): ICampaignType | NewCampaignType {
    return form.getRawValue() as ICampaignType | NewCampaignType;
  }

  resetForm(form: CampaignTypeFormGroup, campaignType: CampaignTypeFormGroupInput): void {
    const campaignTypeRawValue = { ...this.getFormDefaults(), ...campaignType };
    form.reset(
      {
        ...campaignTypeRawValue,
        id: { value: campaignTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CampaignTypeFormDefaults {
    return {
      id: null,
    };
  }
}
