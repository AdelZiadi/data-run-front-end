import { IItnsVillageHousesDetail, NewItnsVillageHousesDetail } from './itns-village-houses-detail.model';

export const sampleWithRequiredData: IItnsVillageHousesDetail = {
  id: 30018,
  uid: 'drat',
};

export const sampleWithPartialData: IItnsVillageHousesDetail = {
  id: 26671,
  uid: 'near',
  code: 'not whereas',
  name: 'vacuum happy-go-lucky pronounce',
  male: 31841,
  pregnant: 9725,
  femaleChild: 21490,
  displaced: 9446,
  itns: 10301,
  deleted: false,
};

export const sampleWithFullData: IItnsVillageHousesDetail = {
  id: 3209,
  uid: 'warmly whil',
  code: 'sequence international bah',
  couponId: 31800,
  name: 'after lightly why',
  male: 21031,
  female: 21068,
  pregnant: 30591,
  population: 23105,
  maleChild: 7806,
  femaleChild: 30969,
  displaced: 9731,
  itns: 5141,
  comment: 'for artificer',
  submissionUuid: 'when however reality',
  houseUuid: 'crayon neatly',
  deleted: true,
};

export const sampleWithNewData: NewItnsVillageHousesDetail = {
  uid: 'naturally',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
