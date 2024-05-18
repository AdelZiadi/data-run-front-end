import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICampaignType } from '../campaign-type.model';

@Component({
  standalone: true,
  selector: 'app-campaign-type-detail',
  templateUrl: './campaign-type-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CampaignTypeDetailComponent {
  campaignType = input<ICampaignType | null>(null);

  previousState(): void {
    window.history.back();
  }
}
