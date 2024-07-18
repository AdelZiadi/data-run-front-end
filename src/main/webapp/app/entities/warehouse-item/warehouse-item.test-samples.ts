import { IWarehouseItem, NewWarehouseItem } from './warehouse-item.model';

export const sampleWithRequiredData: IWarehouseItem = {
  id: 32542,
  uid: 'burnish',
};

export const sampleWithPartialData: IWarehouseItem = {
  id: 23865,
  uid: 'disconnecti',
  code: 'boohoo eventually',
  name: 'against hastily carelessly',
  description: 'naughty function nasalize',
};

export const sampleWithFullData: IWarehouseItem = {
  id: 6016,
  uid: 'dice',
  code: 'vegetarian sandy',
  name: 'uh-huh above',
  description: 'shrilly',
};

export const sampleWithNewData: NewWarehouseItem = {
  uid: 'up outlying',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
