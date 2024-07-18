import dayjs from 'dayjs/esm';

import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 26625,
  uid: 'forte',
};

export const sampleWithPartialData: IAssignment = {
  id: 11414,
  uid: 'rant carp',
  code: 'freelance',
  district: 'because',
  village: 'openly gosh',
  subvillage: 'aha',
  latitude: 2051.18,
  startDate: dayjs('2024-05-22T05:47'),
};

export const sampleWithFullData: IAssignment = {
  id: 4138,
  uid: 'smooth phew',
  code: 'innocently acclimatise tsunami',
  phaseNo: 19778,
  districtCode: 12888,
  gov: 'stud and inasmuch',
  district: 'anklet distinction about',
  subdistrict: 'fooey',
  village: 'well',
  subvillage: 'fright disappointment',
  name: 'digital opposite tremendous',
  dayId: 7487,
  population: 2642.1,
  itnsPlanned: 21309,
  targetType: 16284,
  longitude: 14254.15,
  latitude: 13125.29,
  startDate: dayjs('2024-05-22T13:20'),
};

export const sampleWithNewData: NewAssignment = {
  uid: 'potential i',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
