import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureStyleListComponent } from './configure-style-list.component';

describe('ConfigureStyleListComponent', () => {
  let component: ConfigureStyleListComponent;
  let fixture: ComponentFixture<ConfigureStyleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureStyleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureStyleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
