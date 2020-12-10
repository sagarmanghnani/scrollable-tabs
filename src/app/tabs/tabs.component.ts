import { Component, ElementRef, EventEmitter, HostBinding, OnInit, Output, ViewChild } from '@angular/core';
import { TabsModel } from 'src/Models/Tabs.model';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @ViewChild('tab')tab:ElementRef
  tabData:TabsModel = new TabsModel();
  isActive:boolean = false;
  showRemoveBtn:boolean = false;
  @Output() removeTabEmitter:EventEmitter<boolean> = new EventEmitter();
  @Output() activateTabEmitter:EventEmitter<boolean> = new EventEmitter();
  @Output() isComponentInVisible:EventEmitter<boolean> = new EventEmitter();
  constructor(
    public utilService:UtilsService
  ) { }
  
  @HostBinding('attr.cdkDrop') 
  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    const status = this.isTabVisibleOnScreen();
    this.isComponentInVisible.emit(status);
  }

  showContentOnHover(){
    this.showRemoveBtn = true;
  }

  hideContentOnHover(){
    this.showRemoveBtn = false;
  }

  deleteTab(){
    event.stopPropagation();
    this.removeTabEmitter.emit(true);
  }

  getComponentWidth(){
    const tabElem:HTMLElement =  this.tab.nativeElement;
    return tabElem.offsetWidth;
  }

  activateTab(){
    this.activateTabEmitter.emit();
  }

  isTabVisibleOnScreen(){
    return this.utilService.isElementVisibleOnScreen(this.tab.nativeElement);
  }

}
