import dayjs from 'dayjs/esm';
import { IActivity } from 'app/entities/activity/activity.model';
import { IReviewTeam } from 'app/entities/review-team/review-team.model';
import { IWarehouse } from 'app/entities/warehouse/warehouse.model';
import { IUser } from 'app/entities/user/user.model';

export interface ITeam {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  mobile?: string | null;
  workers?: number | null;
  mobility?: string | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  activity?: IActivity | null;
  operationRoom?: IReviewTeam | null;
  warehouse?: IWarehouse | null;
  userInfo?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewTeam = Omit<ITeam, 'id'> & { id: null };
