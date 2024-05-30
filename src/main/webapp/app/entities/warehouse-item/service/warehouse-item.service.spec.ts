import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWarehouseItem } from '../warehouse-item.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../warehouse-item.test-samples';

import { WarehouseItemService, RestWarehouseItem } from './warehouse-item.service';

const requireRestSample: RestWarehouseItem = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
  lastModifiedDate: sampleWithRequiredData.lastModifiedDate?.toJSON(),
};

describe('WarehouseItem Service', () => {
  let service: WarehouseItemService;
  let httpMock: HttpTestingController;
  let expectedResult: IWarehouseItem | IWarehouseItem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WarehouseItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a WarehouseItem', () => {
      const warehouseItem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(warehouseItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WarehouseItem', () => {
      const warehouseItem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(warehouseItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WarehouseItem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WarehouseItem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WarehouseItem', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWarehouseItemToCollectionIfMissing', () => {
      it('should add a WarehouseItem to an empty array', () => {
        const warehouseItem: IWarehouseItem = sampleWithRequiredData;
        expectedResult = service.addWarehouseItemToCollectionIfMissing([], warehouseItem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(warehouseItem);
      });

      it('should not add a WarehouseItem to an array that contains it', () => {
        const warehouseItem: IWarehouseItem = sampleWithRequiredData;
        const warehouseItemCollection: IWarehouseItem[] = [
          {
            ...warehouseItem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWarehouseItemToCollectionIfMissing(warehouseItemCollection, warehouseItem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WarehouseItem to an array that doesn't contain it", () => {
        const warehouseItem: IWarehouseItem = sampleWithRequiredData;
        const warehouseItemCollection: IWarehouseItem[] = [sampleWithPartialData];
        expectedResult = service.addWarehouseItemToCollectionIfMissing(warehouseItemCollection, warehouseItem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(warehouseItem);
      });

      it('should add only unique WarehouseItem to an array', () => {
        const warehouseItemArray: IWarehouseItem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const warehouseItemCollection: IWarehouseItem[] = [sampleWithRequiredData];
        expectedResult = service.addWarehouseItemToCollectionIfMissing(warehouseItemCollection, ...warehouseItemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const warehouseItem: IWarehouseItem = sampleWithRequiredData;
        const warehouseItem2: IWarehouseItem = sampleWithPartialData;
        expectedResult = service.addWarehouseItemToCollectionIfMissing([], warehouseItem, warehouseItem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(warehouseItem);
        expect(expectedResult).toContain(warehouseItem2);
      });

      it('should accept null and undefined values', () => {
        const warehouseItem: IWarehouseItem = sampleWithRequiredData;
        expectedResult = service.addWarehouseItemToCollectionIfMissing([], null, warehouseItem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(warehouseItem);
      });

      it('should return initial array if no WarehouseItem is added', () => {
        const warehouseItemCollection: IWarehouseItem[] = [sampleWithRequiredData];
        expectedResult = service.addWarehouseItemToCollectionIfMissing(warehouseItemCollection, undefined, null);
        expect(expectedResult).toEqual(warehouseItemCollection);
      });
    });

    describe('compareWarehouseItem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWarehouseItem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWarehouseItem(entity1, entity2);
        const compareResult2 = service.compareWarehouseItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWarehouseItem(entity1, entity2);
        const compareResult2 = service.compareWarehouseItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWarehouseItem(entity1, entity2);
        const compareResult2 = service.compareWarehouseItem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
