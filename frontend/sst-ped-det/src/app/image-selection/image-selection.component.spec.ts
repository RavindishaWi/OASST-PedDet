import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ImageSelectionComponent } from './image-selection.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/auth.service';
import { ImageService } from 'src/app/image.service';
import { ModelService } from '../model.service';
import { DetectionResultsService } from '../detection-results.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ImageSelectionComponent', () => {
  let component: ImageSelectionComponent;
  let fixture: ComponentFixture<ImageSelectionComponent>;
  let mockToastrService;
  let mockAuthService;
  let mockImageService: { updateSelectedImages: any; };
  let mockModelService;
  let mockDetectionResultsService;
  let mockLocation: { back: any; };

  beforeEach(async () => {
    mockToastrService = jest.fn();
    mockAuthService = { isUserSignedIn: jest.fn() };
    mockImageService = { updateSelectedImages: jest.fn() };
    mockModelService = jest.fn();
    mockDetectionResultsService = jest.fn();
    mockLocation = { back: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgxPaginationModule
      ],
      declarations: [
        ImageSelectionComponent
      ],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ImageService, useValue: mockImageService },
        { provide: ModelService, useValue: mockModelService },
        { provide: DetectionResultsService, useValue: mockDetectionResultsService },
        { provide: Location, useValue: mockLocation }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageSelectionComponent);
    component = fixture.componentInstance;
  });

  it('should update page number', () => {
    const newPage = 2;
    component.pageChanged(newPage);
    expect(component.page).toEqual(newPage);
  });

  it('should close error message', () => {
    component.errorMessage = 'Some error message';
    component.closeErrorMessage();
    expect(component.errorMessage).toBeNull();
  });

  it('should go back to previous page', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalledTimes(1);
  });

  it('should toggle selection of an image', () => {
    const url = 'some-image-url';
    component.toggleSelection(url);
    expect(component.selectedImages).toContain(url);
    expect(mockImageService.updateSelectedImages).toHaveBeenCalledWith(component.selectedImages);
  });

});
