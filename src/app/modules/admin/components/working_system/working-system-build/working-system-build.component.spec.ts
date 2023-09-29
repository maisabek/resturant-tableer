import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingSystemBuildComponent } from './working-system-build.component';

describe('WorkingSystemBuildComponent', () => {
  let component: WorkingSystemBuildComponent;
  let fixture: ComponentFixture<WorkingSystemBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingSystemBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingSystemBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
