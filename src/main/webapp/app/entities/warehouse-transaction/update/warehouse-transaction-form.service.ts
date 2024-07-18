import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IWarehouseTransaction, NewWarehouseTransaction } from '../warehouse-transaction.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWarehouseTransaction for edit and NewWarehouseTransactionFormGroupInput for create.
 */
type WarehouseTransactionFormGroupInput = IWarehouseTransaction | PartialWithRequiredKeyOf<NewWarehouseTransaction>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IWarehouseTransaction | NewWarehouseTransaction> = Omit<
  T,
  'transactionDate' | 'submissionTime' | 'startEntryTime' | 'finishedEntryTime'
> & {
  transactionDate?: string | null;
  submissionTime?: string | null;
  startEntryTime?: string | null;
  finishedEntryTime?: string | null;
};

type WarehouseTransactionFormRawValue = FormValueOf<IWarehouseTransaction>;

type NewWarehouseTransactionFormRawValue = FormValueOf<NewWarehouseTransaction>;

type WarehouseTransactionFormDefaults = Pick<
  NewWarehouseTransaction,
  'id' | 'transactionDate' | 'submissionTime' | 'deleted' | 'startEntryTime' | 'finishedEntryTime'
>;

type WarehouseTransactionFormGroupContent = {
  id: FormControl<WarehouseTransactionFormRawValue['id'] | NewWarehouseTransaction['id']>;
  uid: FormControl<WarehouseTransactionFormRawValue['uid']>;
  code: FormControl<WarehouseTransactionFormRawValue['code']>;
  name: FormControl<WarehouseTransactionFormRawValue['name']>;
  imovUid: FormControl<WarehouseTransactionFormRawValue['imovUid']>;
  transactionDate: FormControl<WarehouseTransactionFormRawValue['transactionDate']>;
  phaseNo: FormControl<WarehouseTransactionFormRawValue['phaseNo']>;
  entryType: FormControl<WarehouseTransactionFormRawValue['entryType']>;
  quantity: FormControl<WarehouseTransactionFormRawValue['quantity']>;
  notes: FormControl<WarehouseTransactionFormRawValue['notes']>;
  personName: FormControl<WarehouseTransactionFormRawValue['personName']>;
  workDayId: FormControl<WarehouseTransactionFormRawValue['workDayId']>;
  submissionTime: FormControl<WarehouseTransactionFormRawValue['submissionTime']>;
  submissionId: FormControl<WarehouseTransactionFormRawValue['submissionId']>;
  deleted: FormControl<WarehouseTransactionFormRawValue['deleted']>;
  submissionUuid: FormControl<WarehouseTransactionFormRawValue['submissionUuid']>;
  startEntryTime: FormControl<WarehouseTransactionFormRawValue['startEntryTime']>;
  finishedEntryTime: FormControl<WarehouseTransactionFormRawValue['finishedEntryTime']>;
  status: FormControl<WarehouseTransactionFormRawValue['status']>;
  item: FormControl<WarehouseTransactionFormRawValue['item']>;
  sourceWarehouse: FormControl<WarehouseTransactionFormRawValue['sourceWarehouse']>;
  team: FormControl<WarehouseTransactionFormRawValue['team']>;
  warehouse: FormControl<WarehouseTransactionFormRawValue['warehouse']>;
  activity: FormControl<WarehouseTransactionFormRawValue['activity']>;
};

