import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActiveToast, ToastrService } from 'ngx-toastr';
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
    const dialogOpenSpy = jest.spyOn(dialog, 'open');
    component.openSideDialog();
    expect(dialogOpenSpy).toHaveBeenCalledWith(AdminLoginComponent, {
      disableClose: false
    });
  });  

  it('should sign out from the application', async () => {
    const authSignOutSpy = jest.spyOn(component.auth, 'signOut').mockResolvedValue(undefined);
    const dialogRefCloseSpy = jest.spyOn(component.dialogRef, 'close');
    const toastrInfoSpy = jest.spyOn(component.toastr, 'info');
    
    await component.onSignOutClick();
    
    expect(authSignOutSpy).toHaveBeenCalled();
    expect(dialogRefCloseSpy).toHaveBeenCalled();
    expect(toastrInfoSpy).toHaveBeenCalledWith("User is signed out", "Info", {"closeButton": true, "positionClass": "toast-bottom-right", "progressBar": true, "timeOut": 5000});
  });   
  
});
