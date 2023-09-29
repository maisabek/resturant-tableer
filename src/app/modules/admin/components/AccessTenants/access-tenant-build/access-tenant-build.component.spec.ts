import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTenantBuildComponent } from './access-tenant-build.component';

describe('AccessTenantBuildComponent', () => {
  let component: AccessTenantBuildComponent;
  let fixture: ComponentFixture<AccessTenantBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessTenantBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessTenantBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
