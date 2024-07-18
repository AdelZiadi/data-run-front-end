import dayjs from 'dayjs/esm';

import { IItnsVillage, NewItnsVillage } from './itns-village.model';

export const sampleWithRequiredData: IItnsVillage = {
  id: 10415,
  uid: 'contend wea',
  submissionUuid: 'though',
  submissionId: 23893,
  status: 'COMPLETED',
};

export const sampleWithPartialData: IItnsVillage = {
  id: 23702,
  uid: 'amazon amid',
  submissionUuid: 'woot seldom',
  submissionId: 23193,
  surveytype: 'TESTREPORT',
  reasonNotcomplete: 'fairly',
  settlementName: 'rest yet um',
  hoProof: 'physically rotten out',
  hoProofUrl: 'oh last that',
  untargetingOtherSpecify: 'crossly',
  otherVillageName: 'inundate ferociously deep',
  finishedEntryTime: dayjs('2024-07-02T21:46'),
  deleted: true,
  status: 'COMPLETED',
};

export const sampleWithFullData: IItnsVillage = {
  id: 31622,
  uid: 'like beyond',
  code: 'only',
  name: 'restart though',
  submissionUuid: 'how',
  submissionId: 537,
  workDayDate: dayjs('2024-07-03T07:28'),
  surveytype: 'TESTREPORT',
  otherReasonComment: 'nor quizzically',
  reasonNotcomplete: 'sheepishly diligent between',
  settlement: 'IDPSCAMP',
  settlementName: 'meh',
  tlCommenet: 'yet aha',
  timeSpentHours: 22737,
  timeSpentMinutes: 11026,
  difficulties: 'associate excise even',
  locationCaptured: 'creepy given ack',
  locationCaptureTime: dayjs('2024-07-03T16:10'),
  hoProof: 'devise caterpillar topple',
  hoProofUrl: 'old-fashioned',
  submissionTime: dayjs('2024-07-03T17:09'),
  untargetingOtherSpecify: 'hence murky for',
  otherVillageName: 'furthermore than',
  otherVillageCode: 'zowie though woefully',
  otherTeamNo: 10861,
  startEntryTime: dayjs('2024-07-03T01:43'),
  finishedEntryTime: dayjs('2024-07-03T13:47'),
  deleted: false,
  status: 'COMPLETED',
};

export const sampleWithNewData: NewItnsVillage = {
  uid: 'phooey wrap',
  submissionUuid: 'researches hmph',
  submissionId: 8023,
  status: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
