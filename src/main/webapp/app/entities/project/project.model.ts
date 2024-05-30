import dayjs from 'dayjs/esm';

export interface IProject {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  displayed?: boolean | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
}

export type NewProject = Omit<IProject, 'id'> & { id: null };
