import dayjs from 'dayjs/esm';
import { MSessionSubject } from 'app/entities/enumerations/m-session-subject.model';
import { SyncableStatus } from 'app/entities/enumerations/syncable-status.model';

export interface ITeamFormAccess {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  sessionDate?: dayjs.Dayjs | null;
  subject?: keyof typeof MSessionSubject | null;
  sessions?: number | null;
  people?: number | null;
  comment?: string | null;
  deleted?: boolean | null;
  startEntryTime?: dayjs.Dayjs | null;
  finishedEntryTime?: dayjs.Dayjs | null;
  status?: keyof typeof SyncableStatus | null;
}

export type NewTeamFormAccess = Omit<ITeamFormAccess, 'id'> & { id: null };
