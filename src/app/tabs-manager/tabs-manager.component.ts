import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Constants } from 'src/Constants';
import { AlertInterface } from 'src/Models/interface/AlertInterface.interface';
import { TabsModel } from 'src/Models/Tabs.model';
import { AlertServiceService } from '../alert-service.service';
import { TabsManagementService } from '../tabs-management.service';
import { TabsComponent } from '../tabs/tabs.component';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-tabs-manager',
  templateUrl: './tabs-manager.component.html',
  styleUrls: ['./tabs-manager.component.scss']
})
export class TabsManagerComponent implements OnInit {
  @ViewChild("sliderContainer", {
    read:ViewContainerRef
  }) sliderContainer:ViewContainerRef;
  @ViewChild("tabsContainer") tabsContainer:ElementRef
  tabsListRef:ComponentRef<TabsComponent>[] = [];
  activeTab:ComponentRef<TabsComponent> = null;
  tabsComponentFactory:ComponentFactory<TabsComponent>;
  showRighttChevron:boolean = false;
  disableLeftChevron:boolean = false;
  disableRightChevron:boolean = false;
  showLeftChevron:boolean = false;
  isLastTabActive:boolean = false;
  isStartTabActive:boolean = false;
  alertData:AlertInterface;
  constructor(
    public tabsManagement:TabsManagementService,
    public resolver:ComponentFactoryResolver,
    public cd:ChangeDetectorRef,
    public utilService:UtilsService,
    public alertService:AlertServiceService
  ) { 

    this.tabsComponentFactory = this.resolver.resolveComponentFactory(TabsComponent)

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void{
    this.initializeTabs()
  }

  addTab(){
    if(this.tabsListRef.length >= 10){
      this.createMaxTabAlert();
      this.alertService.open('alert-1');
      return;
    }
    this.tabsManagement.incrementTabsCounter();
    const tabComp:ComponentRef<TabsComponent> = this.sliderContainer.createComponent(this.tabsComponentFactory);
    this.tabsListRef.push(tabComp);
    tabComp.instance.tabData.tabName = `Tab ${this.tabsManagement.tabsCounter}`;
    if(this.activeTab){
      this.activeTab.instance.isActive = false;
    }
    tabComp.instance.isActive = true;
    let element:HTMLElement = <HTMLElement>tabComp.location.nativeElement;
    element.style.flex = "1";
    this.activeTab = tabComp;
    this.removeTabHandler(tabComp);
    this.activateTab(tabComp);
    this.handleRightChevron();
    // this.manageChevronWorking();


  }

  initializeTabs(){
    for(let i = 1;i <= 3;i++){
      this.addTab();
    }
    this.cd.detectChanges();
  }

  scrollToRight(){
    let tabContainerElement:HTMLElement = this.tabsContainer.nativeElement;
    const tabWidth = this.tabsListRef[0].instance.getComponentWidth();
    tabContainerElement.scrollTo({
      left:tabWidth + tabContainerElement.scrollLeft,
      behavior:"smooth"
    })
  }

  scrollToLeft(){
    let tabContainerElement:HTMLElement = this.tabsContainer.nativeElement;
    const tabWidth = this.tabsListRef[0].instance.getComponentWidth();
    tabContainerElement.scrollTo({
      left:tabContainerElement.scrollLeft - tabWidth,
      behavior:"smooth"
    })
  }

  handleRightChevron(){
    let status = this. utilService.checkIfElementOverFlow(this.tabsContainer.nativeElement);
    if(status){
      this.showLeftChevron = true;
      this.showRighttChevron = true;
    }else{
      this.showLeftChevron = false;
      this.showRighttChevron = false;
    }
  }

  removeTabHandler(tabComp:ComponentRef<TabsComponent>){
    
    tabComp.instance.removeTabEmitter.subscribe(() => {
      if(this.tabsListRef.length === 1){
        return;
      }
      this.createAlertObj();
      this.alertService.open('alert-1');
      this.alertService.onDismiss.subscribe(res => {
        if(res){
          const componentIndex = this.tabsListRef.indexOf(tabComp);
          let isRemovedTabActive = false;
          if(tabComp.instance.isActive){
            isRemovedTabActive = true;
          }
          if(componentIndex !== -1){
            this.sliderContainer.remove(componentIndex);
            this.tabsListRef.splice(componentIndex, 1);
            if(isRemovedTabActive){
              const lastTab = this.tabsListRef[this.tabsListRef.length - 1];
              lastTab.instance.isActive = true;
            }
            this.handleRightChevron();
            // this.manageChevronWorking();
    
          }
        }
      })
    })
  }

  activateTab(tabComp:ComponentRef<TabsComponent>){
    tabComp.instance.activateTabEmitter.subscribe(() => {
      tabComp.instance.isActive = true;
      if(this.activeTab){
        this.activeTab.instance.isActive = false;
      }
      this.activeTab = tabComp;
      this.checkIfLastTabOrFirstTab();
      // this.manageChevronWorking();
    })
  }

  manageChevronWorking(){
    if(this.activeTab === this.tabsListRef[0]){
      this.disableLeftChevron = true;
    }else if(this.activeTab === this.tabsListRef[0]){
      this.disableRightChevron = true;
    }else{
      this.disableRightChevron = false;
      this.disableLeftChevron = false;
    }
  }
  

  isComponentInView(tabComp:ComponentRef<TabsComponent>){
      tabComp.instance.isComponentInVisible.subscribe(res => {
        if(res){
          if(tabComp === this.tabsListRef[0]){
            this.showLeftChevron = false;
          }

          if(tabComp === this.tabsListRef[this.tabsListRef.length - 1]){
            this.showRighttChevron = false;
            this.showLeftChevron = true;
          }
        }
      })
  }

  openAlert(){
    this.alertService.open('alert-1');
  }

  createAlertObj(){
    this.alertData = {
      header:'Remove Tab',
      subheader:'Are you sure you want to remove tab',
      buttons: [
        {
          text:'Cancel',
          handler: () => {
            return false;
          },
          background: 'transparent',
          color:'skyblue'
        },
        {
          text:'Remove',
          handler: () => {
            return true;
          },
          background:'red',
        }
      ]
    }
  }

  

  createMaxTabAlert(){
    this.alertData = {
      header: 'Maximum limit exceeded',
      subheader: 'Maximum limit to create tabs is exceeded',
      buttons: [
        {
          text:'Ok',
          handler: () => {

          }
        }
      ]
    }
  }

  drop(event:CdkDragDrop<TabsComponent[]>) {
    console.log(event, "Event", this.tabsListRef[event.previousIndex].hostView, "Element")
    this.sliderContainer.move(this.tabsListRef[event.previousIndex].hostView, event.currentIndex);
    moveItemInArray(this.tabsListRef, event.previousIndex, event.currentIndex);
    this.checkIfLastTabOrFirstTab();
  }

  checkIfLastTabOrFirstTab(){
    const tabListRefLength = this.tabsListRef.length;
      if(this.tabsListRef[0] === this.activeTab){
        this.isStartTabActive = true;
        this.isLastTabActive = false;
      }else if(this.tabsListRef[tabListRefLength - 1] === this.activeTab){
        this.isLastTabActive = true;
        this.isStartTabActive = false;
      }else{
        this.isLastTabActive = false;
        this.isStartTabActive = false;
      }
  }

  

  

  





  

  

}
