import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelTableComponent } from './model-table.component';
import { SelectionModel } from '@angular/cdk/collections';
import { of } from 'rxjs';
import { ModelService } from 'src/app/model.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModelTableComponent', () => {

  let component: ModelTableComponent;
  let fixture: ComponentFixture<ModelTableComponent>;

  // create a mock service
  let mockService = {
    getModels: jest.fn().mockReturnValue(of([
      { modelId: '1', modelName: 'Model1', backbone: 'Backbone1', description: 'desc1', modelRef: 'ref1' },
      { modelId: '2', modelName: 'Model2', backbone: 'Backbone2', description: 'desc2', modelRef: 'ref2' }
    ]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelTableComponent ],
      providers: [ { provide: ModelService, useValue: mockService } ],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatCheckboxModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ModelTableComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('isAllSelected', () => {
    it('should return true when all rows are selected', () => {
      // selection to select all models
      component.selection = new SelectionModel<any>(true, component.dataSource.data);
      expect(component.isAllSelected()).toBe(true);
    });
  
    it('should return false when not all rows are selected', () => {
      // selection to select only the first model
      component.selection = new SelectionModel<any>(true, [component.dataSource.data[0]]);
      expect(component.isAllSelected()).toBe(false);
    });
  })

});
