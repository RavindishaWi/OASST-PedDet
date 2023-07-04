import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let angularFireAuth: any;

  beforeEach(() => {
    const angularFireAuthStub = {
      authState: of({}),
      signInWithEmailAndPassword: jest.fn(),
      signOut: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
      ],
    });

    service = TestBed.inject(AuthService);
    angularFireAuth = TestBed.inject(AngularFireAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set _isSignedIn to true if user is signed in', done => {
    angularFireAuth.authState = of({ uid: '1234' });
    service.auth.authState.subscribe(_ => {
      expect(service.isUserSignedIn).toBeTruthy();
      done();
    });
  });

  it('should sign in with email and password', async () => {
    const email = 'test@test.com';
    const password = 'password';

    await service.signInUser(email, password);

    expect(angularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password
    );
  });

  it('should sign out', async () => {
    await service.signOutUser();

    expect(angularFireAuth.signOut).toHaveBeenCalled();
  });
});
