import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWarehouseItem } from '../warehouse-item.model';
import { WarehouseItemService } from '../service/warehouse-item.service';

const warehouseItemResolve = (route: ActivatedRouteSnapshot): Observable<null | IWarehouseItem> => {
  const id = route.params['id'];
  if (id) {
    return inject(WarehouseItemService)
      .find(id)
      .pipe(
        mergeMap((warehouseItem: HttpResponse<IWarehouseItem>) => {
          if (warehouseItem.body) {
            return of(warehouseItem.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default warehouseItemResolve;
