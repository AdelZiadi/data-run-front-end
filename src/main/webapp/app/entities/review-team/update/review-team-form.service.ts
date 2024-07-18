import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

type ReviewTeamFormDefaults = Pick<NewReviewTeam, 'id'>;

type ReviewTeamFormGroupContent = {
  id: FormControl<IReviewTeam['id'] | NewReviewTeam['id']>;
  uid: FormControl<IReviewTeam['uid']>;
  code: FormControl<IReviewTeam['code']>;
  name: FormControl<IReviewTeam['name']>;
  user: FormControl<IReviewTeam['user']>;
};

export type ReviewTeamFormGroup = FormGroup<ReviewTeamFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReviewTeamFormService {
  createReviewTeamFormGroup(reviewTeam: ReviewTeamFormGroupInput = { id: null }): ReviewTeamFormGroup {
    const reviewTeamRawValue = {
      ...this.getFormDefaults(),
      ...reviewTeam,
    };
    return new FormGroup<ReviewTeamFormGroupContent>({
      id: new FormControl(
        { value: reviewTeamRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(reviewTeamRawValue.uid, {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      code: new FormControl(reviewTeamRawValue.code),
      name: new FormControl(reviewTeamRawValue.name),
      user: new FormControl(reviewTeamRawValue.user),
    });
  }

  getReviewTeam(form: ReviewTeamFormGroup): IReviewTeam | NewReviewTeam {
    return form.getRawValue() as IReviewTeam | NewReviewTeam;
  }

  resetForm(form: ReviewTeamFormGroup, reviewTeam: ReviewTeamFormGroupInput): void {
    const reviewTeamRawValue = { ...this.getFormDefaults(), ...reviewTeam };
    form.reset(
      {
        ...reviewTeamRawValue,
        id: { value: reviewTeamRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ReviewTeamFormDefaults {
    return {
      id: null,
    };
  }
}
