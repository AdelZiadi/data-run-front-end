import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWarehouseTransaction } from '../warehouse-transaction.model';
import { WarehouseTransactionService } from '../service/warehouse-transaction.service';

const warehouseTransactionResolve = (route: ActivatedRouteSnapshot): Observable<null | IWarehouseTransaction> => {
  const id = route.params['id'];
  if (id) {
    return inject(WarehouseTransactionService)
      .find(id)
      .pipe(
        mergeMap((warehouseTransaction: HttpResponse<IWarehouseTransaction>) => {
          if (warehouseTransaction.body) {
            return of(warehouseTransaction.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default warehouseTransactionResolve;
