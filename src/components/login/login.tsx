import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { UtilService } from '../../services/util-service';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';

@Component({
  tag: 'app-login',
  styleUrl: 'login.css',
})
export class Login {
  @State() colorEye = 'primary';
  @State() nameIcon = 'eye';
  @State() eyePwd: boolean = false;
  @Prop() history?: RouterHistory;
  @Event() loginCompleted?: EventEmitter;

  @State() userName:any='';
  @State() userPass:any='';

  loginCompletedHandler(todo: any) {
    CrudService.getInfo(cfg.account.account).then((res)=>{
      localStorage.setItem('userData',JSON.stringify(res));
    })

    this.loginCompleted?.emit(todo);
  }

  constructor() {
    document.title = `Login - iCare`;
  }

  handleSubmit(e:any) {
    e.preventDefault();
    // send data to our backend
    this.login(this.userName, this.userPass);
  }

  componentWillRender(){
    let token = localStorage.getItem('userToken');

    if(token==null||token.length!=191){
    }
    else{    
      this.loginCompletedHandler('login');
      this.history?.replace('/');
    }
  }

  changeValue(ev:any) {
    const value = ev.target.value;
    switch (ev.target.name) {
      case 'userName': {
        this.userName = value;
        break;
      }

      case 'userPass': {
        this.userPass = value;
        break;
      }

    }
  }

  async login(user:any, pwd:any){
    const loading = document.createElement('ion-loading');
    loading.message = 'Loading...',
    // loading.duration = 2000;
    
    document.body.appendChild(loading);
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    setTimeout(()=>{
    // if(username==''||thi.length<1){
    //   UtilService.presentToastWithOptions('Harap masukkan nomor telepon');
    // }
    // else if(this.userPass==''||this.userPass.length<1){
    //   UtilService.presentToastWithOptions('Harap masukkan kata sandi');
    // }
    // else{

      let data={
        username:user,
        password:pwd,
        rememberMe:true
      }

      CrudService.postData(cfg.jwt.authenticate,data).then((rs)=>{

        let strg = localStorage.getItem('pos'+cfg.jwt.authenticate);
        if(strg == '201' || strg == '200'){
          UtilService.presentToastWithOptions('Berhasil Login');
          setTimeout(() =>  {

            localStorage.removeItem('pos'+cfg.jwt.authenticate);

            localStorage.setItem('userToken',JSON.stringify(rs.id_token));
  
            this.history?.replace('/');
            this.loginCompletedHandler('login');
  
          },1000);
          
        }
        else{
          UtilService.presentToastWithOptions('Nomor telepon/password salah!');
          localStorage.removeItem('pos'+cfg.jwt.authenticate);
        }

      })

    //}      

      //this.loginCompletedHandler('login');
      loading.dismiss();
      //this.history?.replace('/');
    }, 1000);
   
    
  }
  

  lookPwd(){
    if(this.eyePwd == false){
      this.colorEye = 'danger';
      this.nameIcon = 'eye-off';
      this.eyePwd = true;
    }else {
      this.colorEye = 'primary';
      this.nameIcon = 'eye';
      this.eyePwd = false;
    }
  }
  render() {
    return (
      <div class="container" id="app-login">
        <div class="div-login">
          <p class="p-login">LOGIN</p>
          <form onSubmit={(e) => this.handleSubmit(e)} class="">
          <ion-input placeholder="Nomor Telepon Anda" required minlength={2} name="userName"  class="input" onInput={(event) => this.changeValue(event)}></ion-input>

          {this.eyePwd == false
          ? <ion-input type="password" required minlength={3} placeholder="Password" class="input" name="userPass" onInput={(event) => this.changeValue(event)}>
              <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd()}>
                <ion-button fill="clear" color={this.colorEye} type="button">
                  <ion-icon name={this.nameIcon} slot="icon-only" class="eye-pwd"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-input>
          : <ion-input type="text" placeholder="Password" class="input" name="userPass" onInput={(event) => this.changeValue(event)}>
            <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd()}>
              <ion-button fill="clear" color={this.colorEye} type="button">
                <ion-icon name={this.nameIcon} slot="icon-only" class="eye-pwd"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-input>
          }
          <div class="div-regis">
            {/* <stencil-route-link class="label-2" url="/register">
                Daftar Akun?
            </stencil-route-link> */}
            <p class="label-2">
             <a href="/register">Daftar Akun?</a>
            </p>
            <p class="p-forgot">
              <a href="/forgot-password">Lupa Password?</a>
            </p>
          </div>
          

          <button  type="submit" class="btn-login">
                LOGIN
          </button>
          </form>
        </div>
      </div>
    );
  }

}
