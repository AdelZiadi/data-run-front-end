import dayjs from 'dayjs/esm';
import { IWarehouseItem } from 'app/entities/warehouse-item/warehouse-item.model';
import { IWarehouse } from 'app/entities/warehouse/warehouse.model';
import { ITeam } from 'app/entities/team/team.model';
import { IActivity } from 'app/entities/activity/activity.model';
import { SyncableStatus } from 'app/entities/enumerations/syncable-status.model';

export interface IWarehouseTransaction {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  imovUid?: string | null;
  transactionDate?: dayjs.Dayjs | null;
  phaseNo?: number | null;
  entryType?: string | null;
  quantity?: number | null;
  notes?: string | null;
  personName?: string | null;
  workDayId?: number | null;
  submissionTime?: dayjs.Dayjs | null;
  submissionId?: number | null;
  deleted?: boolean | null;
  submissionUuid?: string | null;
  startEntryTime?: dayjs.Dayjs | null;
  finishedEntryTime?: dayjs.Dayjs | null;
  status?: keyof typeof SyncableStatus | null;
  item?: IWarehouseItem | null;
  sourceWarehouse?: IWarehouse | null;
  team?: ITeam | null;
  warehouse?: IWarehouse | null;
  activity?: IActivity | null;
}

export type NewWarehouseTransaction = Omit<IWarehouseTransaction, 'id'> & { id: null };
