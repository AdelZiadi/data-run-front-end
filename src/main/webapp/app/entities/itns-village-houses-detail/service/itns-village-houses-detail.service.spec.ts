import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IItnsVillageHousesDetail } from '../itns-village-houses-detail.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../itns-village-houses-detail.test-samples';

import { ItnsVillageHousesDetailService } from './itns-village-houses-detail.service';

const requireRestSample: IItnsVillageHousesDetail = {
  ...sampleWithRequiredData,
};

describe('ItnsVillageHousesDetail Service', () => {
  let service: ItnsVillageHousesDetailService;
  let httpMock: HttpTestingController;
  let expectedResult: IItnsVillageHousesDetail | IItnsVillageHousesDetail[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ItnsVillageHousesDetailService);
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

    it('should create a ItnsVillageHousesDetail', () => {
      const itnsVillageHousesDetail = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(itnsVillageHousesDetail).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ItnsVillageHousesDetail', () => {
      const itnsVillageHousesDetail = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(itnsVillageHousesDetail).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ItnsVillageHousesDetail', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ItnsVillageHousesDetail', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ItnsVillageHousesDetail', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addItnsVillageHousesDetailToCollectionIfMissing', () => {
      it('should add a ItnsVillageHousesDetail to an empty array', () => {
        const itnsVillageHousesDetail: IItnsVillageHousesDetail = sampleWithRequiredData;
        expectedResult = service.addItnsVillageHousesDetailToCollectionIfMissing([], itnsVillageHousesDetail);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itnsVillageHousesDetail);
      });

      it('should not add a ItnsVillageHousesDetail to an array that contains it', () => {
        const itnsVillageHousesDetail: IItnsVillageHousesDetail = sampleWithRequiredData;
        const itnsVillageHousesDetailCollection: IItnsVillageHousesDetail[] = [
          {
            ...itnsVillageHousesDetail,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addItnsVillageHousesDetailToCollectionIfMissing(
          itnsVillageHousesDetailCollection,
          itnsVillageHousesDetail,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ItnsVillageHousesDetail to an array that doesn't contain it", () => {
        const itnsVillageHousesDetail: IItnsVillageHousesDetail = sampleWithRequiredData;
        const itnsVillageHousesDetailCollection: IItnsVillageHousesDetail[] = [sampleWithPartialData];
        expectedResult = service.addItnsVillageHousesDetailToCollectionIfMissing(
          itnsVillageHousesDetailCollection,
          itnsVillageHousesDetail,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itnsVillageHousesDetail);
      });

      it('should add only unique ItnsVillageHousesDetail to an array', () => {
        const itnsVillageHousesDetailArray: IItnsVillageHousesDetail[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const itnsVillageHousesDetailCollection: IItnsVillageHousesDetail[] = [sampleWithRequiredData];
        expectedResult = service.addItnsVillageHousesDetailToCollectionIfMissing(
          itnsVillageHousesDetailCollection,
          ...itnsVillageHousesDetailArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const itnsVillageHousesDetail: IItnsVillageHousesDetail = sampleWithRequiredData;
        const itnsVillageHousesDetail2: IItnsVillageHousesDetail = sampleWithPartialData;
        expectedResult = service.addItnsVillageHousesDetailToCollectionIfMissing([], itnsVillageHousesDetail, itnsVillageHousesDetail2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itnsVillageHousesDetail);
        expect(expectedResult).toContain(itnsVillageHousesDetail2);
      });

      it('should accept null and undefined values', () => {
        const itnsVillageHousesDetail: IItnsVillageHousesDetail = sampleWithRequiredData;
        expectedResult = service.addItnsVillageHousesDetailToCollectionIfMissing([], null, itnsVillageHousesDetail, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itnsVillageHousesDetail);
      });

      it('should return initial array if no ItnsVillageHousesDetail is added', () => {
        const itnsVillageHousesDetailCollection: IItnsVillageHousesDetail[] = [sampleWithRequiredData];
        expectedResult = service.addItnsVillageHousesDetailToCollectionIfMissing(itnsVillageHousesDetailCollection, undefined, null);
        expect(expectedResult).toEqual(itnsVillageHousesDetailCollection);
      });
    });

    describe('compareItnsVillageHousesDetail', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareItnsVillageHousesDetail(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareItnsVillageHousesDetail(entity1, entity2);
        const compareResult2 = service.compareItnsVillageHousesDetail(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareItnsVillageHousesDetail(entity1, entity2);
        const compareResult2 = service.compareItnsVillageHousesDetail(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareItnsVillageHousesDetail(entity1, entity2);
        const compareResult2 = service.compareItnsVillageHousesDetail(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
