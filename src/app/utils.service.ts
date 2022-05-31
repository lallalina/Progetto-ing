import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  login_eff=false;


  constructor() { }

  salvaLogin(){
    this.login_eff= true;
  }
}
