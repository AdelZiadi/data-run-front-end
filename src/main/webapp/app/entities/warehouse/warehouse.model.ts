import dayjs from 'dayjs/esm';
import { IActivity } from 'app/entities/activity/activity.model';

export interface IWarehouse {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  gpsCoordinate?: string | null;
  supervisor?: string | null;
  supervisorMobile?: string | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  activity?: IActivity | null;
}

export type NewWarehouse = Omit<IWarehouse, 'id'> & { id: null };
