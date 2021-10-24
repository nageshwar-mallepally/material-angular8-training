import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertySaleService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) {
  }

  public Create(ob):Observable<any> {
    let body = JSON.stringify(ob);
    let options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.http.post(this.baseUrl + 'api/property/sale/new', body, options);
  }

  public getAllPropertySales():Observable<any> {
    return this.http.get(this.baseUrl + 'api/property/sale/all');
  }

  public getPropertySales(pageable):Observable<any> {
    return this.http.get(this.baseUrl + 'api/property/sale?'+'page='+pageable.page+'&size='+pageable.size+'&sort='+pageable.sort.field);
  }

  updatePropertySale(id:number, ob):Observable<any> {
    let body = JSON.stringify(ob);
    // let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put(this.baseUrl + 'api/property/sale/' + id, ob);
  }

  public delete(id:number) {
    return this.http.delete(this.baseUrl + "api/property/sale/" + id);
  }

}
