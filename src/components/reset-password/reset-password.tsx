import { Component, State, h, Prop } from '@stencil/core';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';
import { UtilService } from '../../services/util-service';
import { RouterHistory } from '@stencil/router';
@Component({
  tag: 'app-reset-password',
  styleUrl: 'reset-password.css',
 
})
export class ResetPassword {
  @Prop() history?: RouterHistory;
  @State() btnLoadresetPwd: boolean = false;
  @State() email:any;
  @State() errortitle:any;


  handleSubmit(e:any) {
    e.preventDefault();
    // send data to our backend
    this.forgotPwd();
  }

    forgotPwd(){
      // let data = {
      //   'mail': this.email,
      // }
      CrudService.resetPass(cfg.account.resetPasswordInit, this.email).then((rs: Response) => {

          if(rs.status == 200 || rs.status == 201){
            rs.json().then(ds => {
              console.log('res : ', ds, ds.title);
              this.errortitle = ds.title;
            })
            
            UtilService.presentToastWithOptions('Kode verifikasi telah dikirim ke email Anda.');
            this.history?.replace('/new-password');
          }else {
            UtilService.presentToastWithOptions('Email Anda Belum Terdaftar');
            this.btnLoadresetPwd = false;
          }

      });
    }
    changeValue(ev:any){
      const value = ev.target.value;
      this.email = value;
    }
  
  render() {
    return (
      <div class="container">
      <div class="div-login">
        <p class="p-login">RESET PASSWORD</p>
        <form onSubmit={(e) => this.handleSubmit(e)}>
         <ion-input type="email" placeholder="Masukkan Email Anda" class="input" name="mail" onChange={(event) => this.changeValue(event)}>
        </ion-input>
        
          <button type="submit"  class="btn-login2" disabled={this.btnLoadresetPwd} id="resetpassBut">
            {this.btnLoadresetPwd == true
              ? <ion-spinner name="lines-small" color="white" hidden={!this.btnLoadresetPwd}></ion-spinner>
              : 'RESET PASSWORD'
            }
          </button>
        </form>
      </div>
    </div>
    );
  }

}
