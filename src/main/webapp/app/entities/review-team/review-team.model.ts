import dayjs from 'dayjs/esm';

export interface IReviewTeam {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  user?: string | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
}

export type NewReviewTeam = Omit<IReviewTeam, 'id'> & { id: null };
