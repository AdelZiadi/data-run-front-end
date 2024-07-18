import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../refresh-token.test-samples';

import { RefreshTokenFormService } from './refresh-token-form.service';

describe('RefreshToken Form Service', () => {
  let service: RefreshTokenFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshTokenFormService);
  });

  describe('Service methods', () => {
    describe('createRefreshTokenFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRefreshTokenFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            token: expect.any(Object),
            expiryDate: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });

      it('passing IRefreshToken should create a new form with FormGroup', () => {
        const formGroup = service.createRefreshTokenFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            token: expect.any(Object),
            expiryDate: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });
    });

    describe('getRefreshToken', () => {
      it('should return NewRefreshToken for default RefreshToken initial value', () => {
        const formGroup = service.createRefreshTokenFormGroup(sampleWithNewData);

        const refreshToken = service.getRefreshToken(formGroup) as any;

        expect(refreshToken).toMatchObject(sampleWithNewData);
      });

      it('should return NewRefreshToken for empty RefreshToken initial value', () => {
        const formGroup = service.createRefreshTokenFormGroup();

        const refreshToken = service.getRefreshToken(formGroup) as any;

        expect(refreshToken).toMatchObject({});
      });

      it('should return IRefreshToken', () => {
        const formGroup = service.createRefreshTokenFormGroup(sampleWithRequiredData);

        const refreshToken = service.getRefreshToken(formGroup) as any;

        expect(refreshToken).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRefreshToken should not enable id FormControl', () => {
        const formGroup = service.createRefreshTokenFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRefreshToken should disable id FormControl', () => {
        const formGroup = service.createRefreshTokenFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
