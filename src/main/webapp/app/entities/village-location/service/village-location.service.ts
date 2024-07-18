import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVillageLocation, NewVillageLocation } from '../village-location.model';

export type PartialUpdateVillageLocation = Partial<IVillageLocation> & Pick<IVillageLocation, 'id'>;

export type EntityResponseType = HttpResponse<IVillageLocation>;
export type EntityArrayResponseType = HttpResponse<IVillageLocation[]>;

@Injectable({ providedIn: 'root' })
export class VillageLocationService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/village-locations');

  create(villageLocation: NewVillageLocation): Observable<EntityResponseType> {
    return this.http.post<IVillageLocation>(this.resourceUrl, villageLocation, { observe: 'response' });
  }

  update(villageLocation: IVillageLocation): Observable<EntityResponseType> {
    return this.http.put<IVillageLocation>(`${this.resourceUrl}/${this.getVillageLocationIdentifier(villageLocation)}`, villageLocation, {
      observe: 'response',
    });
  }

  partialUpdate(villageLocation: PartialUpdateVillageLocation): Observable<EntityResponseType> {
    return this.http.patch<IVillageLocation>(`${this.resourceUrl}/${this.getVillageLocationIdentifier(villageLocation)}`, villageLocation, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVillageLocation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVillageLocation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVillageLocationIdentifier(villageLocation: Pick<IVillageLocation, 'id'>): number {
    return villageLocation.id;
  }

  compareVillageLocation(o1: Pick<IVillageLocation, 'id'> | null, o2: Pick<IVillageLocation, 'id'> | null): boolean {
    return o1 && o2 ? this.getVillageLocationIdentifier(o1) === this.getVillageLocationIdentifier(o2) : o1 === o2;
  }

  addVillageLocationToCollectionIfMissing<Type extends Pick<IVillageLocation, 'id'>>(
    villageLocationCollection: Type[],
    ...villageLocationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const villageLocations: Type[] = villageLocationsToCheck.filter(isPresent);
    if (villageLocations.length > 0) {
      const villageLocationCollectionIdentifiers = villageLocationCollection.map(villageLocationItem =>
        this.getVillageLocationIdentifier(villageLocationItem),
      );
      const villageLocationsToAdd = villageLocations.filter(villageLocationItem => {
        const villageLocationIdentifier = this.getVillageLocationIdentifier(villageLocationItem);
        if (villageLocationCollectionIdentifiers.includes(villageLocationIdentifier)) {
          return false;
        }
        villageLocationCollectionIdentifiers.push(villageLocationIdentifier);
        return true;
      });
      return [...villageLocationsToAdd, ...villageLocationCollection];
    }
    return villageLocationCollection;
  }
}
