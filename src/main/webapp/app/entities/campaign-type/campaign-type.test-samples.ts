import { ICampaignType, NewCampaignType } from './campaign-type.model';

export const sampleWithRequiredData: ICampaignType = {
  id: 19019,
  campaignType: 'when round',
};

export const sampleWithPartialData: ICampaignType = {
  id: 672,
  campaignType: 'but',
};

export const sampleWithFullData: ICampaignType = {
  id: 25061,
  campaignType: 'not phooey noise',
  description: 'bossy',
};

export const sampleWithNewData: NewCampaignType = {
  campaignType: 'frame alongside',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
