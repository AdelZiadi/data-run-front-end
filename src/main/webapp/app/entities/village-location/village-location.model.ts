import { PublicLocationType } from 'app/entities/enumerations/public-location-type.model';

export interface IVillageLocation {
  id: number;
  uid?: string | null;
  code?: string | null;
  name?: string | null;
  mappingStatus?: number | null;
  districtCode?: number | null;
  villageUid?: string | null;
  subdistrictName?: string | null;
  villageName?: string | null;
  subvillageName?: string | null;
  urbanRuralId?: number | null;
  urbanRural?: string | null;
  settlement?: string | null;
  pop2004?: number | null;
  pop2022?: number | null;
  longitude?: number | null;
  latitude?: number | null;
  ppcCodeGis?: string | null;
  level?: keyof typeof PublicLocationType | null;
}

export type NewVillageLocation = Omit<IVillageLocation, 'id'> & { id: null };
