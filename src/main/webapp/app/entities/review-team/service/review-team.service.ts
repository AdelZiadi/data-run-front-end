import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReviewTeam, NewReviewTeam } from '../review-team.model';

export type PartialUpdateReviewTeam = Partial<IReviewTeam> & Pick<IReviewTeam, 'id'>;

type RestOf<T extends IReviewTeam | NewReviewTeam> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

export type RestReviewTeam = RestOf<IReviewTeam>;

export type NewRestReviewTeam = RestOf<NewReviewTeam>;

export type PartialUpdateRestReviewTeam = RestOf<PartialUpdateReviewTeam>;

export type EntityResponseType = HttpResponse<IReviewTeam>;
export type EntityArrayResponseType = HttpResponse<IReviewTeam[]>;

@Injectable({ providedIn: 'root' })
export class ReviewTeamService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/review-teams');

  create(reviewTeam: NewReviewTeam): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviewTeam);
    return this.http
      .post<RestReviewTeam>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(reviewTeam: IReviewTeam): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviewTeam);
    return this.http
      .put<RestReviewTeam>(`${this.resourceUrl}/${this.getReviewTeamIdentifier(reviewTeam)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(reviewTeam: PartialUpdateReviewTeam): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviewTeam);
    return this.http
      .patch<RestReviewTeam>(`${this.resourceUrl}/${this.getReviewTeamIdentifier(reviewTeam)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestReviewTeam>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestReviewTeam[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getReviewTeamIdentifier(reviewTeam: Pick<IReviewTeam, 'id'>): number {
    return reviewTeam.id;
  }

  compareReviewTeam(o1: Pick<IReviewTeam, 'id'> | null, o2: Pick<IReviewTeam, 'id'> | null): boolean {
    return o1 && o2 ? this.getReviewTeamIdentifier(o1) === this.getReviewTeamIdentifier(o2) : o1 === o2;
  }

  addReviewTeamToCollectionIfMissing<Type extends Pick<IReviewTeam, 'id'>>(
    reviewTeamCollection: Type[],
    ...reviewTeamsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const reviewTeams: Type[] = reviewTeamsToCheck.filter(isPresent);
    if (reviewTeams.length > 0) {
      const reviewTeamCollectionIdentifiers = reviewTeamCollection.map(reviewTeamItem => this.getReviewTeamIdentifier(reviewTeamItem));
      const reviewTeamsToAdd = reviewTeams.filter(reviewTeamItem => {
        const reviewTeamIdentifier = this.getReviewTeamIdentifier(reviewTeamItem);
        if (reviewTeamCollectionIdentifiers.includes(reviewTeamIdentifier)) {
          return false;
        }
        reviewTeamCollectionIdentifiers.push(reviewTeamIdentifier);
        return true;
      });
      return [...reviewTeamsToAdd, ...reviewTeamCollection];
    }
    return reviewTeamCollection;
  }

  protected convertDateFromClient<T extends IReviewTeam | NewReviewTeam | PartialUpdateReviewTeam>(reviewTeam: T): RestOf<T> {
    return {
      ...reviewTeam,
      createdDate: reviewTeam.createdDate?.toJSON() ?? null,
      lastModifiedDate: reviewTeam.lastModifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restReviewTeam: RestReviewTeam): IReviewTeam {
    return {
      ...restReviewTeam,
      createdDate: restReviewTeam.createdDate ? dayjs(restReviewTeam.createdDate) : undefined,
      lastModifiedDate: restReviewTeam.lastModifiedDate ? dayjs(restReviewTeam.lastModifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestReviewTeam>): HttpResponse<IReviewTeam> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestReviewTeam[]>): HttpResponse<IReviewTeam[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
