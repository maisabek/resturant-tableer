import { Component } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent {
  constructor(private wowService: NgwWowService) {}

  ngAfterViewInit(){
    this.wowService.init();
  }
  
}
