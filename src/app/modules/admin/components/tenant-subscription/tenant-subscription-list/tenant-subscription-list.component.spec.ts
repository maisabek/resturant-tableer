import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSubscriptionListComponent } from './tenant-subscription-list.component';

describe('TenantSubscriptionListComponent', () => {
  let component: TenantSubscriptionListComponent;
  let fixture: ComponentFixture<TenantSubscriptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantSubscriptionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantSubscriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
