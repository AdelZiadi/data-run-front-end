import dayjs from 'dayjs/esm';
import { IProgressStatus } from 'app/entities/progress-status/progress-status.model';
import { ITeam } from 'app/entities/team/team.model';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { IActivity } from 'app/entities/activity/activity.model';
import { SurveyTypeEnum } from 'app/entities/enumerations/survey-type-enum.model';
import { SettlementEnum } from 'app/entities/enumerations/settlement-enum.model';
import { SyncableStatus } from 'app/entities/enumerations/syncable-status.model';

export interface IItnsVillage {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  submissionUuid?: string | null;
  submissionId?: number | null;
  workDayDate?: dayjs.Dayjs | null;
  surveytype?: keyof typeof SurveyTypeEnum | null;
  otherReasonComment?: string | null;
  reasonNotcomplete?: string | null;
  settlement?: keyof typeof SettlementEnum | null;
  settlementName?: string | null;
  tlCommenet?: string | null;
  timeSpentHours?: number | null;
  timeSpentMinutes?: number | null;
  difficulties?: string | null;
  locationCaptured?: string | null;
  locationCaptureTime?: dayjs.Dayjs | null;
  hoProof?: string | null;
  hoProofUrl?: string | null;
  submissionTime?: dayjs.Dayjs | null;
  untargetingOtherSpecify?: string | null;
  otherVillageName?: string | null;
  otherVillageCode?: string | null;
  otherTeamNo?: number | null;
  startEntryTime?: dayjs.Dayjs | null;
  finishedEntryTime?: dayjs.Dayjs | null;
  deleted?: boolean | null;
  status?: keyof typeof SyncableStatus | null;
  progressStatus?: IProgressStatus | null;
  team?: ITeam | null;
  assignment?: IAssignment | null;
  activity?: IActivity | null;
}

export type NewItnsVillage = Omit<IItnsVillage, 'id'> & { id: null };
