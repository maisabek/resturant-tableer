import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulReviewComponent } from './successful-review.component';

describe('SuccessfulReviewComponent', () => {
  let component: SuccessfulReviewComponent;
  let fixture: ComponentFixture<SuccessfulReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfulReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
