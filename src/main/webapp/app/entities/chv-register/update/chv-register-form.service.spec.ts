import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../chv-register.test-samples';

import { ChvRegisterFormService } from './chv-register-form.service';

describe('ChvRegister Form Service', () => {
  let service: ChvRegisterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChvRegisterFormService);
  });

  describe('Service methods', () => {
    describe('createChvRegisterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createChvRegisterFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            visitDate: expect.any(Object),
            pregnant: expect.any(Object),
            testResult: expect.any(Object),
            detectionType: expect.any(Object),
            severity: expect.any(Object),
            treatment: expect.any(Object),
            comment: expect.any(Object),
            startEntryTime: expect.any(Object),
            deleted: expect.any(Object),
            createdBy: expect.any(Object),
            createdDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            lastModifiedDate: expect.any(Object),
            patient: expect.any(Object),
            team: expect.any(Object),
          }),
        );
      });

      it('passing IChvRegister should create a new form with FormGroup', () => {
        const formGroup = service.createChvRegisterFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            visitDate: expect.any(Object),
            pregnant: expect.any(Object),
            testResult: expect.any(Object),
            detectionType: expect.any(Object),
            severity: expect.any(Object),
            treatment: expect.any(Object),
            comment: expect.any(Object),
            startEntryTime: expect.any(Object),
            deleted: expect.any(Object),
            createdBy: expect.any(Object),
            createdDate: expect.any(Object),
            lastModifiedBy: expect.any(Object),
            lastModifiedDate: expect.any(Object),
            patient: expect.any(Object),
            team: expect.any(Object),
          }),
        );
      });
    });

    describe('getChvRegister', () => {
      it('should return NewChvRegister for default ChvRegister initial value', () => {
        const formGroup = service.createChvRegisterFormGroup(sampleWithNewData);

        const chvRegister = service.getChvRegister(formGroup) as any;

        expect(chvRegister).toMatchObject(sampleWithNewData);
      });

      it('should return NewChvRegister for empty ChvRegister initial value', () => {
        const formGroup = service.createChvRegisterFormGroup();

        const chvRegister = service.getChvRegister(formGroup) as any;

        expect(chvRegister).toMatchObject({});
      });

      it('should return IChvRegister', () => {
        const formGroup = service.createChvRegisterFormGroup(sampleWithRequiredData);

        const chvRegister = service.getChvRegister(formGroup) as any;

        expect(chvRegister).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IChvRegister should not enable id FormControl', () => {
        const formGroup = service.createChvRegisterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewChvRegister should disable id FormControl', () => {
        const formGroup = service.createChvRegisterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