export type WarehouseTransactionFormGroup = FormGroup<WarehouseTransactionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WarehouseTransactionFormService {
  createWarehouseTransactionFormGroup(
    warehouseTransaction: WarehouseTransactionFormGroupInput = { id: null },
  ): WarehouseTransactionFormGroup {
    const warehouseTransactionRawValue = this.convertWarehouseTransactionToWarehouseTransactionRawValue({
      ...this.getFormDefaults(),
      ...warehouseTransaction,
    });
    return new FormGroup<WarehouseTransactionFormGroupContent>({
      id: new FormControl(
        { value: warehouseTransactionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(warehouseTransactionRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(warehouseTransactionRawValue.code),
      name: new FormControl(warehouseTransactionRawValue.name),
      imovUid: new FormControl(warehouseTransactionRawValue.imovUid, {
        validators: [Validators.required],
      }),
      transactionDate: new FormControl(warehouseTransactionRawValue.transactionDate, {
        validators: [Validators.required],
      }),
      phaseNo: new FormControl(warehouseTransactionRawValue.phaseNo),
      entryType: new FormControl(warehouseTransactionRawValue.entryType, {
        validators: [Validators.required],
      }),
      quantity: new FormControl(warehouseTransactionRawValue.quantity, {
        validators: [Validators.required, Validators.min(0)],
      }),
      notes: new FormControl(warehouseTransactionRawValue.notes, {
        validators: [Validators.maxLength(2000)],
      }),
      personName: new FormControl(warehouseTransactionRawValue.personName, {
        validators: [Validators.maxLength(2000)],
      }),
      workDayId: new FormControl(warehouseTransactionRawValue.workDayId),
      submissionTime: new FormControl(warehouseTransactionRawValue.submissionTime),
      submissionId: new FormControl(warehouseTransactionRawValue.submissionId),
      deleted: new FormControl(warehouseTransactionRawValue.deleted),
      submissionUuid: new FormControl(warehouseTransactionRawValue.submissionUuid),
      startEntryTime: new FormControl(warehouseTransactionRawValue.startEntryTime),
      finishedEntryTime: new FormControl(warehouseTransactionRawValue.finishedEntryTime),
      status: new FormControl(warehouseTransactionRawValue.status, {
        validators: [Validators.required],
      }),
      item: new FormControl(warehouseTransactionRawValue.item),
      sourceWarehouse: new FormControl(warehouseTransactionRawValue.sourceWarehouse),
      team: new FormControl(warehouseTransactionRawValue.team),
      warehouse: new FormControl(warehouseTransactionRawValue.warehouse, {
        validators: [Validators.required],
      }),
      activity: new FormControl(warehouseTransactionRawValue.activity),
    });
  }

  getWarehouseTransaction(form: WarehouseTransactionFormGroup): IWarehouseTransaction | NewWarehouseTransaction {
    return this.convertWarehouseTransactionRawValueToWarehouseTransaction(
      form.getRawValue() as WarehouseTransactionFormRawValue | NewWarehouseTransactionFormRawValue,
    );
  }

  resetForm(form: WarehouseTransactionFormGroup, warehouseTransaction: WarehouseTransactionFormGroupInput): void {
    const warehouseTransactionRawValue = this.convertWarehouseTransactionToWarehouseTransactionRawValue({
      ...this.getFormDefaults(),
      ...warehouseTransaction,
    });
    form.reset(
      {
        ...warehouseTransactionRawValue,
        id: { value: warehouseTransactionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): WarehouseTransactionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      transactionDate: currentTime,
      submissionTime: currentTime,
      deleted: false,
      startEntryTime: currentTime,
      finishedEntryTime: currentTime,
    };
  }

  private convertWarehouseTransactionRawValueToWarehouseTransaction(
    rawWarehouseTransaction: WarehouseTransactionFormRawValue | NewWarehouseTransactionFormRawValue,
  ): IWarehouseTransaction | NewWarehouseTransaction {
    return {
      ...rawWarehouseTransaction,
      transactionDate: dayjs(rawWarehouseTransaction.transactionDate, DATE_TIME_FORMAT),
      submissionTime: dayjs(rawWarehouseTransaction.submissionTime, DATE_TIME_FORMAT),
      startEntryTime: dayjs(rawWarehouseTransaction.startEntryTime, DATE_TIME_FORMAT),
      finishedEntryTime: dayjs(rawWarehouseTransaction.finishedEntryTime, DATE_TIME_FORMAT),
    };
  }

  private convertWarehouseTransactionToWarehouseTransactionRawValue(
    warehouseTransaction: IWarehouseTransaction | (Partial<NewWarehouseTransaction> & WarehouseTransactionFormDefaults),
  ): WarehouseTransactionFormRawValue | PartialWithRequiredKeyOf<NewWarehouseTransactionFormRawValue> {
    return {
      ...warehouseTransaction,
      transactionDate: warehouseTransaction.transactionDate ? warehouseTransaction.transactionDate.format(DATE_TIME_FORMAT) : undefined,
      submissionTime: warehouseTransaction.submissionTime ? warehouseTransaction.submissionTime.format(DATE_TIME_FORMAT) : undefined,
      startEntryTime: warehouseTransaction.startEntryTime ? warehouseTransaction.startEntryTime.format(DATE_TIME_FORMAT) : undefined,
      finishedEntryTime: warehouseTransaction.finishedEntryTime
        ? warehouseTransaction.finishedEntryTime.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
