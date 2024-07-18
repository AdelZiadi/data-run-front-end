import { ITeam, NewTeam } from './team.model';

export const sampleWithRequiredData: ITeam = {
  id: 13577,
  uid: 'but',
  code: 'frantically dissonance instead',
  teamType: 'IRS_DISTRIBUTION',
};

export const sampleWithPartialData: ITeam = {
  id: 14125,
  uid: 'explicate',
  code: 'or beautiful aha',
  name: 'blissfully blight dip',
  mobile: 'cradle',
  workers: 10247,
  mobility: 'longingly tromp today',
  teamType: 'ITNS_WAREHOUSE',
};

export const sampleWithFullData: ITeam = {
  id: 20090,
  uid: 'meanwhile p',
  code: 'notion',
  name: 'gee',
  description: 'lest',
  mobile: 'zesty talkative blindfolded',
  workers: 9176,
  mobility: 'into',
  teamType: 'IRS_WAREHOUSE',
  disabled: false,
  deleteClientData: false,
};

export const sampleWithNewData: NewTeam = {
  uid: 'hint pace',
  code: 'flank tragic',
  teamType: 'CHV_PATIENTS',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
