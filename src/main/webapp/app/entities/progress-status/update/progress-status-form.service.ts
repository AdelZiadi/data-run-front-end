import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProgressStatus, NewProgressStatus } from '../progress-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProgressStatus for edit and NewProgressStatusFormGroupInput for create.
 */
type ProgressStatusFormGroupInput = IProgressStatus | PartialWithRequiredKeyOf<NewProgressStatus>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IProgressStatus | NewProgressStatus> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

type ProgressStatusFormRawValue = FormValueOf<IProgressStatus>;

type NewProgressStatusFormRawValue = FormValueOf<NewProgressStatus>;

type ProgressStatusFormDefaults = Pick<NewProgressStatus, 'id' | 'createdDate' | 'lastModifiedDate'>;

type ProgressStatusFormGroupContent = {
  id: FormControl<ProgressStatusFormRawValue['id'] | NewProgressStatus['id']>;
  uid: FormControl<ProgressStatusFormRawValue['uid']>;
  code: FormControl<ProgressStatusFormRawValue['code']>;
  name: FormControl<ProgressStatusFormRawValue['name']>;
  createdBy: FormControl<ProgressStatusFormRawValue['createdBy']>;
  createdDate: FormControl<ProgressStatusFormRawValue['createdDate']>;
  lastModifiedBy: FormControl<ProgressStatusFormRawValue['lastModifiedBy']>;
  lastModifiedDate: FormControl<ProgressStatusFormRawValue['lastModifiedDate']>;
};

export type ProgressStatusFormGroup = FormGroup<ProgressStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProgressStatusFormService {
  createProgressStatusFormGroup(progressStatus: ProgressStatusFormGroupInput = { id: null }): ProgressStatusFormGroup {
    const progressStatusRawValue = this.convertProgressStatusToProgressStatusRawValue({
      ...this.getFormDefaults(),
      ...progressStatus,
    });
    return new FormGroup<ProgressStatusFormGroupContent>({
      id: new FormControl(
        { value: progressStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(progressStatusRawValue.uid, {
        validators: [Validators.maxLength(11)],
      }),
      code: new FormControl(progressStatusRawValue.code),
      name: new FormControl(progressStatusRawValue.name),
      createdBy: new FormControl(progressStatusRawValue.createdBy),
      createdDate: new FormControl(progressStatusRawValue.createdDate),
      lastModifiedBy: new FormControl(progressStatusRawValue.lastModifiedBy),
      lastModifiedDate: new FormControl(progressStatusRawValue.lastModifiedDate),
    });
  }

  getProgressStatus(form: ProgressStatusFormGroup): IProgressStatus | NewProgressStatus {
    return this.convertProgressStatusRawValueToProgressStatus(
      form.getRawValue() as ProgressStatusFormRawValue | NewProgressStatusFormRawValue,
    );
  }

  resetForm(form: ProgressStatusFormGroup, progressStatus: ProgressStatusFormGroupInput): void {
    const progressStatusRawValue = this.convertProgressStatusToProgressStatusRawValue({ ...this.getFormDefaults(), ...progressStatus });
    form.reset(
      {
        ...progressStatusRawValue,
        id: { value: progressStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProgressStatusFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      lastModifiedDate: currentTime,
    };
  }

  private convertProgressStatusRawValueToProgressStatus(
    rawProgressStatus: ProgressStatusFormRawValue | NewProgressStatusFormRawValue,
  ): IProgressStatus | NewProgressStatus {
    return {
      ...rawProgressStatus,
      createdDate: dayjs(rawProgressStatus.createdDate, DATE_TIME_FORMAT),
      lastModifiedDate: dayjs(rawProgressStatus.lastModifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertProgressStatusToProgressStatusRawValue(
    progressStatus: IProgressStatus | (Partial<NewProgressStatus> & ProgressStatusFormDefaults),
  ): ProgressStatusFormRawValue | PartialWithRequiredKeyOf<NewProgressStatusFormRawValue> {
    return {
      ...progressStatus,
      createdDate: progressStatus.createdDate ? progressStatus.createdDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifiedDate: progressStatus.lastModifiedDate ? progressStatus.lastModifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
