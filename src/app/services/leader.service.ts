import { LEADERS } from './../shared/leaders';
import { Leader } from './../shared/leader';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  constructor() {}

  getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: string): Leader {
    return LEADERS.filter(leader => leader.id === id)[0];
  }

  getFeaturedLeader(): Leader {
    return LEADERS.filter(leader => leader.featured)[0];
  }
}
