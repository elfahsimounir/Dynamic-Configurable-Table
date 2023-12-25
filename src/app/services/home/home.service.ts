import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }
  list:boolean=!true;

  switch(){
    this.list=!this.list
  }
}
