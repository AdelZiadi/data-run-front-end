import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../review-team.test-samples';

import { ReviewTeamFormService } from './review-team-form.service';

describe('ReviewTeam Form Service', () => {
  let service: ReviewTeamFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewTeamFormService);
  });

  describe('Service methods', () => {
    describe('createReviewTeamFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReviewTeamFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });

      it('passing IReviewTeam should create a new form with FormGroup', () => {
        const formGroup = service.createReviewTeamFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });
    });

    describe('getReviewTeam', () => {
      it('should return NewReviewTeam for default ReviewTeam initial value', () => {
        const formGroup = service.createReviewTeamFormGroup(sampleWithNewData);

        const reviewTeam = service.getReviewTeam(formGroup) as any;

        expect(reviewTeam).toMatchObject(sampleWithNewData);
      });

      it('should return NewReviewTeam for empty ReviewTeam initial value', () => {
        const formGroup = service.createReviewTeamFormGroup();

        const reviewTeam = service.getReviewTeam(formGroup) as any;

        expect(reviewTeam).toMatchObject({});
      });

      it('should return IReviewTeam', () => {
        const formGroup = service.createReviewTeamFormGroup(sampleWithRequiredData);

        const reviewTeam = service.getReviewTeam(formGroup) as any;

        expect(reviewTeam).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReviewTeam should not enable id FormControl', () => {
        const formGroup = service.createReviewTeamFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReviewTeam should disable id FormControl', () => {
        const formGroup = service.createReviewTeamFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
