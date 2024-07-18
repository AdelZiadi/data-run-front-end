import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IRefreshToken } from '../refresh-token.model';
import { RefreshTokenService } from '../service/refresh-token.service';
import { RefreshTokenFormService, RefreshTokenFormGroup } from './refresh-token-form.service';

@Component({
  standalone: true,
  selector: 'app-refresh-token-update',
  templateUrl: './refresh-token-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RefreshTokenUpdateComponent implements OnInit {
  isSaving = false;
  refreshToken: IRefreshToken | null = null;

  usersSharedCollection: IUser[] = [];

  protected refreshTokenService = inject(RefreshTokenService);
  protected refreshTokenFormService = inject(RefreshTokenFormService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: RefreshTokenFormGroup = this.refreshTokenFormService.createRefreshTokenFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refreshToken }) => {
      this.refreshToken = refreshToken;
      if (refreshToken) {
        this.updateForm(refreshToken);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refreshToken = this.refreshTokenFormService.getRefreshToken(this.editForm);
    if (refreshToken.id !== null) {
      this.subscribeToSaveResponse(this.refreshTokenService.update(refreshToken));
    } else {
      this.subscribeToSaveResponse(this.refreshTokenService.create(refreshToken));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefreshToken>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(refreshToken: IRefreshToken): void {
    this.refreshToken = refreshToken;
    this.refreshTokenFormService.resetForm(this.editForm, refreshToken);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, refreshToken.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.refreshToken?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
