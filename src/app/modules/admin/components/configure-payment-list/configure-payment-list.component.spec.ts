import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePaymentListComponent } from './configure-payment-list.component';

describe('ConfigurePaymentListComponent', () => {
  let component: ConfigurePaymentListComponent;
  let fixture: ComponentFixture<ConfigurePaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurePaymentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurePaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
