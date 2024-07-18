export interface IProject {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  disabled?: boolean | null;
}

export type NewProject = Omit<IProject, 'id'> & { id: null };
