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
  displayed?: boolean | null;
  order?: number | null;
  project?: IProject | null;
}

export type NewActivity = Omit<IActivity, 'id'> & { id: null };
