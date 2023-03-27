import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  constructor(private _http:HttpClient) { }

  empDetails(){
    return this._http.get('http://localhost:3000/employees');
  }
  // delete(empid:any){
  //   return this.delete("http://localhost:3000/employees/" + empid)
  // }
}
