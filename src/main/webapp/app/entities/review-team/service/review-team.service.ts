import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReviewTeam, NewReviewTeam } from '../review-team.model';

export type PartialUpdateReviewTeam = Partial<IReviewTeam> & Pick<IReviewTeam, 'id'>;

export type EntityResponseType = HttpResponse<IReviewTeam>;
export type EntityArrayResponseType = HttpResponse<IReviewTeam[]>;

@Injectable({ providedIn: 'root' })
export class ReviewTeamService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/review-teams');

  create(reviewTeam: NewReviewTeam): Observable<EntityResponseType> {
    return this.http.post<IReviewTeam>(this.resourceUrl, reviewTeam, { observe: 'response' });
  }

  update(reviewTeam: IReviewTeam): Observable<EntityResponseType> {
    return this.http.put<IReviewTeam>(`${this.resourceUrl}/${this.getReviewTeamIdentifier(reviewTeam)}`, reviewTeam, {
      observe: 'response',
    });
  }

  partialUpdate(reviewTeam: PartialUpdateReviewTeam): Observable<EntityResponseType> {
    return this.http.patch<IReviewTeam>(`${this.resourceUrl}/${this.getReviewTeamIdentifier(reviewTeam)}`, reviewTeam, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReviewTeam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReviewTeam[]>(this.resourceUrl, { params: options, observe: 'response' });
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
}
