import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { VillageLocationService } from '../service/village-location.service';
import { IVillageLocation } from '../village-location.model';
import { VillageLocationFormService } from './village-location-form.service';

import { VillageLocationUpdateComponent } from './village-location-update.component';

describe('VillageLocation Management Update Component', () => {
  let comp: VillageLocationUpdateComponent;
  let fixture: ComponentFixture<VillageLocationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let villageLocationFormService: VillageLocationFormService;
  let villageLocationService: VillageLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, VillageLocationUpdateComponent],
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
      .overrideTemplate(VillageLocationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VillageLocationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    villageLocationFormService = TestBed.inject(VillageLocationFormService);
    villageLocationService = TestBed.inject(VillageLocationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const villageLocation: IVillageLocation = { id: 456 };

      activatedRoute.data = of({ villageLocation });
      comp.ngOnInit();

      expect(comp.villageLocation).toEqual(villageLocation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVillageLocation>>();
      const villageLocation = { id: 123 };
      jest.spyOn(villageLocationFormService, 'getVillageLocation').mockReturnValue(villageLocation);
      jest.spyOn(villageLocationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ villageLocation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: villageLocation }));
      saveSubject.complete();

      // THEN
      expect(villageLocationFormService.getVillageLocation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(villageLocationService.update).toHaveBeenCalledWith(expect.objectContaining(villageLocation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVillageLocation>>();
      const villageLocation = { id: 123 };
      jest.spyOn(villageLocationFormService, 'getVillageLocation').mockReturnValue({ id: null });
      jest.spyOn(villageLocationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ villageLocation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: villageLocation }));
      saveSubject.complete();

      // THEN
      expect(villageLocationFormService.getVillageLocation).toHaveBeenCalled();
      expect(villageLocationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVillageLocation>>();
      const villageLocation = { id: 123 };
      jest.spyOn(villageLocationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ villageLocation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(villageLocationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
