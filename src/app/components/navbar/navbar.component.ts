import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ApiService } from 'src/app/services/api.service';
import { CoreService } from 'src/app/services/core.service';
import { PopupService } from 'src/app/services/popup.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  categories!: Category[];

  userRole: string | null | undefined;

  constructor(private router:Router, private toast:PopupService, private coreService:CoreService, private apiService:ApiService){}
  signout(){
    localStorage.clear();
    this.toast.showInfo("Succesffuly logout, See you soon 😉")
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.userRole = this.coreService.getUserRole();
    this.apiService.getAllCategory().subscribe(
      (res) => {
        this.categories = res;
      },
      (error) => {
        console.log(error);
        this.toast.showWarn(error);
      }
    );
  }

  userName=this.coreService.getUserName();

}
