import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IItnsVillage, NewItnsVillage } from '../itns-village.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IItnsVillage for edit and NewItnsVillageFormGroupInput for create.
 */
type ItnsVillageFormGroupInput = IItnsVillage | PartialWithRequiredKeyOf<NewItnsVillage>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IItnsVillage | NewItnsVillage> = Omit<
  T,
  'workDayDate' | 'locationCaptureTime' | 'submissionTime' | 'startEntryTime' | 'finishedEntryTime'
> & {
  workDayDate?: string | null;
  locationCaptureTime?: string | null;
  submissionTime?: string | null;
  startEntryTime?: string | null;
  finishedEntryTime?: string | null;
};

type ItnsVillageFormRawValue = FormValueOf<IItnsVillage>;

type NewItnsVillageFormRawValue = FormValueOf<NewItnsVillage>;

type ItnsVillageFormDefaults = Pick<
  NewItnsVillage,
  'id' | 'workDayDate' | 'locationCaptureTime' | 'submissionTime' | 'startEntryTime' | 'finishedEntryTime' | 'deleted'
>;

type ItnsVillageFormGroupContent = {
  id: FormControl<ItnsVillageFormRawValue['id'] | NewItnsVillage['id']>;
  uid: FormControl<ItnsVillageFormRawValue['uid']>;
  code: FormControl<ItnsVillageFormRawValue['code']>;
  name: FormControl<ItnsVillageFormRawValue['name']>;
  submissionUuid: FormControl<ItnsVillageFormRawValue['submissionUuid']>;
  submissionId: FormControl<ItnsVillageFormRawValue['submissionId']>;
  workDayDate: FormControl<ItnsVillageFormRawValue['workDayDate']>;
  surveytype: FormControl<ItnsVillageFormRawValue['surveytype']>;
  otherReasonComment: FormControl<ItnsVillageFormRawValue['otherReasonComment']>;
  reasonNotcomplete: FormControl<ItnsVillageFormRawValue['reasonNotcomplete']>;
  settlement: FormControl<ItnsVillageFormRawValue['settlement']>;
  settlementName: FormControl<ItnsVillageFormRawValue['settlementName']>;
  tlCommenet: FormControl<ItnsVillageFormRawValue['tlCommenet']>;
  timeSpentHours: FormControl<ItnsVillageFormRawValue['timeSpentHours']>;
  timeSpentMinutes: FormControl<ItnsVillageFormRawValue['timeSpentMinutes']>;
  difficulties: FormControl<ItnsVillageFormRawValue['difficulties']>;
  locationCaptured: FormControl<ItnsVillageFormRawValue['locationCaptured']>;
  locationCaptureTime: FormControl<ItnsVillageFormRawValue['locationCaptureTime']>;
  hoProof: FormControl<ItnsVillageFormRawValue['hoProof']>;
  hoProofUrl: FormControl<ItnsVillageFormRawValue['hoProofUrl']>;
  submissionTime: FormControl<ItnsVillageFormRawValue['submissionTime']>;
  untargetingOtherSpecify: FormControl<ItnsVillageFormRawValue['untargetingOtherSpecify']>;
  otherVillageName: FormControl<ItnsVillageFormRawValue['otherVillageName']>;
  otherVillageCode: FormControl<ItnsVillageFormRawValue['otherVillageCode']>;
  otherTeamNo: FormControl<ItnsVillageFormRawValue['otherTeamNo']>;
  startEntryTime: FormControl<ItnsVillageFormRawValue['startEntryTime']>;
  finishedEntryTime: FormControl<ItnsVillageFormRawValue['finishedEntryTime']>;
  deleted: FormControl<ItnsVillageFormRawValue['deleted']>;
  status: FormControl<ItnsVillageFormRawValue['status']>;
  progressStatus: FormControl<ItnsVillageFormRawValue['progressStatus']>;
  team: FormControl<ItnsVillageFormRawValue['team']>;
  assignment: FormControl<ItnsVillageFormRawValue['assignment']>;
  activity: FormControl<ItnsVillageFormRawValue['activity']>;
};

