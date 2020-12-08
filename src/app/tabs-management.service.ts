import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsManagementService {
  private _tabsCounter:number = 0;
  constructor() { }

  set tabsCounter(tabCounter:number){
    this._tabsCounter = tabCounter;
  }

  get tabsCounter(){
    return this._tabsCounter;
  }

  incrementTabsCounter(){
    this._tabsCounter++;
  }

  decrementTabsCounter(){
    this._tabsCounter--;
  }

}
