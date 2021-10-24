import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../authService/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
   isHomeActive= new BehaviorSubject(false);
  // public isLogin:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._authenticationService.isUserLoggedIn());

  constructor(public SpinnerSer:NgxSpinnerService,public _authenticationService:AuthenticationService,public _snackBar: MatSnackBar) { }

  showNgxSpinner(){
    this.SpinnerSer.show();
  }

  hideNgxSpinner(){
    this.SpinnerSer.hide();
  }

  showSucessSnakbar(message){
    this._snackBar.open(message, '', {
      duration: 5000,
      panelClass: ["success"]
    });
  }

  showFailureSnakbar(message){
    this._snackBar.open(message, '', {
      duration: 5000,
      panelClass: ["failure"]
    });
  }

  showNormalSnakbar(message){
    this._snackBar.open(message, '', {
      duration: 5000,
    });
  }

}
