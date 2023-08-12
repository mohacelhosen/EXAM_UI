import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router:Router, private toast:PopupService){}
  signout(){
    localStorage.clear();
    this.toast.showInfo("Succesffuly logout, See you soon 😉")
    this.router.navigate(['/login'])
  }
}
