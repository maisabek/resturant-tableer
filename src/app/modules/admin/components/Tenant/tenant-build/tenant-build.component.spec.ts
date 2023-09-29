import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantBuildComponent } from './tenant-build.component';

describe('TenantBuildComponent', () => {
  let component: TenantBuildComponent;
  let fixture: ComponentFixture<TenantBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
