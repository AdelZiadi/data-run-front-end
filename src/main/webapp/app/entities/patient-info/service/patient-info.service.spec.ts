import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPatientInfo } from '../patient-info.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../patient-info.test-samples';

import { PatientInfoService, RestPatientInfo } from './patient-info.service';

const requireRestSample: RestPatientInfo = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
  lastModifiedDate: sampleWithRequiredData.lastModifiedDate?.toJSON(),
};

describe('PatientInfo Service', () => {
  let service: PatientInfoService;
  let httpMock: HttpTestingController;
  let expectedResult: IPatientInfo | IPatientInfo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PatientInfoService);
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

    it('should create a PatientInfo', () => {
      const patientInfo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(patientInfo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PatientInfo', () => {
      const patientInfo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(patientInfo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PatientInfo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PatientInfo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PatientInfo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPatientInfoToCollectionIfMissing', () => {
      it('should add a PatientInfo to an empty array', () => {
        const patientInfo: IPatientInfo = sampleWithRequiredData;
        expectedResult = service.addPatientInfoToCollectionIfMissing([], patientInfo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(patientInfo);
      });

      it('should not add a PatientInfo to an array that contains it', () => {
        const patientInfo: IPatientInfo = sampleWithRequiredData;
        const patientInfoCollection: IPatientInfo[] = [
          {
            ...patientInfo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPatientInfoToCollectionIfMissing(patientInfoCollection, patientInfo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PatientInfo to an array that doesn't contain it", () => {
        const patientInfo: IPatientInfo = sampleWithRequiredData;
        const patientInfoCollection: IPatientInfo[] = [sampleWithPartialData];
        expectedResult = service.addPatientInfoToCollectionIfMissing(patientInfoCollection, patientInfo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(patientInfo);
      });

      it('should add only unique PatientInfo to an array', () => {
        const patientInfoArray: IPatientInfo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const patientInfoCollection: IPatientInfo[] = [sampleWithRequiredData];
        expectedResult = service.addPatientInfoToCollectionIfMissing(patientInfoCollection, ...patientInfoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const patientInfo: IPatientInfo = sampleWithRequiredData;
        const patientInfo2: IPatientInfo = sampleWithPartialData;
        expectedResult = service.addPatientInfoToCollectionIfMissing([], patientInfo, patientInfo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(patientInfo);
        expect(expectedResult).toContain(patientInfo2);
      });

      it('should accept null and undefined values', () => {
        const patientInfo: IPatientInfo = sampleWithRequiredData;
        expectedResult = service.addPatientInfoToCollectionIfMissing([], null, patientInfo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(patientInfo);
      });

      it('should return initial array if no PatientInfo is added', () => {
        const patientInfoCollection: IPatientInfo[] = [sampleWithRequiredData];
        expectedResult = service.addPatientInfoToCollectionIfMissing(patientInfoCollection, undefined, null);
        expect(expectedResult).toEqual(patientInfoCollection);
      });
    });

    describe('comparePatientInfo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePatientInfo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePatientInfo(entity1, entity2);
        const compareResult2 = service.comparePatientInfo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePatientInfo(entity1, entity2);
        const compareResult2 = service.comparePatientInfo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePatientInfo(entity1, entity2);
        const compareResult2 = service.comparePatientInfo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
