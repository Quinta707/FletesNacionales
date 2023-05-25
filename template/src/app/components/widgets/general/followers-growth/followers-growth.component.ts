import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/widget/general'
@Component({
  selector: 'app-followers-growth',
  templateUrl: './followers-growth.component.html',
  styleUrls: ['./followers-growth.component.scss']
})
export class FollowersGrowthComponent {

  public followersGrowth = chartData.followersGrowth
}
