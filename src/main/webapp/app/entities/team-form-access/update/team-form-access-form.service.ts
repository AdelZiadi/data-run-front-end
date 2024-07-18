import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITeamFormAccess, NewTeamFormAccess } from '../team-form-access.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITeamFormAccess for edit and NewTeamFormAccessFormGroupInput for create.
 */
type TeamFormAccessFormGroupInput = ITeamFormAccess | PartialWithRequiredKeyOf<NewTeamFormAccess>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITeamFormAccess | NewTeamFormAccess> = Omit<T, 'sessionDate' | 'startEntryTime' | 'finishedEntryTime'> & {
  sessionDate?: string | null;
  startEntryTime?: string | null;
  finishedEntryTime?: string | null;
};

type TeamFormAccessFormRawValue = FormValueOf<ITeamFormAccess>;

type NewTeamFormAccessFormRawValue = FormValueOf<NewTeamFormAccess>;

type TeamFormAccessFormDefaults = Pick<NewTeamFormAccess, 'id' | 'sessionDate' | 'deleted' | 'startEntryTime' | 'finishedEntryTime'>;

type TeamFormAccessFormGroupContent = {
  id: FormControl<TeamFormAccessFormRawValue['id'] | NewTeamFormAccess['id']>;
  uid: FormControl<TeamFormAccessFormRawValue['uid']>;
  code: FormControl<TeamFormAccessFormRawValue['code']>;
  name: FormControl<TeamFormAccessFormRawValue['name']>;
  sessionDate: FormControl<TeamFormAccessFormRawValue['sessionDate']>;
  subject: FormControl<TeamFormAccessFormRawValue['subject']>;
  sessions: FormControl<TeamFormAccessFormRawValue['sessions']>;
  people: FormControl<TeamFormAccessFormRawValue['people']>;
  comment: FormControl<TeamFormAccessFormRawValue['comment']>;
  deleted: FormControl<TeamFormAccessFormRawValue['deleted']>;
  startEntryTime: FormControl<TeamFormAccessFormRawValue['startEntryTime']>;
  finishedEntryTime: FormControl<TeamFormAccessFormRawValue['finishedEntryTime']>;
  status: FormControl<TeamFormAccessFormRawValue['status']>;
};

export type TeamFormAccessFormGroup = FormGroup<TeamFormAccessFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TeamFormAccessFormService {
  createTeamFormAccessFormGroup(teamFormAccess: TeamFormAccessFormGroupInput = { id: null }): TeamFormAccessFormGroup {
    const teamFormAccessRawValue = this.convertTeamFormAccessToTeamFormAccessRawValue({
      ...this.getFormDefaults(),
      ...teamFormAccess,
    });
    return new FormGroup<TeamFormAccessFormGroupContent>({
      id: new FormControl(
        { value: teamFormAccessRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(teamFormAccessRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(teamFormAccessRawValue.code),
      name: new FormControl(teamFormAccessRawValue.name),
      sessionDate: new FormControl(teamFormAccessRawValue.sessionDate, {
        validators: [Validators.required],
      }),
      subject: new FormControl(teamFormAccessRawValue.subject),
      sessions: new FormControl(teamFormAccessRawValue.sessions, {
        validators: [Validators.required],
      }),
      people: new FormControl(teamFormAccessRawValue.people, {
        validators: [Validators.required],
      }),
      comment: new FormControl(teamFormAccessRawValue.comment),
      deleted: new FormControl(teamFormAccessRawValue.deleted),
      startEntryTime: new FormControl(teamFormAccessRawValue.startEntryTime),
      finishedEntryTime: new FormControl(teamFormAccessRawValue.finishedEntryTime),
      status: new FormControl(teamFormAccessRawValue.status),
    });
  }

  getTeamFormAccess(form: TeamFormAccessFormGroup): ITeamFormAccess | NewTeamFormAccess {
    return this.convertTeamFormAccessRawValueToTeamFormAccess(
      form.getRawValue() as TeamFormAccessFormRawValue | NewTeamFormAccessFormRawValue,
    );
  }

  resetForm(form: TeamFormAccessFormGroup, teamFormAccess: TeamFormAccessFormGroupInput): void {
    const teamFormAccessRawValue = this.convertTeamFormAccessToTeamFormAccessRawValue({ ...this.getFormDefaults(), ...teamFormAccess });
    form.reset(
      {
        ...teamFormAccessRawValue,
        id: { value: teamFormAccessRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TeamFormAccessFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      sessionDate: currentTime,
      deleted: false,
      startEntryTime: currentTime,
      finishedEntryTime: currentTime,
    };
  }

  private convertTeamFormAccessRawValueToTeamFormAccess(
    rawTeamFormAccess: TeamFormAccessFormRawValue | NewTeamFormAccessFormRawValue,
  ): ITeamFormAccess | NewTeamFormAccess {
    return {
      ...rawTeamFormAccess,
      sessionDate: dayjs(rawTeamFormAccess.sessionDate, DATE_TIME_FORMAT),
      startEntryTime: dayjs(rawTeamFormAccess.startEntryTime, DATE_TIME_FORMAT),
      finishedEntryTime: dayjs(rawTeamFormAccess.finishedEntryTime, DATE_TIME_FORMAT),
    };
  }

  private convertTeamFormAccessToTeamFormAccessRawValue(
    teamFormAccess: ITeamFormAccess | (Partial<NewTeamFormAccess> & TeamFormAccessFormDefaults),
  ): TeamFormAccessFormRawValue | PartialWithRequiredKeyOf<NewTeamFormAccessFormRawValue> {
    return {
      ...teamFormAccess,
      sessionDate: teamFormAccess.sessionDate ? teamFormAccess.sessionDate.format(DATE_TIME_FORMAT) : undefined,
      startEntryTime: teamFormAccess.startEntryTime ? teamFormAccess.startEntryTime.format(DATE_TIME_FORMAT) : undefined,
      finishedEntryTime: teamFormAccess.finishedEntryTime ? teamFormAccess.finishedEntryTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
