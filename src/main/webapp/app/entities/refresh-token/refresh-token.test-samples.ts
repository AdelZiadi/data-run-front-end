import dayjs from 'dayjs/esm';

import { IRefreshToken, NewRefreshToken } from './refresh-token.model';

export const sampleWithRequiredData: IRefreshToken = {
  id: 5805,
  token: 'brr ew',
};

export const sampleWithPartialData: IRefreshToken = {
  id: 2837,
  token: 'honestly',
  expiryDate: dayjs('2024-07-02T22:13'),
};

export const sampleWithFullData: IRefreshToken = {
  id: 10263,
  uid: 'rarely via ',
  token: 'why gadzooks',
  expiryDate: dayjs('2024-07-03T18:11'),
};

export const sampleWithNewData: NewRefreshToken = {
  token: 'than by cupcake',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
