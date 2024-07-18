import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IChvRegister, NewChvRegister } from '../chv-register.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IChvRegister for edit and NewChvRegisterFormGroupInput for create.
 */
type ChvRegisterFormGroupInput = IChvRegister | PartialWithRequiredKeyOf<NewChvRegister>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IChvRegister | NewChvRegister> = Omit<T, 'visitDate' | 'startEntryTime' | 'finishedEntryTime'> & {
  visitDate?: string | null;
  startEntryTime?: string | null;
  finishedEntryTime?: string | null;
};

type ChvRegisterFormRawValue = FormValueOf<IChvRegister>;

type NewChvRegisterFormRawValue = FormValueOf<NewChvRegister>;

type ChvRegisterFormDefaults = Pick<NewChvRegister, 'id' | 'visitDate' | 'pregnant' | 'deleted' | 'startEntryTime' | 'finishedEntryTime'>;

type ChvRegisterFormGroupContent = {
  id: FormControl<ChvRegisterFormRawValue['id'] | NewChvRegister['id']>;
  uid: FormControl<ChvRegisterFormRawValue['uid']>;
  code: FormControl<ChvRegisterFormRawValue['code']>;
  name: FormControl<ChvRegisterFormRawValue['name']>;
  locationName: FormControl<ChvRegisterFormRawValue['locationName']>;
  age: FormControl<ChvRegisterFormRawValue['age']>;
  gender: FormControl<ChvRegisterFormRawValue['gender']>;
  visitDate: FormControl<ChvRegisterFormRawValue['visitDate']>;
  pregnant: FormControl<ChvRegisterFormRawValue['pregnant']>;
  testResult: FormControl<ChvRegisterFormRawValue['testResult']>;
  detectionType: FormControl<ChvRegisterFormRawValue['detectionType']>;
  severity: FormControl<ChvRegisterFormRawValue['severity']>;
  treatment: FormControl<ChvRegisterFormRawValue['treatment']>;
  deleted: FormControl<ChvRegisterFormRawValue['deleted']>;
  startEntryTime: FormControl<ChvRegisterFormRawValue['startEntryTime']>;
  finishedEntryTime: FormControl<ChvRegisterFormRawValue['finishedEntryTime']>;
  comment: FormControl<ChvRegisterFormRawValue['comment']>;
  status: FormControl<ChvRegisterFormRawValue['status']>;
  location: FormControl<ChvRegisterFormRawValue['location']>;
  activity: FormControl<ChvRegisterFormRawValue['activity']>;
  team: FormControl<ChvRegisterFormRawValue['team']>;
};

export type ChvRegisterFormGroup = FormGroup<ChvRegisterFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ChvRegisterFormService {
  createChvRegisterFormGroup(chvRegister: ChvRegisterFormGroupInput = { id: null }): ChvRegisterFormGroup {
    const chvRegisterRawValue = this.convertChvRegisterToChvRegisterRawValue({
      ...this.getFormDefaults(),
      ...chvRegister,
    });
    return new FormGroup<ChvRegisterFormGroupContent>({
      id: new FormControl(
        { value: chvRegisterRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(chvRegisterRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(chvRegisterRawValue.code),
      name: new FormControl(chvRegisterRawValue.name, {
        validators: [Validators.required],
      }),
      locationName: new FormControl(chvRegisterRawValue.locationName),
      age: new FormControl(chvRegisterRawValue.age),
      gender: new FormControl(chvRegisterRawValue.gender),
      visitDate: new FormControl(chvRegisterRawValue.visitDate, {
        validators: [Validators.required],
      }),
      pregnant: new FormControl(chvRegisterRawValue.pregnant),
      testResult: new FormControl(chvRegisterRawValue.testResult),
      detectionType: new FormControl(chvRegisterRawValue.detectionType),
      severity: new FormControl(chvRegisterRawValue.severity),
      treatment: new FormControl(chvRegisterRawValue.treatment),
      deleted: new FormControl(chvRegisterRawValue.deleted),
      startEntryTime: new FormControl(chvRegisterRawValue.startEntryTime),
      finishedEntryTime: new FormControl(chvRegisterRawValue.finishedEntryTime),
      comment: new FormControl(chvRegisterRawValue.comment, {
        validators: [Validators.maxLength(2000)],
      }),
      status: new FormControl(chvRegisterRawValue.status, {
        validators: [Validators.required],
      }),
      location: new FormControl(chvRegisterRawValue.location),
      activity: new FormControl(chvRegisterRawValue.activity, {
        validators: [Validators.required],
      }),
      team: new FormControl(chvRegisterRawValue.team, {
        validators: [Validators.required],
      }),
    });
  }

  getChvRegister(form: ChvRegisterFormGroup): IChvRegister | NewChvRegister {
    return this.convertChvRegisterRawValueToChvRegister(form.getRawValue() as ChvRegisterFormRawValue | NewChvRegisterFormRawValue);
  }

  resetForm(form: ChvRegisterFormGroup, chvRegister: ChvRegisterFormGroupInput): void {
    const chvRegisterRawValue = this.convertChvRegisterToChvRegisterRawValue({ ...this.getFormDefaults(), ...chvRegister });
    form.reset(
      {
        ...chvRegisterRawValue,
        id: { value: chvRegisterRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ChvRegisterFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      visitDate: currentTime,
      pregnant: false,
      deleted: false,
      startEntryTime: currentTime,
      finishedEntryTime: currentTime,
    };
  }

  private convertChvRegisterRawValueToChvRegister(
    rawChvRegister: ChvRegisterFormRawValue | NewChvRegisterFormRawValue,
  ): IChvRegister | NewChvRegister {
    return {
      ...rawChvRegister,
      visitDate: dayjs(rawChvRegister.visitDate, DATE_TIME_FORMAT),
      startEntryTime: dayjs(rawChvRegister.startEntryTime, DATE_TIME_FORMAT),
      finishedEntryTime: dayjs(rawChvRegister.finishedEntryTime, DATE_TIME_FORMAT),
    };
  }

  private convertChvRegisterToChvRegisterRawValue(
    chvRegister: IChvRegister | (Partial<NewChvRegister> & ChvRegisterFormDefaults),
  ): ChvRegisterFormRawValue | PartialWithRequiredKeyOf<NewChvRegisterFormRawValue> {
    return {
      ...chvRegister,
      visitDate: chvRegister.visitDate ? chvRegister.visitDate.format(DATE_TIME_FORMAT) : undefined,
      startEntryTime: chvRegister.startEntryTime ? chvRegister.startEntryTime.format(DATE_TIME_FORMAT) : undefined,
      finishedEntryTime: chvRegister.finishedEntryTime ? chvRegister.finishedEntryTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
