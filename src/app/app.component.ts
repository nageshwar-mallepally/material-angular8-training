import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms'
import { LoaderService } from './services/loader/loader.service';
import { AuthenticationService } from './services/authService/authentication.service';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Property Details';

  isDarkTheme:boolean = false;
  isAdmin:boolean = false;
  userName:string;


  constructor(public authSer:AuthenticationService, private _router:Router, private dialog:MatDialog, private fb:FormBuilder,
              public loaderSer:LoaderService, public activateRoute:ActivatedRoute) {

  }

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme') == "Dark" ? true : false;
    if (this.authSer.isAdmin == null)this.authSer.isAdmin = window.sessionStorage.getItem('isAdmin').toLowerCase() == 'true';
    if (this.authSer.username == null)this.authSer.username = window.sessionStorage.getItem('firstName');
    // this.authSer.logout();
    // this._router.navigateByUrl("/login");
  }

  logout() {
    this.authSer.logout();
    this._router.navigateByUrl("/logout");
  }

  home() {
    this._router.navigate(['home']);
  }

  storeThemeSelection(val:boolean) {
    this.isDarkTheme = val;
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }
}
