import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
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

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IWarehouseItem | NewWarehouseItem> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

type WarehouseItemFormRawValue = FormValueOf<IWarehouseItem>;

type NewWarehouseItemFormRawValue = FormValueOf<NewWarehouseItem>;

type WarehouseItemFormDefaults = Pick<NewWarehouseItem, 'id' | 'createdDate' | 'lastModifiedDate'>;

type WarehouseItemFormGroupContent = {
  id: FormControl<WarehouseItemFormRawValue['id'] | NewWarehouseItem['id']>;
  uid: FormControl<WarehouseItemFormRawValue['uid']>;
  code: FormControl<WarehouseItemFormRawValue['code']>;
  name: FormControl<WarehouseItemFormRawValue['name']>;
  description: FormControl<WarehouseItemFormRawValue['description']>;
  createdBy: FormControl<WarehouseItemFormRawValue['createdBy']>;
  createdDate: FormControl<WarehouseItemFormRawValue['createdDate']>;
  lastModifiedBy: FormControl<WarehouseItemFormRawValue['lastModifiedBy']>;
  lastModifiedDate: FormControl<WarehouseItemFormRawValue['lastModifiedDate']>;
};

export type WarehouseItemFormGroup = FormGroup<WarehouseItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WarehouseItemFormService {
  createWarehouseItemFormGroup(warehouseItem: WarehouseItemFormGroupInput = { id: null }): WarehouseItemFormGroup {
    const warehouseItemRawValue = this.convertWarehouseItemToWarehouseItemRawValue({
      ...this.getFormDefaults(),
      ...warehouseItem,
    });
    return new FormGroup<WarehouseItemFormGroupContent>({
      id: new FormControl(
        { value: warehouseItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(warehouseItemRawValue.uid, {
        validators: [Validators.maxLength(11)],
      }),
      code: new FormControl(warehouseItemRawValue.code),
      name: new FormControl(warehouseItemRawValue.name),
      description: new FormControl(warehouseItemRawValue.description),
      createdBy: new FormControl(warehouseItemRawValue.createdBy),
      createdDate: new FormControl(warehouseItemRawValue.createdDate),
      lastModifiedBy: new FormControl(warehouseItemRawValue.lastModifiedBy),
      lastModifiedDate: new FormControl(warehouseItemRawValue.lastModifiedDate),
    });
  }

  getWarehouseItem(form: WarehouseItemFormGroup): IWarehouseItem | NewWarehouseItem {
    return this.convertWarehouseItemRawValueToWarehouseItem(form.getRawValue() as WarehouseItemFormRawValue | NewWarehouseItemFormRawValue);
  }

  resetForm(form: WarehouseItemFormGroup, warehouseItem: WarehouseItemFormGroupInput): void {
    const warehouseItemRawValue = this.convertWarehouseItemToWarehouseItemRawValue({ ...this.getFormDefaults(), ...warehouseItem });
    form.reset(
      {
        ...warehouseItemRawValue,
        id: { value: warehouseItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): WarehouseItemFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      lastModifiedDate: currentTime,
    };
  }

  private convertWarehouseItemRawValueToWarehouseItem(
    rawWarehouseItem: WarehouseItemFormRawValue | NewWarehouseItemFormRawValue,
  ): IWarehouseItem | NewWarehouseItem {
    return {
      ...rawWarehouseItem,
      createdDate: dayjs(rawWarehouseItem.createdDate, DATE_TIME_FORMAT),
      lastModifiedDate: dayjs(rawWarehouseItem.lastModifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertWarehouseItemToWarehouseItemRawValue(
    warehouseItem: IWarehouseItem | (Partial<NewWarehouseItem> & WarehouseItemFormDefaults),
  ): WarehouseItemFormRawValue | PartialWithRequiredKeyOf<NewWarehouseItemFormRawValue> {
    return {
      ...warehouseItem,
      createdDate: warehouseItem.createdDate ? warehouseItem.createdDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifiedDate: warehouseItem.lastModifiedDate ? warehouseItem.lastModifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
