export interface IProgressStatus {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
}

export type NewProgressStatus = Omit<IProgressStatus, 'id'> & { id: null };
