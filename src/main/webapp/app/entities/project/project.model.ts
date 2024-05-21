import dayjs from 'dayjs/esm';

export interface IProject {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  created?: dayjs.Dayjs | null;
  lastUpdated?: dayjs.Dayjs | null;
  displayed?: boolean | null;
  order?: number | null;
}

export type NewProject = Omit<IProject, 'id'> & { id: null };
