import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-modal-doa',
  styleUrl: 'modal-doa.css',

})
export class ModalDoa {
  @State() typePay1: boolean = false;
  @State() typePay2: boolean = false;
  @State() typePay3: boolean = false;
  @State() iconPay1: string = 'ios-arrow-forward';
  @State() iconPay2: string = 'ios-arrow-forward';
  @State() iconPay3: string = 'ios-arrow-forward';
  @State() modal:any = document.querySelector('ion-modal');
  
  async navBack(){
     await this.modal.dismiss();
  }

  moreTypePay(num: number){
    if(num == 1){
      if(this.typePay1 == false){
        this.iconPay1 = 'ios-arrow-down';
        this.typePay1 = true;
      }else{
        this.iconPay1 = 'ios-arrow-forward';
        this.typePay1 = false;
      }
    }else if(num == 2){
      if(this.typePay2 == false){
        this.iconPay2 = 'ios-arrow-down';
        this.typePay2 = true;
      }else{
        this.iconPay2 = 'ios-arrow-forward';
        this.typePay2 = false;
      }

    }else if(num == 3){
      if(this.typePay3 == false){
        this.iconPay3 = 'ios-arrow-down';
        this.typePay3 = true;
      }else{
        this.iconPay3 = 'ios-arrow-forward';
        this.typePay3 = false;
      }

    }
  }
  render() {
    return (
      <ion-content>
        <div class="header-modal">
        <p class="p-intro"><b>NIAT ZAKAT</b></p>
        <ion-button class="btn-close" fill="clear" onClick={() => this.navBack()}>
          <ion-icon name="close"></ion-icon>
        </ion-button>
        </div>


      <div class="div-warning2">
      <ion-item lines="none" button class="item-btn" onClick={() => this.moreTypePay(1)}>
        <p class="label-panduan"><b>NIAT ZAKAT MAAL</b></p>
        <ion-icon name={this.iconPay1} slot="end"></ion-icon>
      </ion-item>
      {this.typePay1 == true
      ?<div class="isi-panduan">
        <img src="../../assets/images/niat/niat-zakat-maal.PNG" class="img-niat" alt=""/>
      </div>
      :''
      }
      <ion-item lines="none" button class="item-btn" onClick={() => this.moreTypePay(2)}>
        <p class="label-panduan"><b>NIAT ZAKAT FITRAH</b></p>
        <ion-icon name={this.iconPay2} slot="end"></ion-icon>
      </ion-item>
      {this.typePay2 == true
      ?<div class="isi-panduan">
        <img src="../../assets/images/niat/fitrah-diri-sendiri.PNG" class="img-niat" alt=""/>
        <img src="../../assets/images/niat/fitrah-istri.PNG" class="img-niat" alt=""/>
        <img src="../../assets/images/niat/fitrah-anak-laki.PNG" class="img-niat" alt=""/>
        <img src="../../assets/images/niat/fitrah-anak-perempuan.PNG" class="img-niat" alt=""/>
        <img src="../../assets/images/niat/fitrah-keluarga-sendiri.PNG" class="img-niat" alt=""/>
        <img src="../../assets/images/niat/fitrah-diwakilkan.PNG" class="img-niat" alt=""/>
      </div>
      :''
      }
      <ion-item lines="none" button class="item-btn" onClick={() => this.moreTypePay(3)}>
        <p class="label-panduan"><b>NIAT MENERIMA ZIS</b></p>
        <ion-icon name={this.iconPay3} slot="end"></ion-icon>
      </ion-item>
      {this.typePay3 == true
      ?<div class="isi-panduan">
        <img src="../../assets/images/niat/niat-menerima-ZIS.PNG" class="img-niat2" alt=""/>
      </div>
      :''
      }
    </div>
    </ion-content>
    );
  }

}
