import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IPatientInfo } from 'app/entities/patient-info/patient-info.model';
import { PatientInfoService } from 'app/entities/patient-info/service/patient-info.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { IChvRegister } from '../chv-register.model';
import { ChvRegisterService } from '../service/chv-register.service';
import { ChvRegisterFormService } from './chv-register-form.service';

import { ChvRegisterUpdateComponent } from './chv-register-update.component';

describe('ChvRegister Management Update Component', () => {
  let comp: ChvRegisterUpdateComponent;
  let fixture: ComponentFixture<ChvRegisterUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chvRegisterFormService: ChvRegisterFormService;
  let chvRegisterService: ChvRegisterService;
  let patientInfoService: PatientInfoService;
  let teamService: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ChvRegisterUpdateComponent],
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
      .overrideTemplate(ChvRegisterUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChvRegisterUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chvRegisterFormService = TestBed.inject(ChvRegisterFormService);
    chvRegisterService = TestBed.inject(ChvRegisterService);
    patientInfoService = TestBed.inject(PatientInfoService);
    teamService = TestBed.inject(TeamService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PatientInfo query and add missing value', () => {
      const chvRegister: IChvRegister = { id: 456 };
      const patient: IPatientInfo = { id: 26116 };
      chvRegister.patient = patient;

      const patientInfoCollection: IPatientInfo[] = [{ id: 12481 }];
      jest.spyOn(patientInfoService, 'query').mockReturnValue(of(new HttpResponse({ body: patientInfoCollection })));
      const additionalPatientInfos = [patient];
      const expectedCollection: IPatientInfo[] = [...additionalPatientInfos, ...patientInfoCollection];
      jest.spyOn(patientInfoService, 'addPatientInfoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      expect(patientInfoService.query).toHaveBeenCalled();
      expect(patientInfoService.addPatientInfoToCollectionIfMissing).toHaveBeenCalledWith(
        patientInfoCollection,
        ...additionalPatientInfos.map(expect.objectContaining),
      );
      expect(comp.patientInfosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Team query and add missing value', () => {
      const chvRegister: IChvRegister = { id: 456 };
      const team: ITeam = { id: 15027 };
      chvRegister.team = team;

      const teamCollection: ITeam[] = [{ id: 17977 }];
      jest.spyOn(teamService, 'query').mockReturnValue(of(new HttpResponse({ body: teamCollection })));
      const additionalTeams = [team];
      const expectedCollection: ITeam[] = [...additionalTeams, ...teamCollection];
      jest.spyOn(teamService, 'addTeamToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      expect(teamService.query).toHaveBeenCalled();
      expect(teamService.addTeamToCollectionIfMissing).toHaveBeenCalledWith(
        teamCollection,
        ...additionalTeams.map(expect.objectContaining),
      );
      expect(comp.teamsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const chvRegister: IChvRegister = { id: 456 };
      const patient: IPatientInfo = { id: 12265 };
      chvRegister.patient = patient;
      const team: ITeam = { id: 2850 };
      chvRegister.team = team;

      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      expect(comp.patientInfosSharedCollection).toContain(patient);
      expect(comp.teamsSharedCollection).toContain(team);
      expect(comp.chvRegister).toEqual(chvRegister);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChvRegister>>();
      const chvRegister = { id: 123 };
      jest.spyOn(chvRegisterFormService, 'getChvRegister').mockReturnValue(chvRegister);
      jest.spyOn(chvRegisterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chvRegister }));
      saveSubject.complete();

      // THEN
      expect(chvRegisterFormService.getChvRegister).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(chvRegisterService.update).toHaveBeenCalledWith(expect.objectContaining(chvRegister));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChvRegister>>();
      const chvRegister = { id: 123 };
      jest.spyOn(chvRegisterFormService, 'getChvRegister').mockReturnValue({ id: null });
      jest.spyOn(chvRegisterService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chvRegister: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chvRegister }));
      saveSubject.complete();

      // THEN
      expect(chvRegisterFormService.getChvRegister).toHaveBeenCalled();
      expect(chvRegisterService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChvRegister>>();
      const chvRegister = { id: 123 };
      jest.spyOn(chvRegisterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chvRegister });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chvRegisterService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePatientInfo', () => {
      it('Should forward to patientInfoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(patientInfoService, 'comparePatientInfo');
        comp.comparePatientInfo(entity, entity2);
        expect(patientInfoService.comparePatientInfo).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
