import dayjs from 'dayjs/esm';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { IActivity } from 'app/entities/activity/activity.model';
import { ITeam } from 'app/entities/team/team.model';
import { Gender } from 'app/entities/enumerations/gender.model';
import { MTestResult } from 'app/entities/enumerations/m-test-result.model';
import { MDetectionType } from 'app/entities/enumerations/m-detection-type.model';
import { MSeverity } from 'app/entities/enumerations/m-severity.model';
import { MTreatment } from 'app/entities/enumerations/m-treatment.model';
import { SyncableStatus } from 'app/entities/enumerations/syncable-status.model';

export interface IChvRegister {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  locationName?: string | null;
  age?: number | null;
  gender?: keyof typeof Gender | null;
  visitDate?: dayjs.Dayjs | null;
  pregnant?: boolean | null;
  testResult?: keyof typeof MTestResult | null;
  detectionType?: keyof typeof MDetectionType | null;
  severity?: keyof typeof MSeverity | null;
  treatment?: keyof typeof MTreatment | null;
  deleted?: boolean | null;
  startEntryTime?: dayjs.Dayjs | null;
  finishedEntryTime?: dayjs.Dayjs | null;
  comment?: string | null;
  status?: keyof typeof SyncableStatus | null;
  location?: IAssignment | null;
  activity?: IActivity | null;
  team?: ITeam | null;
}

export type NewChvRegister = Omit<IChvRegister, 'id'> & { id: null };
