import dayjs from 'dayjs/esm';

import { IWarehouseTransaction, NewWarehouseTransaction } from './warehouse-transaction.model';

export const sampleWithRequiredData: IWarehouseTransaction = {
  id: 9190,
  uid: 'estate yipp',
  imovUid: 'ew bet inconsequential',
  transactionDate: dayjs('2024-07-03T11:39'),
  entryType: 'affront or',
  quantity: 15547,
  status: 'ACTIVE',
};

export const sampleWithPartialData: IWarehouseTransaction = {
  id: 3891,
  uid: 'even circa ',
  name: 'biodegradable hence blah',
  imovUid: 'whoa grotesque',
  transactionDate: dayjs('2024-07-03T15:49'),
  entryType: 'too',
  quantity: 29744,
  workDayId: 22194,
  submissionTime: dayjs('2024-07-03T09:52'),
  deleted: true,
  startEntryTime: dayjs('2024-07-03T10:18'),
  status: 'ACTIVE',
};

export const sampleWithFullData: IWarehouseTransaction = {
  id: 14163,
  uid: 'obey forsak',
  code: 'poster tempting',
  name: 'beneath',
  imovUid: 'boldly tack or',
  transactionDate: dayjs('2024-07-03T11:21'),
  phaseNo: 14153,
  entryType: 'modulo grab packet',
  quantity: 10568,
  notes: 'upliftingly um',
  personName: 'failing harmonious triumphantly',
  workDayId: 15325,
  submissionTime: dayjs('2024-07-03T07:56'),
  submissionId: 28334,
  deleted: true,
  submissionUuid: 'plus',
  startEntryTime: dayjs('2024-07-03T17:18'),
  finishedEntryTime: dayjs('2024-07-03T10:03'),
  status: 'ACTIVE',
};

export const sampleWithNewData: NewWarehouseTransaction = {
  uid: 'though',
  imovUid: 'wearily',
  transactionDate: dayjs('2024-07-03T04:39'),
  entryType: 'elegant since unblinking',
  quantity: 21260,
  status: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
