import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAllStudentsCount(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/student/normal/all/count');
  }

  public getAllRteStudentsCount(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/student/rte/all/count');
  }

  public getStudentsClassCount(className): Observable<any> {
    return this.http.get(this.baseUrl + 'api/student/normal/' + className + '/classCount');
  }
  public getRteStudentsClassCount(className): Observable<any> {
    return this.http.get(this.baseUrl + 'api/student/rte/' + className + '/classCount');
  }

}
