import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private toast: NgToastService) { }

  //show Toast on top center position
  showSuccessTopCenter(message:any) {
    this.toast.success({detail:"SUCCESS",summary:`${message}`,duration:2000, position:'topCenter'});
  }

  //show Toast on bottom center position
  showErrorBottonCenter(message:any) {
    this.toast.error({detail:"ERROR",summary:`${message}`,sticky:true, position:'topRight'});
  }

  //show Toast on top left position
  showInfo(message:any) {
    this.toast.info({detail:"INFO",summary:`${message}`,sticky:true, position: 'topLeft'});
  }

    //show Toast on top right position
    showWarn(message:any) {
      this.toast.warning({detail:"WARN",summary:`${message}`,duration:3000, position: 'topRight'});
    }
  

}
