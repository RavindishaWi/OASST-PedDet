import { TestBed } from '@angular/core/testing';

import { DetectionResultsService } from './detection-results.service';

describe('DetectionResultsService', () => {
  let service: DetectionResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetectionResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
