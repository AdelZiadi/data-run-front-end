import dayjs from 'dayjs/esm';
import { IProject } from 'app/entities/project/project.model';

export interface IActivity {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  active?: boolean | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  project?: IProject | null;
}

export type NewActivity = Omit<IActivity, 'id'> & { id: null };
