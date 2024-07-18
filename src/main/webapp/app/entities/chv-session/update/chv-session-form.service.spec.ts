import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../chv-session.test-samples';

import { ChvSessionFormService } from './chv-session-form.service';

describe('ChvSession Form Service', () => {
  let service: ChvSessionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChvSessionFormService);
  });

  describe('Service methods', () => {
    describe('createChvSessionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createChvSessionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            sessionDate: expect.any(Object),
            subject: expect.any(Object),
            sessions: expect.any(Object),
            people: expect.any(Object),
            comment: expect.any(Object),
            deleted: expect.any(Object),
            startEntryTime: expect.any(Object),
            finishedEntryTime: expect.any(Object),
            status: expect.any(Object),
            team: expect.any(Object),
            activity: expect.any(Object),
          }),
        );
      });

      it('passing IChvSession should create a new form with FormGroup', () => {
        const formGroup = service.createChvSessionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            sessionDate: expect.any(Object),
            subject: expect.any(Object),
            sessions: expect.any(Object),
            people: expect.any(Object),
            comment: expect.any(Object),
            deleted: expect.any(Object),
            startEntryTime: expect.any(Object),
            finishedEntryTime: expect.any(Object),
            status: expect.any(Object),
            team: expect.any(Object),
            activity: expect.any(Object),
          }),
        );
      });
    });

    describe('getChvSession', () => {
      it('should return NewChvSession for default ChvSession initial value', () => {
        const formGroup = service.createChvSessionFormGroup(sampleWithNewData);

        const chvSession = service.getChvSession(formGroup) as any;

        expect(chvSession).toMatchObject(sampleWithNewData);
      });

      it('should return NewChvSession for empty ChvSession initial value', () => {
        const formGroup = service.createChvSessionFormGroup();

        const chvSession = service.getChvSession(formGroup) as any;

        expect(chvSession).toMatchObject({});
      });

      it('should return IChvSession', () => {
        const formGroup = service.createChvSessionFormGroup(sampleWithRequiredData);

        const chvSession = service.getChvSession(formGroup) as any;

        expect(chvSession).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IChvSession should not enable id FormControl', () => {
        const formGroup = service.createChvSessionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewChvSession should disable id FormControl', () => {
        const formGroup = service.createChvSessionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
