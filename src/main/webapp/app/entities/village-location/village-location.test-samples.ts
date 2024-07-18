import { IVillageLocation, NewVillageLocation } from './village-location.model';

export const sampleWithRequiredData: IVillageLocation = {
  id: 9866,
  uid: 'as carefull',
  code: 'infill ah',
  ppcCodeGis: 'fooey anenst hatred',
};

export const sampleWithPartialData: IVillageLocation = {
  id: 4286,
  uid: 'if',
  code: 'outlandish or',
  mappingStatus: 16629,
  villageUid: 'near mysteriously hop',
  subdistrictName: 'who',
  villageName: 'spending',
  subvillageName: 'before',
  urbanRuralId: 4815,
  ppcCodeGis: 'why for junior',
};

export const sampleWithFullData: IVillageLocation = {
  id: 24911,
  uid: 'shorts impr',
  code: 'guest',
  name: 'where virtuous furthermore',
  mappingStatus: 18340,
  districtCode: 18575,
  villageUid: 'knowledgeably borrow',
  subdistrictName: 'peep yowza',
  villageName: 'next indeed battle',
  subvillageName: 'lavish equally',
  urbanRuralId: 30527,
  urbanRural: 'scorch',
  settlement: 'hmph author ouch',
  pop2004: 14090.52,
  pop2022: 807.42,
  longitude: 26631.58,
  latitude: 26333.44,
  ppcCodeGis: 'which because inch',
  level: 'DISTRICT',
};

export const sampleWithNewData: NewVillageLocation = {
  uid: 'interesting',
  code: 'wearily psst pinstripe',
  ppcCodeGis: 'before',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
