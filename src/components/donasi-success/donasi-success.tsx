import { Component, h, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-donasi-success',
  styleUrl: 'donasi-success.css',

})
export class DonasiSuccess {
  @Prop() history?: RouterHistory;
  @State() nominal = this.history?.location.state.nominal;
  @State() additionalInfo = this.history?.location.state.info;
  @State() bankName = this.history?.location.state.bankName;
  @State() bankNo = this.history?.location.state.bankNo;
  @State() donationName = this.history?.location.state.title;
  @State() Mydata = this.history?.location.state.data;
  @State() nominalDot: any;
  @State() dpage:any;
  @State() loadModalBasic:boolean=false;
  @State() typePay1: boolean = false;
  @State() typePay2: boolean = false;
  @State() typePay3: boolean = false;
  @State() iconPay1: string = 'ios-arrow-forward';
  @State() iconPay2: string = 'ios-arrow-forward';
  @State() iconPay3: string = 'ios-arrow-forward';
  @State() norek: string = '1020329239';

  @State() accountName:string ='';
  @State() pageBank:number=0;

  constructor() {
    document.title =  this.donationName;

    this.nominalDot = this.nominal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    localStorage.removeItem('byrzakat');
  }
  
  pushPage(page: any){
    this.history?.push(page);
  }



componentDidLoad(){
//this.getBank();
}

