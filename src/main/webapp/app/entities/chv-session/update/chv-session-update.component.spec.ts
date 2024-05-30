import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { ChvSessionService } from '../service/chv-session.service';
import { IChvSession } from '../chv-session.model';
import { ChvSessionFormService } from './chv-session-form.service';

import { ChvSessionUpdateComponent } from './chv-session-update.component';

describe('ChvSession Management Update Component', () => {
  let comp: ChvSessionUpdateComponent;
  let fixture: ComponentFixture<ChvSessionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chvSessionFormService: ChvSessionFormService;
  let chvSessionService: ChvSessionService;
  let teamService: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ChvSessionUpdateComponent],
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
      .overrideTemplate(ChvSessionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChvSessionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chvSessionFormService = TestBed.inject(ChvSessionFormService);
    chvSessionService = TestBed.inject(ChvSessionService);
    teamService = TestBed.inject(TeamService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Team query and add missing value', () => {
      const chvSession: IChvSession = { id: 456 };
      const team: ITeam = { id: 5669 };
      chvSession.team = team;

      const teamCollection: ITeam[] = [{ id: 5530 }];
      jest.spyOn(teamService, 'query').mockReturnValue(of(new HttpResponse({ body: teamCollection })));
      const additionalTeams = [team];
      const expectedCollection: ITeam[] = [...additionalTeams, ...teamCollection];
      jest.spyOn(teamService, 'addTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chvSession });
      comp.ngOnInit();

      expect(teamService.query).toHaveBeenCalled();
      expect(teamService.addTeamToCollectionIfMissing).toHaveBeenCalledWith(
        teamCollection,
        ...additionalTeams.map(expect.objectContaining),
      );
      expect(comp.teamsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const chvSession: IChvSession = { id: 456 };
      const team: ITeam = { id: 17790 };
      chvSession.team = team;

      activatedRoute.data = of({ chvSession });
      comp.ngOnInit();

      expect(comp.teamsSharedCollection).toContain(team);
      expect(comp.chvSession).toEqual(chvSession);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChvSession>>();
      const chvSession = { id: 123 };
      jest.spyOn(chvSessionFormService, 'getChvSession').mockReturnValue(chvSession);
      jest.spyOn(chvSessionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chvSession });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chvSession }));
      saveSubject.complete();

      // THEN
      expect(chvSessionFormService.getChvSession).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(chvSessionService.update).toHaveBeenCalledWith(expect.objectContaining(chvSession));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChvSession>>();
      const chvSession = { id: 123 };
      jest.spyOn(chvSessionFormService, 'getChvSession').mockReturnValue({ id: null });
      jest.spyOn(chvSessionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chvSession: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chvSession }));
      saveSubject.complete();

      // THEN
      expect(chvSessionFormService.getChvSession).toHaveBeenCalled();
      expect(chvSessionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChvSession>>();
      const chvSession = { id: 123 };
      jest.spyOn(chvSessionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chvSession });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chvSessionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTeam', () => {
      it('Should forward to teamService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(teamService, 'compareTeam');
        comp.compareTeam(entity, entity2);
        expect(teamService.compareTeam).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
