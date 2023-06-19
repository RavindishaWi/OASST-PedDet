import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionResultsComponent } from './detection-results.component';

describe('DetectionResultsComponent', () => {
  let component: DetectionResultsComponent;
  let fixture: ComponentFixture<DetectionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectionResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetectionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
