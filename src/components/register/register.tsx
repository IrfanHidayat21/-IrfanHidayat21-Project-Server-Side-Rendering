import { Component, h, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';
import { UtilService } from '../../services/util-service';

@Component({
  tag: 'register-app',
  styleUrl: 'register.css',
})
export class RegisterApp {
  @State() colorEye = 'primary';
  @State() nameIcon = 'eye';
  @State() eyePwd: boolean = false;
  @State() email:any;
  @State() firstName:any;
  @State() login:any;
  @State() password:any;
  @Prop() history?: RouterHistory;

  constructor() {
    document.title = `Register - iCare`;
  }

  async register(){
    const loading = document.createElement('ion-loading');
    loading.message = 'Loading...',
    // loading.duration = 2000;
    
    document.body.appendChild(loading);
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    setTimeout(()=>{
      let data = {
        activated: true,
        authorities: [
          'ROLE_USER'
        ],
        login:this.login ,
        email:this.email ,
        firstName:this.firstName,
        password:this.password
      }

      CrudService.postData(cfg.account.register,data).then(()=>{

        let strg = localStorage.getItem('pos'+cfg.account.register);
        if(strg == '201' || strg == '200'){
          UtilService.presentToastWithOptions('Registrasi Berhasil, periksa email anda untuk mengaktifkan akun');
          setTimeout(() => {
            localStorage.removeItem('pos'+cfg.account.register);
            this.history?.replace('/login');
          },600);
          
        }else{
          UtilService.presentToastWithOptions('Registrasi Gagal');
          localStorage.removeItem('pos'+cfg.account.register);
        }
      })

      loading.dismiss();
    }, 1000);
   
    
  }



  changeValue(ev:any) {
    const value = ev.target.value;
    switch (ev.target.name) {
      case 'email' :{
        this.email = value;
        break;
      }

      case 'firstName' :{
        this.firstName = value;
        break;
      }

      case 'login' :{
        this.login = value;
        break;
      }

      case 'password' :{
        this.password = value;
        break;
      }
    }
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
      <div class="container">
        <div class="div-login">
          <p class="p-login">DAFTAR AKUN</p>
          <p class="p-intro">Hai! Selamat bergabung di iCare, lembaga kemanusiaan yang menghimpun dan menyalurkan dana kemanusiaan.</p>
          <ion-input placeholder="Nama Lengkap Anda" class="input" name="firstName" onInput={(event) => this.changeValue(event)}></ion-input>
          <ion-input placeholder="Nomor Telepon Anda" class="input" name="login" onInput={(event) => this.changeValue(event)}></ion-input>
          <ion-input placeholder="Email Anda" class="input" name="email" onInput={(event) => this.changeValue(event)}></ion-input>

          {this.eyePwd == false
          ? <ion-input type="password" placeholder="Password" class="input" name="password" onInput={(event) => this.changeValue(event)}>
              <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd()}>
                <ion-button fill="clear" color={this.colorEye} type="button">
                  <ion-icon name={this.nameIcon} slot="icon-only" class="eye-pwd"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-input>
          : <ion-input type="text" placeholder="Password" class="input" name="password" onInput={(event) => this.changeValue(event)}>
            <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd()}>
              <ion-button fill="clear" color={this.colorEye} type="button">
                <ion-icon name={this.nameIcon} slot="icon-only" class="eye-pwd"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-input>
          }
          {/* <textarea ion-textarea class="textarea" placeholder="Alamat Lengkap Anda"></textarea> */}

          <p class="p-term">Dengan menekan daftar saya menyetujui persyaratan layanan dan kebijakan privasi yang telah ditetapkan oleh iCare.</p>

          <button class="btn-login" onClick={() => this.register()}>
                DAFTAR
          </button>
        </div>
      </div>
    );
  }

}
