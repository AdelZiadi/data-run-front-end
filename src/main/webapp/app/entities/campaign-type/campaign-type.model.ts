export interface ICampaignType {
  id: number;
  campaignType?: string | null;
  description?: string | null;
}

export type NewCampaignType = Omit<ICampaignType, 'id'> & { id: null };
