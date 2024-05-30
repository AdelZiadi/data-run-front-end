import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../patient-info.test-samples';

import { PatientInfoFormService } from './patient-info-form.service';

describe('PatientInfo Form Service', () => {
  let service: PatientInfoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientInfoFormService);
  });

  describe('Service methods', () => {
    describe('createPatientInfoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPatientInfoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            age: expect.any(Object),
            gender: expect.any(Object),
            createdBy: expect.any(Object),
            createdDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            lastModifiedDate: expect.any(Object),
            location: expect.any(Object),
          }),
        );
      });

      it('passing IPatientInfo should create a new form with FormGroup', () => {
        const formGroup = service.createPatientInfoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            age: expect.any(Object),
            gender: expect.any(Object),
            createdBy: expect.any(Object),
            createdDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            lastModifiedDate: expect.any(Object),
            location: expect.any(Object),
          }),
        );
      });
    });

    describe('getPatientInfo', () => {
      it('should return NewPatientInfo for default PatientInfo initial value', () => {
        const formGroup = service.createPatientInfoFormGroup(sampleWithNewData);

        const patientInfo = service.getPatientInfo(formGroup) as any;

        expect(patientInfo).toMatchObject(sampleWithNewData);
      });

      it('should return NewPatientInfo for empty PatientInfo initial value', () => {
        const formGroup = service.createPatientInfoFormGroup();

        const patientInfo = service.getPatientInfo(formGroup) as any;

        expect(patientInfo).toMatchObject({});
      });

      it('should return IPatientInfo', () => {
        const formGroup = service.createPatientInfoFormGroup(sampleWithRequiredData);

        const patientInfo = service.getPatientInfo(formGroup) as any;

        expect(patientInfo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPatientInfo should not enable id FormControl', () => {
        const formGroup = service.createPatientInfoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPatientInfo should disable id FormControl', () => {
        const formGroup = service.createPatientInfoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
