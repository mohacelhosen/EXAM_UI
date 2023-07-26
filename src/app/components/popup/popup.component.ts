import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
  private ref:MatDialogRef<PopupComponent>, 
  private formBuilder:FormBuilder,
  private service:ApiService){}
  ngOnInit(): void {
    this.inputData=this.data;
  }
  
  inputData:any;
  closePopUp(){
      if(this.userForm.valid){
        this.ref.close("close by save button");
      }
  }

  userForm=this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    designation: ['', Validators.required]
  });

  saveUser(){
    if(this.userForm.valid){
      this.service.userRegistration(this.userForm.value).subscribe(response=>{
        console.log(this.userForm.value);
        this.closePopUp();
      })
    }
  }

}
