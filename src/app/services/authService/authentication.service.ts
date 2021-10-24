import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = environment.baseUrl;

  // logoutButton = new Subject();
  // logoutButton$ = this.logoutButton.asObservable();

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username:String;
  public password:String;
  public isAdmin:any;
  public loginId:any;


  constructor(private http:HttpClient) {
  }


  login(username:String, password:String):Observable<any> {
    // let options = { headers: new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('Authorization', this.createBasicAuthToken(username, password)) };

    return this.http.post(this.baseUrl + 'api/auth/signin', {username, password}, httpOptions);

    return this.http.post(this.baseUrl + 'api/auth/signin', {username, password}, httpOptions).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username:String, password:String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  logout() {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(TOKEN_KEY)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }


  public saveToken(token:string):void {
    // window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  signOut():void {
    window.sessionStorage.clear();
  }


  public getToken():string {
    // console.log(sessionStorage.getItem(TOKEN_KEY));
    return sessionStorage.getItem(TOKEN_KEY);

  }

  public saveUser(user):void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.isAdmin = user.roles.some(function (el) {
      return el === 'ROLE_ADMIN'
    });
    window.sessionStorage.removeItem('isAdmin');
    window.sessionStorage.setItem('isAdmin', this.isAdmin);
    this.loginId = user.id;
    window.sessionStorage.removeItem('loginId');
    window.sessionStorage.setItem('loginId', this.loginId);
    window.sessionStorage.removeItem('firstName');
    window.sessionStorage.setItem('firstName', user.username);
    this.username = user.username;
  }

  public getUser():any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
