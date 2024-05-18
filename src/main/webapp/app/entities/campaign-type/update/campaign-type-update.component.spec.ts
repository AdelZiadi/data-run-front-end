import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { CampaignTypeService } from '../service/campaign-type.service';
import { ICampaignType } from '../campaign-type.model';
import { CampaignTypeFormService } from './campaign-type-form.service';

import { CampaignTypeUpdateComponent } from './campaign-type-update.component';

describe('CampaignType Management Update Component', () => {
  let comp: CampaignTypeUpdateComponent;
  let fixture: ComponentFixture<CampaignTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let campaignTypeFormService: CampaignTypeFormService;
  let campaignTypeService: CampaignTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CampaignTypeUpdateComponent],
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
      .overrideTemplate(CampaignTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CampaignTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    campaignTypeFormService = TestBed.inject(CampaignTypeFormService);
    campaignTypeService = TestBed.inject(CampaignTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const campaignType: ICampaignType = { id: 456 };

      activatedRoute.data = of({ campaignType });
      comp.ngOnInit();

      expect(comp.campaignType).toEqual(campaignType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICampaignType>>();
      const campaignType = { id: 123 };
      jest.spyOn(campaignTypeFormService, 'getCampaignType').mockReturnValue(campaignType);
      jest.spyOn(campaignTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ campaignType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: campaignType }));
      saveSubject.complete();

      // THEN
      expect(campaignTypeFormService.getCampaignType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(campaignTypeService.update).toHaveBeenCalledWith(expect.objectContaining(campaignType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICampaignType>>();
      const campaignType = { id: 123 };
      jest.spyOn(campaignTypeFormService, 'getCampaignType').mockReturnValue({ id: null });
      jest.spyOn(campaignTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ campaignType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: campaignType }));
      saveSubject.complete();

      // THEN
      expect(campaignTypeFormService.getCampaignType).toHaveBeenCalled();
      expect(campaignTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICampaignType>>();
      const campaignType = { id: 123 };
      jest.spyOn(campaignTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ campaignType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(campaignTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
