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

}
