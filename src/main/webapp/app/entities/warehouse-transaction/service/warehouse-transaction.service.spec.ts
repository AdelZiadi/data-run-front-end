import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWarehouseTransaction } from '../warehouse-transaction.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../warehouse-transaction.test-samples';

import { WarehouseTransactionService, RestWarehouseTransaction } from './warehouse-transaction.service';

const requireRestSample: RestWarehouseTransaction = {
  ...sampleWithRequiredData,
  transactionDate: sampleWithRequiredData.transactionDate?.toJSON(),
  submissionTime: sampleWithRequiredData.submissionTime?.toJSON(),
  startEntryTime: sampleWithRequiredData.startEntryTime?.toJSON(),
  finishedEntryTime: sampleWithRequiredData.finishedEntryTime?.toJSON(),
};

describe('WarehouseTransaction Service', () => {
  let service: WarehouseTransactionService;
  let httpMock: HttpTestingController;
  let expectedResult: IWarehouseTransaction | IWarehouseTransaction[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WarehouseTransactionService);
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

    it('should create a WarehouseTransaction', () => {
      const warehouseTransaction = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(warehouseTransaction).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WarehouseTransaction', () => {
      const warehouseTransaction = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(warehouseTransaction).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WarehouseTransaction', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WarehouseTransaction', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WarehouseTransaction', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWarehouseTransactionToCollectionIfMissing', () => {
      it('should add a WarehouseTransaction to an empty array', () => {
        const warehouseTransaction: IWarehouseTransaction = sampleWithRequiredData;
        expectedResult = service.addWarehouseTransactionToCollectionIfMissing([], warehouseTransaction);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(warehouseTransaction);
      });

      it('should not add a WarehouseTransaction to an array that contains it', () => {
        const warehouseTransaction: IWarehouseTransaction = sampleWithRequiredData;
        const warehouseTransactionCollection: IWarehouseTransaction[] = [
          {
            ...warehouseTransaction,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWarehouseTransactionToCollectionIfMissing(warehouseTransactionCollection, warehouseTransaction);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WarehouseTransaction to an array that doesn't contain it", () => {
        const warehouseTransaction: IWarehouseTransaction = sampleWithRequiredData;
        const warehouseTransactionCollection: IWarehouseTransaction[] = [sampleWithPartialData];
        expectedResult = service.addWarehouseTransactionToCollectionIfMissing(warehouseTransactionCollection, warehouseTransaction);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(warehouseTransaction);
      });

      it('should add only unique WarehouseTransaction to an array', () => {
        const warehouseTransactionArray: IWarehouseTransaction[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const warehouseTransactionCollection: IWarehouseTransaction[] = [sampleWithRequiredData];
        expectedResult = service.addWarehouseTransactionToCollectionIfMissing(warehouseTransactionCollection, ...warehouseTransactionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const warehouseTransaction: IWarehouseTransaction = sampleWithRequiredData;
        const warehouseTransaction2: IWarehouseTransaction = sampleWithPartialData;
        expectedResult = service.addWarehouseTransactionToCollectionIfMissing([], warehouseTransaction, warehouseTransaction2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(warehouseTransaction);
        expect(expectedResult).toContain(warehouseTransaction2);
      });

      it('should accept null and undefined values', () => {
        const warehouseTransaction: IWarehouseTransaction = sampleWithRequiredData;
        expectedResult = service.addWarehouseTransactionToCollectionIfMissing([], null, warehouseTransaction, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(warehouseTransaction);
      });

      it('should return initial array if no WarehouseTransaction is added', () => {
        const warehouseTransactionCollection: IWarehouseTransaction[] = [sampleWithRequiredData];
        expectedResult = service.addWarehouseTransactionToCollectionIfMissing(warehouseTransactionCollection, undefined, null);
        expect(expectedResult).toEqual(warehouseTransactionCollection);
      });
    });

    describe('compareWarehouseTransaction', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWarehouseTransaction(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWarehouseTransaction(entity1, entity2);
        const compareResult2 = service.compareWarehouseTransaction(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWarehouseTransaction(entity1, entity2);
        const compareResult2 = service.compareWarehouseTransaction(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWarehouseTransaction(entity1, entity2);
        const compareResult2 = service.compareWarehouseTransaction(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
