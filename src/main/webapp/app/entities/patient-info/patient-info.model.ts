import dayjs from 'dayjs/esm';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface IPatientInfo {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  age?: number | null;
  gender?: keyof typeof Gender | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  location?: IAssignment | null;
}

export type NewPatientInfo = Omit<IPatientInfo, 'id'> & { id: null };
