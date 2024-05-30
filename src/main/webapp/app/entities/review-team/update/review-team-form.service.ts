import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IReviewTeam, NewReviewTeam } from '../review-team.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReviewTeam for edit and NewReviewTeamFormGroupInput for create.
 */
type ReviewTeamFormGroupInput = IReviewTeam | PartialWithRequiredKeyOf<NewReviewTeam>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IReviewTeam | NewReviewTeam> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

type ReviewTeamFormRawValue = FormValueOf<IReviewTeam>;

type NewReviewTeamFormRawValue = FormValueOf<NewReviewTeam>;

type ReviewTeamFormDefaults = Pick<NewReviewTeam, 'id' | 'createdDate' | 'lastModifiedDate'>;

type ReviewTeamFormGroupContent = {
  id: FormControl<ReviewTeamFormRawValue['id'] | NewReviewTeam['id']>;
  uid: FormControl<ReviewTeamFormRawValue['uid']>;
  code: FormControl<ReviewTeamFormRawValue['code']>;
  name: FormControl<ReviewTeamFormRawValue['name']>;
  user: FormControl<ReviewTeamFormRawValue['user']>;
  createdBy: FormControl<ReviewTeamFormRawValue['createdBy']>;
  createdDate: FormControl<ReviewTeamFormRawValue['createdDate']>;
  lastModifiedBy: FormControl<ReviewTeamFormRawValue['lastModifiedBy']>;
  lastModifiedDate: FormControl<ReviewTeamFormRawValue['lastModifiedDate']>;
};

export type ReviewTeamFormGroup = FormGroup<ReviewTeamFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReviewTeamFormService {
  createReviewTeamFormGroup(reviewTeam: ReviewTeamFormGroupInput = { id: null }): ReviewTeamFormGroup {
    const reviewTeamRawValue = this.convertReviewTeamToReviewTeamRawValue({
      ...this.getFormDefaults(),
      ...reviewTeam,
    });
    return new FormGroup<ReviewTeamFormGroupContent>({
      id: new FormControl(
        { value: reviewTeamRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(reviewTeamRawValue.uid, {
        validators: [Validators.maxLength(11)],
      }),
      code: new FormControl(reviewTeamRawValue.code),
      name: new FormControl(reviewTeamRawValue.name),
      user: new FormControl(reviewTeamRawValue.user),
      createdBy: new FormControl(reviewTeamRawValue.createdBy),
      createdDate: new FormControl(reviewTeamRawValue.createdDate),
      lastModifiedBy: new FormControl(reviewTeamRawValue.lastModifiedBy),
      lastModifiedDate: new FormControl(reviewTeamRawValue.lastModifiedDate),
    });
  }

  getReviewTeam(form: ReviewTeamFormGroup): IReviewTeam | NewReviewTeam {
    return this.convertReviewTeamRawValueToReviewTeam(form.getRawValue() as ReviewTeamFormRawValue | NewReviewTeamFormRawValue);
  }

  resetForm(form: ReviewTeamFormGroup, reviewTeam: ReviewTeamFormGroupInput): void {
    const reviewTeamRawValue = this.convertReviewTeamToReviewTeamRawValue({ ...this.getFormDefaults(), ...reviewTeam });
    form.reset(
      {
        ...reviewTeamRawValue,
        id: { value: reviewTeamRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ReviewTeamFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      lastModifiedDate: currentTime,
    };
  }

  private convertReviewTeamRawValueToReviewTeam(
    rawReviewTeam: ReviewTeamFormRawValue | NewReviewTeamFormRawValue,
  ): IReviewTeam | NewReviewTeam {
    return {
      ...rawReviewTeam,
      createdDate: dayjs(rawReviewTeam.createdDate, DATE_TIME_FORMAT),
      lastModifiedDate: dayjs(rawReviewTeam.lastModifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertReviewTeamToReviewTeamRawValue(
    reviewTeam: IReviewTeam | (Partial<NewReviewTeam> & ReviewTeamFormDefaults),
  ): ReviewTeamFormRawValue | PartialWithRequiredKeyOf<NewReviewTeamFormRawValue> {
    return {
      ...reviewTeam,
      createdDate: reviewTeam.createdDate ? reviewTeam.createdDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifiedDate: reviewTeam.lastModifiedDate ? reviewTeam.lastModifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
