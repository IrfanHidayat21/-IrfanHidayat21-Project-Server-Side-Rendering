import { Component, State, h, Prop } from '@stencil/core';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';
import { UtilService } from '../../services/util-service';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-reset-password-2',
  styleUrl: 'reset-password-2.css',
 
})
export class ResetPassword2 {
  @Prop() history?: RouterHistory;
  @State() btnLoadresetPwd2: boolean = false;
  @State() hide: boolean = true;
  @State() key:any;
  @State() newPassword:any;

  @State() colorEye = 'primary';
  @State() nameIcon = 'eye';
  @State() eyePwd: boolean = false;

  handleSubmit(e:any) {
    e.preventDefault();
    // send data to our backend
    this.verifikasi();
  }

  // handleSubmit2(e) {
  //   e.preventDefault();
 
  //   this.newPwd();
  // }

    verifikasi(){
      let data = {
        'key': this.key,
        'newPassword': this.newPassword
      }
      CrudService.resetPass(cfg.account.resetPasswordFinish, data).then((rs: Response) => {
        if(rs != null){
          if(rs.status == 200 || rs.status == 201){
            rs.json().then(ds => {
              console.log('res : ', ds);
            })
            
            UtilService.presentToastWithOptions('Password berhasil diperbaharui');
            this.history?.replace('/login');
          }else{
            UtilService.presentToastWithOptions('Kode Verifikasi Anda Salah');
            this.btnLoadresetPwd2 = false;
          }
        }else{
          UtilService.presentToastWithOptions('Gagal, mohon coba lagi');
          this.btnLoadresetPwd2 = false;
        }
      });
    }

    // newPwd(){
    //   let data = {
    //     'newPassword': this.newPassword
    //   }
    //   CrudService.resetPass(cfg.account.resetPasswordFinish, data).then((rs: Response) => {
    //     if(rs != null){
    //       if(rs.status == 200 || rs.status == 201){
    //         rs.json().then(ds => {
    //           console.log('res : ', ds);
    //         })
            
    //         UtilService.presentToastWithOptions('Kode ');
    //         this.history?.replace('/login');
    //       }else{
    //         UtilService.presentToastWithOptions('Gagal, mohon coba lagi');
    //         this.btnLoadresetPwd2 = false;
    //       }
    //     }else{
    //       UtilService.presentToastWithOptions('Gagal, mohon coba lagi');
    //       this.btnLoadresetPwd2 = false;
    //     }
    //   });
    // }

    changeValue(ev:any){
      const value = ev.target.value;
      switch (ev.target.name) {
        case 'key' :{
          this.key = value;
          this.hide =false;
          break;
        }
  
        case 'newPassword' :{
          this.newPassword = value;
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
        <p class="p-login">VERIFIKASI EMAIL</p>
        <p class="p-intro">Masukkan kode verifikasi yang telah terkirim ke email Anda.</p>

        <form onSubmit={(e) => this.handleSubmit(e)}>
         <ion-input type="text" placeholder="Masukkan Kode Verifikasi" class="input" name="key" onChange={(event) => this.changeValue(event)}>
        </ion-input>

        {this.eyePwd == false
        ? <ion-input type="password" hidden={this.hide} placeholder="Password Baru" class="input" name="newPassword" onChange={(event) => this.changeValue(event)}>
            <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd()}>
              <ion-button fill="clear" color={this.colorEye} type="button">
                <ion-icon name={this.nameIcon} slot="icon-only" class="eye-pwd"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-input>
        : <ion-input type="text" hidden={this.hide} placeholder="Password Baru" class="input" name="newPassword" onChange={(event) => this.changeValue(event)}>
          <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd()}>
            <ion-button fill="clear" color={this.colorEye} type="button">
              <ion-icon name={this.nameIcon} slot="icon-only" class="eye-pwd"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-input>
        }

          <button type="submit"  class="btn-login" disabled={this.btnLoadresetPwd2} id="verifikasiBut">
            {this.btnLoadresetPwd2 == true
              ? <ion-spinner name="lines-small" color="white" hidden={!this.btnLoadresetPwd2}></ion-spinner>
              : 'SUBMIT'
            }
          </button>
        </form>
      </div>
      {/* <div class="div-login">
        <p class="p-login">NEW PASSWORD</p>
        <p class="p-intro">Masukkan Password baru Anda.</p>

        <form onSubmit={(e) => this.handleSubmit2(e)}>
        {this.eyePwd == false
        ? <ion-input type="password" placeholder="Password Baru" class="input" name="newPassword" onChange={(event) => this.changeValue(event)}>
            <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd()}>
              <ion-button fill="clear" color={this.colorEye} type="button">
                <ion-icon name={this.nameIcon} slot="icon-only" class="eye-pwd"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-input>
        : <ion-input type="text" placeholder="Password Baru" class="input" name="newPassword" onChange={(event) => this.changeValue(event)}>
          <ion-buttons slot="end" class="btns-eye" onClick={() => this.lookPwd()}>
            <ion-button fill="clear" color={this.colorEye} type="button">
              <ion-icon name={this.nameIcon} slot="icon-only" class="eye-pwd"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-input>
        }
        
          <button type="submit"  class="btn-login" disabled={this.btnLoadresetPwd2} id="saveBut">
            {this.btnLoadresetPwd2 == true
              ? <ion-spinner name="lines-small" color="white" hidden={!this.btnLoadresetPwd2}></ion-spinner>
              : 'SAVE'
            }
          </button>
        </form>
      </div> */}
    </div>
    );
  }

}
