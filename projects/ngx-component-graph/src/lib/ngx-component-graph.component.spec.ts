import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxComponentGraphComponent } from './ngx-component-graph.component';

describe('NgxComponentGraphComponent', () => {
  let component: NgxComponentGraphComponent;
  let fixture: ComponentFixture<NgxComponentGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxComponentGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxComponentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
