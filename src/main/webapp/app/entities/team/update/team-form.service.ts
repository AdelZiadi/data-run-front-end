import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITeam, NewTeam } from '../team.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITeam for edit and NewTeamFormGroupInput for create.
 */
type TeamFormGroupInput = ITeam | PartialWithRequiredKeyOf<NewTeam>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITeam | NewTeam> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

type TeamFormRawValue = FormValueOf<ITeam>;

type NewTeamFormRawValue = FormValueOf<NewTeam>;

type TeamFormDefaults = Pick<NewTeam, 'id' | 'createdDate' | 'lastModifiedDate'>;

type TeamFormGroupContent = {
  id: FormControl<TeamFormRawValue['id'] | NewTeam['id']>;
  uid: FormControl<TeamFormRawValue['uid']>;
  code: FormControl<TeamFormRawValue['code']>;
  name: FormControl<TeamFormRawValue['name']>;
  description: FormControl<TeamFormRawValue['description']>;
  mobile: FormControl<TeamFormRawValue['mobile']>;
  workers: FormControl<TeamFormRawValue['workers']>;
  mobility: FormControl<TeamFormRawValue['mobility']>;
  createdBy: FormControl<TeamFormRawValue['createdBy']>;
  createdDate: FormControl<TeamFormRawValue['createdDate']>;
  lastModifiedBy: FormControl<TeamFormRawValue['lastModifiedBy']>;
  lastModifiedDate: FormControl<TeamFormRawValue['lastModifiedDate']>;
  activity: FormControl<TeamFormRawValue['activity']>;
  operationRoom: FormControl<TeamFormRawValue['operationRoom']>;
  warehouse: FormControl<TeamFormRawValue['warehouse']>;
  userInfo: FormControl<TeamFormRawValue['userInfo']>;
};

export type TeamFormGroup = FormGroup<TeamFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TeamFormService {
  createTeamFormGroup(team: TeamFormGroupInput = { id: null }): TeamFormGroup {
    const teamRawValue = this.convertTeamToTeamRawValue({
      ...this.getFormDefaults(),
      ...team,
    });
    return new FormGroup<TeamFormGroupContent>({
      id: new FormControl(
        { value: teamRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(teamRawValue.uid, {
        validators: [Validators.maxLength(11)],
      }),
      code: new FormControl(teamRawValue.code, {
        validators: [Validators.required],
      }),
      name: new FormControl(teamRawValue.name),
      description: new FormControl(teamRawValue.description),
      mobile: new FormControl(teamRawValue.mobile),
      workers: new FormControl(teamRawValue.workers),
      mobility: new FormControl(teamRawValue.mobility),
      createdBy: new FormControl(teamRawValue.createdBy),
      createdDate: new FormControl(teamRawValue.createdDate),
      lastModifiedBy: new FormControl(teamRawValue.lastModifiedBy),
      lastModifiedDate: new FormControl(teamRawValue.lastModifiedDate),
      activity: new FormControl(teamRawValue.activity),
      operationRoom: new FormControl(teamRawValue.operationRoom),
      warehouse: new FormControl(teamRawValue.warehouse),
      userInfo: new FormControl(teamRawValue.userInfo),
    });
  }

  getTeam(form: TeamFormGroup): ITeam | NewTeam {
    return this.convertTeamRawValueToTeam(form.getRawValue() as TeamFormRawValue | NewTeamFormRawValue);
  }

  resetForm(form: TeamFormGroup, team: TeamFormGroupInput): void {
    const teamRawValue = this.convertTeamToTeamRawValue({ ...this.getFormDefaults(), ...team });
    form.reset(
      {
        ...teamRawValue,
        id: { value: teamRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TeamFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      lastModifiedDate: currentTime,
    };
  }

  private convertTeamRawValueToTeam(rawTeam: TeamFormRawValue | NewTeamFormRawValue): ITeam | NewTeam {
    return {
      ...rawTeam,
      createdDate: dayjs(rawTeam.createdDate, DATE_TIME_FORMAT),
      lastModifiedDate: dayjs(rawTeam.lastModifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertTeamToTeamRawValue(
    team: ITeam | (Partial<NewTeam> & TeamFormDefaults),
  ): TeamFormRawValue | PartialWithRequiredKeyOf<NewTeamFormRawValue> {
    return {
      ...team,
      createdDate: team.createdDate ? team.createdDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifiedDate: team.lastModifiedDate ? team.lastModifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
