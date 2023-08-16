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
  profilePhoto = null;

  githubLink: any = '';
  githubName: any = '';

  facebookLink: any = '';
  facebookName: any = '';

  linkedinLink: any = '';
  linkedinName: any = '';

  userInfo!: FormGroup;
  userDetailsWithLink: any;

  constructor(
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private apiService: ApiService
  ) {}

  userName = this.coreService.getUserName();

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
  
    // Retrieve user data from API and populate form
    this.apiService.getSingleUser().subscribe(
      (user) => {
        this.userDetailsWithLink = user; // Capture original user data
  
        // Move the assignments here after userDetailsWithLink is initialized
        this.githubLink = this.userDetailsWithLink.github;
        this.githubName = this.getLastPartAfterSlash(this.githubLink);
  
        this.facebookLink = this.userDetailsWithLink.facebook;
        this.facebookName = this.getLastPartAfterSlash(this.facebookLink);
  
        this.linkedinLink = this.userDetailsWithLink.linkedin;
        this.linkedinName = this.getLastPartAfterSlash(this.linkedinLink);
  
        // Corrected assignment for profilePhoto
        this.profilePhoto = this.userDetailsWithLink.userPhoto;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
  

}
