import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProgressStatus } from '../progress-status.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../progress-status.test-samples';

import { ProgressStatusService, RestProgressStatus } from './progress-status.service';

const requireRestSample: RestProgressStatus = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
  lastModifiedDate: sampleWithRequiredData.lastModifiedDate?.toJSON(),
};

describe('ProgressStatus Service', () => {
  let service: ProgressStatusService;
  let httpMock: HttpTestingController;
  let expectedResult: IProgressStatus | IProgressStatus[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProgressStatusService);
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

    it('should create a ProgressStatus', () => {
      const progressStatus = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(progressStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProgressStatus', () => {
      const progressStatus = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(progressStatus).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProgressStatus', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProgressStatus', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProgressStatus', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProgressStatusToCollectionIfMissing', () => {
      it('should add a ProgressStatus to an empty array', () => {
        const progressStatus: IProgressStatus = sampleWithRequiredData;
        expectedResult = service.addProgressStatusToCollectionIfMissing([], progressStatus);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(progressStatus);
      });

      it('should not add a ProgressStatus to an array that contains it', () => {
        const progressStatus: IProgressStatus = sampleWithRequiredData;
        const progressStatusCollection: IProgressStatus[] = [
          {
            ...progressStatus,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProgressStatusToCollectionIfMissing(progressStatusCollection, progressStatus);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProgressStatus to an array that doesn't contain it", () => {
        const progressStatus: IProgressStatus = sampleWithRequiredData;
        const progressStatusCollection: IProgressStatus[] = [sampleWithPartialData];
        expectedResult = service.addProgressStatusToCollectionIfMissing(progressStatusCollection, progressStatus);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(progressStatus);
      });

      it('should add only unique ProgressStatus to an array', () => {
        const progressStatusArray: IProgressStatus[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const progressStatusCollection: IProgressStatus[] = [sampleWithRequiredData];
        expectedResult = service.addProgressStatusToCollectionIfMissing(progressStatusCollection, ...progressStatusArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const progressStatus: IProgressStatus = sampleWithRequiredData;
        const progressStatus2: IProgressStatus = sampleWithPartialData;
        expectedResult = service.addProgressStatusToCollectionIfMissing([], progressStatus, progressStatus2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(progressStatus);
        expect(expectedResult).toContain(progressStatus2);
      });

      it('should accept null and undefined values', () => {
        const progressStatus: IProgressStatus = sampleWithRequiredData;
        expectedResult = service.addProgressStatusToCollectionIfMissing([], null, progressStatus, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(progressStatus);
      });

      it('should return initial array if no ProgressStatus is added', () => {
        const progressStatusCollection: IProgressStatus[] = [sampleWithRequiredData];
        expectedResult = service.addProgressStatusToCollectionIfMissing(progressStatusCollection, undefined, null);
        expect(expectedResult).toEqual(progressStatusCollection);
      });
    });

    describe('compareProgressStatus', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProgressStatus(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProgressStatus(entity1, entity2);
        const compareResult2 = service.compareProgressStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProgressStatus(entity1, entity2);
        const compareResult2 = service.compareProgressStatus(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProgressStatus(entity1, entity2);
        const compareResult2 = service.compareProgressStatus(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
