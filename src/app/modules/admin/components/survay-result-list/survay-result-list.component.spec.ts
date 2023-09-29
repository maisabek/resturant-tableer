import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurvayResultListComponent } from './survay-result-list.component';

describe('SurvayResultListComponent', () => {
  let component: SurvayResultListComponent;
  let fixture: ComponentFixture<SurvayResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurvayResultListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurvayResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
