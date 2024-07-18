import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IRefreshToken, NewRefreshToken } from '../refresh-token.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRefreshToken for edit and NewRefreshTokenFormGroupInput for create.
 */
type RefreshTokenFormGroupInput = IRefreshToken | PartialWithRequiredKeyOf<NewRefreshToken>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IRefreshToken | NewRefreshToken> = Omit<T, 'expiryDate'> & {
  expiryDate?: string | null;
};

type RefreshTokenFormRawValue = FormValueOf<IRefreshToken>;

type NewRefreshTokenFormRawValue = FormValueOf<NewRefreshToken>;

type RefreshTokenFormDefaults = Pick<NewRefreshToken, 'id' | 'expiryDate'>;

type RefreshTokenFormGroupContent = {
  id: FormControl<RefreshTokenFormRawValue['id'] | NewRefreshToken['id']>;
  uid: FormControl<RefreshTokenFormRawValue['uid']>;
  token: FormControl<RefreshTokenFormRawValue['token']>;
  expiryDate: FormControl<RefreshTokenFormRawValue['expiryDate']>;
  user: FormControl<RefreshTokenFormRawValue['user']>;
};

export type RefreshTokenFormGroup = FormGroup<RefreshTokenFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RefreshTokenFormService {
  createRefreshTokenFormGroup(refreshToken: RefreshTokenFormGroupInput = { id: null }): RefreshTokenFormGroup {
    const refreshTokenRawValue = this.convertRefreshTokenToRefreshTokenRawValue({
      ...this.getFormDefaults(),
      ...refreshToken,
    });
    return new FormGroup<RefreshTokenFormGroupContent>({
      id: new FormControl(
        { value: refreshTokenRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      uid: new FormControl(refreshTokenRawValue.uid, {
        validators: [Validators.maxLength(11)],
      }),
      token: new FormControl(refreshTokenRawValue.token, {
        validators: [Validators.required],
      }),
      expiryDate: new FormControl(refreshTokenRawValue.expiryDate),
      user: new FormControl(refreshTokenRawValue.user, {
        validators: [Validators.required],
      }),
    });
  }

  getRefreshToken(form: RefreshTokenFormGroup): IRefreshToken | NewRefreshToken {
    return this.convertRefreshTokenRawValueToRefreshToken(form.getRawValue() as RefreshTokenFormRawValue | NewRefreshTokenFormRawValue);
  }

  resetForm(form: RefreshTokenFormGroup, refreshToken: RefreshTokenFormGroupInput): void {
    const refreshTokenRawValue = this.convertRefreshTokenToRefreshTokenRawValue({ ...this.getFormDefaults(), ...refreshToken });
    form.reset(
      {
        ...refreshTokenRawValue,
        id: { value: refreshTokenRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RefreshTokenFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      expiryDate: currentTime,
    };
  }

  private convertRefreshTokenRawValueToRefreshToken(
    rawRefreshToken: RefreshTokenFormRawValue | NewRefreshTokenFormRawValue,
  ): IRefreshToken | NewRefreshToken {
    return {
      ...rawRefreshToken,
      expiryDate: dayjs(rawRefreshToken.expiryDate, DATE_TIME_FORMAT),
    };
  }

  private convertRefreshTokenToRefreshTokenRawValue(
    refreshToken: IRefreshToken | (Partial<NewRefreshToken> & RefreshTokenFormDefaults),
  ): RefreshTokenFormRawValue | PartialWithRequiredKeyOf<NewRefreshTokenFormRawValue> {
    return {
      ...refreshToken,
      expiryDate: refreshToken.expiryDate ? refreshToken.expiryDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
