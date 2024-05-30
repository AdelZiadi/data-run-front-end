import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ReviewTeamService } from '../service/review-team.service';
import { IReviewTeam } from '../review-team.model';
import { ReviewTeamFormService } from './review-team-form.service';

import { ReviewTeamUpdateComponent } from './review-team-update.component';

describe('ReviewTeam Management Update Component', () => {
  let comp: ReviewTeamUpdateComponent;
  let fixture: ComponentFixture<ReviewTeamUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let reviewTeamFormService: ReviewTeamFormService;
  let reviewTeamService: ReviewTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReviewTeamUpdateComponent],
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
      .overrideTemplate(ReviewTeamUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReviewTeamUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    reviewTeamFormService = TestBed.inject(ReviewTeamFormService);
    reviewTeamService = TestBed.inject(ReviewTeamService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const reviewTeam: IReviewTeam = { id: 456 };

      activatedRoute.data = of({ reviewTeam });
      comp.ngOnInit();

      expect(comp.reviewTeam).toEqual(reviewTeam);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReviewTeam>>();
      const reviewTeam = { id: 123 };
      jest.spyOn(reviewTeamFormService, 'getReviewTeam').mockReturnValue(reviewTeam);
      jest.spyOn(reviewTeamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reviewTeam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reviewTeam }));
      saveSubject.complete();

      // THEN
      expect(reviewTeamFormService.getReviewTeam).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(reviewTeamService.update).toHaveBeenCalledWith(expect.objectContaining(reviewTeam));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReviewTeam>>();
      const reviewTeam = { id: 123 };
      jest.spyOn(reviewTeamFormService, 'getReviewTeam').mockReturnValue({ id: null });
      jest.spyOn(reviewTeamService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reviewTeam: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: reviewTeam }));
      saveSubject.complete();

      // THEN
      expect(reviewTeamFormService.getReviewTeam).toHaveBeenCalled();
      expect(reviewTeamService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReviewTeam>>();
      const reviewTeam = { id: 123 };
      jest.spyOn(reviewTeamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ reviewTeam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(reviewTeamService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
