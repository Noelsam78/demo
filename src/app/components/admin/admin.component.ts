import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  showSidebar:boolean = false;
  empdetails:any = [];
  public id:any;
  constructor(private http:ApiService){}

  menuToggle(){
    this.showSidebar = !this.showSidebar;
  }
  getEmpDetails(){
    return this.http.empDetails().subscribe(response =>{
      this.empdetails = response;
    })
  }
  
  viewEmployee(empid:any){

  }
  deleteEmployee(i:any){
    this.empdetails.splice(i, i+1)
  }
  ngOnInit(): void {
    this.getEmpDetails();
  }
 

}
