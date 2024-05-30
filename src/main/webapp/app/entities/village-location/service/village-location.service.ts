import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVillageLocation, NewVillageLocation } from '../village-location.model';

export type PartialUpdateVillageLocation = Partial<IVillageLocation> & Pick<IVillageLocation, 'id'>;

type RestOf<T extends IVillageLocation | NewVillageLocation> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

export type RestVillageLocation = RestOf<IVillageLocation>;

export type NewRestVillageLocation = RestOf<NewVillageLocation>;

export type PartialUpdateRestVillageLocation = RestOf<PartialUpdateVillageLocation>;

export type EntityResponseType = HttpResponse<IVillageLocation>;
export type EntityArrayResponseType = HttpResponse<IVillageLocation[]>;

@Injectable({ providedIn: 'root' })
export class VillageLocationService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/village-locations');

  create(villageLocation: NewVillageLocation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(villageLocation);
    return this.http
      .post<RestVillageLocation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(villageLocation: IVillageLocation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(villageLocation);
    return this.http
      .put<RestVillageLocation>(`${this.resourceUrl}/${this.getVillageLocationIdentifier(villageLocation)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(villageLocation: PartialUpdateVillageLocation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(villageLocation);
    return this.http
      .patch<RestVillageLocation>(`${this.resourceUrl}/${this.getVillageLocationIdentifier(villageLocation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestVillageLocation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestVillageLocation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
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

  protected convertDateFromClient<T extends IVillageLocation | NewVillageLocation | PartialUpdateVillageLocation>(
    villageLocation: T,
  ): RestOf<T> {
    return {
      ...villageLocation,
      createdDate: villageLocation.createdDate?.toJSON() ?? null,
      lastModifiedDate: villageLocation.lastModifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restVillageLocation: RestVillageLocation): IVillageLocation {
    return {
      ...restVillageLocation,
      createdDate: restVillageLocation.createdDate ? dayjs(restVillageLocation.createdDate) : undefined,
      lastModifiedDate: restVillageLocation.lastModifiedDate ? dayjs(restVillageLocation.lastModifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestVillageLocation>): HttpResponse<IVillageLocation> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestVillageLocation[]>): HttpResponse<IVillageLocation[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
