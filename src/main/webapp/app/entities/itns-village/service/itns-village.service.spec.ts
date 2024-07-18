import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IItnsVillage } from '../itns-village.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../itns-village.test-samples';

import { ItnsVillageService, RestItnsVillage } from './itns-village.service';

const requireRestSample: RestItnsVillage = {
  ...sampleWithRequiredData,
  workDayDate: sampleWithRequiredData.workDayDate?.toJSON(),
  locationCaptureTime: sampleWithRequiredData.locationCaptureTime?.toJSON(),
  submissionTime: sampleWithRequiredData.submissionTime?.toJSON(),
  startEntryTime: sampleWithRequiredData.startEntryTime?.toJSON(),
  finishedEntryTime: sampleWithRequiredData.finishedEntryTime?.toJSON(),
};

describe('ItnsVillage Service', () => {
  let service: ItnsVillageService;
  let httpMock: HttpTestingController;
  let expectedResult: IItnsVillage | IItnsVillage[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ItnsVillageService);
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

    it('should create a ItnsVillage', () => {
      const itnsVillage = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(itnsVillage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ItnsVillage', () => {
      const itnsVillage = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(itnsVillage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ItnsVillage', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ItnsVillage', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ItnsVillage', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addItnsVillageToCollectionIfMissing', () => {
      it('should add a ItnsVillage to an empty array', () => {
        const itnsVillage: IItnsVillage = sampleWithRequiredData;
        expectedResult = service.addItnsVillageToCollectionIfMissing([], itnsVillage);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itnsVillage);
      });

      it('should not add a ItnsVillage to an array that contains it', () => {
        const itnsVillage: IItnsVillage = sampleWithRequiredData;
        const itnsVillageCollection: IItnsVillage[] = [
          {
            ...itnsVillage,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addItnsVillageToCollectionIfMissing(itnsVillageCollection, itnsVillage);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ItnsVillage to an array that doesn't contain it", () => {
        const itnsVillage: IItnsVillage = sampleWithRequiredData;
        const itnsVillageCollection: IItnsVillage[] = [sampleWithPartialData];
        expectedResult = service.addItnsVillageToCollectionIfMissing(itnsVillageCollection, itnsVillage);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itnsVillage);
      });

      it('should add only unique ItnsVillage to an array', () => {
        const itnsVillageArray: IItnsVillage[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const itnsVillageCollection: IItnsVillage[] = [sampleWithRequiredData];
        expectedResult = service.addItnsVillageToCollectionIfMissing(itnsVillageCollection, ...itnsVillageArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const itnsVillage: IItnsVillage = sampleWithRequiredData;
        const itnsVillage2: IItnsVillage = sampleWithPartialData;
        expectedResult = service.addItnsVillageToCollectionIfMissing([], itnsVillage, itnsVillage2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(itnsVillage);
        expect(expectedResult).toContain(itnsVillage2);
      });

      it('should accept null and undefined values', () => {
        const itnsVillage: IItnsVillage = sampleWithRequiredData;
        expectedResult = service.addItnsVillageToCollectionIfMissing([], null, itnsVillage, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(itnsVillage);
      });

      it('should return initial array if no ItnsVillage is added', () => {
        const itnsVillageCollection: IItnsVillage[] = [sampleWithRequiredData];
        expectedResult = service.addItnsVillageToCollectionIfMissing(itnsVillageCollection, undefined, null);
        expect(expectedResult).toEqual(itnsVillageCollection);
      });
    });

    describe('compareItnsVillage', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareItnsVillage(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareItnsVillage(entity1, entity2);
        const compareResult2 = service.compareItnsVillage(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareItnsVillage(entity1, entity2);
        const compareResult2 = service.compareItnsVillage(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareItnsVillage(entity1, entity2);
        const compareResult2 = service.compareItnsVillage(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
