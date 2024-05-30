import dayjs from 'dayjs/esm';
import { ITeam } from 'app/entities/team/team.model';
import { MSessionSubject } from 'app/entities/enumerations/m-session-subject.model';

export interface IChvSession {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  sessionDate?: dayjs.Dayjs | null;
  subject?: keyof typeof MSessionSubject | null;
  sessions?: number | null;
  people?: number | null;
  comment?: string | null;
  startEntryTime?: dayjs.Dayjs | null;
  deleted?: boolean | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  team?: ITeam | null;
}

export type NewChvSession = Omit<IChvSession, 'id'> & { id: null };
