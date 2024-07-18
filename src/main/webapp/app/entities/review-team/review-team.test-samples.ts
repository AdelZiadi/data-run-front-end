import { IReviewTeam, NewReviewTeam } from './review-team.model';

export const sampleWithRequiredData: IReviewTeam = {
  id: 11333,
  uid: 'blah apud',
};

export const sampleWithPartialData: IReviewTeam = {
  id: 4213,
  uid: 'zowie ouch ',
};

export const sampleWithFullData: IReviewTeam = {
  id: 24629,
  uid: 'gripping ob',
  code: 'joyfully ugh',
  name: 'suspiciously now about',
  user: 'yippee',
};

export const sampleWithNewData: NewReviewTeam = {
  uid: 'mess usuall',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
