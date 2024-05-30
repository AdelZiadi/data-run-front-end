import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IChvSession, NewChvSession } from '../chv-session.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IChvSession for edit and NewChvSessionFormGroupInput for create.
 */
type ChvSessionFormGroupInput = IChvSession | PartialWithRequiredKeyOf<NewChvSession>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IChvSession | NewChvSession> = Omit<T, 'sessionDate' | 'startEntryTime' | 'createdDate' | 'lastModifiedDate'> & {
  sessionDate?: string | null;
  startEntryTime?: string | null;
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

type ChvSessionFormRawValue = FormValueOf<IChvSession>;

type NewChvSessionFormRawValue = FormValueOf<NewChvSession>;

type ChvSessionFormDefaults = Pick<NewChvSession, 'id' | 'sessionDate' | 'startEntryTime' | 'deleted' | 'createdDate' | 'lastModifiedDate'>;

type ChvSessionFormGroupContent = {
  id: FormControl<ChvSessionFormRawValue['id'] | NewChvSession['id']>;
  uid: FormControl<ChvSessionFormRawValue['uid']>;
  code: FormControl<ChvSessionFormRawValue['code']>;
  name: FormControl<ChvSessionFormRawValue['name']>;
  sessionDate: FormControl<ChvSessionFormRawValue['sessionDate']>;
  subject: FormControl<ChvSessionFormRawValue['subject']>;
  sessions: FormControl<ChvSessionFormRawValue['sessions']>;
  people: FormControl<ChvSessionFormRawValue['people']>;
  comment: FormControl<ChvSessionFormRawValue['comment']>;
  startEntryTime: FormControl<ChvSessionFormRawValue['startEntryTime']>;
  deleted: FormControl<ChvSessionFormRawValue['deleted']>;
  createdBy: FormControl<ChvSessionFormRawValue['createdBy']>;
  createdDate: FormControl<ChvSessionFormRawValue['createdDate']>;
  lastModifiedBy: FormControl<ChvSessionFormRawValue['lastModifiedBy']>;
  lastModifiedDate: FormControl<ChvSessionFormRawValue['lastModifiedDate']>;
  team: FormControl<ChvSessionFormRawValue['team']>;
};

export type ChvSessionFormGroup = FormGroup<ChvSessionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ChvSessionFormService {
  createChvSessionFormGroup(chvSession: ChvSessionFormGroupInput = { id: null }): ChvSessionFormGroup {
    const chvSessionRawValue = this.convertChvSessionToChvSessionRawValue({
      ...this.getFormDefaults(),
      ...chvSession,
    });
    return new FormGroup<ChvSessionFormGroupContent>({
      id: new FormControl(
        { value: chvSessionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(chvSessionRawValue.uid, {
        validators: [Validators.maxLength(11)],
      }),
      code: new FormControl(chvSessionRawValue.code),
      name: new FormControl(chvSessionRawValue.name),
      sessionDate: new FormControl(chvSessionRawValue.sessionDate, {
        validators: [Validators.required],
      }),
      subject: new FormControl(chvSessionRawValue.subject),
      sessions: new FormControl(chvSessionRawValue.sessions, {
        validators: [Validators.required],
      }),
      people: new FormControl(chvSessionRawValue.people, {
        validators: [Validators.required],
      }),
      comment: new FormControl(chvSessionRawValue.comment),
      startEntryTime: new FormControl(chvSessionRawValue.startEntryTime),
      deleted: new FormControl(chvSessionRawValue.deleted),
      createdBy: new FormControl(chvSessionRawValue.createdBy),
      createdDate: new FormControl(chvSessionRawValue.createdDate),
      lastModifiedBy: new FormControl(chvSessionRawValue.lastModifiedBy),
      lastModifiedDate: new FormControl(chvSessionRawValue.lastModifiedDate),
      team: new FormControl(chvSessionRawValue.team),
    });
  }

  getChvSession(form: ChvSessionFormGroup): IChvSession | NewChvSession {
    return this.convertChvSessionRawValueToChvSession(form.getRawValue() as ChvSessionFormRawValue | NewChvSessionFormRawValue);
  }

  resetForm(form: ChvSessionFormGroup, chvSession: ChvSessionFormGroupInput): void {
    const chvSessionRawValue = this.convertChvSessionToChvSessionRawValue({ ...this.getFormDefaults(), ...chvSession });
    form.reset(
      {
        ...chvSessionRawValue,
        id: { value: chvSessionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ChvSessionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      sessionDate: currentTime,
      startEntryTime: currentTime,
      deleted: false,
      createdDate: currentTime,
      lastModifiedDate: currentTime,
    };
  }

  private convertChvSessionRawValueToChvSession(
    rawChvSession: ChvSessionFormRawValue | NewChvSessionFormRawValue,
  ): IChvSession | NewChvSession {
    return {
      ...rawChvSession,
      sessionDate: dayjs(rawChvSession.sessionDate, DATE_TIME_FORMAT),
      startEntryTime: dayjs(rawChvSession.startEntryTime, DATE_TIME_FORMAT),
      createdDate: dayjs(rawChvSession.createdDate, DATE_TIME_FORMAT),
      lastModifiedDate: dayjs(rawChvSession.lastModifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertChvSessionToChvSessionRawValue(
    chvSession: IChvSession | (Partial<NewChvSession> & ChvSessionFormDefaults),
  ): ChvSessionFormRawValue | PartialWithRequiredKeyOf<NewChvSessionFormRawValue> {
    return {
      ...chvSession,
      sessionDate: chvSession.sessionDate ? chvSession.sessionDate.format(DATE_TIME_FORMAT) : undefined,
      startEntryTime: chvSession.startEntryTime ? chvSession.startEntryTime.format(DATE_TIME_FORMAT) : undefined,
      createdDate: chvSession.createdDate ? chvSession.createdDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifiedDate: chvSession.lastModifiedDate ? chvSession.lastModifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
