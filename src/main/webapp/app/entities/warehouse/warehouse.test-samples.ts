import dayjs from 'dayjs/esm';

import { IWarehouse, NewWarehouse } from './warehouse.model';

export const sampleWithRequiredData: IWarehouse = {
  id: 21538,
  code: 'frightfully',
};

export const sampleWithPartialData: IWarehouse = {
  id: 29629,
  uid: 'skid',
  code: 'because cattle handsome',
  description: 'TV up capitalise',
  gpsCoordinate: 'er',
  supervisorMobile: 'how blind',
  createdBy: 'yowza furthermore',
  lastModifiedBy: 'scout curio',
  lastModifiedDate: dayjs('2024-05-22T07:22'),
};

export const sampleWithFullData: IWarehouse = {
  id: 10362,
  uid: 'uh-huh gadz',
  code: 'tattoo including',
  name: 'whoa woot hybridize',
  description: 'family',
  gpsCoordinate: 'oh once hm',
  supervisor: 'even per well-worn',
  supervisorMobile: 'unknown netsuke lazy',
  createdBy: 'dish sniff',
  createdDate: dayjs('2024-05-22T19:33'),
  lastModifiedBy: 'wearily',
  lastModifiedDate: dayjs('2024-05-22T15:17'),
};

export const sampleWithNewData: NewWarehouse = {
  code: 'if athwart',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
