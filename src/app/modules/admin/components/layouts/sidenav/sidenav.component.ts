import { Component, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription, map } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Output('drawerEvent') drawerEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output('drawerIsOpenedEvent') drawerIsOpenedEvent: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe: Subscription[] = []

  @ViewChild('drawer', { static: true }) drawer: any;
  direction:string | any
  constructor(private breakpointObserver: BreakpointObserver, private translateService: TranslateService,
    private _adminService: AdminService, public renderer: Renderer2) { }
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset,Breakpoints.Small]).pipe(map((result: BreakpointState) => result.matches));

  drawerEventFn() {
    this.drawerEvent.emit(this.drawer)
  }
  @ViewChild('drawer', { static: true }) drawerSide: any;
  ngOnInit() {
    this.isHandset$.subscribe((res) => {
      if (res == true) {
        this._adminService.sideNavWidth = "81px";
      } else {
        this._adminService.sideNavWidth = "236px";
      }
    })

    this.renderer.listen(this.renderer.selectRootElement('#drawerBtn_toggle', true),
      'click', () => {
        this.drawerSide.toggle();
        if (this.drawerSide.opened) {
          this.drawerEventFn();
          this.drawerIsOpenedEvent.emit(this.drawerSide.opened)
          this._adminService.sideNavWidth = "236px";
          this._adminService.sideComponentWidth = "81%";
        } else {
          this.drawerEventFn();
          this.drawerIsOpenedEvent.emit(this.drawerSide.opened)


          this._adminService.sideNavWidth = "81px";
          this._adminService.sideComponentWidth = "100%";

        }
    });
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.direction='rtl'
      } else {
        this.direction='ltr'
      }
    })
    // window.addEventListener("onunload", function (e) {
    //   localStorage.removeItem('collapse')
    // });
    // if (localStorage.getItem("collapse") === null) {
    //   localStorage.setItem('collapse', 'collapseOne')
    // }
    // this.getCollapsed();
  }

  ngDoCheck() {
    // this.MaintainCollapse()

  }
  MaintainCollapse() {
    var elems = document.querySelectorAll(".collapse");
    var elemsLink = document.querySelectorAll(".sideNavAccordion a");
    [].forEach.call(elems, function (el: any) {
      if (el.classList.contains('show')) {
        localStorage.setItem('collapse', el.getAttribute('id'))
      }
    });
  }

  getCollapsed() {
    var ItemCollapsed = localStorage.getItem('collapse')
    var elems = document.querySelectorAll(".collapse");
    [].forEach.call(elems, function (el: any) {
      el.classList.remove('show')
    });
    document.getElementById(`${ItemCollapsed}`)?.classList.add('show')
  }
  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe())
  }
}
