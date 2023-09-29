import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupportListComponent } from './manage-support-list.component';

describe('ManageSupportListComponent', () => {
  let component: ManageSupportListComponent;
  let fixture: ComponentFixture<ManageSupportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSupportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
