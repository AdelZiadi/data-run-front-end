import dayjs from 'dayjs/esm';

import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 1956,
};

export const sampleWithPartialData: IAssignment = {
  id: 29553,
  uid: 'inwardly hu',
  code: 'shyly',
  districtCode: 29420,
  gov: 'bland',
  name: 'quicker site',
  dayId: 25131,
  itnsPlanned: 31904,
  longitude: 32027.71,
  startDate: dayjs('2024-05-22T00:47'),
  createdBy: 'worthwhile',
  createdDate: dayjs('2024-05-22T22:11'),
};

export const sampleWithFullData: IAssignment = {
  id: 8317,
  uid: 'by lam',
  code: 'nourishment',
  phaseNo: 9460,
  districtCode: 8412,
  gov: 'goal lest spleen',
  district: 'flock delirious',
  subdistrict: 'outside gadzooks energetic',
  village: 'how cheerfully',
  subvillage: 'around',
  name: 'weekly like ambush',
  dayId: 8513,
  population: 763.78,
  itnsPlanned: 12627,
  targetType: 11775,
  longitude: 23705.61,
  latitude: 20098.82,
  startDate: dayjs('2024-05-22T09:49'),
  createdBy: 'nor obediently thin',
  createdDate: dayjs('2024-05-22T16:08'),
  lastModifiedBy: 'school knight',
  lastModifiedDate: dayjs('2024-05-22T07:50'),
};

export const sampleWithNewData: NewAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
