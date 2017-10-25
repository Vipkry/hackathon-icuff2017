import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DashboardPage }from '../dashboard/dashboard';
import { UsuarioService } from '../../domain/usuario/usuario-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  public numero: number;
  
  user = { reg: '', password: ''};
  
  constructor(public navCtrl: NavController, private _alertCtrl: AlertController, public navParams: NavParams, private _http: Http, private _service: UsuarioService) {
    
    this._service.efetuaLogin()
      .then(dado => 
      { 
        this.numero = dado;
      });
    
  }
  
  login(){
    this._service.login(this.user).then((result) => {
      if (result){
        this._service.setCurrentUser(this.user.reg);
        this.navCtrl.setRoot(DashboardPage);
      }
    }, (err) => {
      console.log(err);
    });
  }
  
}
