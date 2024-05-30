import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProgressStatus, NewProgressStatus } from '../progress-status.model';

export type PartialUpdateProgressStatus = Partial<IProgressStatus> & Pick<IProgressStatus, 'id'>;

type RestOf<T extends IProgressStatus | NewProgressStatus> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

export type RestProgressStatus = RestOf<IProgressStatus>;

export type NewRestProgressStatus = RestOf<NewProgressStatus>;

export type PartialUpdateRestProgressStatus = RestOf<PartialUpdateProgressStatus>;

export type EntityResponseType = HttpResponse<IProgressStatus>;
export type EntityArrayResponseType = HttpResponse<IProgressStatus[]>;

@Injectable({ providedIn: 'root' })
export class ProgressStatusService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/progress-statuses');

  create(progressStatus: NewProgressStatus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(progressStatus);
    return this.http
      .post<RestProgressStatus>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(progressStatus: IProgressStatus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(progressStatus);
    return this.http
      .put<RestProgressStatus>(`${this.resourceUrl}/${this.getProgressStatusIdentifier(progressStatus)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(progressStatus: PartialUpdateProgressStatus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(progressStatus);
    return this.http
      .patch<RestProgressStatus>(`${this.resourceUrl}/${this.getProgressStatusIdentifier(progressStatus)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestProgressStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestProgressStatus[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProgressStatusIdentifier(progressStatus: Pick<IProgressStatus, 'id'>): number {
    return progressStatus.id;
  }

  compareProgressStatus(o1: Pick<IProgressStatus, 'id'> | null, o2: Pick<IProgressStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getProgressStatusIdentifier(o1) === this.getProgressStatusIdentifier(o2) : o1 === o2;
  }

  addProgressStatusToCollectionIfMissing<Type extends Pick<IProgressStatus, 'id'>>(
    progressStatusCollection: Type[],
    ...progressStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const progressStatuses: Type[] = progressStatusesToCheck.filter(isPresent);
    if (progressStatuses.length > 0) {
      const progressStatusCollectionIdentifiers = progressStatusCollection.map(progressStatusItem =>
        this.getProgressStatusIdentifier(progressStatusItem),
      );
      const progressStatusesToAdd = progressStatuses.filter(progressStatusItem => {
        const progressStatusIdentifier = this.getProgressStatusIdentifier(progressStatusItem);
        if (progressStatusCollectionIdentifiers.includes(progressStatusIdentifier)) {
          return false;
        }
        progressStatusCollectionIdentifiers.push(progressStatusIdentifier);
        return true;
      });
      return [...progressStatusesToAdd, ...progressStatusCollection];
    }
    return progressStatusCollection;
  }

  protected convertDateFromClient<T extends IProgressStatus | NewProgressStatus | PartialUpdateProgressStatus>(
    progressStatus: T,
  ): RestOf<T> {
    return {
      ...progressStatus,
      createdDate: progressStatus.createdDate?.toJSON() ?? null,
      lastModifiedDate: progressStatus.lastModifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restProgressStatus: RestProgressStatus): IProgressStatus {
    return {
      ...restProgressStatus,
      createdDate: restProgressStatus.createdDate ? dayjs(restProgressStatus.createdDate) : undefined,
      lastModifiedDate: restProgressStatus.lastModifiedDate ? dayjs(restProgressStatus.lastModifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestProgressStatus>): HttpResponse<IProgressStatus> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestProgressStatus[]>): HttpResponse<IProgressStatus[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
