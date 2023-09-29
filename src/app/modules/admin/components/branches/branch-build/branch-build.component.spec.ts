import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBuildComponent } from './branch-build.component';

describe('BranchBuildComponent', () => {
  let component: BranchBuildComponent;
  let fixture: ComponentFixture<BranchBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
