import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IActivity, NewActivity } from '../activity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IActivity for edit and NewActivityFormGroupInput for create.
 */
type ActivityFormGroupInput = IActivity | PartialWithRequiredKeyOf<NewActivity>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IActivity | NewActivity> = Omit<T, 'startDate' | 'endDate' | 'createdDate' | 'lastModifiedDate'> & {
  startDate?: string | null;
  endDate?: string | null;
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

type ActivityFormRawValue = FormValueOf<IActivity>;

type NewActivityFormRawValue = FormValueOf<NewActivity>;

type ActivityFormDefaults = Pick<NewActivity, 'id' | 'startDate' | 'endDate' | 'active' | 'createdDate' | 'lastModifiedDate'>;

type ActivityFormGroupContent = {
  id: FormControl<ActivityFormRawValue['id'] | NewActivity['id']>;
  uid: FormControl<ActivityFormRawValue['uid']>;
  code: FormControl<ActivityFormRawValue['code']>;
  name: FormControl<ActivityFormRawValue['name']>;
  startDate: FormControl<ActivityFormRawValue['startDate']>;
  endDate: FormControl<ActivityFormRawValue['endDate']>;
  active: FormControl<ActivityFormRawValue['active']>;
  createdBy: FormControl<ActivityFormRawValue['createdBy']>;
  createdDate: FormControl<ActivityFormRawValue['createdDate']>;
  lastModifiedBy: FormControl<ActivityFormRawValue['lastModifiedBy']>;
  lastModifiedDate: FormControl<ActivityFormRawValue['lastModifiedDate']>;
  project: FormControl<ActivityFormRawValue['project']>;
};

export type ActivityFormGroup = FormGroup<ActivityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ActivityFormService {
  createActivityFormGroup(activity: ActivityFormGroupInput = { id: null }): ActivityFormGroup {
    const activityRawValue = this.convertActivityToActivityRawValue({
      ...this.getFormDefaults(),
      ...activity,
    });
    return new FormGroup<ActivityFormGroupContent>({
      id: new FormControl(
        { value: activityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(activityRawValue.uid, {
        validators: [Validators.maxLength(11)],
      }),
      code: new FormControl(activityRawValue.code),
      name: new FormControl(activityRawValue.name),
      startDate: new FormControl(activityRawValue.startDate, {
        validators: [Validators.required],
      }),
      endDate: new FormControl(activityRawValue.endDate),
      active: new FormControl(activityRawValue.active),
      createdBy: new FormControl(activityRawValue.createdBy),
      createdDate: new FormControl(activityRawValue.createdDate),
      lastModifiedBy: new FormControl(activityRawValue.lastModifiedBy),
      lastModifiedDate: new FormControl(activityRawValue.lastModifiedDate),
      project: new FormControl(activityRawValue.project),
    });
  }

  getActivity(form: ActivityFormGroup): IActivity | NewActivity {
    return this.convertActivityRawValueToActivity(form.getRawValue() as ActivityFormRawValue | NewActivityFormRawValue);
  }

  resetForm(form: ActivityFormGroup, activity: ActivityFormGroupInput): void {
    const activityRawValue = this.convertActivityToActivityRawValue({ ...this.getFormDefaults(), ...activity });
    form.reset(
      {
        ...activityRawValue,
        id: { value: activityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ActivityFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
      endDate: currentTime,
      active: false,
      createdDate: currentTime,
      lastModifiedDate: currentTime,
    };
  }

  private convertActivityRawValueToActivity(rawActivity: ActivityFormRawValue | NewActivityFormRawValue): IActivity | NewActivity {
    return {
      ...rawActivity,
      startDate: dayjs(rawActivity.startDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawActivity.endDate, DATE_TIME_FORMAT),
      createdDate: dayjs(rawActivity.createdDate, DATE_TIME_FORMAT),
      lastModifiedDate: dayjs(rawActivity.lastModifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertActivityToActivityRawValue(
    activity: IActivity | (Partial<NewActivity> & ActivityFormDefaults),
  ): ActivityFormRawValue | PartialWithRequiredKeyOf<NewActivityFormRawValue> {
    return {
      ...activity,
      startDate: activity.startDate ? activity.startDate.format(DATE_TIME_FORMAT) : undefined,
      endDate: activity.endDate ? activity.endDate.format(DATE_TIME_FORMAT) : undefined,
      createdDate: activity.createdDate ? activity.createdDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifiedDate: activity.lastModifiedDate ? activity.lastModifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
