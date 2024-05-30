import dayjs from 'dayjs/esm';
import { IPatientInfo } from 'app/entities/patient-info/patient-info.model';
import { ITeam } from 'app/entities/team/team.model';
import { MTestResult } from 'app/entities/enumerations/m-test-result.model';
import { MDetectionType } from 'app/entities/enumerations/m-detection-type.model';
import { MSeverity } from 'app/entities/enumerations/m-severity.model';
import { MTreatment } from 'app/entities/enumerations/m-treatment.model';

export interface IChvRegister {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  visitDate?: dayjs.Dayjs | null;
  pregnant?: boolean | null;
  testResult?: keyof typeof MTestResult | null;
  detectionType?: keyof typeof MDetectionType | null;
  severity?: keyof typeof MSeverity | null;
  treatment?: keyof typeof MTreatment | null;
  comment?: string | null;
  startEntryTime?: dayjs.Dayjs | null;
  deleted?: boolean | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  patient?: IPatientInfo | null;
  team?: ITeam | null;
}

export type NewChvRegister = Omit<IChvRegister, 'id'> & { id: null };
