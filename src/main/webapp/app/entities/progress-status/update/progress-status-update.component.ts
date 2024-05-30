import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProgressStatus } from '../progress-status.model';
import { ProgressStatusService } from '../service/progress-status.service';
import { ProgressStatusFormService, ProgressStatusFormGroup } from './progress-status-form.service';

@Component({
  standalone: true,
  selector: 'app-progress-status-update',
  templateUrl: './progress-status-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProgressStatusUpdateComponent implements OnInit {
  isSaving = false;
  progressStatus: IProgressStatus | null = null;

  protected progressStatusService = inject(ProgressStatusService);
  protected progressStatusFormService = inject(ProgressStatusFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProgressStatusFormGroup = this.progressStatusFormService.createProgressStatusFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ progressStatus }) => {
      this.progressStatus = progressStatus;
      if (progressStatus) {
        this.updateForm(progressStatus);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const progressStatus = this.progressStatusFormService.getProgressStatus(this.editForm);
    if (progressStatus.id !== null) {
      this.subscribeToSaveResponse(this.progressStatusService.update(progressStatus));
    } else {
      this.subscribeToSaveResponse(this.progressStatusService.create(progressStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProgressStatus>>): void {
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

  protected updateForm(progressStatus: IProgressStatus): void {
    this.progressStatus = progressStatus;
    this.progressStatusFormService.resetForm(this.editForm, progressStatus);
  }
}
