import { Component, Renderer2, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  drawer:any;
  drawerIsOpened:boolean=true
  constructor(
    private renderer: Renderer2,
    public _adminService:AdminService){
    this._adminService.sideNavWidth="236px";
    this._adminService.sideComponentWidth="81%";
  }

  @ViewChild('chatsideNav', { static: true }) chatsideNav: any;
  ngOnInit(){
    this.renderer.listen(this.renderer.selectRootElement('#chat_toggle', true),
    'click', () => {
      this.chatsideNav.toggle();
    });
  }
  drawerIsOpenedfn($event:any){
    this.drawerIsOpened=$event
  }
}
