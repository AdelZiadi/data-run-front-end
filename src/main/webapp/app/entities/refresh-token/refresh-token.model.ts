import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';

export interface IRefreshToken {
  id: number;
  uid?: string | null;
  token?: string | null;
  expiryDate?: dayjs.Dayjs | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewRefreshToken = Omit<IRefreshToken, 'id'> & { id: null };
