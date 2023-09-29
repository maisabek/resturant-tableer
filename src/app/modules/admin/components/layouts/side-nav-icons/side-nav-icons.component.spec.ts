import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavIconsComponent } from './side-nav-icons.component';

describe('SideNavIconsComponent', () => {
  let component: SideNavIconsComponent;
  let fixture: ComponentFixture<SideNavIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavIconsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
