import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { PublicTenantService } from '../../services/public-tenant.service';
import { OwlCarousel } from 'ngx-owl-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','./wave-animation.component.scss',
  './responsive.component.scss']
})
export class HomeComponent {
  private unsubscribe: Subscription[] = []
  constructor(private wowService: NgwWowService,
    private _PublicTenantService:PublicTenantService) {}
  publicTenant:any[]=[]
  @ViewChild('owlElement') owlElement: OwlCarousel | any
  publicTenantOptions: OwlOptions={
    rtl:true,
    items: 5,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 2000,
    autoplay: true,
    nav:true,
    navText: [`<div class="slider-arrow right">
    <div class="arrow next">
    <
    </div>
  </div>`, `<div class="slider-arrow left">

  <div class="arrow prev">
  >
  </div>
</div>`],
    responsive: {
      0: {
        items: 1
      },
      992:{
        items: 5
      },
      767: {
        items: 3
      }
    },
  };

  testimonialSliderImages = [
    'assets/images/portal/testimonial_user1.png',
    'assets/images/portal/testimonial_user2.png',
    'assets/images/portal/testimonial_user3.png'
  ];

  testimonialSliderOptions={
    rtl:true,
      items: 1,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      autoplay: true,
      nav:false,
      responsive: {
        0: {
          items: 1
        },
        767: {
          items: 1
        }
      },
  };
  ngOnInit(){
    this.GetPublicTenantList()
  }

  GetPublicTenantList(){
  const publicTenantSub= this._PublicTenantService.GetPublicTenantList().subscribe((res:any)=>{
     this.publicTenant=res.obj
   })
   this.unsubscribe.push(publicTenantSub)
  }

  ngAfterViewInit(){
    this.wowService.init();
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }

}
