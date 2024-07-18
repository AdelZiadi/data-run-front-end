import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { RefreshTokenDetailComponent } from './refresh-token-detail.component';

describe('RefreshToken Management Detail Component', () => {
  let comp: RefreshTokenDetailComponent;
  let fixture: ComponentFixture<RefreshTokenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefreshTokenDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: RefreshTokenDetailComponent,
              resolve: { refreshToken: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(RefreshTokenDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshTokenDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load refreshToken on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', RefreshTokenDetailComponent);

      // THEN
      expect(instance.refreshToken()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
