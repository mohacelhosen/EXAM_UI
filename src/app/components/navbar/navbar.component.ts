import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { PopupService } from 'src/app/services/popup.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userRole: string | null | undefined;

  constructor(private router:Router, private toast:PopupService, private coreService:CoreService){}
  signout(){
    localStorage.clear();
    this.toast.showInfo("Succesffuly logout, See you soon 😉")
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.userRole = this.coreService.getUserRole();
  }

  userName=this.coreService.getUserName();

}
