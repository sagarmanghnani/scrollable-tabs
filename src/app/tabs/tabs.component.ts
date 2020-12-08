import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TabsModel } from 'src/Models/Tabs.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  tabData:TabsModel = new TabsModel();
  isActive:boolean = false;
  showRemoveBtn:boolean = false;
  @Output() removeTabEmitter:EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    
  }

  showContentOnHover(){
    this.showRemoveBtn = true;
  }

  hideContentOnHover(){
    this.showRemoveBtn = false;
  }

  deleteTab(){
    this.removeTabEmitter.emit(true);
  }


}
