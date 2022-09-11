import { Component, State, h, Prop } from '@stencil/core';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';
import { UtilService } from '../../services/util-service';
import { RouterHistory } from '@stencil/router';
@Component({
  tag: 'app-change-password',
  styleUrl: 'change-password.css',
})
export class ChangePassword {
  @Prop() history?: RouterHistory;
  
  @State() myId:any;
  @State() currentPassword:any;
  @State() newPassword:any;
  @State() confirmPassword:any;
  @State() dontMatch = 0;
  @State() btnLoadchangePwd: boolean = false;

  @State() colorEye = 'primary';
  @State() nameIcon = 'eye';
  @State() eyePwd: boolean = false;

  @State() colorEye2 = 'primary';
  @State() nameIcon2 = 'eye';
  @State() eyePwd2: boolean = false;

  @State() colorEye3 = 'primary';
  @State() nameIcon3 = 'eye';
  @State() eyePwd3: boolean = false;

  constructor() {
    document.title = `Change Password - ZakatYuk`;
  }

  componentDidLoad() {
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.myId = userData.claims.sub;
  }

  changeValue(ev:any) {
    const value = ev.target.value;
    switch (ev.target.name) {
     
      case 'currentPassword':{
        this.currentPassword = value;
        break;
      }
      case 'newPassword':{
        this.newPassword = value;
        break;
      }
      case 'confirmPassword':{
        this.confirmPassword = value;
        break;
      }
    }
  }

  handleSubmit(e:any) {
    e.preventDefault();
    // send data to our backend
    if(this.newPassword != this.confirmPassword){
      this.dontMatch = 1;
    }else{
      this.dontMatch = 0;
      this.pushUpdated();
    }
  }

  pushUpdated() {
    this.btnLoadchangePwd = true;
    if(this.currentPassword==null||''){
      UtilService.presentToastWithOptions('Harap lengkapi kolom password sekarang');
      }
      else if(this.newPassword==null||''){
        UtilService.presentToastWithOptions('Harap lengkapi kolom password baru');
      }
      else if(this.confirmPassword==null||''){
        UtilService.presentToastWithOptions('Harap lengkapi kolom konfirmasi password');
      }
      else{
    //this.navCtrl.back().then(() => this.btnLoadchangePwd = false);
    let data = {
      'currentPassword': this.currentPassword ,
      'newPassword': this.newPassword
    }
    CrudService.chgPass(cfg.account.changePassword, data).then((rs: Response) => {
      if(rs != null){
        if(rs.status == 200 || rs.status == 201){
          UtilService.presentToastWithOptions('Change password success');
          localStorage.removeItem('userData');
          CrudService.getInfo(cfg.account.account).then((res)=>{
            localStorage.setItem('userData',JSON.stringify(res));
          })
      
          this.history?.replace('/account');
          this.btnLoadchangePwd = false;
        }
        else if (rs.status == 400){
          UtilService.presentToastWithOptions('Incorrect Password!');
          this.btnLoadchangePwd = false;
        }
      }else{
        UtilService.presentToastWithOptions('Change password failed');
        this.btnLoadchangePwd = false;
      }
    });
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

  lookPwd2(){

    if(this.eyePwd2 == false){
      this.colorEye2 = 'danger';
      this.nameIcon2 = 'eye-off';
      this.eyePwd2 = true;
    }else {
      this.colorEye2 = 'primary';
      this.nameIcon2 = 'eye';
      this.eyePwd2 = false;
    }

  }

  lookPwd3(){  
    if(this.eyePwd3 == false){
      this.colorEye3 = 'danger';
      this.nameIcon3 = 'eye-off';
      this.eyePwd3 = true;
    }else {
      this.colorEye3 = 'primary';
      this.nameIcon3 = 'eye';
      this.eyePwd3 = false;
    }
  }

  



  render() {
    return (
      <div class="container">
      <div class="div-login">
        <p class="p-login">GANTI PASSWORD</p>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        {this.eyePwd == false
        ? <ion-input type="password" placeholder="Password Sekarang" class="input" name="currentPassword" onChange={(event) => this.changeValue(event)}>
            <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd()}>
              <ion-button fill="clear" color={this.colorEye} type="button">
                <ion-icon name={this.nameIcon} slot="icon-only" class="eye-pwd"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-input>
        : <ion-input type="text" placeholder="Password Sekarang" class="input" name="currentPassword" onChange={(event) => this.changeValue(event)}>
          <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd()}>
            <ion-button fill="clear" color={this.colorEye} type="button">
              <ion-icon name={this.nameIcon} slot="icon-only" class="eye-pwd"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-input>
        }

{this.eyePwd2 == false
        ? <ion-input type="password" placeholder="Password Baru" class="input" name="newPassword" onChange={(event) => this.changeValue(event)}>
            <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd2()}>
              <ion-button fill="clear" color={this.colorEye2} type="button">
                <ion-icon name={this.nameIcon2} slot="icon-only" class="eye-pwd"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-input>
        : <ion-input type="text" placeholder="Password Baru" class="input" name="newPassword" onChange={(event) => this.changeValue(event)}>
          <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd2()}>
            <ion-button fill="clear" color={this.colorEye2} type="button">
              <ion-icon name={this.nameIcon2} slot="icon-only" class="eye-pwd"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-input>
        }

{this.eyePwd3 == false
        ? <ion-input type="password" placeholder="Konfirmasi Password" class="input" name="confirmPassword" onChange={(event) => this.changeValue(event)}>
            <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd3()}>
              <ion-button fill="clear" color={this.colorEye3} type="button">
                <ion-icon name={this.nameIcon3} slot="icon-only" class="eye-pwd"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-input>
        : <ion-input type="text" placeholder="Konfirmasi Password" class="input" name="confirmPassword" onChange={(event) => this.changeValue(event)}>
          <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd3()}>
            <ion-button fill="clear" color={this.colorEye3} type="button">
              <ion-icon name={this.nameIcon3} slot="icon-only" class="eye-pwd"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-input>
        }

{this.dontMatch == 1 ? <p class="dont-match">password dont match</p> : ''}

          <ion-button type="submit"  class="btn-login" expand="block" disabled={this.btnLoadchangePwd} id="updateprofilBut">
            {this.btnLoadchangePwd == true
              ? <ion-spinner name="lines-small" color="white" hidden={!this.btnLoadchangePwd}></ion-spinner>
              : 'UPDATE'
            }
          </ion-button>
        </form>
      </div>
    </div>
    );
  }

}
