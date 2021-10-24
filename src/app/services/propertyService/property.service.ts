import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) {
  }

  public Create(ob):Observable<any> {
    let body = JSON.stringify(ob);
    let options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.http.post(this.baseUrl + 'api/property/new', body, options);
  }

  /*public getAllProperties(pageable):Observable<any> {
   return this.http.get(this.baseUrl + 'api/property/all');
   }*/

  public getProperty(id):Observable<any> {
    return this.http.get(this.baseUrl + 'api/property/' + id);
  }

  public getPropertyById(id):Observable<any> {
    return this.http.get(this.baseUrl + 'api/property/' + id);
  }

  updateProperty(id:number, ob):Observable<any> {
    let body = JSON.stringify(ob);
    // let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put(this.baseUrl + 'api/property/' + id, ob);
  }

  public delete(id:number) {
    return this.http.delete(this.baseUrl + "api/property/" + id);
  }

  logout() {
    return this.http.get(this.baseUrl + "api/property/logout");
  }

  public getAllProperties():Observable<any> {
    return this.http.get(this.baseUrl + 'api/property/all');
  }

  public getProperties(pageable):Observable<any>
  {
    return this.http.get(this.baseUrl + 'api/property?'+'page='+pageable.page+'&size='+pageable.size+'&sort='+pageable.sort.field);
  }


  public getUserProperties(userId, pageable):Observable<any>
  {
    return this.http.get(this.baseUrl + 'api/property/user/' + userId+'?'+'page='+pageable.page+'&size='+pageable.size+'&sort='+pageable.sort.field);
  }


  public getNewProperties(pageable):Observable<any>
  {
    return this.http.get(this.baseUrl + 'api/property/new?'+'page='+pageable.page+'&size='+pageable.size+'&sort='+pageable.sort.field);
  }

  deleteImage(id):Observable<any> {
    return this.http.delete(this.baseUrl + 'api/propertyImage/' + id + '/delete');
  }

  propertyGetImage(id):Observable<any> {
    let options = {headers: new HttpHeaders().set('Content-Type', 'multipart/form-data')};
    return this.http.get(this.baseUrl + 'api/propertyImage/get/' + id, options);
  }

  uploadPropertyImage(uploadImageData, pid):Observable<any>  {
    let url = this.baseUrl + 'api/property/pimage/upload/' + pid;
    return this.http.post(url, uploadImageData, {observe: 'response'});
  }

}

/*
 public getAllProperties(pageable):Observable<any>
 {
 return this.http.get("/api/property",{
 params: new HttpParams()
 .set('page',  pageable.page)
 .set('size',  pageable.size)
 .set('sort',  pageable.sort.field).append()
 });
 http://localhost:8084/api/cm/ecos?page=0&size=20&sort=modifiedDate:DESC
 return this.http.get('/api/property?'+'page='+pageable.page+'&size='+pageable.size+'&sort='+pageable.sort.field+':'+pageable.sort.order);

 }
 */