export type ItnsVillageFormGroup = FormGroup<ItnsVillageFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ItnsVillageFormService {
  createItnsVillageFormGroup(itnsVillage: ItnsVillageFormGroupInput = { id: null }): ItnsVillageFormGroup {
    const itnsVillageRawValue = this.convertItnsVillageToItnsVillageRawValue({
      ...this.getFormDefaults(),
      ...itnsVillage,
    });
    return new FormGroup<ItnsVillageFormGroupContent>({
      id: new FormControl(
        { value: itnsVillageRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(itnsVillageRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(itnsVillageRawValue.code),
      name: new FormControl(itnsVillageRawValue.name),
      submissionUuid: new FormControl(itnsVillageRawValue.submissionUuid, {
        validators: [Validators.required],
      }),
      submissionId: new FormControl(itnsVillageRawValue.submissionId, {
        validators: [Validators.required],
      }),
      workDayDate: new FormControl(itnsVillageRawValue.workDayDate),
      surveytype: new FormControl(itnsVillageRawValue.surveytype),
      otherReasonComment: new FormControl(itnsVillageRawValue.otherReasonComment, {
        validators: [Validators.maxLength(2000)],
      }),
      reasonNotcomplete: new FormControl(itnsVillageRawValue.reasonNotcomplete, {
        validators: [Validators.maxLength(2000)],
      }),
      settlement: new FormControl(itnsVillageRawValue.settlement),
      settlementName: new FormControl(itnsVillageRawValue.settlementName, {
        validators: [Validators.maxLength(2000)],
      }),
      tlCommenet: new FormControl(itnsVillageRawValue.tlCommenet, {
        validators: [Validators.maxLength(2000)],
      }),
      timeSpentHours: new FormControl(itnsVillageRawValue.timeSpentHours),
      timeSpentMinutes: new FormControl(itnsVillageRawValue.timeSpentMinutes),
      difficulties: new FormControl(itnsVillageRawValue.difficulties, {
        validators: [Validators.maxLength(2000)],
      }),
      locationCaptured: new FormControl(itnsVillageRawValue.locationCaptured),
      locationCaptureTime: new FormControl(itnsVillageRawValue.locationCaptureTime),
      hoProof: new FormControl(itnsVillageRawValue.hoProof),
      hoProofUrl: new FormControl(itnsVillageRawValue.hoProofUrl),
      submissionTime: new FormControl(itnsVillageRawValue.submissionTime),
      untargetingOtherSpecify: new FormControl(itnsVillageRawValue.untargetingOtherSpecify),
      otherVillageName: new FormControl(itnsVillageRawValue.otherVillageName, {
        validators: [Validators.maxLength(2000)],
      }),
      otherVillageCode: new FormControl(itnsVillageRawValue.otherVillageCode, {
        validators: [Validators.maxLength(2000)],
      }),
      otherTeamNo: new FormControl(itnsVillageRawValue.otherTeamNo),
      startEntryTime: new FormControl(itnsVillageRawValue.startEntryTime),
      finishedEntryTime: new FormControl(itnsVillageRawValue.finishedEntryTime),
      deleted: new FormControl(itnsVillageRawValue.deleted),
      status: new FormControl(itnsVillageRawValue.status, {
        validators: [Validators.required],
      }),
      progressStatus: new FormControl(itnsVillageRawValue.progressStatus),
      team: new FormControl(itnsVillageRawValue.team, {
        validators: [Validators.required],
      }),
      assignment: new FormControl(itnsVillageRawValue.assignment, {
        validators: [Validators.required],
      }),
      activity: new FormControl(itnsVillageRawValue.activity, {
        validators: [Validators.required],
      }),
    });
  }

  getItnsVillage(form: ItnsVillageFormGroup): IItnsVillage | NewItnsVillage {
    return this.convertItnsVillageRawValueToItnsVillage(form.getRawValue() as ItnsVillageFormRawValue | NewItnsVillageFormRawValue);
  }

  resetForm(form: ItnsVillageFormGroup, itnsVillage: ItnsVillageFormGroupInput): void {
    const itnsVillageRawValue = this.convertItnsVillageToItnsVillageRawValue({ ...this.getFormDefaults(), ...itnsVillage });
    form.reset(
      {
        ...itnsVillageRawValue,
        id: { value: itnsVillageRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ItnsVillageFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      workDayDate: currentTime,
      locationCaptureTime: currentTime,
      submissionTime: currentTime,
      startEntryTime: currentTime,
      finishedEntryTime: currentTime,
      deleted: false,
    };
  }

  private convertItnsVillageRawValueToItnsVillage(
    rawItnsVillage: ItnsVillageFormRawValue | NewItnsVillageFormRawValue,
  ): IItnsVillage | NewItnsVillage {
    return {
      ...rawItnsVillage,
      workDayDate: dayjs(rawItnsVillage.workDayDate, DATE_TIME_FORMAT),
      locationCaptureTime: dayjs(rawItnsVillage.locationCaptureTime, DATE_TIME_FORMAT),
      submissionTime: dayjs(rawItnsVillage.submissionTime, DATE_TIME_FORMAT),
      startEntryTime: dayjs(rawItnsVillage.startEntryTime, DATE_TIME_FORMAT),
      finishedEntryTime: dayjs(rawItnsVillage.finishedEntryTime, DATE_TIME_FORMAT),
    };
  }

  private convertItnsVillageToItnsVillageRawValue(
    itnsVillage: IItnsVillage | (Partial<NewItnsVillage> & ItnsVillageFormDefaults),
  ): ItnsVillageFormRawValue | PartialWithRequiredKeyOf<NewItnsVillageFormRawValue> {
    return {
      ...itnsVillage,
      workDayDate: itnsVillage.workDayDate ? itnsVillage.workDayDate.format(DATE_TIME_FORMAT) : undefined,
      locationCaptureTime: itnsVillage.locationCaptureTime ? itnsVillage.locationCaptureTime.format(DATE_TIME_FORMAT) : undefined,
      submissionTime: itnsVillage.submissionTime ? itnsVillage.submissionTime.format(DATE_TIME_FORMAT) : undefined,
      startEntryTime: itnsVillage.startEntryTime ? itnsVillage.startEntryTime.format(DATE_TIME_FORMAT) : undefined,
      finishedEntryTime: itnsVillage.finishedEntryTime ? itnsVillage.finishedEntryTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
