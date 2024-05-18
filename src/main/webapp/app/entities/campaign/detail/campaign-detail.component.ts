import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICampaign } from '../campaign.model';

@Component({
  standalone: true,
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CampaignDetailComponent {
  campaign = input<ICampaign | null>(null);

  previousState(): void {
    window.history.back();
  }
}
