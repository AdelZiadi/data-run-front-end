import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

type WarehouseFormDefaults = Pick<NewWarehouse, 'id'>;

type WarehouseFormGroupContent = {
  id: FormControl<IWarehouse['id'] | NewWarehouse['id']>;
  uid: FormControl<IWarehouse['uid']>;
  code: FormControl<IWarehouse['code']>;
  name: FormControl<IWarehouse['name']>;
  description: FormControl<IWarehouse['description']>;
  gpsCoordinate: FormControl<IWarehouse['gpsCoordinate']>;
  supervisor: FormControl<IWarehouse['supervisor']>;
  supervisorMobile: FormControl<IWarehouse['supervisorMobile']>;
  activity: FormControl<IWarehouse['activity']>;
};

export type WarehouseFormGroup = FormGroup<WarehouseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WarehouseFormService {
  createWarehouseFormGroup(warehouse: WarehouseFormGroupInput = { id: null }): WarehouseFormGroup {
    const warehouseRawValue = {
      ...this.getFormDefaults(),
      ...warehouse,
    };
    return new FormGroup<WarehouseFormGroupContent>({
      id: new FormControl(
        { value: warehouseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(warehouseRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(warehouseRawValue.code, {
        validators: [Validators.required],
      }),
      name: new FormControl(warehouseRawValue.name),
      description: new FormControl(warehouseRawValue.description),
      gpsCoordinate: new FormControl(warehouseRawValue.gpsCoordinate),
      supervisor: new FormControl(warehouseRawValue.supervisor),
      supervisorMobile: new FormControl(warehouseRawValue.supervisorMobile),
      activity: new FormControl(warehouseRawValue.activity),
    });
  }

  getWarehouse(form: WarehouseFormGroup): IWarehouse | NewWarehouse {
    return form.getRawValue() as IWarehouse | NewWarehouse;
  }

  resetForm(form: WarehouseFormGroup, warehouse: WarehouseFormGroupInput): void {
    const warehouseRawValue = { ...this.getFormDefaults(), ...warehouse };
    form.reset(
      {
        ...warehouseRawValue,
        id: { value: warehouseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): WarehouseFormDefaults {
    return {
      id: null,
    };
  }
}
