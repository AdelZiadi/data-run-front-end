import { IItnsVillage } from 'app/entities/itns-village/itns-village.model';

export interface IItnsVillageHousesDetail {
  id: number;
  uid?: string | null;
  code?: string | null;
  couponId?: number | null;
  name?: string | null;
  male?: number | null;
  female?: number | null;
  pregnant?: number | null;
  population?: number | null;
  maleChild?: number | null;
  femaleChild?: number | null;
  displaced?: number | null;
  itns?: number | null;
  comment?: string | null;
  submissionUuid?: string | null;
  houseUuid?: string | null;
  deleted?: boolean | null;
  itnsVillage?: IItnsVillage | null;
}

export type NewItnsVillageHousesDetail = Omit<IItnsVillageHousesDetail, 'id'> & { id: null };
