import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChvRegister, NewChvRegister } from '../chv-register.model';

export type PartialUpdateChvRegister = Partial<IChvRegister> & Pick<IChvRegister, 'id'>;

type RestOf<T extends IChvRegister | NewChvRegister> = Omit<T, 'visitDate' | 'startEntryTime' | 'finishedEntryTime'> & {
  visitDate?: string | null;
  startEntryTime?: string | null;
  finishedEntryTime?: string | null;
};

export type RestChvRegister = RestOf<IChvRegister>;

export type NewRestChvRegister = RestOf<NewChvRegister>;

export type PartialUpdateRestChvRegister = RestOf<PartialUpdateChvRegister>;

export type EntityResponseType = HttpResponse<IChvRegister>;
export type EntityArrayResponseType = HttpResponse<IChvRegister[]>;

@Injectable({ providedIn: 'root' })
export class ChvRegisterService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/chv-registers');

  create(chvRegister: NewChvRegister): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chvRegister);
    return this.http
      .post<RestChvRegister>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(chvRegister: IChvRegister): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chvRegister);
    return this.http
      .put<RestChvRegister>(`${this.resourceUrl}/${this.getChvRegisterIdentifier(chvRegister)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(chvRegister: PartialUpdateChvRegister): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chvRegister);
    return this.http
      .patch<RestChvRegister>(`${this.resourceUrl}/${this.getChvRegisterIdentifier(chvRegister)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestChvRegister>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestChvRegister[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getChvRegisterIdentifier(chvRegister: Pick<IChvRegister, 'id'>): number {
    return chvRegister.id;
  }

  compareChvRegister(o1: Pick<IChvRegister, 'id'> | null, o2: Pick<IChvRegister, 'id'> | null): boolean {
    return o1 && o2 ? this.getChvRegisterIdentifier(o1) === this.getChvRegisterIdentifier(o2) : o1 === o2;
  }

  addChvRegisterToCollectionIfMissing<Type extends Pick<IChvRegister, 'id'>>(
    chvRegisterCollection: Type[],
    ...chvRegistersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const chvRegisters: Type[] = chvRegistersToCheck.filter(isPresent);
    if (chvRegisters.length > 0) {
      const chvRegisterCollectionIdentifiers = chvRegisterCollection.map(chvRegisterItem => this.getChvRegisterIdentifier(chvRegisterItem));
      const chvRegistersToAdd = chvRegisters.filter(chvRegisterItem => {
        const chvRegisterIdentifier = this.getChvRegisterIdentifier(chvRegisterItem);
        if (chvRegisterCollectionIdentifiers.includes(chvRegisterIdentifier)) {
          return false;
        }
        chvRegisterCollectionIdentifiers.push(chvRegisterIdentifier);
        return true;
      });
      return [...chvRegistersToAdd, ...chvRegisterCollection];
    }
    return chvRegisterCollection;
  }

  protected convertDateFromClient<T extends IChvRegister | NewChvRegister | PartialUpdateChvRegister>(chvRegister: T): RestOf<T> {
    return {
      ...chvRegister,
      visitDate: chvRegister.visitDate?.toJSON() ?? null,
      startEntryTime: chvRegister.startEntryTime?.toJSON() ?? null,
      finishedEntryTime: chvRegister.finishedEntryTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restChvRegister: RestChvRegister): IChvRegister {
    return {
      ...restChvRegister,
      visitDate: restChvRegister.visitDate ? dayjs(restChvRegister.visitDate) : undefined,
      startEntryTime: restChvRegister.startEntryTime ? dayjs(restChvRegister.startEntryTime) : undefined,
      finishedEntryTime: restChvRegister.finishedEntryTime ? dayjs(restChvRegister.finishedEntryTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestChvRegister>): HttpResponse<IChvRegister> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestChvRegister[]>): HttpResponse<IChvRegister[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
