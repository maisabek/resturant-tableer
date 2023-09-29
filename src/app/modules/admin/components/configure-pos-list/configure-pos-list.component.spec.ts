import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePosListComponent } from './configure-pos-list.component';

describe('ConfigurePosListComponent', () => {
  let component: ConfigurePosListComponent;
  let fixture: ComponentFixture<ConfigurePosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurePosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurePosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
