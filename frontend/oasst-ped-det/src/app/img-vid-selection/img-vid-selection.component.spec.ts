import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgVidSelectionComponent } from './img-vid-selection.component';

describe('ImgVidSelectionComponent', () => {
  let component: ImgVidSelectionComponent;
  let fixture: ComponentFixture<ImgVidSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgVidSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgVidSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
