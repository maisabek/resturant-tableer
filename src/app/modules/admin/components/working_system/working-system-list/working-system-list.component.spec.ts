import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingSystemListComponent } from './working-system-list.component';

describe('WorkingSystemListComponent', () => {
  let component: WorkingSystemListComponent;
  let fixture: ComponentFixture<WorkingSystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingSystemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingSystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
