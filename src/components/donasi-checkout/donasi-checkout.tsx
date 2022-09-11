import { Component, h, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { UtilService } from '../../services/util-service';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';

@Component({
  tag: 'app-donasi-checkout',
  styleUrl: 'donasi-checkout.css',
})
export class DonasiCheckout {
  @Prop() history?: RouterHistory;
  @State() donationId:string='';
  @State() donationName:string='';
  @State() donationNominal:string='';
  
  @State() login?: boolean = false;

    @State() isAnonym:boolean=false;
    @State() nominal:number | undefined;
    @State() nominalCR:any | undefined = '';
    
    @State() additionalInfo: any ='';
    @State() bankNo: any ='';
    @State() bankName: any ='';
    @State() userId: any;

    @State() isTransfer: string = '';
    @State() loadModalBasic:boolean=false;

    @State() checkAgree: boolean = false;
    @State() disable: boolean = false;
    @State() storiesData : any;

    @State() Bank:any=[];
    @State() pageBank:number=0;

    getBank() {
      CrudService.getData(cfg.bank.banks,'desc', this.pageBank).then(rs => {
        if(rs){
          this.Bank = rs;
        }
      });
    }
  

 async componentDidLoad(){
  // let strgLogin = localStorage.getItem('login');
  // await Promise.all([
  //   this.getBank(),
  //   this.donationNominal = localStorage.getItem('byrzakat') || '{}',
  //   this.storiesData = JSON.parse(localStorage.getItem('stories') || '{}'),
  //   Object.assign(this.storiesData)
  // ]);

  this.getBank();
  let strgLogin = localStorage.getItem('login');
  this.donationNominal = localStorage.getItem('byrzakat') || '{}';
  this.storiesData = JSON.parse(localStorage.getItem('stories') || '{}');
  Object.assign(this.storiesData);
  
    if(strgLogin){
      this.login = true;
    }

    this.donationId = this.storiesData.id;
    this.donationName = this.storiesData.name;
    // if(this.history?.location.state!==null){
    //   this.donationId=this.history?.location.state.donationId;
    //   this.donationName=this.history?.location.state.donationName;
    //   this.donationNominal=this.history?.location.state.nominal;

    // }

    let donation = +this.donationNominal;
    if(donation > 9999){
      this.nominal = +this.donationNominal;
    }

 }

 constructor() {
   document.title =  this.donationName+' iCare';
 }


hideName(){
  if(this.isAnonym==false){
    this.isAnonym=true;
  }
  else{
    this.isAnonym=false;
  }
}

banking(bank: any){
  this.isTransfer=bank.id;
  this.additionalInfo=bank.name;
  this.bankName=bank.accountName;
  this.bankNo=bank.accountNumber;
}

  pushDonate(){
    let nominalzakat:any = localStorage.getItem('byrzakat');
    let donation = +nominalzakat ;
    if(donation > 9999 ){
      this.nominal = +nominalzakat;
    }else {
      let nomCR = this.nominalCR.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "") || undefined;
      this.nominal = +nomCR;
    }
    if(this.nominal==undefined){
      UtilService.presentToastWithOptions('Harap masukkan nominal');
    }
    else if(this.nominal<10000){
      UtilService.presentToastWithOptions('Minimal donasi Rp 10.000');
    }
    else if(this.isTransfer==''){
      UtilService.presentToastWithOptions('Harap pilih metode pembayaran');
    }
    else if(this.checkAgree==false){
      UtilService.presentToastWithOptions('Harap dicentang akad berzakat');
    }
    else{
      let userData=JSON.parse(localStorage.getItem('userData') || '{}');
      this.userId=userData.id;

      let data={
        additionalInfo: this.additionalInfo,
        donationDate:new Date(),
        isAnonym:this.isAnonym,
        nominal:this.nominal,
        programId:this.donationId,
        programName:this.donationName,
        userId:this.userId,
        bankName: this.bankName,
        accountNo: this.bankNo
      }
      CrudService.postData(cfg.donation.donations,data).then((rs)=>{
        let Mydata = rs;
        let strg = localStorage.getItem('pos'+cfg.donation.donations);
        if(strg == '201' || strg == '200'){
          UtilService.presentToastWithOptions('Donasi berhasil, harap lanjutkan pembayaran');
          setTimeout(() => {
            localStorage.removeItem('pos'+cfg.donation.donations);
            this.history?.replace('/checkout-confirm/'+this.donationName,{nominal:this.nominal,title:this.donationName, data: Mydata, bankName:this.bankName, bankNo: this.bankNo, info: this.additionalInfo});
          },600);
          
        }else{
          UtilService.presentToastWithOptions('Donasi gagal');
          localStorage.removeItem('pos'+cfg.donation.donations);
        }
      })
    }

  }
  
  pushPage(page: any){
    this.history?.push(page, {});
  }
 
  changeValue(ev: any) {
    const value = ev.target.value;
    switch (ev.target.name) {

      case 'nominal': {
        // for currency output
        this.nominalCR=this.formatNumber(value);

        // data for API
        this.nominal=value;

        break;
      }

      case 'checkAgree': {
        this.checkAgree = ev.detail.checked;
        if (this.checkAgree==true) {
          this.disable=true;
        }
        else {
          this.disable=false;
        }
        break;
      }

    }
  }


  formatNumber(n : any) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  async checkAgreeClick(){
    if(this.checkAgree==false){
      this.checkAgree=true;
      this.disable=true;
    }
    else{
      this.checkAgree=false;
      this.disable=false;
    }
    // const modalElement = document.createElement('ion-modal');
    // modalElement.component = 'app-modal-doa';
    // modalElement.cssClass = 'modalDoaCss';

  //   modalElement.componentProps = {
  //    'dataHelp': JSON.parse(strg),
  // };
  //   document.body.appendChild(modalElement);

  //    await modalElement.present().then(()=> {
  //    this.loadModalBasic = false;

  //  });

  }

  render() {
    
      
   
      return [
      
      <div class="container">
        {this.login == false 
        ? 
          <div class="div-must-login">
            <div class="div-checkout">
          
              <div class="div-payment">
                <p class="p-login2">Anda Harus LOGIN Terlebih Dahulu</p>
               
              </div>
              <button class="btn-donasi4" onClick={() => this.pushPage('/login')}>
                  LOGIN
              </button>
            </div>
           
          </div>
        : <div class="div-checkout">
      
        <div class="div-payment">
        <p class="p-login">Masukkan Nominal Donasi</p>

          <ion-input type="text" placeholder="Rp.0" class="input-payment" name="nominal" value={this.nominalCR} onInput={(event) => this.changeValue(event)}></ion-input>

        <p class="p-payment">Jumlah Donasi Minimal Rp 10.000</p>

        <ion-item class="item-payment" onClick={() => this.hideName()}>
          <ion-label>Sembunyikan Nama</ion-label>
          <ion-checkbox  mode="md"  class="check" checked={this.isAnonym} slot="end"></ion-checkbox>
        </ion-item>

        </div>

        <div class="div-payment">
        <p class="p-login">Metode Pembayaran</p>
        <p class="p-intro">Verifikasi Manual 1x24 Jam</p>
        {/* <div class="item-payment">
          <img src="../../assets/icon/icon192.png" class="img-payment" alt=""/>
          <p>BCA Virtual Account</p>
          <input type="checkbox" class="checkbox-payment" />
          <span class="checkmark"></span>
        </div> */}
        {this.Bank?.map((ds: {id: any; accountName: any; accountNumber: any; description: any; name:any; }) => 
        
        <ion-item class="item-payment" onClick={() => this.banking(ds)}>
          <ion-thumbnail slot="start">
          {ds.name == "Mandiri Syariah"
          ?<img src="../../assets/images/mandirisya.png" alt=""/>
          :''
          }
          {ds.name == "BCA"
          ?<img src="../../assets/images/bca.png" alt=""/>
          :''
          }

          {ds.name == "BNI"
          ?<img src="../../assets/images/bni.png" alt=""/>
          :''
          }

          {ds.name == "BRI"
          ?<img src="../../assets/images/bri.png" alt=""/>
          :''
          }

          {ds.name == "Mandiri"
          ?<img src="../../assets/images/mandiri.png" alt=""/>
          :''
          }

         {ds.name != "Mandiri Syariah" || "BCA" || "BNI"|| "Mandiri" || "BRI"
          ?<img src="../../assets/images/credit-card.svg" class="img-nobank" alt=""/>
          :''
          }
               
          </ion-thumbnail>
          <ion-label>{ds.name}</ion-label>
          <ion-checkbox  mode="md" class="check" checked={this.isTransfer == ds.id} slot="end"></ion-checkbox>
        </ion-item>

        )}
{/* 
        <ion-item class="item-payment">
          <ion-thumbnail slot="start">
                <img src="../../assets/images/bni.png" alt=""/>
          </ion-thumbnail>
          <ion-label>Transfer BNI</ion-label>
          <ion-checkbox class="check" slot="end"></ion-checkbox>
        </ion-item>
        <ion-item class="item-payment">
          <ion-thumbnail slot="start">
                <img src="../../assets/images/mandiri.png" alt=""/>
          </ion-thumbnail>
          <ion-label>Transfer Mandiri</ion-label>
          <ion-checkbox class="check" slot="end"></ion-checkbox>
        </ion-item>

        <ion-item class="item-payment">
          <ion-thumbnail slot="start">
                <img src="../../assets/images/bri.png" alt=""/>
          </ion-thumbnail>
          <ion-label>Transfer BRI</ion-label>
          <ion-checkbox class="check" slot="end"></ion-checkbox>
        </ion-item> */}



        </div>
          
            {/* <a href="#up"> */}
            <ion-item lines="none" class="item-checkbox">
                <ion-checkbox mode="md" class="checkbox" slot="start"  name="checkAgree" onClick={() => this.checkAgreeClick()} checked={this.checkAgree}></ion-checkbox>
                <ion-label text-wrap ><i>Bismillah.</i> Saya serahkan donasi ini kepada Lembaga iCare agar dapat dikelola dengan sebaik-baiknya sesuai dengan ketentuan syariat agama.</ion-label>
            </ion-item>  
            {/* </a>  */}

            <br></br>
            <button class="btn-donasi4" disabled={!this.disable} onClick={() => this.pushDonate()}>
              LANJUTKAN PEMBAYARAN
            </button>
      </div>
        }  
        
      </div>
      ];
  
  }

}
