import { Component, OnInit } from '@angular/core';
import { TabsModel } from 'src/Models/Tabs.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  tabData:TabsModel = new TabsModel();
  isActive:boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }

}
