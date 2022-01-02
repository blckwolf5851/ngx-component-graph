import { TestBed } from '@angular/core/testing';

import { NgxComponentGraphService } from './ngx-component-graph.service';

describe('NgxComponentGraphService', () => {
  let service: NgxComponentGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxComponentGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
