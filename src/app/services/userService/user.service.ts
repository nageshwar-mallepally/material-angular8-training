import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getallUsers(): Observable<any>{
    return this.http.get(this.baseUrl +'api/user/all')
  }

  createUser(ob): Observable<any>{
    let body = JSON.stringify(ob);
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(this.baseUrl + 'api/auth/signup', body,options);
  }

  updateUser(id:number,ob): Observable<any>{
    let body = JSON.stringify(ob);
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put(this.baseUrl + 'api/user/' + id, body,options);
  }

  deleteUser(id:number): Observable<any>{
    return this.http.delete(this.baseUrl + 'api/user/' + id);
  }

  getallRoles(): Observable<any>{
    return this.http.get(this.baseUrl +'api/roles/all')
  }

}
