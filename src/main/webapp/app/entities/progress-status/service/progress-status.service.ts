import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProgressStatus, NewProgressStatus } from '../progress-status.model';

export type PartialUpdateProgressStatus = Partial<IProgressStatus> & Pick<IProgressStatus, 'id'>;

export type EntityResponseType = HttpResponse<IProgressStatus>;
export type EntityArrayResponseType = HttpResponse<IProgressStatus[]>;

@Injectable({ providedIn: 'root' })
export class ProgressStatusService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/progress-statuses');

  create(progressStatus: NewProgressStatus): Observable<EntityResponseType> {
    return this.http.post<IProgressStatus>(this.resourceUrl, progressStatus, { observe: 'response' });
  }

  update(progressStatus: IProgressStatus): Observable<EntityResponseType> {
    return this.http.put<IProgressStatus>(`${this.resourceUrl}/${this.getProgressStatusIdentifier(progressStatus)}`, progressStatus, {
      observe: 'response',
    });
  }

  partialUpdate(progressStatus: PartialUpdateProgressStatus): Observable<EntityResponseType> {
    return this.http.patch<IProgressStatus>(`${this.resourceUrl}/${this.getProgressStatusIdentifier(progressStatus)}`, progressStatus, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProgressStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProgressStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
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
}
