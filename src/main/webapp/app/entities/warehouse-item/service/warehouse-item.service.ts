import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWarehouseItem, NewWarehouseItem } from '../warehouse-item.model';

export type PartialUpdateWarehouseItem = Partial<IWarehouseItem> & Pick<IWarehouseItem, 'id'>;

type RestOf<T extends IWarehouseItem | NewWarehouseItem> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

export type RestWarehouseItem = RestOf<IWarehouseItem>;

export type NewRestWarehouseItem = RestOf<NewWarehouseItem>;

export type PartialUpdateRestWarehouseItem = RestOf<PartialUpdateWarehouseItem>;

export type EntityResponseType = HttpResponse<IWarehouseItem>;
export type EntityArrayResponseType = HttpResponse<IWarehouseItem[]>;

@Injectable({ providedIn: 'root' })
export class WarehouseItemService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/warehouse-items');

  create(warehouseItem: NewWarehouseItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(warehouseItem);
    return this.http
      .post<RestWarehouseItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(warehouseItem: IWarehouseItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(warehouseItem);
    return this.http
      .put<RestWarehouseItem>(`${this.resourceUrl}/${this.getWarehouseItemIdentifier(warehouseItem)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(warehouseItem: PartialUpdateWarehouseItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(warehouseItem);
    return this.http
      .patch<RestWarehouseItem>(`${this.resourceUrl}/${this.getWarehouseItemIdentifier(warehouseItem)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestWarehouseItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestWarehouseItem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWarehouseItemIdentifier(warehouseItem: Pick<IWarehouseItem, 'id'>): number {
    return warehouseItem.id;
  }

  compareWarehouseItem(o1: Pick<IWarehouseItem, 'id'> | null, o2: Pick<IWarehouseItem, 'id'> | null): boolean {
    return o1 && o2 ? this.getWarehouseItemIdentifier(o1) === this.getWarehouseItemIdentifier(o2) : o1 === o2;
  }

  addWarehouseItemToCollectionIfMissing<Type extends Pick<IWarehouseItem, 'id'>>(
    warehouseItemCollection: Type[],
    ...warehouseItemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const warehouseItems: Type[] = warehouseItemsToCheck.filter(isPresent);
    if (warehouseItems.length > 0) {
      const warehouseItemCollectionIdentifiers = warehouseItemCollection.map(warehouseItemItem =>
        this.getWarehouseItemIdentifier(warehouseItemItem),
      );
      const warehouseItemsToAdd = warehouseItems.filter(warehouseItemItem => {
        const warehouseItemIdentifier = this.getWarehouseItemIdentifier(warehouseItemItem);
        if (warehouseItemCollectionIdentifiers.includes(warehouseItemIdentifier)) {
          return false;
        }
        warehouseItemCollectionIdentifiers.push(warehouseItemIdentifier);
        return true;
      });
      return [...warehouseItemsToAdd, ...warehouseItemCollection];
    }
    return warehouseItemCollection;
  }

  protected convertDateFromClient<T extends IWarehouseItem | NewWarehouseItem | PartialUpdateWarehouseItem>(warehouseItem: T): RestOf<T> {
    return {
      ...warehouseItem,
      createdDate: warehouseItem.createdDate?.toJSON() ?? null,
      lastModifiedDate: warehouseItem.lastModifiedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restWarehouseItem: RestWarehouseItem): IWarehouseItem {
    return {
      ...restWarehouseItem,
      createdDate: restWarehouseItem.createdDate ? dayjs(restWarehouseItem.createdDate) : undefined,
      lastModifiedDate: restWarehouseItem.lastModifiedDate ? dayjs(restWarehouseItem.lastModifiedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestWarehouseItem>): HttpResponse<IWarehouseItem> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestWarehouseItem[]>): HttpResponse<IWarehouseItem[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
