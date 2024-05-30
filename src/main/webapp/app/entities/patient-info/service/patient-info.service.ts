import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPatientInfo, NewPatientInfo } from '../patient-info.model';

export type PartialUpdatePatientInfo = Partial<IPatientInfo> & Pick<IPatientInfo, 'id'>;

type RestOf<T extends IPatientInfo | NewPatientInfo> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

export type RestPatientInfo = RestOf<IPatientInfo>;

export type NewRestPatientInfo = RestOf<NewPatientInfo>;

export type PartialUpdateRestPatientInfo = RestOf<PartialUpdatePatientInfo>;

export type EntityResponseType = HttpResponse<IPatientInfo>;
export type EntityArrayResponseType = HttpResponse<IPatientInfo[]>;

@Injectable({ providedIn: 'root' })
export class PatientInfoService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/patient-infos');

  create(patientInfo: NewPatientInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(patientInfo);
    return this.http
      .post<RestPatientInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(patientInfo: IPatientInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(patientInfo);
    return this.http
      .put<RestPatientInfo>(`${this.resourceUrl}/${this.getPatientInfoIdentifier(patientInfo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(patientInfo: PartialUpdatePatientInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(patientInfo);
    return this.http
      .patch<RestPatientInfo>(`${this.resourceUrl}/${this.getPatientInfoIdentifier(patientInfo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPatientInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPatientInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPatientInfoIdentifier(patientInfo: Pick<IPatientInfo, 'id'>): number {
    return patientInfo.id;
  }

  comparePatientInfo(o1: Pick<IPatientInfo, 'id'> | null, o2: Pick<IPatientInfo, 'id'> | null): boolean {
    return o1 && o2 ? this.getPatientInfoIdentifier(o1) === this.getPatientInfoIdentifier(o2) : o1 === o2;
  }

  addPatientInfoToCollectionIfMissing<Type extends Pick<IPatientInfo, 'id'>>(
    patientInfoCollection: Type[],
    ...patientInfosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const patientInfos: Type[] = patientInfosToCheck.filter(isPresent);
    if (patientInfos.length > 0) {
      const patientInfoCollectionIdentifiers = patientInfoCollection.map(patientInfoItem => this.getPatientInfoIdentifier(patientInfoItem));
      const patientInfosToAdd = patientInfos.filter(patientInfoItem => {
        const patientInfoIdentifier = this.getPatientInfoIdentifier(patientInfoItem);
        if (patientInfoCollectionIdentifiers.includes(patientInfoIdentifier)) {
          return false;
        }
        patientInfoCollectionIdentifiers.push(patientInfoIdentifier);
        return true;
      });
      return [...patientInfosToAdd, ...patientInfoCollection];
    }
    return patientInfoCollection;
  }

  protected convertDateFromClient<T extends IPatientInfo | NewPatientInfo | PartialUpdatePatientInfo>(patientInfo: T): RestOf<T> {
    return {
      ...patientInfo,
      createdDate: patientInfo.createdDate?.toJSON() ?? null,
      lastModifiedDate: patientInfo.lastModifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPatientInfo: RestPatientInfo): IPatientInfo {
    return {
      ...restPatientInfo,
      createdDate: restPatientInfo.createdDate ? dayjs(restPatientInfo.createdDate) : undefined,
      lastModifiedDate: restPatientInfo.lastModifiedDate ? dayjs(restPatientInfo.lastModifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPatientInfo>): HttpResponse<IPatientInfo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPatientInfo[]>): HttpResponse<IPatientInfo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
