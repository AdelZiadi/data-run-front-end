import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPatientInfo, NewPatientInfo } from '../patient-info.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPatientInfo for edit and NewPatientInfoFormGroupInput for create.
 */
type PatientInfoFormGroupInput = IPatientInfo | PartialWithRequiredKeyOf<NewPatientInfo>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPatientInfo | NewPatientInfo> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

type PatientInfoFormRawValue = FormValueOf<IPatientInfo>;

type NewPatientInfoFormRawValue = FormValueOf<NewPatientInfo>;

type PatientInfoFormDefaults = Pick<NewPatientInfo, 'id' | 'createdDate' | 'lastModifiedDate'>;

type PatientInfoFormGroupContent = {
  id: FormControl<PatientInfoFormRawValue['id'] | NewPatientInfo['id']>;
  uid: FormControl<PatientInfoFormRawValue['uid']>;
  code: FormControl<PatientInfoFormRawValue['code']>;
  name: FormControl<PatientInfoFormRawValue['name']>;
  age: FormControl<PatientInfoFormRawValue['age']>;
  gender: FormControl<PatientInfoFormRawValue['gender']>;
  createdBy: FormControl<PatientInfoFormRawValue['createdBy']>;
  createdDate: FormControl<PatientInfoFormRawValue['createdDate']>;
  lastModifiedBy: FormControl<PatientInfoFormRawValue['lastModifiedBy']>;
  lastModifiedDate: FormControl<PatientInfoFormRawValue['lastModifiedDate']>;
  location: FormControl<PatientInfoFormRawValue['location']>;
};

export type PatientInfoFormGroup = FormGroup<PatientInfoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PatientInfoFormService {
  createPatientInfoFormGroup(patientInfo: PatientInfoFormGroupInput = { id: null }): PatientInfoFormGroup {
    const patientInfoRawValue = this.convertPatientInfoToPatientInfoRawValue({
      ...this.getFormDefaults(),
      ...patientInfo,
    });
    return new FormGroup<PatientInfoFormGroupContent>({
      id: new FormControl(
        { value: patientInfoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(patientInfoRawValue.uid, {
        validators: [Validators.maxLength(11)],
      }),
      code: new FormControl(patientInfoRawValue.code),
      name: new FormControl(patientInfoRawValue.name),
      age: new FormControl(patientInfoRawValue.age, {
        validators: [Validators.min(1), Validators.max(140)],
      }),
      gender: new FormControl(patientInfoRawValue.gender),
      createdBy: new FormControl(patientInfoRawValue.createdBy),
      createdDate: new FormControl(patientInfoRawValue.createdDate),
      lastModifiedBy: new FormControl(patientInfoRawValue.lastModifiedBy),
      lastModifiedDate: new FormControl(patientInfoRawValue.lastModifiedDate),
      location: new FormControl(patientInfoRawValue.location),
    });
  }

  getPatientInfo(form: PatientInfoFormGroup): IPatientInfo | NewPatientInfo {
    return this.convertPatientInfoRawValueToPatientInfo(form.getRawValue() as PatientInfoFormRawValue | NewPatientInfoFormRawValue);
  }

  resetForm(form: PatientInfoFormGroup, patientInfo: PatientInfoFormGroupInput): void {
    const patientInfoRawValue = this.convertPatientInfoToPatientInfoRawValue({ ...this.getFormDefaults(), ...patientInfo });
    form.reset(
      {
        ...patientInfoRawValue,
        id: { value: patientInfoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PatientInfoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      lastModifiedDate: currentTime,
    };
  }

  private convertPatientInfoRawValueToPatientInfo(
    rawPatientInfo: PatientInfoFormRawValue | NewPatientInfoFormRawValue,
  ): IPatientInfo | NewPatientInfo {
    return {
      ...rawPatientInfo,
      createdDate: dayjs(rawPatientInfo.createdDate, DATE_TIME_FORMAT),
      lastModifiedDate: dayjs(rawPatientInfo.lastModifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertPatientInfoToPatientInfoRawValue(
    patientInfo: IPatientInfo | (Partial<NewPatientInfo> & PatientInfoFormDefaults),
  ): PatientInfoFormRawValue | PartialWithRequiredKeyOf<NewPatientInfoFormRawValue> {
    return {
      ...patientInfo,
      createdDate: patientInfo.createdDate ? patientInfo.createdDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifiedDate: patientInfo.lastModifiedDate ? patientInfo.lastModifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
