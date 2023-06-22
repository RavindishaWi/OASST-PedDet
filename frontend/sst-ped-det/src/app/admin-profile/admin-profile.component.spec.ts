import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { AdminProfileComponent } from './admin-profile.component';
import { of } from 'rxjs';

// mock classes
class MatDialogMock {
  open(): any {
    return {
      afterClosed: () => of(true)
    };
  }
}

class MatDialogRefMock {
  close(): void {}
}

class AngularFireAuthMock {
  authState = of(null);
  signOut(): Promise<void> {
    return Promise.resolve();
  }
}

class ToastrServiceMock {
  info(): void {}
  error(): void {}
}

describe('AdminProfileComponent', () => {
  let component: AdminProfileComponent;
  let fixture: ComponentFixture<AdminProfileComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule],
      declarations: [AdminProfileComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: ToastrService, useClass: ToastrServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create AdminProfileComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should open admin sign in dialog', () => {
    const dialogOpenSpy = spyOn(dialog, 'open').and.callThrough();
    component.openSideDialog();
    expect(dialogOpenSpy).toHaveBeenCalledWith(AdminLoginComponent, {
      disableClose: false
    });
  });

  it('should sign out from the application', () => {
    const authSignOutSpy = spyOn(component.auth, 'signOut').and.returnValue(Promise.resolve());
    const dialogRefCloseSpy = spyOn(component.dialogRef, 'close').and.callThrough();
    const toastrInfoSpy = spyOn(component.toastr, 'info').and.callThrough();
    component.onSignOutClick();
    expect(authSignOutSpy).toHaveBeenCalled();
    expect(dialogRefCloseSpy).toHaveBeenCalled();
    expect(toastrInfoSpy).toHaveBeenCalledWith('User is signed out', 'Info', {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right'
    });
  });

  it('should handle error on sign out', async () => {
    const signOutSpy = jest.spyOn(component.auth, 'signOut').mockRejectedValue(new Error());
    const dialogRefCloseSpy = jest.spyOn(component.dialogRef, 'close').mockImplementation();
    const toastrErrorSpy = jest.spyOn(component.toastr, 'error').mockImplementation();
  
    await component.onSignOutClick();
  
    expect(dialogRefCloseSpy).toHaveBeenCalled();
    expect(toastrErrorSpy).toHaveBeenCalledWith('An error occurred while signing out', 'Error', {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
    });
  
    signOutSpy.mockRestore();
    dialogRefCloseSpy.mockRestore();
    toastrErrorSpy.mockRestore();
  });
  
});
