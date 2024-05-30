import dayjs from 'dayjs/esm';

import { IVillageLocation, NewVillageLocation } from './village-location.model';

export const sampleWithRequiredData: IVillageLocation = {
  id: 5488,
  code: 'paddock whether',
  ppcCodeGis: 'winged',
};

export const sampleWithPartialData: IVillageLocation = {
  id: 17818,
  code: 'high over pish',
  mappingStatus: 7841,
  districtCode: 17790,
  subdistrictName: 'even',
  villageName: 'except',
  subvillageName: 'underneath',
  urbanRuralId: 22806,
  pop2004: 30654.14,
  pop2022: 5992.73,
  longitude: 6051.57,
  ppcCodeGis: 'madly recall',
  createdBy: 'yellowish',
  lastModifiedDate: dayjs('2024-05-22T02:01'),
};

export const sampleWithFullData: IVillageLocation = {
  id: 12475,
  uid: 'radio',
  code: 'kindheartedly',
  name: 'provided',
  mappingStatus: 25042,
  districtCode: 16369,
  villageUid: 'forenenst',
  subdistrictName: 'sweetly',
  villageName: 'readily',
  subvillageName: 'including zowie',
  urbanRuralId: 1959,
  urbanRural: 'huzzah huzzah scientific',
  settlement: 'law seldom helplessly',
  pop2004: 21021.76,
  pop2022: 21242.35,
  longitude: 21432.27,
  latitude: 2857.53,
  ppcCodeGis: 'beneath',
  level: 'SUBVILLAGE',
  createdBy: 'loftily huzzah squint',
  createdDate: dayjs('2024-05-22T08:54'),
  lastModifiedBy: 'sheepishly once yowza',
  lastModifiedDate: dayjs('2024-05-22T15:41'),
};

export const sampleWithNewData: NewVillageLocation = {
  code: 'boohoo aside hm',
  ppcCodeGis: 'wherever after rig',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
