import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { PatientInfoService } from '../service/patient-info.service';
import { IPatientInfo } from '../patient-info.model';
import { PatientInfoFormService } from './patient-info-form.service';

import { PatientInfoUpdateComponent } from './patient-info-update.component';

describe('PatientInfo Management Update Component', () => {
  let comp: PatientInfoUpdateComponent;
  let fixture: ComponentFixture<PatientInfoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let patientInfoFormService: PatientInfoFormService;
  let patientInfoService: PatientInfoService;
  let assignmentService: AssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PatientInfoUpdateComponent],
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
      .overrideTemplate(PatientInfoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PatientInfoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    patientInfoFormService = TestBed.inject(PatientInfoFormService);
    patientInfoService = TestBed.inject(PatientInfoService);
    assignmentService = TestBed.inject(AssignmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Assignment query and add missing value', () => {
      const patientInfo: IPatientInfo = { id: 456 };
      const location: IAssignment = { id: 3164 };
      patientInfo.location = location;

      const assignmentCollection: IAssignment[] = [{ id: 7597 }];
      jest.spyOn(assignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: assignmentCollection })));
      const additionalAssignments = [location];
      const expectedCollection: IAssignment[] = [...additionalAssignments, ...assignmentCollection];
      jest.spyOn(assignmentService, 'addAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ patientInfo });
      comp.ngOnInit();

      expect(assignmentService.query).toHaveBeenCalled();
      expect(assignmentService.addAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        assignmentCollection,
        ...additionalAssignments.map(expect.objectContaining),
      );
      expect(comp.assignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const patientInfo: IPatientInfo = { id: 456 };
      const location: IAssignment = { id: 29115 };
      patientInfo.location = location;

      activatedRoute.data = of({ patientInfo });
      comp.ngOnInit();

      expect(comp.assignmentsSharedCollection).toContain(location);
      expect(comp.patientInfo).toEqual(patientInfo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPatientInfo>>();
      const patientInfo = { id: 123 };
      jest.spyOn(patientInfoFormService, 'getPatientInfo').mockReturnValue(patientInfo);
      jest.spyOn(patientInfoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ patientInfo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: patientInfo }));
      saveSubject.complete();

      // THEN
      expect(patientInfoFormService.getPatientInfo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(patientInfoService.update).toHaveBeenCalledWith(expect.objectContaining(patientInfo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPatientInfo>>();
      const patientInfo = { id: 123 };
      jest.spyOn(patientInfoFormService, 'getPatientInfo').mockReturnValue({ id: null });
      jest.spyOn(patientInfoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ patientInfo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: patientInfo }));
      saveSubject.complete();

      // THEN
      expect(patientInfoFormService.getPatientInfo).toHaveBeenCalled();
      expect(patientInfoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPatientInfo>>();
      const patientInfo = { id: 123 };
      jest.spyOn(patientInfoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ patientInfo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(patientInfoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAssignment', () => {
      it('Should forward to assignmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assignmentService, 'compareAssignment');
        comp.compareAssignment(entity, entity2);
        expect(assignmentService.compareAssignment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
