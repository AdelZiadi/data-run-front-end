import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAssignment, NewAssignment } from '../assignment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAssignment for edit and NewAssignmentFormGroupInput for create.
 */
type AssignmentFormGroupInput = IAssignment | PartialWithRequiredKeyOf<NewAssignment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAssignment | NewAssignment> = Omit<T, 'startDate'> & {
  startDate?: string | null;
};

type AssignmentFormRawValue = FormValueOf<IAssignment>;

type NewAssignmentFormRawValue = FormValueOf<NewAssignment>;

type AssignmentFormDefaults = Pick<NewAssignment, 'id' | 'startDate'>;

type AssignmentFormGroupContent = {
  id: FormControl<AssignmentFormRawValue['id'] | NewAssignment['id']>;
  uid: FormControl<AssignmentFormRawValue['uid']>;
  code: FormControl<AssignmentFormRawValue['code']>;
  phaseNo: FormControl<AssignmentFormRawValue['phaseNo']>;
  districtCode: FormControl<AssignmentFormRawValue['districtCode']>;
  gov: FormControl<AssignmentFormRawValue['gov']>;
  district: FormControl<AssignmentFormRawValue['district']>;
  subdistrict: FormControl<AssignmentFormRawValue['subdistrict']>;
  village: FormControl<AssignmentFormRawValue['village']>;
  subvillage: FormControl<AssignmentFormRawValue['subvillage']>;
  name: FormControl<AssignmentFormRawValue['name']>;
  dayId: FormControl<AssignmentFormRawValue['dayId']>;
  population: FormControl<AssignmentFormRawValue['population']>;
  itnsPlanned: FormControl<AssignmentFormRawValue['itnsPlanned']>;
  targetType: FormControl<AssignmentFormRawValue['targetType']>;
  longitude: FormControl<AssignmentFormRawValue['longitude']>;
  latitude: FormControl<AssignmentFormRawValue['latitude']>;
  startDate: FormControl<AssignmentFormRawValue['startDate']>;
  activity: FormControl<AssignmentFormRawValue['activity']>;
  organisationUnit: FormControl<AssignmentFormRawValue['organisationUnit']>;
  team: FormControl<AssignmentFormRawValue['team']>;
  warehouse: FormControl<AssignmentFormRawValue['warehouse']>;
};

export type AssignmentFormGroup = FormGroup<AssignmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssignmentFormService {
  createAssignmentFormGroup(assignment: AssignmentFormGroupInput = { id: null }): AssignmentFormGroup {
    const assignmentRawValue = this.convertAssignmentToAssignmentRawValue({
      ...this.getFormDefaults(),
      ...assignment,
    });
    return new FormGroup<AssignmentFormGroupContent>({
      id: new FormControl(
        { value: assignmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(assignmentRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(assignmentRawValue.code),
      phaseNo: new FormControl(assignmentRawValue.phaseNo),
      districtCode: new FormControl(assignmentRawValue.districtCode),
      gov: new FormControl(assignmentRawValue.gov),
      district: new FormControl(assignmentRawValue.district),
      subdistrict: new FormControl(assignmentRawValue.subdistrict),
      village: new FormControl(assignmentRawValue.village),
      subvillage: new FormControl(assignmentRawValue.subvillage),
      name: new FormControl(assignmentRawValue.name),
      dayId: new FormControl(assignmentRawValue.dayId),
      population: new FormControl(assignmentRawValue.population),
      itnsPlanned: new FormControl(assignmentRawValue.itnsPlanned),
      targetType: new FormControl(assignmentRawValue.targetType),
      longitude: new FormControl(assignmentRawValue.longitude),
      latitude: new FormControl(assignmentRawValue.latitude),
      startDate: new FormControl(assignmentRawValue.startDate),
      activity: new FormControl(assignmentRawValue.activity),
      organisationUnit: new FormControl(assignmentRawValue.organisationUnit),
      team: new FormControl(assignmentRawValue.team, {
        validators: [Validators.required],
      }),
      warehouse: new FormControl(assignmentRawValue.warehouse),
    });
  }

  getAssignment(form: AssignmentFormGroup): IAssignment | NewAssignment {
    return this.convertAssignmentRawValueToAssignment(form.getRawValue() as AssignmentFormRawValue | NewAssignmentFormRawValue);
  }

  resetForm(form: AssignmentFormGroup, assignment: AssignmentFormGroupInput): void {
    const assignmentRawValue = this.convertAssignmentToAssignmentRawValue({ ...this.getFormDefaults(), ...assignment });
    form.reset(
      {
        ...assignmentRawValue,
        id: { value: assignmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AssignmentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
    };
  }

  private convertAssignmentRawValueToAssignment(
    rawAssignment: AssignmentFormRawValue | NewAssignmentFormRawValue,
  ): IAssignment | NewAssignment {
    return {
      ...rawAssignment,
      startDate: dayjs(rawAssignment.startDate, DATE_TIME_FORMAT),
    };
  }

  private convertAssignmentToAssignmentRawValue(
    assignment: IAssignment | (Partial<NewAssignment> & AssignmentFormDefaults),
  ): AssignmentFormRawValue | PartialWithRequiredKeyOf<NewAssignmentFormRawValue> {
    return {
      ...assignment,
      startDate: assignment.startDate ? assignment.startDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
