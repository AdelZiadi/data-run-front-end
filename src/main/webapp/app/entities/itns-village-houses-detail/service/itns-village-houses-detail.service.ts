import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IItnsVillageHousesDetail, NewItnsVillageHousesDetail } from '../itns-village-houses-detail.model';

export type PartialUpdateItnsVillageHousesDetail = Partial<IItnsVillageHousesDetail> & Pick<IItnsVillageHousesDetail, 'id'>;

export type EntityResponseType = HttpResponse<IItnsVillageHousesDetail>;
export type EntityArrayResponseType = HttpResponse<IItnsVillageHousesDetail[]>;

@Injectable({ providedIn: 'root' })
export class ItnsVillageHousesDetailService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/itns-village-houses-details');

  create(itnsVillageHousesDetail: NewItnsVillageHousesDetail): Observable<EntityResponseType> {
    return this.http.post<IItnsVillageHousesDetail>(this.resourceUrl, itnsVillageHousesDetail, { observe: 'response' });
  }

  update(itnsVillageHousesDetail: IItnsVillageHousesDetail): Observable<EntityResponseType> {
    return this.http.put<IItnsVillageHousesDetail>(
      `${this.resourceUrl}/${this.getItnsVillageHousesDetailIdentifier(itnsVillageHousesDetail)}`,
      itnsVillageHousesDetail,
      { observe: 'response' },
    );
  }

  partialUpdate(itnsVillageHousesDetail: PartialUpdateItnsVillageHousesDetail): Observable<EntityResponseType> {
    return this.http.patch<IItnsVillageHousesDetail>(
      `${this.resourceUrl}/${this.getItnsVillageHousesDetailIdentifier(itnsVillageHousesDetail)}`,
      itnsVillageHousesDetail,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItnsVillageHousesDetail>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItnsVillageHousesDetail[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getItnsVillageHousesDetailIdentifier(itnsVillageHousesDetail: Pick<IItnsVillageHousesDetail, 'id'>): number {
    return itnsVillageHousesDetail.id;
  }

  compareItnsVillageHousesDetail(
    o1: Pick<IItnsVillageHousesDetail, 'id'> | null,
    o2: Pick<IItnsVillageHousesDetail, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getItnsVillageHousesDetailIdentifier(o1) === this.getItnsVillageHousesDetailIdentifier(o2) : o1 === o2;
  }

  addItnsVillageHousesDetailToCollectionIfMissing<Type extends Pick<IItnsVillageHousesDetail, 'id'>>(
    itnsVillageHousesDetailCollection: Type[],
    ...itnsVillageHousesDetailsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const itnsVillageHousesDetails: Type[] = itnsVillageHousesDetailsToCheck.filter(isPresent);
    if (itnsVillageHousesDetails.length > 0) {
      const itnsVillageHousesDetailCollectionIdentifiers = itnsVillageHousesDetailCollection.map(itnsVillageHousesDetailItem =>
        this.getItnsVillageHousesDetailIdentifier(itnsVillageHousesDetailItem),
      );
      const itnsVillageHousesDetailsToAdd = itnsVillageHousesDetails.filter(itnsVillageHousesDetailItem => {
        const itnsVillageHousesDetailIdentifier = this.getItnsVillageHousesDetailIdentifier(itnsVillageHousesDetailItem);
        if (itnsVillageHousesDetailCollectionIdentifiers.includes(itnsVillageHousesDetailIdentifier)) {
          return false;
        }
        itnsVillageHousesDetailCollectionIdentifiers.push(itnsVillageHousesDetailIdentifier);
        return true;
      });
      return [...itnsVillageHousesDetailsToAdd, ...itnsVillageHousesDetailCollection];
    }
    return itnsVillageHousesDetailCollection;
  }
}
