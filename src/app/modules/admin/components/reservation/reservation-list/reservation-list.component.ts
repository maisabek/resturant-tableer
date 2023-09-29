import { Component } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {
  constructor(protected _ReservationService: ReservationService,private route:Router) { }
  columns: object[] | any

  ngOnInit(){
    this.columns= [
      {
        data: 'applicationUserId',
        title: "User Id",
      },
      {
        data: 'dateTimeSlot',
        title: 'Date Time Slot',

      },
      {
        data: 'isWaiting',
        title: 'Is Waiting'
      },
      {
        data: 'setting',
        title: 'Actions'
      }
    ];
  }
  eventHandler($event: any) {
    switch($event.type){
      case 'details':
        this.route.navigate(["/admin/reservation_details",$event.payload])
      break;
    }
  }
}
