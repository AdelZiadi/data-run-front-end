import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IItnsVillage, NewItnsVillage } from '../itns-village.model';

export type PartialUpdateItnsVillage = Partial<IItnsVillage> & Pick<IItnsVillage, 'id'>;

type RestOf<T extends IItnsVillage | NewItnsVillage> = Omit<
  T,
  'workDayDate' | 'locationCaptureTime' | 'submissionTime' | 'startEntryTime' | 'finishedEntryTime'
> & {
  workDayDate?: string | null;
  locationCaptureTime?: string | null;
  submissionTime?: string | null;
  startEntryTime?: string | null;
  finishedEntryTime?: string | null;
};

export type RestItnsVillage = RestOf<IItnsVillage>;

export type NewRestItnsVillage = RestOf<NewItnsVillage>;

export type PartialUpdateRestItnsVillage = RestOf<PartialUpdateItnsVillage>;

export type EntityResponseType = HttpResponse<IItnsVillage>;
export type EntityArrayResponseType = HttpResponse<IItnsVillage[]>;

@Injectable({ providedIn: 'root' })
export class ItnsVillageService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/itns-villages');

  create(itnsVillage: NewItnsVillage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itnsVillage);
    return this.http
      .post<RestItnsVillage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(itnsVillage: IItnsVillage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itnsVillage);
    return this.http
      .put<RestItnsVillage>(`${this.resourceUrl}/${this.getItnsVillageIdentifier(itnsVillage)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(itnsVillage: PartialUpdateItnsVillage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(itnsVillage);
    return this.http
      .patch<RestItnsVillage>(`${this.resourceUrl}/${this.getItnsVillageIdentifier(itnsVillage)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestItnsVillage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestItnsVillage[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getItnsVillageIdentifier(itnsVillage: Pick<IItnsVillage, 'id'>): number {
    return itnsVillage.id;
  }

  compareItnsVillage(o1: Pick<IItnsVillage, 'id'> | null, o2: Pick<IItnsVillage, 'id'> | null): boolean {
    return o1 && o2 ? this.getItnsVillageIdentifier(o1) === this.getItnsVillageIdentifier(o2) : o1 === o2;
  }

  addItnsVillageToCollectionIfMissing<Type extends Pick<IItnsVillage, 'id'>>(
    itnsVillageCollection: Type[],
    ...itnsVillagesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const itnsVillages: Type[] = itnsVillagesToCheck.filter(isPresent);
    if (itnsVillages.length > 0) {
      const itnsVillageCollectionIdentifiers = itnsVillageCollection.map(itnsVillageItem => this.getItnsVillageIdentifier(itnsVillageItem));
      const itnsVillagesToAdd = itnsVillages.filter(itnsVillageItem => {
        const itnsVillageIdentifier = this.getItnsVillageIdentifier(itnsVillageItem);
        if (itnsVillageCollectionIdentifiers.includes(itnsVillageIdentifier)) {
          return false;
        }
        itnsVillageCollectionIdentifiers.push(itnsVillageIdentifier);
        return true;
      });
      return [...itnsVillagesToAdd, ...itnsVillageCollection];
    }
    return itnsVillageCollection;
  }

  protected convertDateFromClient<T extends IItnsVillage | NewItnsVillage | PartialUpdateItnsVillage>(itnsVillage: T): RestOf<T> {
    return {
      ...itnsVillage,
      workDayDate: itnsVillage.workDayDate?.toJSON() ?? null,
      locationCaptureTime: itnsVillage.locationCaptureTime?.toJSON() ?? null,
      submissionTime: itnsVillage.submissionTime?.toJSON() ?? null,
      startEntryTime: itnsVillage.startEntryTime?.toJSON() ?? null,
      finishedEntryTime: itnsVillage.finishedEntryTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restItnsVillage: RestItnsVillage): IItnsVillage {
    return {
      ...restItnsVillage,
      workDayDate: restItnsVillage.workDayDate ? dayjs(restItnsVillage.workDayDate) : undefined,
      locationCaptureTime: restItnsVillage.locationCaptureTime ? dayjs(restItnsVillage.locationCaptureTime) : undefined,
      submissionTime: restItnsVillage.submissionTime ? dayjs(restItnsVillage.submissionTime) : undefined,
      startEntryTime: restItnsVillage.startEntryTime ? dayjs(restItnsVillage.startEntryTime) : undefined,
      finishedEntryTime: restItnsVillage.finishedEntryTime ? dayjs(restItnsVillage.finishedEntryTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestItnsVillage>): HttpResponse<IItnsVillage> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestItnsVillage[]>): HttpResponse<IItnsVillage[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
