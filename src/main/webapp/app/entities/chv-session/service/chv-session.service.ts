import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChvSession, NewChvSession } from '../chv-session.model';

export type PartialUpdateChvSession = Partial<IChvSession> & Pick<IChvSession, 'id'>;

type RestOf<T extends IChvSession | NewChvSession> = Omit<T, 'sessionDate' | 'startEntryTime' | 'finishedEntryTime'> & {
  sessionDate?: string | null;
  startEntryTime?: string | null;
  finishedEntryTime?: string | null;
};

export type RestChvSession = RestOf<IChvSession>;

export type NewRestChvSession = RestOf<NewChvSession>;

export type PartialUpdateRestChvSession = RestOf<PartialUpdateChvSession>;

export type EntityResponseType = HttpResponse<IChvSession>;
export type EntityArrayResponseType = HttpResponse<IChvSession[]>;

@Injectable({ providedIn: 'root' })
export class ChvSessionService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/chv-sessions');

  create(chvSession: NewChvSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chvSession);
    return this.http
      .post<RestChvSession>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(chvSession: IChvSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chvSession);
    return this.http
      .put<RestChvSession>(`${this.resourceUrl}/${this.getChvSessionIdentifier(chvSession)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(chvSession: PartialUpdateChvSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chvSession);
    return this.http
      .patch<RestChvSession>(`${this.resourceUrl}/${this.getChvSessionIdentifier(chvSession)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestChvSession>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestChvSession[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getChvSessionIdentifier(chvSession: Pick<IChvSession, 'id'>): number {
    return chvSession.id;
  }

  compareChvSession(o1: Pick<IChvSession, 'id'> | null, o2: Pick<IChvSession, 'id'> | null): boolean {
    return o1 && o2 ? this.getChvSessionIdentifier(o1) === this.getChvSessionIdentifier(o2) : o1 === o2;
  }

  addChvSessionToCollectionIfMissing<Type extends Pick<IChvSession, 'id'>>(
    chvSessionCollection: Type[],
    ...chvSessionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const chvSessions: Type[] = chvSessionsToCheck.filter(isPresent);
    if (chvSessions.length > 0) {
      const chvSessionCollectionIdentifiers = chvSessionCollection.map(chvSessionItem => this.getChvSessionIdentifier(chvSessionItem));
      const chvSessionsToAdd = chvSessions.filter(chvSessionItem => {
        const chvSessionIdentifier = this.getChvSessionIdentifier(chvSessionItem);
        if (chvSessionCollectionIdentifiers.includes(chvSessionIdentifier)) {
          return false;
        }
        chvSessionCollectionIdentifiers.push(chvSessionIdentifier);
        return true;
      });
      return [...chvSessionsToAdd, ...chvSessionCollection];
    }
    return chvSessionCollection;
  }

  protected convertDateFromClient<T extends IChvSession | NewChvSession | PartialUpdateChvSession>(chvSession: T): RestOf<T> {
    return {
      ...chvSession,
      sessionDate: chvSession.sessionDate?.toJSON() ?? null,
      startEntryTime: chvSession.startEntryTime?.toJSON() ?? null,
      finishedEntryTime: chvSession.finishedEntryTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restChvSession: RestChvSession): IChvSession {
    return {
      ...restChvSession,
      sessionDate: restChvSession.sessionDate ? dayjs(restChvSession.sessionDate) : undefined,
      startEntryTime: restChvSession.startEntryTime ? dayjs(restChvSession.startEntryTime) : undefined,
      finishedEntryTime: restChvSession.finishedEntryTime ? dayjs(restChvSession.finishedEntryTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestChvSession>): HttpResponse<IChvSession> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestChvSession[]>): HttpResponse<IChvSession[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
