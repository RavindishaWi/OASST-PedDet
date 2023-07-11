import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModelDetailsComponent } from './model-details.component';

describe('ModelDetailsComponent', () => {
  let component: ModelDetailsComponent;
  let mockHttpClient: { get: any; };
  let mockActivatedRoute;

  beforeEach(async () => {
    mockHttpClient = { get: jest.fn() };
    mockActivatedRoute = {
      paramMap: of(
        convertToParamMap({
          modelName: 'testModel',
          description: 'testDescription',
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [ModelDetailsComponent],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ModelDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set modelName and description from route params', () => {
    const model = { description: 'updatedDescription' };
    mockHttpClient.get.mockReturnValue(of(model));

    component.ngOnInit();

    expect(component.modelName).toEqual('testModel');
    expect(component.description).toEqual('updatedDescription');
    expect(mockHttpClient.get).toHaveBeenCalledWith(
      '/model-selection/testModel'
    );
  });
});
