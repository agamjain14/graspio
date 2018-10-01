import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrevisionComponent } from './adminrevision.component';

describe('AdminrevisionComponent', () => {
  let component: AdminrevisionComponent;
  let fixture: ComponentFixture<AdminrevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminrevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminrevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
