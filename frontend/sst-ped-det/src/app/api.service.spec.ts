import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch models', () => {
    const dummyModels = [{ name: 'model1' }, { name: 'model2' }];

    service.getModels().subscribe(models => {
      expect(models).toEqual(dummyModels);
    });

    const req = httpMock.expectOne('http://127.0.0.1:5000/models');
    expect(req.request.method).toBe('GET');
    req.flush(dummyModels);
  });
});

