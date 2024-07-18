import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWarehouseTransaction, NewWarehouseTransaction } from '../warehouse-transaction.model';

export type PartialUpdateWarehouseTransaction = Partial<IWarehouseTransaction> & Pick<IWarehouseTransaction, 'id'>;

type RestOf<T extends IWarehouseTransaction | NewWarehouseTransaction> = Omit<
  T,
  'transactionDate' | 'submissionTime' | 'startEntryTime' | 'finishedEntryTime'
> & {
  transactionDate?: string | null;
  submissionTime?: string | null;
  startEntryTime?: string | null;
  finishedEntryTime?: string | null;
};

export type RestWarehouseTransaction = RestOf<IWarehouseTransaction>;

export type NewRestWarehouseTransaction = RestOf<NewWarehouseTransaction>;

export type PartialUpdateRestWarehouseTransaction = RestOf<PartialUpdateWarehouseTransaction>;

export type EntityResponseType = HttpResponse<IWarehouseTransaction>;
export type EntityArrayResponseType = HttpResponse<IWarehouseTransaction[]>;

@Injectable({ providedIn: 'root' })
export class WarehouseTransactionService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/warehouse-transactions');

  create(warehouseTransaction: NewWarehouseTransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(warehouseTransaction);
    return this.http
      .post<RestWarehouseTransaction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(warehouseTransaction: IWarehouseTransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(warehouseTransaction);
    return this.http
      .put<RestWarehouseTransaction>(`${this.resourceUrl}/${this.getWarehouseTransactionIdentifier(warehouseTransaction)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(warehouseTransaction: PartialUpdateWarehouseTransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(warehouseTransaction);
    return this.http
      .patch<RestWarehouseTransaction>(`${this.resourceUrl}/${this.getWarehouseTransactionIdentifier(warehouseTransaction)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestWarehouseTransaction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestWarehouseTransaction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWarehouseTransactionIdentifier(warehouseTransaction: Pick<IWarehouseTransaction, 'id'>): number {
    return warehouseTransaction.id;
  }

  compareWarehouseTransaction(o1: Pick<IWarehouseTransaction, 'id'> | null, o2: Pick<IWarehouseTransaction, 'id'> | null): boolean {
    return o1 && o2 ? this.getWarehouseTransactionIdentifier(o1) === this.getWarehouseTransactionIdentifier(o2) : o1 === o2;
  }

  addWarehouseTransactionToCollectionIfMissing<Type extends Pick<IWarehouseTransaction, 'id'>>(
    warehouseTransactionCollection: Type[],
    ...warehouseTransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const warehouseTransactions: Type[] = warehouseTransactionsToCheck.filter(isPresent);
    if (warehouseTransactions.length > 0) {
      const warehouseTransactionCollectionIdentifiers = warehouseTransactionCollection.map(warehouseTransactionItem =>
        this.getWarehouseTransactionIdentifier(warehouseTransactionItem),
      );
      const warehouseTransactionsToAdd = warehouseTransactions.filter(warehouseTransactionItem => {
        const warehouseTransactionIdentifier = this.getWarehouseTransactionIdentifier(warehouseTransactionItem);
        if (warehouseTransactionCollectionIdentifiers.includes(warehouseTransactionIdentifier)) {
          return false;
        }
        warehouseTransactionCollectionIdentifiers.push(warehouseTransactionIdentifier);
        return true;
      });
      return [...warehouseTransactionsToAdd, ...warehouseTransactionCollection];
    }
    return warehouseTransactionCollection;
  }

  protected convertDateFromClient<T extends IWarehouseTransaction | NewWarehouseTransaction | PartialUpdateWarehouseTransaction>(
    warehouseTransaction: T,
  ): RestOf<T> {
    return {
      ...warehouseTransaction,
      transactionDate: warehouseTransaction.transactionDate?.toJSON() ?? null,
      submissionTime: warehouseTransaction.submissionTime?.toJSON() ?? null,
      startEntryTime: warehouseTransaction.startEntryTime?.toJSON() ?? null,
      finishedEntryTime: warehouseTransaction.finishedEntryTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restWarehouseTransaction: RestWarehouseTransaction): IWarehouseTransaction {
    return {
      ...restWarehouseTransaction,
      transactionDate: restWarehouseTransaction.transactionDate ? dayjs(restWarehouseTransaction.transactionDate) : undefined,
      submissionTime: restWarehouseTransaction.submissionTime ? dayjs(restWarehouseTransaction.submissionTime) : undefined,
      startEntryTime: restWarehouseTransaction.startEntryTime ? dayjs(restWarehouseTransaction.startEntryTime) : undefined,
      finishedEntryTime: restWarehouseTransaction.finishedEntryTime ? dayjs(restWarehouseTransaction.finishedEntryTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestWarehouseTransaction>): HttpResponse<IWarehouseTransaction> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestWarehouseTransaction[]>): HttpResponse<IWarehouseTransaction[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
