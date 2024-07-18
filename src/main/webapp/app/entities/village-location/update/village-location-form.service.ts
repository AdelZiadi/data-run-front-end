import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

type VillageLocationFormDefaults = Pick<NewVillageLocation, 'id'>;

type VillageLocationFormGroupContent = {
  id: FormControl<IVillageLocation['id'] | NewVillageLocation['id']>;
  uid: FormControl<IVillageLocation['uid']>;
  code: FormControl<IVillageLocation['code']>;
  name: FormControl<IVillageLocation['name']>;
  mappingStatus: FormControl<IVillageLocation['mappingStatus']>;
  districtCode: FormControl<IVillageLocation['districtCode']>;
  villageUid: FormControl<IVillageLocation['villageUid']>;
  subdistrictName: FormControl<IVillageLocation['subdistrictName']>;
  villageName: FormControl<IVillageLocation['villageName']>;
  subvillageName: FormControl<IVillageLocation['subvillageName']>;
  urbanRuralId: FormControl<IVillageLocation['urbanRuralId']>;
  urbanRural: FormControl<IVillageLocation['urbanRural']>;
  settlement: FormControl<IVillageLocation['settlement']>;
  pop2004: FormControl<IVillageLocation['pop2004']>;
  pop2022: FormControl<IVillageLocation['pop2022']>;
  longitude: FormControl<IVillageLocation['longitude']>;
  latitude: FormControl<IVillageLocation['latitude']>;
  ppcCodeGis: FormControl<IVillageLocation['ppcCodeGis']>;
  level: FormControl<IVillageLocation['level']>;
};

export type VillageLocationFormGroup = FormGroup<VillageLocationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VillageLocationFormService {
  createVillageLocationFormGroup(villageLocation: VillageLocationFormGroupInput = { id: null }): VillageLocationFormGroup {
    const villageLocationRawValue = {
      ...this.getFormDefaults(),
      ...villageLocation,
    };
    return new FormGroup<VillageLocationFormGroupContent>({
      id: new FormControl(
        { value: villageLocationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(villageLocationRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
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
    });
  }

  getVillageLocation(form: VillageLocationFormGroup): IVillageLocation | NewVillageLocation {
    return form.getRawValue() as IVillageLocation | NewVillageLocation;
  }

  resetForm(form: VillageLocationFormGroup, villageLocation: VillageLocationFormGroupInput): void {
    const villageLocationRawValue = { ...this.getFormDefaults(), ...villageLocation };
    form.reset(
      {
        ...villageLocationRawValue,
        id: { value: villageLocationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): VillageLocationFormDefaults {
    return {
      id: null,
    };
  }
}
