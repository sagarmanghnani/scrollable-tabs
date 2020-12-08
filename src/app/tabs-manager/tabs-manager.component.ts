import { ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Constants } from 'src/Constants';
import { TabsModel } from 'src/Models/Tabs.model';
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
  showRightChevron:boolean = false;
  showLeftChevron:boolean = false;
  constructor(
    public tabsManagement:TabsManagementService,
    public resolver:ComponentFactoryResolver,
    public cd:ChangeDetectorRef,
    public utilService:UtilsService
  ) { 

    this.tabsComponentFactory = this.resolver.resolveComponentFactory(TabsComponent)

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.initializeTabs()
  }

  addTab(){
    this.tabsManagement.incrementTabsCounter();
    const container:ComponentRef<TabsComponent> = this.sliderContainer.createComponent(this.tabsComponentFactory);
    this.tabsListRef.push(container);
    container.instance.tabData.tabName = `Tab ${this.tabsManagement.tabsCounter}`;
    if(this.activeTab){
      this.activeTab.instance.isActive = false;
    }
    container.instance.isActive = true;
    let element:HTMLElement = <HTMLElement>container.location.nativeElement;
    element.style.flex = "1";
    this.activeTab = container;
    this.handleRightChevron();
  }

  initializeTabs(){
    for(let i = 1;i <= 3;i++){
      this.addTab();
    }
    this.cd.detectChanges();
  }

  scrollToRight(){

  }

  handleRightChevron(){
    let status = this. utilService.checkIfElementOverFlow(this.tabsContainer.nativeElement);
    if(status){
      this.showRightChevron = true;
    }
  }





  

  

}
