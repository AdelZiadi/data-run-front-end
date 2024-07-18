import { IActivity } from 'app/entities/activity/activity.model';
import { IReviewTeam } from 'app/entities/review-team/review-team.model';
import { IWarehouse } from 'app/entities/warehouse/warehouse.model';
import { IUser } from 'app/entities/user/user.model';
import { TeamType } from 'app/entities/enumerations/team-type.model';

export interface ITeam {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  mobile?: string | null;
  workers?: number | null;
  mobility?: string | null;
  teamType?: keyof typeof TeamType | null;
  disabled?: boolean | null;
  deleteClientData?: boolean | null;
  activity?: IActivity | null;
  operationRoom?: IReviewTeam | null;
  warehouse?: IWarehouse | null;
  userInfo?: Pick<IUser, 'id' | 'uid' | 'login'> | null;
}

export type NewTeam = Omit<ITeam, 'id'> & { id: null };
