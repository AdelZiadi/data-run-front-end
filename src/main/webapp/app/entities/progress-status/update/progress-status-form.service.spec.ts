import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../progress-status.test-samples';

import { ProgressStatusFormService } from './progress-status-form.service';

describe('ProgressStatus Form Service', () => {
  let service: ProgressStatusFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressStatusFormService);
  });

  describe('Service methods', () => {
    describe('createProgressStatusFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProgressStatusFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
          }),
        );
      });

      it('passing IProgressStatus should create a new form with FormGroup', () => {
        const formGroup = service.createProgressStatusFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
          }),
        );
      });
    });

    describe('getProgressStatus', () => {
      it('should return NewProgressStatus for default ProgressStatus initial value', () => {
        const formGroup = service.createProgressStatusFormGroup(sampleWithNewData);

        const progressStatus = service.getProgressStatus(formGroup) as any;

        expect(progressStatus).toMatchObject(sampleWithNewData);
      });

      it('should return NewProgressStatus for empty ProgressStatus initial value', () => {
        const formGroup = service.createProgressStatusFormGroup();

        const progressStatus = service.getProgressStatus(formGroup) as any;

        expect(progressStatus).toMatchObject({});
      });

      it('should return IProgressStatus', () => {
        const formGroup = service.createProgressStatusFormGroup(sampleWithRequiredData);

        const progressStatus = service.getProgressStatus(formGroup) as any;

        expect(progressStatus).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProgressStatus should not enable id FormControl', () => {
        const formGroup = service.createProgressStatusFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProgressStatus should disable id FormControl', () => {
        const formGroup = service.createProgressStatusFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
