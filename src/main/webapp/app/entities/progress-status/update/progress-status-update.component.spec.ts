import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ProgressStatusService } from '../service/progress-status.service';
import { IProgressStatus } from '../progress-status.model';
import { ProgressStatusFormService } from './progress-status-form.service';

import { ProgressStatusUpdateComponent } from './progress-status-update.component';

describe('ProgressStatus Management Update Component', () => {
  let comp: ProgressStatusUpdateComponent;
  let fixture: ComponentFixture<ProgressStatusUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let progressStatusFormService: ProgressStatusFormService;
  let progressStatusService: ProgressStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ProgressStatusUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProgressStatusUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProgressStatusUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    progressStatusFormService = TestBed.inject(ProgressStatusFormService);
    progressStatusService = TestBed.inject(ProgressStatusService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const progressStatus: IProgressStatus = { id: 456 };

      activatedRoute.data = of({ progressStatus });
      comp.ngOnInit();

      expect(comp.progressStatus).toEqual(progressStatus);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProgressStatus>>();
      const progressStatus = { id: 123 };
      jest.spyOn(progressStatusFormService, 'getProgressStatus').mockReturnValue(progressStatus);
      jest.spyOn(progressStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ progressStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: progressStatus }));
      saveSubject.complete();

      // THEN
      expect(progressStatusFormService.getProgressStatus).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(progressStatusService.update).toHaveBeenCalledWith(expect.objectContaining(progressStatus));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProgressStatus>>();
      const progressStatus = { id: 123 };
      jest.spyOn(progressStatusFormService, 'getProgressStatus').mockReturnValue({ id: null });
      jest.spyOn(progressStatusService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ progressStatus: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: progressStatus }));
      saveSubject.complete();

      // THEN
      expect(progressStatusFormService.getProgressStatus).toHaveBeenCalled();
      expect(progressStatusService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProgressStatus>>();
      const progressStatus = { id: 123 };
      jest.spyOn(progressStatusService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ progressStatus });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(progressStatusService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
