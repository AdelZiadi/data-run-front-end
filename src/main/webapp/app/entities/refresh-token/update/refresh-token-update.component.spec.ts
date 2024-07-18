import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { RefreshTokenService } from '../service/refresh-token.service';
import { IRefreshToken } from '../refresh-token.model';
import { RefreshTokenFormService } from './refresh-token-form.service';

import { RefreshTokenUpdateComponent } from './refresh-token-update.component';

describe('RefreshToken Management Update Component', () => {
  let comp: RefreshTokenUpdateComponent;
  let fixture: ComponentFixture<RefreshTokenUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let refreshTokenFormService: RefreshTokenFormService;
  let refreshTokenService: RefreshTokenService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RefreshTokenUpdateComponent],
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
      .overrideTemplate(RefreshTokenUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RefreshTokenUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    refreshTokenFormService = TestBed.inject(RefreshTokenFormService);
    refreshTokenService = TestBed.inject(RefreshTokenService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const refreshToken: IRefreshToken = { id: 456 };
      const user: IUser = { id: 4528 };
      refreshToken.user = user;

      const userCollection: IUser[] = [{ id: 2666 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ refreshToken });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const refreshToken: IRefreshToken = { id: 456 };
      const user: IUser = { id: 20424 };
      refreshToken.user = user;

      activatedRoute.data = of({ refreshToken });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.refreshToken).toEqual(refreshToken);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRefreshToken>>();
      const refreshToken = { id: 123 };
      jest.spyOn(refreshTokenFormService, 'getRefreshToken').mockReturnValue(refreshToken);
      jest.spyOn(refreshTokenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ refreshToken });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: refreshToken }));
      saveSubject.complete();

      // THEN
      expect(refreshTokenFormService.getRefreshToken).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(refreshTokenService.update).toHaveBeenCalledWith(expect.objectContaining(refreshToken));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRefreshToken>>();
      const refreshToken = { id: 123 };
      jest.spyOn(refreshTokenFormService, 'getRefreshToken').mockReturnValue({ id: null });
      jest.spyOn(refreshTokenService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ refreshToken: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: refreshToken }));
      saveSubject.complete();

      // THEN
      expect(refreshTokenFormService.getRefreshToken).toHaveBeenCalled();
      expect(refreshTokenService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRefreshToken>>();
      const refreshToken = { id: 123 };
      jest.spyOn(refreshTokenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ refreshToken });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(refreshTokenService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
