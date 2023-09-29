import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessBranchBuildComponent } from './access-branch-build.component';

describe('AccessBranchBuildComponent', () => {
  let component: AccessBranchBuildComponent;
  let fixture: ComponentFixture<AccessBranchBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessBranchBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessBranchBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
