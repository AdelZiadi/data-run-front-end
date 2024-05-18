import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICampaignType, NewCampaignType } from '../campaign-type.model';

export type PartialUpdateCampaignType = Partial<ICampaignType> & Pick<ICampaignType, 'id'>;

export type EntityResponseType = HttpResponse<ICampaignType>;
export type EntityArrayResponseType = HttpResponse<ICampaignType[]>;

@Injectable({ providedIn: 'root' })
export class CampaignTypeService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/campaign-types');

  create(campaignType: NewCampaignType): Observable<EntityResponseType> {
    return this.http.post<ICampaignType>(this.resourceUrl, campaignType, { observe: 'response' });
  }

  update(campaignType: ICampaignType): Observable<EntityResponseType> {
    return this.http.put<ICampaignType>(`${this.resourceUrl}/${this.getCampaignTypeIdentifier(campaignType)}`, campaignType, {
      observe: 'response',
    });
  }

  partialUpdate(campaignType: PartialUpdateCampaignType): Observable<EntityResponseType> {
    return this.http.patch<ICampaignType>(`${this.resourceUrl}/${this.getCampaignTypeIdentifier(campaignType)}`, campaignType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICampaignType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICampaignType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCampaignTypeIdentifier(campaignType: Pick<ICampaignType, 'id'>): number {
    return campaignType.id;
  }

  compareCampaignType(o1: Pick<ICampaignType, 'id'> | null, o2: Pick<ICampaignType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCampaignTypeIdentifier(o1) === this.getCampaignTypeIdentifier(o2) : o1 === o2;
  }

  addCampaignTypeToCollectionIfMissing<Type extends Pick<ICampaignType, 'id'>>(
    campaignTypeCollection: Type[],
    ...campaignTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const campaignTypes: Type[] = campaignTypesToCheck.filter(isPresent);
    if (campaignTypes.length > 0) {
      const campaignTypeCollectionIdentifiers = campaignTypeCollection.map(campaignTypeItem =>
        this.getCampaignTypeIdentifier(campaignTypeItem),
      );
      const campaignTypesToAdd = campaignTypes.filter(campaignTypeItem => {
        const campaignTypeIdentifier = this.getCampaignTypeIdentifier(campaignTypeItem);
        if (campaignTypeCollectionIdentifiers.includes(campaignTypeIdentifier)) {
          return false;
        }
        campaignTypeCollectionIdentifiers.push(campaignTypeIdentifier);
        return true;
      });
      return [...campaignTypesToAdd, ...campaignTypeCollection];
    }
    return campaignTypeCollection;
  }
}
