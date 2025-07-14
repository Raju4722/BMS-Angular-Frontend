import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  constructor(private http: HttpClient) { }
  getlocations(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/getlocations')
  }
  
 getmoviesbylanguages(): Observable<{[key:string]: string[]}> {
    return this.http.get<{[key:string]:string[]}>('http://localhost:8080/getmoviesbylanguages');
  } 

  gettheatresbylocations():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:8080/theatresbylocation/penumur');
  }
}
