import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITeamFormAccess, NewTeamFormAccess } from '../team-form-access.model';

export type PartialUpdateTeamFormAccess = Partial<ITeamFormAccess> & Pick<ITeamFormAccess, 'id'>;

type RestOf<T extends ITeamFormAccess | NewTeamFormAccess> = Omit<T, 'sessionDate' | 'startEntryTime' | 'finishedEntryTime'> & {
  sessionDate?: string | null;
  startEntryTime?: string | null;
  finishedEntryTime?: string | null;
};

export type RestTeamFormAccess = RestOf<ITeamFormAccess>;

export type NewRestTeamFormAccess = RestOf<NewTeamFormAccess>;

export type PartialUpdateRestTeamFormAccess = RestOf<PartialUpdateTeamFormAccess>;

export type EntityResponseType = HttpResponse<ITeamFormAccess>;
export type EntityArrayResponseType = HttpResponse<ITeamFormAccess[]>;

@Injectable({ providedIn: 'root' })
export class TeamFormAccessService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/team-form-accesses');

  create(teamFormAccess: NewTeamFormAccess): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(teamFormAccess);
    return this.http
      .post<RestTeamFormAccess>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(teamFormAccess: ITeamFormAccess): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(teamFormAccess);
    return this.http
      .put<RestTeamFormAccess>(`${this.resourceUrl}/${this.getTeamFormAccessIdentifier(teamFormAccess)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(teamFormAccess: PartialUpdateTeamFormAccess): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(teamFormAccess);
    return this.http
      .patch<RestTeamFormAccess>(`${this.resourceUrl}/${this.getTeamFormAccessIdentifier(teamFormAccess)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTeamFormAccess>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTeamFormAccess[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTeamFormAccessIdentifier(teamFormAccess: Pick<ITeamFormAccess, 'id'>): number {
    return teamFormAccess.id;
  }

  compareTeamFormAccess(o1: Pick<ITeamFormAccess, 'id'> | null, o2: Pick<ITeamFormAccess, 'id'> | null): boolean {
    return o1 && o2 ? this.getTeamFormAccessIdentifier(o1) === this.getTeamFormAccessIdentifier(o2) : o1 === o2;
  }

  addTeamFormAccessToCollectionIfMissing<Type extends Pick<ITeamFormAccess, 'id'>>(
    teamFormAccessCollection: Type[],
    ...teamFormAccessesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const teamFormAccesses: Type[] = teamFormAccessesToCheck.filter(isPresent);
    if (teamFormAccesses.length > 0) {
      const teamFormAccessCollectionIdentifiers = teamFormAccessCollection.map(teamFormAccessItem =>
        this.getTeamFormAccessIdentifier(teamFormAccessItem),
      );
      const teamFormAccessesToAdd = teamFormAccesses.filter(teamFormAccessItem => {
        const teamFormAccessIdentifier = this.getTeamFormAccessIdentifier(teamFormAccessItem);
        if (teamFormAccessCollectionIdentifiers.includes(teamFormAccessIdentifier)) {
          return false;
        }
        teamFormAccessCollectionIdentifiers.push(teamFormAccessIdentifier);
        return true;
      });
      return [...teamFormAccessesToAdd, ...teamFormAccessCollection];
    }
    return teamFormAccessCollection;
  }

  protected convertDateFromClient<T extends ITeamFormAccess | NewTeamFormAccess | PartialUpdateTeamFormAccess>(
    teamFormAccess: T,
  ): RestOf<T> {
    return {
      ...teamFormAccess,
      sessionDate: teamFormAccess.sessionDate?.toJSON() ?? null,
      startEntryTime: teamFormAccess.startEntryTime?.toJSON() ?? null,
      finishedEntryTime: teamFormAccess.finishedEntryTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTeamFormAccess: RestTeamFormAccess): ITeamFormAccess {
    return {
      ...restTeamFormAccess,
      sessionDate: restTeamFormAccess.sessionDate ? dayjs(restTeamFormAccess.sessionDate) : undefined,
      startEntryTime: restTeamFormAccess.startEntryTime ? dayjs(restTeamFormAccess.startEntryTime) : undefined,
      finishedEntryTime: restTeamFormAccess.finishedEntryTime ? dayjs(restTeamFormAccess.finishedEntryTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTeamFormAccess>): HttpResponse<ITeamFormAccess> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTeamFormAccess[]>): HttpResponse<ITeamFormAccess[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
