import { IWarehouse, NewWarehouse } from './warehouse.model';

export const sampleWithRequiredData: IWarehouse = {
  id: 21994,
  uid: 'quizzical s',
  code: 'during yearningly the',
};

export const sampleWithPartialData: IWarehouse = {
  id: 5803,
  uid: 'lion',
  code: 'whereas inside unfolded',
  supervisorMobile: 'humongous while',
};

export const sampleWithFullData: IWarehouse = {
  id: 3243,
  uid: 'pump',
  code: 'kitten unless',
  name: 'glint sadly gosh',
  description: 'wherever towards',
  gpsCoordinate: 'outside solidly',
  supervisor: 'huzzah ikebana too',
  supervisorMobile: 'uncork genuine presence',
};

export const sampleWithNewData: NewWarehouse = {
  uid: 'actually ca',
  code: 'amid',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
