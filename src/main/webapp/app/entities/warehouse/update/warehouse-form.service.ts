import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IWarehouse, NewWarehouse } from '../warehouse.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWarehouse for edit and NewWarehouseFormGroupInput for create.
 */
type WarehouseFormGroupInput = IWarehouse | PartialWithRequiredKeyOf<NewWarehouse>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IWarehouse | NewWarehouse> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

type WarehouseFormRawValue = FormValueOf<IWarehouse>;

type NewWarehouseFormRawValue = FormValueOf<NewWarehouse>;

type WarehouseFormDefaults = Pick<NewWarehouse, 'id' | 'createdDate' | 'lastModifiedDate'>;

type WarehouseFormGroupContent = {
  id: FormControl<WarehouseFormRawValue['id'] | NewWarehouse['id']>;
  uid: FormControl<WarehouseFormRawValue['uid']>;
  code: FormControl<WarehouseFormRawValue['code']>;
  name: FormControl<WarehouseFormRawValue['name']>;
  description: FormControl<WarehouseFormRawValue['description']>;
  gpsCoordinate: FormControl<WarehouseFormRawValue['gpsCoordinate']>;
  supervisor: FormControl<WarehouseFormRawValue['supervisor']>;
  supervisorMobile: FormControl<WarehouseFormRawValue['supervisorMobile']>;
  createdBy: FormControl<WarehouseFormRawValue['createdBy']>;
  createdDate: FormControl<WarehouseFormRawValue['createdDate']>;
  lastModifiedBy: FormControl<WarehouseFormRawValue['lastModifiedBy']>;
  lastModifiedDate: FormControl<WarehouseFormRawValue['lastModifiedDate']>;
  activity: FormControl<WarehouseFormRawValue['activity']>;
};

export type WarehouseFormGroup = FormGroup<WarehouseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WarehouseFormService {
  createWarehouseFormGroup(warehouse: WarehouseFormGroupInput = { id: null }): WarehouseFormGroup {
    const warehouseRawValue = this.convertWarehouseToWarehouseRawValue({
      ...this.getFormDefaults(),
      ...warehouse,
    });
    return new FormGroup<WarehouseFormGroupContent>({
      id: new FormControl(
        { value: warehouseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(warehouseRawValue.uid, {
        validators: [Validators.maxLength(11)],
      }),
      code: new FormControl(warehouseRawValue.code, {
        validators: [Validators.required],
      }),
      name: new FormControl(warehouseRawValue.name),
      description: new FormControl(warehouseRawValue.description),
      gpsCoordinate: new FormControl(warehouseRawValue.gpsCoordinate),
      supervisor: new FormControl(warehouseRawValue.supervisor),
      supervisorMobile: new FormControl(warehouseRawValue.supervisorMobile),
      createdBy: new FormControl(warehouseRawValue.createdBy),
      createdDate: new FormControl(warehouseRawValue.createdDate),
      lastModifiedBy: new FormControl(warehouseRawValue.lastModifiedBy),
      lastModifiedDate: new FormControl(warehouseRawValue.lastModifiedDate),
      activity: new FormControl(warehouseRawValue.activity),
    });
  }

  getWarehouse(form: WarehouseFormGroup): IWarehouse | NewWarehouse {
    return this.convertWarehouseRawValueToWarehouse(form.getRawValue() as WarehouseFormRawValue | NewWarehouseFormRawValue);
  }

  resetForm(form: WarehouseFormGroup, warehouse: WarehouseFormGroupInput): void {
    const warehouseRawValue = this.convertWarehouseToWarehouseRawValue({ ...this.getFormDefaults(), ...warehouse });
    form.reset(
      {
        ...warehouseRawValue,
        id: { value: warehouseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): WarehouseFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      lastModifiedDate: currentTime,
    };
  }

  private convertWarehouseRawValueToWarehouse(rawWarehouse: WarehouseFormRawValue | NewWarehouseFormRawValue): IWarehouse | NewWarehouse {
    return {
      ...rawWarehouse,
      createdDate: dayjs(rawWarehouse.createdDate, DATE_TIME_FORMAT),
      lastModifiedDate: dayjs(rawWarehouse.lastModifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertWarehouseToWarehouseRawValue(
    warehouse: IWarehouse | (Partial<NewWarehouse> & WarehouseFormDefaults),
  ): WarehouseFormRawValue | PartialWithRequiredKeyOf<NewWarehouseFormRawValue> {
    return {
      ...warehouse,
      createdDate: warehouse.createdDate ? warehouse.createdDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifiedDate: warehouse.lastModifiedDate ? warehouse.lastModifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
