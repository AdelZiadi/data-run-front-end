import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

type ProgressStatusFormDefaults = Pick<NewProgressStatus, 'id'>;

type ProgressStatusFormGroupContent = {
  id: FormControl<IProgressStatus['id'] | NewProgressStatus['id']>;
  uid: FormControl<IProgressStatus['uid']>;
  code: FormControl<IProgressStatus['code']>;
  name: FormControl<IProgressStatus['name']>;
};

export type ProgressStatusFormGroup = FormGroup<ProgressStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProgressStatusFormService {
  createProgressStatusFormGroup(progressStatus: ProgressStatusFormGroupInput = { id: null }): ProgressStatusFormGroup {
    const progressStatusRawValue = {
      ...this.getFormDefaults(),
      ...progressStatus,
    };
    return new FormGroup<ProgressStatusFormGroupContent>({
      id: new FormControl(
        { value: progressStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(progressStatusRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(progressStatusRawValue.code),
      name: new FormControl(progressStatusRawValue.name),
    });
  }

  getProgressStatus(form: ProgressStatusFormGroup): IProgressStatus | NewProgressStatus {
    return form.getRawValue() as IProgressStatus | NewProgressStatus;
  }

  resetForm(form: ProgressStatusFormGroup, progressStatus: ProgressStatusFormGroupInput): void {
    const progressStatusRawValue = { ...this.getFormDefaults(), ...progressStatus };
    form.reset(
      {
        ...progressStatusRawValue,
        id: { value: progressStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProgressStatusFormDefaults {
    return {
      id: null,
    };
  }
}
