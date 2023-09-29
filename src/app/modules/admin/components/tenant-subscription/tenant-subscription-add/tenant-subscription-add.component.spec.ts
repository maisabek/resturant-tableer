import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSubscriptionAddComponent } from './tenant-subscription-add.component';

describe('TenantSubscriptionAddComponent', () => {
  let component: TenantSubscriptionAddComponent;
  let fixture: ComponentFixture<TenantSubscriptionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantSubscriptionAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantSubscriptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
