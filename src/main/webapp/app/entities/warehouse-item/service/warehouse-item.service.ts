import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWarehouseItem, NewWarehouseItem } from '../warehouse-item.model';

export type PartialUpdateWarehouseItem = Partial<IWarehouseItem> & Pick<IWarehouseItem, 'id'>;

export type EntityResponseType = HttpResponse<IWarehouseItem>;
export type EntityArrayResponseType = HttpResponse<IWarehouseItem[]>;

@Injectable({ providedIn: 'root' })
export class WarehouseItemService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/warehouse-items');

  create(warehouseItem: NewWarehouseItem): Observable<EntityResponseType> {
    return this.http.post<IWarehouseItem>(this.resourceUrl, warehouseItem, { observe: 'response' });
  }

  update(warehouseItem: IWarehouseItem): Observable<EntityResponseType> {
    return this.http.put<IWarehouseItem>(`${this.resourceUrl}/${this.getWarehouseItemIdentifier(warehouseItem)}`, warehouseItem, {
      observe: 'response',
    });
  }

  partialUpdate(warehouseItem: PartialUpdateWarehouseItem): Observable<EntityResponseType> {
    return this.http.patch<IWarehouseItem>(`${this.resourceUrl}/${this.getWarehouseItemIdentifier(warehouseItem)}`, warehouseItem, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWarehouseItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWarehouseItem[]>(this.resourceUrl, { params: options, observe: 'response' });
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
}
