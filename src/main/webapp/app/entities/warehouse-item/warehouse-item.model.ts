import dayjs from 'dayjs/esm';

export interface IWarehouseItem {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
}

export type NewWarehouseItem = Omit<IWarehouseItem, 'id'> & { id: null };
