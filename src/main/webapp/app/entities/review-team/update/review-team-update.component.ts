import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IReviewTeam } from '../review-team.model';
import { ReviewTeamService } from '../service/review-team.service';
import { ReviewTeamFormService, ReviewTeamFormGroup } from './review-team-form.service';

@Component({
  standalone: true,
  selector: 'app-review-team-update',
  templateUrl: './review-team-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ReviewTeamUpdateComponent implements OnInit {
  isSaving = false;
  reviewTeam: IReviewTeam | null = null;

  protected reviewTeamService = inject(ReviewTeamService);
  protected reviewTeamFormService = inject(ReviewTeamFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ReviewTeamFormGroup = this.reviewTeamFormService.createReviewTeamFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reviewTeam }) => {
      this.reviewTeam = reviewTeam;
      if (reviewTeam) {
        this.updateForm(reviewTeam);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reviewTeam = this.reviewTeamFormService.getReviewTeam(this.editForm);
    if (reviewTeam.id !== null) {
      this.subscribeToSaveResponse(this.reviewTeamService.update(reviewTeam));
    } else {
      this.subscribeToSaveResponse(this.reviewTeamService.create(reviewTeam));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReviewTeam>>): void {
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

  protected updateForm(reviewTeam: IReviewTeam): void {
    this.reviewTeam = reviewTeam;
    this.reviewTeamFormService.resetForm(this.editForm, reviewTeam);
  }
}
