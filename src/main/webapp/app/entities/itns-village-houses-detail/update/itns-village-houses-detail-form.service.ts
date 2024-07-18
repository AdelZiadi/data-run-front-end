import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IItnsVillageHousesDetail, NewItnsVillageHousesDetail } from '../itns-village-houses-detail.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItnsVillageHousesDetail for edit and NewItnsVillageHousesDetailFormGroupInput for create.
 */
type ItnsVillageHousesDetailFormGroupInput = IItnsVillageHousesDetail | PartialWithRequiredKeyOf<NewItnsVillageHousesDetail>;

type ItnsVillageHousesDetailFormDefaults = Pick<NewItnsVillageHousesDetail, 'id' | 'deleted'>;

type ItnsVillageHousesDetailFormGroupContent = {
  id: FormControl<IItnsVillageHousesDetail['id'] | NewItnsVillageHousesDetail['id']>;
  uid: FormControl<IItnsVillageHousesDetail['uid']>;
  code: FormControl<IItnsVillageHousesDetail['code']>;
  couponId: FormControl<IItnsVillageHousesDetail['couponId']>;
  name: FormControl<IItnsVillageHousesDetail['name']>;
  male: FormControl<IItnsVillageHousesDetail['male']>;
  female: FormControl<IItnsVillageHousesDetail['female']>;
  pregnant: FormControl<IItnsVillageHousesDetail['pregnant']>;
  population: FormControl<IItnsVillageHousesDetail['population']>;
  maleChild: FormControl<IItnsVillageHousesDetail['maleChild']>;
  femaleChild: FormControl<IItnsVillageHousesDetail['femaleChild']>;
  displaced: FormControl<IItnsVillageHousesDetail['displaced']>;
  itns: FormControl<IItnsVillageHousesDetail['itns']>;
  comment: FormControl<IItnsVillageHousesDetail['comment']>;
  submissionUuid: FormControl<IItnsVillageHousesDetail['submissionUuid']>;
  houseUuid: FormControl<IItnsVillageHousesDetail['houseUuid']>;
  deleted: FormControl<IItnsVillageHousesDetail['deleted']>;
  itnsVillage: FormControl<IItnsVillageHousesDetail['itnsVillage']>;
};

export type ItnsVillageHousesDetailFormGroup = FormGroup<ItnsVillageHousesDetailFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItnsVillageHousesDetailFormService {
  createItnsVillageHousesDetailFormGroup(
    itnsVillageHousesDetail: ItnsVillageHousesDetailFormGroupInput = { id: null },
  ): ItnsVillageHousesDetailFormGroup {
    const itnsVillageHousesDetailRawValue = {
      ...this.getFormDefaults(),
      ...itnsVillageHousesDetail,
    };
    return new FormGroup<ItnsVillageHousesDetailFormGroupContent>({
      id: new FormControl(
        { value: itnsVillageHousesDetailRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(itnsVillageHousesDetailRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(itnsVillageHousesDetailRawValue.code),
      couponId: new FormControl(itnsVillageHousesDetailRawValue.couponId),
      name: new FormControl(itnsVillageHousesDetailRawValue.name),
      male: new FormControl(itnsVillageHousesDetailRawValue.male, {
        validators: [Validators.min(0)],
      }),
      female: new FormControl(itnsVillageHousesDetailRawValue.female, {
        validators: [Validators.min(0)],
      }),
      pregnant: new FormControl(itnsVillageHousesDetailRawValue.pregnant, {
        validators: [Validators.min(0)],
      }),
      population: new FormControl(itnsVillageHousesDetailRawValue.population, {
        validators: [Validators.min(0)],
      }),
      maleChild: new FormControl(itnsVillageHousesDetailRawValue.maleChild, {
        validators: [Validators.min(0)],
      }),
      femaleChild: new FormControl(itnsVillageHousesDetailRawValue.femaleChild, {
        validators: [Validators.min(0)],
      }),
      displaced: new FormControl(itnsVillageHousesDetailRawValue.displaced, {
        validators: [Validators.min(0)],
      }),
      itns: new FormControl(itnsVillageHousesDetailRawValue.itns, {
        validators: [Validators.min(0)],
      }),
      comment: new FormControl(itnsVillageHousesDetailRawValue.comment, {
        validators: [Validators.maxLength(2000)],
      }),
      submissionUuid: new FormControl(itnsVillageHousesDetailRawValue.submissionUuid),
      houseUuid: new FormControl(itnsVillageHousesDetailRawValue.houseUuid),
      deleted: new FormControl(itnsVillageHousesDetailRawValue.deleted),
      itnsVillage: new FormControl(itnsVillageHousesDetailRawValue.itnsVillage, {
        validators: [Validators.required],
      }),
    });
  }

  getItnsVillageHousesDetail(form: ItnsVillageHousesDetailFormGroup): IItnsVillageHousesDetail | NewItnsVillageHousesDetail {
    return form.getRawValue() as IItnsVillageHousesDetail | NewItnsVillageHousesDetail;
  }

  resetForm(form: ItnsVillageHousesDetailFormGroup, itnsVillageHousesDetail: ItnsVillageHousesDetailFormGroupInput): void {
    const itnsVillageHousesDetailRawValue = { ...this.getFormDefaults(), ...itnsVillageHousesDetail };
    form.reset(
      {
        ...itnsVillageHousesDetailRawValue,
        id: { value: itnsVillageHousesDetailRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ItnsVillageHousesDetailFormDefaults {
    return {
      id: null,
      deleted: false,
    };
  }
}
