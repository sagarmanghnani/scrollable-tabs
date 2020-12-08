import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Constants } from 'src/Constants';
import { TabsModel } from 'src/Models/Tabs.model';
import { TabsManagementService } from '../tabs-management.service';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-tabs-manager',
  templateUrl: './tabs-manager.component.html',
  styleUrls: ['./tabs-manager.component.scss']
})
export class TabsManagerComponent implements OnInit {
  @ViewChild("sliderContainer", {
    read:ViewContainerRef
  }) tabsContainer:ViewContainerRef;
  tabsListRef:ComponentRef<TabsComponent>[] = [];
  activeTab:ComponentRef<TabsComponent> = null;
  tabsComponentFactory:ComponentFactory<TabsComponent>;
  
  constructor(
    public tabsManagement:TabsManagementService,
    public resolver:ComponentFactoryResolver
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
    const container:ComponentRef<TabsComponent> = this.tabsContainer.createComponent(this.tabsComponentFactory);
    this.tabsListRef.push(container);
    if(this.activeTab){
      this.activeTab.instance.isActive = false;
    }
    container.instance.isActive = true;
    this.activeTab = container;
  }

  initializeTabs(){
    for(let i = 0;i < Constants.INITIAL_TABS_COUNT;i++){
      this.addTab();
    }
  }

  

  

}
