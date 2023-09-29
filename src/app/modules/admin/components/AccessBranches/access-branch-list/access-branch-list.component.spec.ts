import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessBranchListComponent } from './access-branch-list.component';

describe('AccessBranchListComponent', () => {
  let component: AccessBranchListComponent;
  let fixture: ComponentFixture<AccessBranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessBranchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
