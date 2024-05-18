import dayjs from 'dayjs/esm';

import { ICampaign, NewCampaign } from './campaign.model';

export const sampleWithRequiredData: ICampaign = {
  id: 11134,
  campaignCode: 'yahoo scrape',
  campaignStartedDate: dayjs('2024-05-17T22:48'),
  enabled: false,
};

export const sampleWithPartialData: ICampaign = {
  id: 22660,
  campaignCode: 'inasmuch plier when',
  campaignStartedDate: dayjs('2024-05-17T04:14'),
  campaignNote: 'nor for',
  enabled: true,
};

export const sampleWithFullData: ICampaign = {
  id: 17214,
  campaignCode: 'cleave parallel drat',
  campaignStartedDate: dayjs('2024-05-17T17:58'),
  campaignDays: 11650,
  campaignYear: 26022,
  campaignNote: 'quick-witted colonialism fast',
  enabled: false,
};

export const sampleWithNewData: NewCampaign = {
  campaignCode: 'tug guilder diffuse',
  campaignStartedDate: dayjs('2024-05-17T15:10'),
  enabled: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
