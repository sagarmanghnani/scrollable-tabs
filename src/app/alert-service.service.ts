import { Injectable } from '@angular/core';
import { AlertInterface } from 'src/Models/interface/AlertInterface.interface';
import { AlertComponent } from './alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  alertList:AlertComponent[] = [];
  constructor() { }


  add(alert:AlertComponent){
    this.alertList.push(alert);
  }

  open(id:string){
    let foundAlert = this.alertList.find((alertComp) => {
      return alertComp.htmlElem.id === id;
    });

    if(foundAlert){
      foundAlert.openAlert();
    }
  }

  close(id:string){
    let foundAlert = this.alertList.find((alertComp) => {
      return alertComp.htmlElem.id === id;
    });

    if(foundAlert){
      foundAlert.closeAlert();
    }
  }
  
}
