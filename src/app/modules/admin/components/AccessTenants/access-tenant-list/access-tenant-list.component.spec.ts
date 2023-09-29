import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTenantListComponent } from './access-tenant-list.component';

describe('AccessTenantListComponent', () => {
  let component: AccessTenantListComponent;
  let fixture: ComponentFixture<AccessTenantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessTenantListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessTenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
