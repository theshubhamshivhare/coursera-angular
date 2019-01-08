import { Leader } from './../shared/leader';
import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private leaderservice: LeaderService) {}
  leaders: Leader[];

  ngOnInit() {
    this.leaderservice.getLeaders().then(leaders => (this.leaders = leaders));
  }
}
