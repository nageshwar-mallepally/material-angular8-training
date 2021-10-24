import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  returnUrl: string;
  constructor(private route: ActivatedRoute,public loaderSer:LoaderService,
    private router: Router,public _snackBar:MatSnackBar,
    private authenticationSer: AuthenticationService) { }

  ngOnInit(): void {

  }

  handleLogin() {
    this.loaderSer.showNgxSpinner();
    this.authenticationSer.login(this.username, this.password).subscribe(data=> {

      console.log(data);
      this.authenticationSer.saveToken(data.token);
      this.authenticationSer.saveUser(data);

      this.invalidLogin = false;
      this.loginSuccess = true;
      this.router.navigate(['/home']);
      this._snackBar.open('Login Successful', '',{
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
      this.loaderSer.hideNgxSpinner();
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
      this._snackBar.open(this.errorMessage, '',{
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
      this.loaderSer.hideNgxSpinner();
    });
  }


}
