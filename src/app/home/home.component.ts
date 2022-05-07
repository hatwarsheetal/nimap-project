import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeserService } from '../services/homeser.service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;
 
  jobForm:any = FormGroup;

  showHome: boolean = true;
  showProfile: boolean = false;
  showAddButton: boolean = true;
  showUpdateButton: boolean = false;

  enquiryData: any=[];
  updateId: any;
  imageSrc: any;
  item:any;

  visible = true;
  selectable = true;
  removable = true;
    
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Tags: string[] = [];
  
  myModel = 0;

  selectedFile :any;

  constructor( private HomeService: HomeserService, private formbuilder:FormBuilder,private route:Router ) { }  

  ngOnInit(): void {
    this.getAllFormData();
    this.jobForm = this.formbuilder.group({
      img: ['', Validators.required],
      imgurl: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      mobileno: ['', Validators.required],
      age: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      tags: ['', Validators.required],
      newsletter: ['', Validators.required]
    });
  }
  url="assets/img/user2.jpg";

  showMainProfile(){
    this.showHome = false;
    this.showProfile = true;
  }

  showMainHome() {
    this.showHome = true;
    this.showProfile = false;
    this.showAddButton = true;
    this.showUpdatebutton = false;
  
  }

  getAllFormData() {
    this.HomeService.getEnquiryForm().subscribe(res=>{
      this.enquiryData = res;
    
      console.log(res, "get"); 
    });
  }

  postFormData(){
    console.log(this.jobForm.value,"enquiryform");
    
    const fd = new FormData();
    fd.append('image',this.selectedFile, this.selectedFile.name); 
    this.HomeService.postEnquiryForm(this.jobForm.value).subscribe(res=>{


      alert("Customer Added Successfully!");
      
      this.jobForm.reset()
     this.getAllFormData()
    this.showMainProfile()
    this.route.navigate([this.showMainProfile()]);
  
    })
    
  }
  deleteFormData(data:any){
    this.HomeService.deleteEnquiryForm(data._id).subscribe(res=>{
      alert("Records Deleted Successfully!")
      
    this.getAllFormData()
    this.showMainProfile()
    })
  }
  onEdit(data:any){
  
    this.showHome=false;
    this.showProfile=true;
    this.showAddButton=false;
    this.showUpdatebutton=true;
  
    this.updateId=data._id
  
    this.jobForm.patchValue(data)

    this.route.navigate([this.showMainProfile()]);
  }
  updateFormData(){
    // this.HomeService.updateEnquiryForm(this.jobForm.value, this.updateId).subscribe((res:any)=>{
      alert("Records Updated Successfully!")
     this.route.navigate([this.showMainProfile()]);
      
      this.getAllFormData()
      this.showMainProfile()
    // })
  }

  onFileChange(event:any) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
      
        this.jobForm.patchValue({
          fileSource: reader.result
        });
    
      };
    
    }
  }
  
  onselectFile(e : any){
    if(e.target.files){
       var reader = new FileReader();
       reader.readAsDataURL(e.target.files[0])
       reader.onload=(event:any)=>{
         this.url=event.target.result;
       }
    }
  }
  
  // onselectFile(event:any){
  //   this.selectedFile = <File>event.target.files[0];

  // }

//   closeSelf(){
//     // do something

//     if(condition satisfied){
//        alert("conditions satisfied, submiting the form.");
//        document.forms['jobForm'].submit();
//        window.close();
//     }else{
//        alert("conditions not satisfied, returning to form");    
//     }
// }



// tagssss

add(event: MatChipInputEvent): void {
  
  /*we will store the input and value in local variables.*/
    
      const input = event.input;
      const value = event.value;
    
      if ((value || '').trim()) {
        
   /*the input string will be pushed to the tag list.*/
     
        this.Tags.push(value);
      }
    
      if (input) {
    
  /*after storing the input we will clear the input field.*/
    
        input.value = '';
      }
    }
    
  /*custom method to remove a tag.*/
    
    remove(tag: string): void {
      const index = this.Tags.indexOf(tag);
    
      if (index >= 0) 
      {
    
  /*the tag of a particular index is removed from the tag list.*/
    
        this.Tags.splice(index, 1);
      }
    }
  }

