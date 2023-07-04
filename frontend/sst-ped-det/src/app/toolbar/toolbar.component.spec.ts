import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let mockDialog: MatDialog;

  beforeEach(async () => {
    mockDialog = { open: jest.fn(() => ({ afterClosed: () => of({}) })) } as any;
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [MatDialogModule, MatToolbarModule, MatIconModule],
      providers: [{ provide: MatDialog, useValue: mockDialog }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ToolbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should open admin profile dialog', () => {
    component.openAdminProfileDialog();
    expect(mockDialog.open).toHaveBeenCalledWith(AdminProfileComponent, {
      width: '400px',
      disableClose: false
    });
  });
});
