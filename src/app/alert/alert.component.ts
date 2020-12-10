import { Component, ElementRef, EventEmitter, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { AlertButton, AlertInterface } from 'src/Models/interface/AlertInterface.interface';
import { AlertServiceService } from '../alert-service.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() alertId:string;
  @Input() alertData:AlertInterface;
  htmlElem:HTMLElement;

  ngOnChanges(changes: SimpleChanges){
    if(changes['alertId'] && changes['alertId'].currentValue){
      this.alertId = changes['alertId'].currentValue;
    }

    if( changes['alertData'] && changes['alertData'].currentValue){
      this.alertData = changes['alertData'].currentValue
    }
  }
  constructor(
    public element:ElementRef,
    public alertService:AlertServiceService
  ) {
      this.htmlElem = this.element.nativeElement;
   }

  ngOnInit(): void {
    document.body.appendChild(this.htmlElem);
    this.htmlElem.style.display = 'none';
    this.htmlElem.addEventListener('click', () => {
      if(this.htmlElem.className == 'alert'){
        this.closeAlert();
      }
    })
    this.alertService.add(this);
  }

  openAlert(){
    this.htmlElem.style.display = 'block';
    document.body.classList.add('alert-open');
  }

  closeAlert(){
    this.htmlElem.style.display = 'none';
    document.body.classList.remove('alert-open');

  }

  executeFunc(button:AlertButton){
      const dismissedData = button.handler();
      this.alertService.close(this.htmlElem.id);
      this.alertService.onDismiss.emit(dismissedData);
  }

}
