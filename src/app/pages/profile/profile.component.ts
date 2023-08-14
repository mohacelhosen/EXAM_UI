import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
  getLastPartAfterSlash = (url: string) => url.split('/').pop();

  githubLink = 'https://github.com/mohacelhosen';
  githubName = this.getLastPartAfterSlash(this.githubLink);

  facebookLink = 'https://www.facebook.com/md.mohacel.hosen.568';
  facebookName = this.getLastPartAfterSlash(this.facebookLink);

  linkedinLink = 'https://www.linkedin.com/in/mohacel-hosen';
  linkedinName = this.getLastPartAfterSlash(this.linkedinLink);

  userInfo!: FormGroup;

  constructor(private formBuilder: FormBuilder, private coreService:CoreService) {}

  userName=this.coreService.getUserName();

  ngOnInit(): void {
    this.userInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      designation: ['', Validators.required],
    });
  }

  saveUser(){}

  onSubmit(){}

  tiles:any[]= [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
}
