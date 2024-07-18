import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRefreshToken, NewRefreshToken } from '../refresh-token.model';

export type PartialUpdateRefreshToken = Partial<IRefreshToken> & Pick<IRefreshToken, 'id'>;

type RestOf<T extends IRefreshToken | NewRefreshToken> = Omit<T, 'expiryDate'> & {
  expiryDate?: string | null;
};

export type RestRefreshToken = RestOf<IRefreshToken>;

export type NewRestRefreshToken = RestOf<NewRefreshToken>;

export type PartialUpdateRestRefreshToken = RestOf<PartialUpdateRefreshToken>;

export type EntityResponseType = HttpResponse<IRefreshToken>;
export type EntityArrayResponseType = HttpResponse<IRefreshToken[]>;

@Injectable({ providedIn: 'root' })
export class RefreshTokenService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/refresh-tokens');

  create(refreshToken: NewRefreshToken): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(refreshToken);
    return this.http
      .post<RestRefreshToken>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(refreshToken: IRefreshToken): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(refreshToken);
    return this.http
      .put<RestRefreshToken>(`${this.resourceUrl}/${this.getRefreshTokenIdentifier(refreshToken)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(refreshToken: PartialUpdateRefreshToken): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(refreshToken);
    return this.http
      .patch<RestRefreshToken>(`${this.resourceUrl}/${this.getRefreshTokenIdentifier(refreshToken)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestRefreshToken>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestRefreshToken[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRefreshTokenIdentifier(refreshToken: Pick<IRefreshToken, 'id'>): number {
    return refreshToken.id;
  }

  compareRefreshToken(o1: Pick<IRefreshToken, 'id'> | null, o2: Pick<IRefreshToken, 'id'> | null): boolean {
    return o1 && o2 ? this.getRefreshTokenIdentifier(o1) === this.getRefreshTokenIdentifier(o2) : o1 === o2;
  }

  addRefreshTokenToCollectionIfMissing<Type extends Pick<IRefreshToken, 'id'>>(
    refreshTokenCollection: Type[],
    ...refreshTokensToCheck: (Type | null | undefined)[]
  ): Type[] {
    const refreshTokens: Type[] = refreshTokensToCheck.filter(isPresent);
    if (refreshTokens.length > 0) {
      const refreshTokenCollectionIdentifiers = refreshTokenCollection.map(refreshTokenItem =>
        this.getRefreshTokenIdentifier(refreshTokenItem),
      );
      const refreshTokensToAdd = refreshTokens.filter(refreshTokenItem => {
        const refreshTokenIdentifier = this.getRefreshTokenIdentifier(refreshTokenItem);
        if (refreshTokenCollectionIdentifiers.includes(refreshTokenIdentifier)) {
          return false;
        }
        refreshTokenCollectionIdentifiers.push(refreshTokenIdentifier);
        return true;
      });
      return [...refreshTokensToAdd, ...refreshTokenCollection];
    }
    return refreshTokenCollection;
  }

  protected convertDateFromClient<T extends IRefreshToken | NewRefreshToken | PartialUpdateRefreshToken>(refreshToken: T): RestOf<T> {
    return {
      ...refreshToken,
      expiryDate: refreshToken.expiryDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restRefreshToken: RestRefreshToken): IRefreshToken {
    return {
      ...restRefreshToken,
      expiryDate: restRefreshToken.expiryDate ? dayjs(restRefreshToken.expiryDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestRefreshToken>): HttpResponse<IRefreshToken> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestRefreshToken[]>): HttpResponse<IRefreshToken[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
