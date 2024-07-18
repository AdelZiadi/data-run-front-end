import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { TeamFormAccessService } from '../service/team-form-access.service';
import { ITeamFormAccess } from '../team-form-access.model';
import { TeamFormAccessFormService } from './team-form-access-form.service';

import { TeamFormAccessUpdateComponent } from './team-form-access-update.component';

describe('TeamFormAccess Management Update Component', () => {
  let comp: TeamFormAccessUpdateComponent;
  let fixture: ComponentFixture<TeamFormAccessUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let teamFormAccessFormService: TeamFormAccessFormService;
  let teamFormAccessService: TeamFormAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TeamFormAccessUpdateComponent],
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
      .overrideTemplate(TeamFormAccessUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TeamFormAccessUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    teamFormAccessFormService = TestBed.inject(TeamFormAccessFormService);
    teamFormAccessService = TestBed.inject(TeamFormAccessService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const teamFormAccess: ITeamFormAccess = { id: 456 };

      activatedRoute.data = of({ teamFormAccess });
      comp.ngOnInit();

      expect(comp.teamFormAccess).toEqual(teamFormAccess);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeamFormAccess>>();
      const teamFormAccess = { id: 123 };
      jest.spyOn(teamFormAccessFormService, 'getTeamFormAccess').mockReturnValue(teamFormAccess);
      jest.spyOn(teamFormAccessService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teamFormAccess });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teamFormAccess }));
      saveSubject.complete();

      // THEN
      expect(teamFormAccessFormService.getTeamFormAccess).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(teamFormAccessService.update).toHaveBeenCalledWith(expect.objectContaining(teamFormAccess));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeamFormAccess>>();
      const teamFormAccess = { id: 123 };
      jest.spyOn(teamFormAccessFormService, 'getTeamFormAccess').mockReturnValue({ id: null });
      jest.spyOn(teamFormAccessService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teamFormAccess: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teamFormAccess }));
      saveSubject.complete();

      // THEN
      expect(teamFormAccessFormService.getTeamFormAccess).toHaveBeenCalled();
      expect(teamFormAccessService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITeamFormAccess>>();
      const teamFormAccess = { id: 123 };
      jest.spyOn(teamFormAccessService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teamFormAccess });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(teamFormAccessService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
