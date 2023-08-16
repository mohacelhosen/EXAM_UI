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
  profilePhoto = 'https://th.bing.com/th/id/OIP.zVWqISZXWTl4XbcHWw0jVQHaHa?pid=ImgDet&rs=1&fbclid=IwAR0hveyp2c7dTi7KQ1YyoCJcbrsfYomyW3Ps3wdXljD66xkTMxTAu1cBAKw';
  
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
  
    this.apiService.getSingleUser().subscribe(
      (user) => {
        this.userDetailsWithLink = user;

        if (this.userDetailsWithLink.github) {
          this.githubLink = this.userDetailsWithLink.github;
          this.githubName = this.getLastPartAfterSlash(this.githubLink);
        }

        if (this.userDetailsWithLink.facebook) {
          this.facebookLink = this.userDetailsWithLink.facebook;
          this.facebookName = this.getLastPartAfterSlash(this.facebookLink);
        }

        if (this.userDetailsWithLink.linkedin) {
          this.linkedinLink = this.userDetailsWithLink.linkedin;
          this.linkedinName = this.getLastPartAfterSlash(this.linkedinLink);
        }

        this.profilePhoto = this.userDetailsWithLink.userPhoto;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  private getLastPartAfterSlash = (url: string) => url.split('/').pop() || '';
}
