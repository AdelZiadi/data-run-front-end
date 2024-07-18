import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

type TeamFormDefaults = Pick<NewTeam, 'id' | 'disabled' | 'deleteClientData'>;

type TeamFormGroupContent = {
  id: FormControl<ITeam['id'] | NewTeam['id']>;
  uid: FormControl<ITeam['uid']>;
  code: FormControl<ITeam['code']>;
  name: FormControl<ITeam['name']>;
  description: FormControl<ITeam['description']>;
  mobile: FormControl<ITeam['mobile']>;
  workers: FormControl<ITeam['workers']>;
  mobility: FormControl<ITeam['mobility']>;
  teamType: FormControl<ITeam['teamType']>;
  disabled: FormControl<ITeam['disabled']>;
  deleteClientData: FormControl<ITeam['deleteClientData']>;
  activity: FormControl<ITeam['activity']>;
  operationRoom: FormControl<ITeam['operationRoom']>;
  warehouse: FormControl<ITeam['warehouse']>;
  userInfo: FormControl<ITeam['userInfo']>;
};

export type TeamFormGroup = FormGroup<TeamFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TeamFormService {
  createTeamFormGroup(team: TeamFormGroupInput = { id: null }): TeamFormGroup {
    const teamRawValue = {
      ...this.getFormDefaults(),
      ...team,
    };
    return new FormGroup<TeamFormGroupContent>({
      id: new FormControl(
        { value: teamRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(teamRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(teamRawValue.code, {
        validators: [Validators.required],
      }),
      name: new FormControl(teamRawValue.name),
      description: new FormControl(teamRawValue.description),
      mobile: new FormControl(teamRawValue.mobile),
      workers: new FormControl(teamRawValue.workers),
      mobility: new FormControl(teamRawValue.mobility),
      teamType: new FormControl(teamRawValue.teamType, {
        validators: [Validators.required],
      }),
      disabled: new FormControl(teamRawValue.disabled),
      deleteClientData: new FormControl(teamRawValue.deleteClientData),
      activity: new FormControl(teamRawValue.activity),
      operationRoom: new FormControl(teamRawValue.operationRoom),
      warehouse: new FormControl(teamRawValue.warehouse),
      userInfo: new FormControl(teamRawValue.userInfo),
    });
  }

  getTeam(form: TeamFormGroup): ITeam | NewTeam {
    return form.getRawValue() as ITeam | NewTeam;
  }

  resetForm(form: TeamFormGroup, team: TeamFormGroupInput): void {
    const teamRawValue = { ...this.getFormDefaults(), ...team };
    form.reset(
      {
        ...teamRawValue,
        id: { value: teamRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TeamFormDefaults {
    return {
      id: null,
      disabled: false,
      deleteClientData: false,
    };
  }
}
