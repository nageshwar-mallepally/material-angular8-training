import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertySaleBidService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) {
  }

  public Create(ob):Observable<any> {
    let body = JSON.stringify(ob);
    let options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.http.post(this.baseUrl + 'api/property/bid/new', body, options);
  }

  public getAllPropertySaleBids():Observable<any> {
    return this.http.get(this.baseUrl + 'api/property/bid/all');
  }

  public getPropertySaleBids(pageable):Observable<any> {
    return this.http.get(this.baseUrl + 'api/property/bid?'+'page='+pageable.page+'&size='+pageable.size+'&sort='+pageable.sort.field);
  }

  public getPropertySaleBidsBySale(saleId, pageable):Observable<any> {
    return this.http.get(this.baseUrl + 'api/property/bid/sale/'+saleId+'?page='+pageable.page+'&size='+pageable.size+'&sort='+pageable.sort.field);
  }

  updateBidSale(id:number, ob):Observable<any> {
    let body = JSON.stringify(ob);
    // let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.put(this.baseUrl + 'api/property/bid/' + id, ob);
  }

  approveBid(id:number, ob):Observable<any> {
    let body = JSON.stringify(ob);
    return this.http.put(this.baseUrl + 'api/property/bid/approve/' + id, ob);
  }

  public delete(id:number) {
    return this.http.delete(this.baseUrl + "api/property/bid" + id);
  }

}
