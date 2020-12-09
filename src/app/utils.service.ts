import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { 

  }

  checkIfElementOverFlow(element:HTMLElement){
      return element.scrollWidth > element.clientWidth;
  }

  isElementVisibleOnScreen(element:HTMLElement){
    let dimensionsRect = element.getBoundingClientRect();
    if(dimensionsRect.left >= 0 && dimensionsRect.right <= window.innerWidth && dimensionsRect.top >= 0 && dimensionsRect.bottom <= window.innerHeight){
      return true;
    }return false;
  }

}
