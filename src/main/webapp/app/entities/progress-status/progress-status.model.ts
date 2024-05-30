import dayjs from 'dayjs/esm';

export interface IProgressStatus {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
}

export type NewProgressStatus = Omit<IProgressStatus, 'id'> & { id: null };
