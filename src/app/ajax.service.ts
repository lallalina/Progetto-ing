import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';;

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor(
    private http: HttpClient
  ) { }

  auth_url = "http://localhost:8080/private/nuovoUtente"; //nuovo utente

  //chiamata al server per la registrazione
  registrazione(param){
    return this.http.post(this.auth_url,param, {headers: {'Content-Type': 'application/json'}});  //manda uan richiesta, obj-> lo mandiamo al server
  }

  //chiamata al server per il login
  login(username, password){
    return this.http.get("http://localhost:8080/admin", {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(username+':'+password)
    })
  }); 
  }

}
