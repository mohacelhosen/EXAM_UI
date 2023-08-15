import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
  getLastPartAfterSlash = (url: string) => url.split('/').pop();
  profilePhoto=null;

  githubLink = 'https://github.com/mohacelhosen';
  githubName = this.getLastPartAfterSlash(this.githubLink);

  facebookLink = 'https://www.facebook.com/md.mohacel.hosen.568';
  facebookName = this.getLastPartAfterSlash(this.facebookLink);

  linkedinLink = 'https://www.linkedin.com/in/mohacel-hosen';
  linkedinName = this.getLastPartAfterSlash(this.linkedinLink);

  userInfo!: FormGroup;

  constructor(private formBuilder: FormBuilder, private coreService:CoreService, private apiService:ApiService) {}

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
    },
    this.profilePhoto=this.coreService.getUserPhoto());
  }


  saveUser(){}

  onSubmit(){}


}
