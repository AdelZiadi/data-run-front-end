import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IWarehouseItem, NewWarehouseItem } from '../warehouse-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWarehouseItem for edit and NewWarehouseItemFormGroupInput for create.
 */
type WarehouseItemFormGroupInput = IWarehouseItem | PartialWithRequiredKeyOf<NewWarehouseItem>;

type WarehouseItemFormDefaults = Pick<NewWarehouseItem, 'id'>;

type WarehouseItemFormGroupContent = {
  id: FormControl<IWarehouseItem['id'] | NewWarehouseItem['id']>;
  uid: FormControl<IWarehouseItem['uid']>;
  code: FormControl<IWarehouseItem['code']>;
  name: FormControl<IWarehouseItem['name']>;
  description: FormControl<IWarehouseItem['description']>;
};

export type WarehouseItemFormGroup = FormGroup<WarehouseItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WarehouseItemFormService {
  createWarehouseItemFormGroup(warehouseItem: WarehouseItemFormGroupInput = { id: null }): WarehouseItemFormGroup {
    const warehouseItemRawValue = {
      ...this.getFormDefaults(),
      ...warehouseItem,
    };
    return new FormGroup<WarehouseItemFormGroupContent>({
      id: new FormControl(
        { value: warehouseItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(warehouseItemRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(warehouseItemRawValue.code),
      name: new FormControl(warehouseItemRawValue.name),
      description: new FormControl(warehouseItemRawValue.description),
    });
  }

  getWarehouseItem(form: WarehouseItemFormGroup): IWarehouseItem | NewWarehouseItem {
    return form.getRawValue() as IWarehouseItem | NewWarehouseItem;
  }

  resetForm(form: WarehouseItemFormGroup, warehouseItem: WarehouseItemFormGroupInput): void {
    const warehouseItemRawValue = { ...this.getFormDefaults(), ...warehouseItem };
    form.reset(
      {
        ...warehouseItemRawValue,
        id: { value: warehouseItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): WarehouseItemFormDefaults {
    return {
      id: null,
    };
  }
}
