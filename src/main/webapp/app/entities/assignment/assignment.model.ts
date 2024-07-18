import dayjs from 'dayjs/esm';
import { IActivity } from 'app/entities/activity/activity.model';
import { IVillageLocation } from 'app/entities/village-location/village-location.model';
import { ITeam } from 'app/entities/team/team.model';
import { IWarehouse } from 'app/entities/warehouse/warehouse.model';

export interface IAssignment {
  id: number;
  uid?: string | null;
  code?: string | null;
  phaseNo?: number | null;
  districtCode?: number | null;
  gov?: string | null;
  district?: string | null;
  subdistrict?: string | null;
  village?: string | null;
  subvillage?: string | null;
  name?: string | null;
  dayId?: number | null;
  population?: number | null;
  itnsPlanned?: number | null;
  targetType?: number | null;
  longitude?: number | null;
  latitude?: number | null;
  startDate?: dayjs.Dayjs | null;
  activity?: IActivity | null;
  organisationUnit?: IVillageLocation | null;
  team?: ITeam | null;
  warehouse?: IWarehouse | null;
}

export type NewAssignment = Omit<IAssignment, 'id'> & { id: null };
