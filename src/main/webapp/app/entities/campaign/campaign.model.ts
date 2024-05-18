import dayjs from 'dayjs/esm';
import { ICampaignType } from 'app/entities/campaign-type/campaign-type.model';

export interface ICampaign {
  id: number;
  campaignCode?: string | null;
  campaignStartedDate?: dayjs.Dayjs | null;
  campaignDays?: number | null;
  campaignYear?: number | null;
  campaignNote?: string | null;
  enabled?: boolean | null;
  campaignType?: ICampaignType | null;
}

export type NewCampaign = Omit<ICampaign, 'id'> & { id: null };
