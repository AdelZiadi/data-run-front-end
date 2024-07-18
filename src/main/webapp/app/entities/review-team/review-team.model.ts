export interface IReviewTeam {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  user?: string | null;
}

export type NewReviewTeam = Omit<IReviewTeam, 'id'> & { id: null };
