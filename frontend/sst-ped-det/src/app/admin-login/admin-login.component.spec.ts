import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { AdminLoginComponent } from './admin-login.component';
import { FormsModule } from '@angular/forms';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let mockDialogRef: jest.Mocked<MatDialogRef<AdminLoginComponent>>;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockToastrService: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
    } as unknown as jest.Mocked<MatDialogRef<AdminLoginComponent>>;

    mockAuthService = {
      signInUser: jest.fn().mockResolvedValue({
        user: {
          getIdToken: jest.fn().mockResolvedValue('idToken'),
        },
      }),
    } as unknown as jest.Mocked<AuthService>;

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [AdminLoginComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastrService, useValue: mockToastrService },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create AdminLoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful login', async () => {
    const httpPostSpy = jest.spyOn(component.http, 'post').mockReturnValue(of({}));

    component.email = 'test@example.com';
    component.password = 'password';
    await component.onLoginClick();

    expect(mockAuthService.signInUser).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    );
    expect(httpPostSpy).toHaveBeenCalledWith('http://127.0.0.1:5000/auth', { idToken: 'idToken' }, { headers: { 'Content-Type': 'application/json' } });
    expect(mockToastrService.success).toHaveBeenCalledWith('Login successful', 'Success', {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
    });
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should handle server error during token verification', async () => {
    jest.spyOn(component.http, 'post').mockReturnValue(throwError({}));

    component.email = 'test@example.com';
    component.password = 'password';
    await component.onLoginClick();

    expect(mockToastrService.error).toHaveBeenCalledWith('An error occurred during server-side token verification. Please try again.', 'Error', {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
    });
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog when cancel is clicked', () => {
    component.onCancelClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
