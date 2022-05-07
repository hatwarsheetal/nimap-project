import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeserService {

  dbUrl=environment.apiUrl

  constructor(private http:HttpClient) {}

  postEnquiryForm(data : any){
    return this.http.post<any>(this.dbUrl+"enquirydetails", data)
  }
  
  getEnquiryForm(){
    return this.http.get<any>(this.dbUrl+"enquirydetails")
  }
  updateEnquiryForm(data:any, id:number){
    return this.http.put<any>(this.dbUrl+`enquirydetails/`+`${id}`, data)
  }
  deleteEnquiryForm(id:number){
    return this.http.delete<any>(this.dbUrl+`enquirydetails/`+`${id}`)
  }
  
  getId(id: any){
    return this.http.get<any>(this.dbUrl+`enquirydetails/`+`${id}`)
  }

  
}
