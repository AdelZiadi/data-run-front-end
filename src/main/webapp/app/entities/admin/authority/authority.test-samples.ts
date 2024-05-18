import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: 'd8f744d0-8e50-4226-b76a-dd2a5a5f031c',
};

export const sampleWithPartialData: IAuthority = {
  name: '8d3aed64-4f24-4394-942b-a54986166ced',
};

export const sampleWithFullData: IAuthority = {
  name: 'edd0caf0-afee-45f1-8779-8bee4849ab60',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
