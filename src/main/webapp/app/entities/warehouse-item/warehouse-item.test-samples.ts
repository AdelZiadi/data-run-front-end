import dayjs from 'dayjs/esm';

import { IWarehouseItem, NewWarehouseItem } from './warehouse-item.model';

export const sampleWithRequiredData: IWarehouseItem = {
  id: 11505,
};

export const sampleWithPartialData: IWarehouseItem = {
  id: 6539,
  uid: 'unless',
  name: 'how hopelessly despite',
  description: 'beetle',
  createdDate: dayjs('2024-05-22T03:19'),
  lastModifiedDate: dayjs('2024-05-22T19:37'),
};

export const sampleWithFullData: IWarehouseItem = {
  id: 24567,
  uid: 'how',
  code: 'lest until',
  name: 'pout hedge simplistic',
  description: 'grill cockroach',
  createdBy: 'immaculate ink',
  createdDate: dayjs('2024-05-22T02:38'),
  lastModifiedBy: 'under loyally drat',
  lastModifiedDate: dayjs('2024-05-22T16:45'),
};

export const sampleWithNewData: NewWarehouseItem = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
