export interface IWarehouseItem {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  description?: string | null;
}

export type NewWarehouseItem = Omit<IWarehouseItem, 'id'> & { id: null };
