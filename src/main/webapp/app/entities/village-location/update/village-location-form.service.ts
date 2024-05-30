import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IVillageLocation, NewVillageLocation } from '../village-location.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVillageLocation for edit and NewVillageLocationFormGroupInput for create.
 */
type VillageLocationFormGroupInput = IVillageLocation | PartialWithRequiredKeyOf<NewVillageLocation>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IVillageLocation | NewVillageLocation> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

type VillageLocationFormRawValue = FormValueOf<IVillageLocation>;

type NewVillageLocationFormRawValue = FormValueOf<NewVillageLocation>;

type VillageLocationFormDefaults = Pick<NewVillageLocation, 'id' | 'createdDate' | 'lastModifiedDate'>;

type VillageLocationFormGroupContent = {
  id: FormControl<VillageLocationFormRawValue['id'] | NewVillageLocation['id']>;
  uid: FormControl<VillageLocationFormRawValue['uid']>;
  code: FormControl<VillageLocationFormRawValue['code']>;
  name: FormControl<VillageLocationFormRawValue['name']>;
  mappingStatus: FormControl<VillageLocationFormRawValue['mappingStatus']>;
  districtCode: FormControl<VillageLocationFormRawValue['districtCode']>;
  villageUid: FormControl<VillageLocationFormRawValue['villageUid']>;
  subdistrictName: FormControl<VillageLocationFormRawValue['subdistrictName']>;
  villageName: FormControl<VillageLocationFormRawValue['villageName']>;
  subvillageName: FormControl<VillageLocationFormRawValue['subvillageName']>;
  urbanRuralId: FormControl<VillageLocationFormRawValue['urbanRuralId']>;
  urbanRural: FormControl<VillageLocationFormRawValue['urbanRural']>;
  settlement: FormControl<VillageLocationFormRawValue['settlement']>;
  pop2004: FormControl<VillageLocationFormRawValue['pop2004']>;
  pop2022: FormControl<VillageLocationFormRawValue['pop2022']>;
  longitude: FormControl<VillageLocationFormRawValue['longitude']>;
  latitude: FormControl<VillageLocationFormRawValue['latitude']>;
  ppcCodeGis: FormControl<VillageLocationFormRawValue['ppcCodeGis']>;
  level: FormControl<VillageLocationFormRawValue['level']>;
  createdBy: FormControl<VillageLocationFormRawValue['createdBy']>;
  createdDate: FormControl<VillageLocationFormRawValue['createdDate']>;
  lastModifiedBy: FormControl<VillageLocationFormRawValue['lastModifiedBy']>;
  lastModifiedDate: FormControl<VillageLocationFormRawValue['lastModifiedDate']>;
};

export type VillageLocationFormGroup = FormGroup<VillageLocationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VillageLocationFormService {
  createVillageLocationFormGroup(villageLocation: VillageLocationFormGroupInput = { id: null }): VillageLocationFormGroup {
    const villageLocationRawValue = this.convertVillageLocationToVillageLocationRawValue({
      ...this.getFormDefaults(),
      ...villageLocation,
    });
    return new FormGroup<VillageLocationFormGroupContent>({
      id: new FormControl(
        { value: villageLocationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(villageLocationRawValue.uid, {
        validators: [Validators.maxLength(11)],
      }),
      code: new FormControl(villageLocationRawValue.code, {
        validators: [Validators.required],
      }),
      name: new FormControl(villageLocationRawValue.name),
      mappingStatus: new FormControl(villageLocationRawValue.mappingStatus),
      districtCode: new FormControl(villageLocationRawValue.districtCode),
      villageUid: new FormControl(villageLocationRawValue.villageUid),
      subdistrictName: new FormControl(villageLocationRawValue.subdistrictName),
      villageName: new FormControl(villageLocationRawValue.villageName),
      subvillageName: new FormControl(villageLocationRawValue.subvillageName),
      urbanRuralId: new FormControl(villageLocationRawValue.urbanRuralId),
      urbanRural: new FormControl(villageLocationRawValue.urbanRural),
      settlement: new FormControl(villageLocationRawValue.settlement),
      pop2004: new FormControl(villageLocationRawValue.pop2004),
      pop2022: new FormControl(villageLocationRawValue.pop2022),
      longitude: new FormControl(villageLocationRawValue.longitude),
      latitude: new FormControl(villageLocationRawValue.latitude),
      ppcCodeGis: new FormControl(villageLocationRawValue.ppcCodeGis, {
        validators: [Validators.required],
      }),
      level: new FormControl(villageLocationRawValue.level),
      createdBy: new FormControl(villageLocationRawValue.createdBy),
      createdDate: new FormControl(villageLocationRawValue.createdDate),
      lastModifiedBy: new FormControl(villageLocationRawValue.lastModifiedBy),
      lastModifiedDate: new FormControl(villageLocationRawValue.lastModifiedDate),
    });
  }

  getVillageLocation(form: VillageLocationFormGroup): IVillageLocation | NewVillageLocation {
    return this.convertVillageLocationRawValueToVillageLocation(
      form.getRawValue() as VillageLocationFormRawValue | NewVillageLocationFormRawValue,
    );
  }

  resetForm(form: VillageLocationFormGroup, villageLocation: VillageLocationFormGroupInput): void {
    const villageLocationRawValue = this.convertVillageLocationToVillageLocationRawValue({ ...this.getFormDefaults(), ...villageLocation });
    form.reset(
      {
        ...villageLocationRawValue,
        id: { value: villageLocationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): VillageLocationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      lastModifiedDate: currentTime,
    };
  }

  private convertVillageLocationRawValueToVillageLocation(
    rawVillageLocation: VillageLocationFormRawValue | NewVillageLocationFormRawValue,
  ): IVillageLocation | NewVillageLocation {
    return {
      ...rawVillageLocation,
      createdDate: dayjs(rawVillageLocation.createdDate, DATE_TIME_FORMAT),
      lastModifiedDate: dayjs(rawVillageLocation.lastModifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertVillageLocationToVillageLocationRawValue(
    villageLocation: IVillageLocation | (Partial<NewVillageLocation> & VillageLocationFormDefaults),
  ): VillageLocationFormRawValue | PartialWithRequiredKeyOf<NewVillageLocationFormRawValue> {
    return {
      ...villageLocation,
      createdDate: villageLocation.createdDate ? villageLocation.createdDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifiedDate: villageLocation.lastModifiedDate ? villageLocation.lastModifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
