import { Component, h, Prop, Event, EventEmitter, State, } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { UtilService } from '../../services/util-service';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';

@Component({
  tag: 'my-account',
  styleUrl: 'my-account.css',
})
export class MyAccount {
  @Prop() history?: RouterHistory;
  @State() userData:any;
  @State() firstName:any;
  @State() email:any;
  @State() login:any;  
  
  @State() isNoEdit:boolean=true;
  @State() editWord:string='EDIT PROFILE';

  public alertSesi = document.createElement('ion-alert');
  @Event() loginCompleted?: EventEmitter;

  loginCompletedHandler(todo: any) {
    this.loginCompleted?.emit(todo);
  }
  constructor() {
    document.title = `My Account - iCare`;
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.firstName=this.userData.firstName;
    this.login=this.userData.login;
    this.email=this.userData.email;
  }

  pushPage(page: any){
    this.history?.push(page, {});
  }

  editProfile(){
    if(this.isNoEdit==true){
      this.isNoEdit=false;
      this.editWord='SAVE';
      let element = document.getElementById('editBut') as HTMLIonRouterElement;
      element.style.backgroundColor = 'var(--color-green-haze)';
    }
    else{
      this.presentAlertProfile('Simpan perubahan ?');
    }
  }

  changeValue(ev:any) {
    const value = ev.target.value;
    switch (ev.target.name) {

      case 'firstName': {
        this.firstName=value;
        break
      }

      case 'login': {
        this.login=value;
        break
      }

      case 'email': {
        this.email=value;
        break
      }

    }
  }

  async logout(){
    const loading = document.createElement('ion-loading');
    loading.message = 'Loading...',
    // loading.duration = 2000;

    document.body.appendChild(loading);
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    setTimeout(()=>{
      
      this.presentAlert('Yakin ingin keluar?')
    }, 1000);

    loading.dismiss();
   
  }

  getUser() {
    CrudService.getInfo(cfg.account.account).then((res)=>{
      localStorage.setItem('userData',JSON.stringify(res));
    })
  }


  componentDidLoad(){
    this.getUser();
  }

  async presentAlert(msg:any) {
    this.alertSesi.backdropDismiss = true;
    
    this.alertSesi.header = 'Peringatan';
    this.alertSesi.subHeader = msg;
    this.alertSesi.cssClass = 'alertBackQuesImg';
    
    this.alertSesi.buttons = [
      {
        text: 'Keluar',
        cssClass: 'yesBackQuesImg',
        handler: () => {
          localStorage.clear();
          this.loginCompletedHandler('logout');
          this.history?.replace('/');
        }
      }, {
        text: 'Batal',
        role: 'cancel',
        cssClass: 'noBackQuesImg',
        handler: () => {
        }
      }
    ];
  
    document.body.appendChild(this.alertSesi);
    return this.alertSesi.present();

  }

  async presentAlertProfile(msg:any) {
    this.alertSesi.backdropDismiss = true;
    
    this.alertSesi.header = 'Peringatan';
    this.alertSesi.subHeader = msg;
    this.alertSesi.cssClass = 'alertBackQuesImg';
    
    this.alertSesi.buttons = [
      {
        text: 'Ya',
        cssClass: 'yesBackQuesImg',
        handler: () => {

          if(this.firstName==null||''){
          UtilService.presentToastWithOptions('Harap lengkapi kolom nama');
          }
          else if(this.login==null||''){
            UtilService.presentToastWithOptions('Harap lengkapi kolom nomor telepon');
          }
          else if(this.email==null||''){
            UtilService.presentToastWithOptions('Harap lengkapi kolom email');
          }
          else{
            let data={
              activated: true,
              authorities: ["ROLE_USER"],
              firstName:this.firstName,
              email:this.email,
              id: this.userData.id,
              // imageUrl: '',
              // langKey: 'en',
              imageUrl: null,
              langKey: null,
              lastModifiedBy: 'user',
              lastModifiedDate: new Date(),
              lastName: '',
              login:this.login,
            }

            CrudService.postData(cfg.account.account,data).then(()=>{
              //let strg = localStorage.getItem('pos'+cfg.user.users);
              // if(strg == '201' || strg == '200'){

                UtilService.presentToastWithOptions('Berhasil merubah profil');
                setTimeout(() => {
                CrudService.getInfo(cfg.account.account).then((res)=>{
                  localStorage.removeItem('userData');
                  localStorage.setItem('userData',JSON.stringify(res));
                  this.isNoEdit=true;
                  this.editWord='EDIT PROFILE';
                  let element = document.getElementById('editBut') as HTMLIonRouterElement;
                  element.style.backgroundColor = ' var(--color-green-haze)';
                 
                 //this.history?.replace('/');
                })

                },600);
                
              // }else{
              //   UtilService.presentToastWithOptions('Gagal menyimpan perubahan');
              //   localStorage.removeItem('put'+cfg.user.users);
              // }
            })


          }
        }
      }, {
        text: 'Tidak',
        role: 'cancel',
        cssClass: 'noBackQuesImg',
        handler: () => {
          this.isNoEdit=true;
          this.editWord='EDIT PROFILE';
          let element = document.getElementById('editBut') as HTMLIonRouterElement;
          element.style.backgroundColor = ' var(--color-green-haze)';
          location.reload();
        }
      }
    ];
  
    document.body.appendChild(this.alertSesi);
    return this.alertSesi.present();

  }
  render() {
    return (
      <div class="container">
        <div class="div-login">
          <p class="p-login">INFORMASI AKUN</p>
          {/* <p class="p-intro">Hai! Selamat bergabung di iCare, lembaga kemanusiaan yang menghimpun dan menyalurkan dana kemanusiaan.</p> */}
          <ion-input placeholder="Nama Lengkap Anda"  readonly={this.isNoEdit} name="firstName" value={this.firstName} class="input" onIonChange={() => this.changeValue(event)}></ion-input>
          <ion-input placeholder="Nomor Telepon Anda" readonly={true} name="login" value={this.login} class="input" onIonChange={() => this.changeValue(event)}></ion-input>
          <ion-input placeholder="E-mail" readonly={true} name="email" value={this.email} class="input" onIonChange={() => this.changeValue(event)}></ion-input>
          {/* <p class="p-term">Dengan menekan daftar saya menyetujui persyaratan layanan dan kebijakan privasi yang telah ditetapkan oleh iCare.</p> */}
          <br></br>
          {this.editWord == 'EDIT PROFILE'
          ? <button class="btn-login2 ion-margin-bottom" id="chgBut" onClick={() => this.pushPage('/change-password')}>
             CHANGE PASSWORD
            </button>
          :''
          }

          <button class="btn-login" id="editBut" onClick={() => this.editProfile()}>
                {this.editWord}
          </button>
        
         <div class="horizontal-line"></div>
         <div class="div-btns">
          <ion-button class="btn-donasi3" fill="clear" expand="block" onClick={() => this.pushPage('/riwayat')}>
              Riwayat Donasi
          </ion-button>
          <ion-button class="btn-logout" fill="solid" color="danger" expand="block" onClick={() => this.logout()}>
              Log Out
          </ion-button>
         </div>
        
        </div>
      </div>
    );
  }

}