  async modalReceipt() {
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'donasi-receipt';
    modalElement.cssClass = 'modalReceiptCss';
    modalElement.componentProps = {
     'Mydata': JSON.stringify(this.Mydata),
     'dpage' : this.dpage
  };
    document.body.appendChild(modalElement);

     await modalElement.present().then(()=> {
     this.loadModalBasic = false;

   });

   const { data } = await modalElement.onWillDismiss();

    await this.history?.replace(data.dpage);


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

  copyRek(val:string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


  render() {
    return (
      <div class="container">
        <div class="div-checkout">
         <p class="p-login">Intruksi Pembayaran</p>
          <p class="p-intro">Transfer sesuai nominal yang dibawah ini:</p>
          <div class="input-payment">
          <p class="payment-total">Rp {this.nominalDot}</p>
          </div>

           <p class="p-intro">Rekening A/N <b>{this.bankName}</b></p>,

            <ion-item class="item-payment" lines="none">
              <ion-thumbnail slot="start">
                    {this.additionalInfo == "Mandiri Syariah"
                    ?<img src="../../assets/images/mandirisya.png" alt=""/>
                    :''
                    }
                    {this.additionalInfo == "BCA"
                    ?<img src="../../assets/images/bca.png" alt=""/>
                    :''
                    }

                    {this.additionalInfo == "BNI"
                    ?<img src="../../assets/images/bni.png" alt=""/>
                    :''
                    }

                    {this.additionalInfo == "BRI"
                    ?<img src="../../assets/images/bri.png" alt=""/>
                    :''
                    }

                    {this.additionalInfo == "Mandiri"
                    ?<img src="../../assets/images/mandiri.png" alt=""/>
                    :''
                    }

                              {this.additionalInfo != "Mandiri Syariah" && this.additionalInfo !=  "BCA" && this.additionalInfo != "BNI" && this.additionalInfo != "Mandiri" && this.additionalInfo != "BRI"
                              ?<img src="../../assets/images/credit-card.svg" class="img-nobank" alt=""/>
                              :''
                              }

              </ion-thumbnail>
              <ion-label class="label-rek">{this.bankNo}</ion-label>
              <ion-button fill="clear" slot="end" onClick={() => this.copyRek(this.bankNo)}>Salin</ion-button>
          </ion-item>

          <br/>
          

            {/* <div class="div-warning">
                <p class="p-warning">Transfer sebelum tanggal <b>16 Jan 2020 20:42 WITA</b> atau donasi mu otomatis dibatalkan oleh sistem</p>
            </div> */}
            <br/>
            <p class="p-intro">PANDUAN PEMBAYARAN</p>

            <div class="div-warning2">
            <ion-item  mode="md" lines="none" button class="item-btn" onClick={() => this.moreTypePay(1)}>
              <p class="label-panduan"><b>Transfer lewat ATM antar bank</b></p>
              <ion-icon name={this.iconPay1} slot="end"></ion-icon>
            </ion-item>
            {this.typePay1 == true
            ?<div class="isi-panduan">
              <p class="p-panduan"><b>1. </b>Masukan kartu ATM ke mesin ATM</p>
              <p class="p-panduan"><b>2. </b>Silahkan masukan PIN ATM Anda</p>
              <p class="p-panduan"><b>3. </b>Pilih transaksi lainnya</p>
              <p class="p-panduan"><b>4. </b>Pilih transfer</p>
              <p class="p-panduan"><b>5. </b>Pilih antar bank</p>
              <p class="p-panduan"><b>6. </b>Masukan nomor rekening <b>{this.bankNo}</b> A/N <b>{this.bankName}</b>. Pilih 'BENAR'</p>
              <p class="p-panduan"><b>7. </b>Masukan jumlah uang yang ingin di transfer, <b>pastikan nominal angkanya sudah benar</b></p>
              <p class="p-panduan"><b>8. </b>Pilih 'BENAR' untuk melanjutkan</p>
              <p class="p-panduan"><b>9. </b>Konfirmasi transfer. Pilih 'YA'</p>
              <p class="p-panduan"><b>10. </b>Ambil bukti transfer</p>
              <p class="p-panduan"><b>11. </b>Transaksi selesai. Pilih 'KELUAR'</p>
            </div>
            :''
            }
             <ion-item  mode="md" lines="none" button class="item-btn" onClick={() => this.moreTypePay(2)}>
              <p class="label-panduan"><b>Transfer lewat ATM bank lain</b></p>
              <ion-icon name={this.iconPay2} slot="end"></ion-icon>
            </ion-item>
            {this.typePay2 == true
            ?<div class="isi-panduan">
              <p class="p-panduan"><b>1. </b>Masukan kartu ATM ke mesin ATM</p>
              <p class="p-panduan"><b>2. </b>Silahkan masukan PIN ATM Anda</p>
              <p class="p-panduan"><b>3. </b>Pilih transaksi lainnya</p>
              <p class="p-panduan"><b>4. </b>Pilih transfer</p>
              <p class="p-panduan"><b>5. </b>Pilih bank lainnya</p>
              <p class="p-panduan"><b>6. </b>Masukkan kode bank dan nomor rekening tujuan (Bank Lain). Pilih 'BENAR'</p>
              <p class="p-panduan"><b>7. </b>Masukkan nomor referensi (kosongkan bila tidak ada)</p>
              <p class="p-panduan"><b>8. </b>Masukkan kembali kode bank dan nomor rekening <b>{this.bankNo}</b> A/N <b>{this.bankName}</b>. Pilih 'BENAR'</p>
              <p class="p-panduan"><b>9. </b>Masukan nomor rek tujuan diawali kode bank. Pilih 'BENAR'</p>
              <p class="p-panduan"><b>10. </b>Masukan jumlah uang yang ingin di transfer, <b>pastikan nominal angkanya sudah benar</b></p>
              <p class="p-panduan"><b>11. </b>Pilih 'BENAR' untuk melanjutkan</p>
              <p class="p-panduan"><b>12. </b>Konfirmasi transfer. Pilih 'YA'</p>
              <p class="p-panduan"><b>13. </b>Ambil bukti transfer</p>
              <p class="p-panduan"><b>14. </b>Transaksi selesai. Pilih 'KELUAR'</p>
            </div>
            :''
            }
            {/* <ion-item lines="none" button class="item-btn" onClick={() => this.moreTypePay(1)}>
              <p class="label-panduan"><b>BCA Mobile Banking</b></p>
              <ion-icon name={this.iconPay1} slot="end"></ion-icon>
            </ion-item>
            {this.typePay1 == true
            ?<div class="isi-panduan">
              <p class="p-panduan"><b>1.</b> Masuk ke aplikasi mobile banking BCA, pilih m-Banking dan input PIN kamu.</p>
              <p class="p-panduan"><b>2.</b> Pilih menu “m-Transfer” lalu pilih menu “BCA Virtual Account”.</p>
              <p class="p-panduan"><b>3.</b> Klik “Input No. Virtual Account” dan masukkan nomor Virtual Account Kitabisa lalu klik “OK”.</p>
              <p class="p-panduan"><b>4.</b> Cek nama dan nominal pembayaran, apabila telah sesuai klik “OK”.</p>
              <p class="p-panduan"><b>5.</b> Masukkan PIN m-BCA kamu dan klik “OK”.</p>
              <p class="p-panduan"><b>6.</b> Transaksi selesai, mohon simpan nomor invoice sebagai bukti pembayaran.</p>
            </div>
            :''
            }
            <ion-item lines="none" button class="item-btn" onClick={() => this.moreTypePay(2)}>
              <p class="label-panduan"><b>BCA Internet Banking</b></p>
              <ion-icon name={this.iconPay2} slot="end"></ion-icon>
            </ion-item>
            {this.typePay2 == true
            ?<div class="isi-panduan">
              <p class="p-panduan"><b>1.</b> Masuk ke aplikasi mobile banking BCA, pilih m-Banking dan input PIN kamu.</p>
              <p class="p-panduan"><b>2.</b> Pilih menu “m-Transfer” lalu pilih menu “BCA Virtual Account”.</p>
              <p class="p-panduan"><b>3.</b> Klik “Input No. Virtual Account” dan masukkan nomor Virtual Account Kitabisa lalu klik “OK”.</p>
              <p class="p-panduan"><b>4.</b> Cek nama dan nominal pembayaran, apabila telah sesuai klik “OK”.</p>
              <p class="p-panduan"><b>5.</b> Masukkan PIN m-BCA kamu dan klik “OK”.</p>
              <p class="p-panduan"><b>6.</b> Transaksi selesai, mohon simpan nomor invoice sebagai bukti pembayaran.</p>
            </div>
            :''
            }
            <ion-item lines="none" button class="item-btn" onClick={() => this.moreTypePay(3)}>
              <p class="label-panduan"><b>BCA ATM</b></p>
              <ion-icon name={this.iconPay3} slot="end"></ion-icon>
            </ion-item>
            {this.typePay3 == true
            ?<div class="isi-panduan">
              <p class="p-panduan"><b>1.</b> Masuk ke aplikasi mobile banking BCA, pilih m-Banking dan input PIN kamu.</p>
              <p class="p-panduan"><b>2.</b> Pilih menu “m-Transfer” lalu pilih menu “BCA Virtual Account”.</p>
              <p class="p-panduan"><b>3.</b> Klik “Input No. Virtual Account” dan masukkan nomor Virtual Account iCare lalu klik “OK”.</p>
              <p class="p-panduan"><b>4.</b> Cek nama dan nominal pembayaran, apabila telah sesuai klik “OK”.</p>
              <p class="p-panduan"><b>5.</b> Masukkan PIN m-BCA kamu dan klik “OK”.</p>
              <p class="p-panduan"><b>6.</b> Transaksi selesai, mohon simpan nomor invoice sebagai bukti pembayaran.</p>
            </div>
            :''
            } */}
          </div> 
            <br></br>
            <div class="div-btn">
            <ion-row no-padding>
                  <ion-col size="6" size-xs="12" size-sm="12" size-md="6" size-lg="6">
                  <button class="btn-beranda" onClick={() => this.pushPage('/')}>
                    KEMBALI KE BERANDA
                  </button>
                  </ion-col>
                  <ion-col size="6" size-xs="12" size-sm="12" size-md="6" size-lg="6">
                  {this.Mydata.receipt == null 
                  ?[
                  <a href="#up">
                  <button class="btn-donasi4" onClick={() => this.modalReceipt()}>
                     UPLOAD BUKTI PEMBAYARAN
                  </button>
                  </a>]
                  :[
                    <a href="#up">
                    <button class="btn-donasi5" disabled={true}>
                       BUKTI PEMBAYARAN TERKIRIM
                    </button>
                    </a>]
                  }
                  </ion-col>
              </ion-row>
            </div>
          </div>
      </div>
    );
  }

}