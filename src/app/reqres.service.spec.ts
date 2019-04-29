import { TestBed } from '@angular/core/testing';

import { ReqresService } from './reqres.service';

describe('RegresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReqresService = TestBed.get(ReqresService);
    expect(service).toBeTruthy();
  });
});
