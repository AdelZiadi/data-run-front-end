import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVillageLocation } from '../village-location.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../village-location.test-samples';

import { VillageLocationService } from './village-location.service';

const requireRestSample: IVillageLocation = {
  ...sampleWithRequiredData,
};

describe('VillageLocation Service', () => {
  let service: VillageLocationService;
  let httpMock: HttpTestingController;
  let expectedResult: IVillageLocation | IVillageLocation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VillageLocationService);
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

    it('should create a VillageLocation', () => {
      const villageLocation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(villageLocation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VillageLocation', () => {
      const villageLocation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(villageLocation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a VillageLocation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VillageLocation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a VillageLocation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addVillageLocationToCollectionIfMissing', () => {
      it('should add a VillageLocation to an empty array', () => {
        const villageLocation: IVillageLocation = sampleWithRequiredData;
        expectedResult = service.addVillageLocationToCollectionIfMissing([], villageLocation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(villageLocation);
      });

      it('should not add a VillageLocation to an array that contains it', () => {
        const villageLocation: IVillageLocation = sampleWithRequiredData;
        const villageLocationCollection: IVillageLocation[] = [
          {
            ...villageLocation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addVillageLocationToCollectionIfMissing(villageLocationCollection, villageLocation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VillageLocation to an array that doesn't contain it", () => {
        const villageLocation: IVillageLocation = sampleWithRequiredData;
        const villageLocationCollection: IVillageLocation[] = [sampleWithPartialData];
        expectedResult = service.addVillageLocationToCollectionIfMissing(villageLocationCollection, villageLocation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(villageLocation);
      });

      it('should add only unique VillageLocation to an array', () => {
        const villageLocationArray: IVillageLocation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const villageLocationCollection: IVillageLocation[] = [sampleWithRequiredData];
        expectedResult = service.addVillageLocationToCollectionIfMissing(villageLocationCollection, ...villageLocationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const villageLocation: IVillageLocation = sampleWithRequiredData;
        const villageLocation2: IVillageLocation = sampleWithPartialData;
        expectedResult = service.addVillageLocationToCollectionIfMissing([], villageLocation, villageLocation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(villageLocation);
        expect(expectedResult).toContain(villageLocation2);
      });

      it('should accept null and undefined values', () => {
        const villageLocation: IVillageLocation = sampleWithRequiredData;
        expectedResult = service.addVillageLocationToCollectionIfMissing([], null, villageLocation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(villageLocation);
      });

      it('should return initial array if no VillageLocation is added', () => {
        const villageLocationCollection: IVillageLocation[] = [sampleWithRequiredData];
        expectedResult = service.addVillageLocationToCollectionIfMissing(villageLocationCollection, undefined, null);
        expect(expectedResult).toEqual(villageLocationCollection);
      });
    });

    describe('compareVillageLocation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareVillageLocation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareVillageLocation(entity1, entity2);
        const compareResult2 = service.compareVillageLocation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareVillageLocation(entity1, entity2);
        const compareResult2 = service.compareVillageLocation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareVillageLocation(entity1, entity2);
        const compareResult2 = service.compareVillageLocation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
