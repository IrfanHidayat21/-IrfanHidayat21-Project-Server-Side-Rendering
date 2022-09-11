import { Component, h, State, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';
import { UtilService } from '../../services/util-service';

@Component({
  tag: 'app-donasi-riwayat',
  styleUrl: 'donasi-riwayat.css',

})
export class DonasiRiwayat {
  @State() btnhide: boolean = true;

  @State() Donations:any=[];
  @State() pageDonations:number=0;
  @State() idDonations!: string;

  @Prop() history?: RouterHistory;

  @State() statusSearchHistory = 0;
  @State() valueSearchHistory: string ='';
  
  constructor() {
    document.title = `Riwayat Donasi`;
  }

  pushPage(page: any){
    this.history?.push(page, {});
  }

  getDonations() {

    CrudService.getData(cfg.donation.donations,'desc', this.pageDonations).then(rs => {
      if(rs){
        this.Donations = rs;
      }
    });
  }

  async componentDidLoad(){

    const loading = document.createElement('ion-loading');
    loading.message = 'Loading...',
    // loading.duration = 2000;

    document.body.appendChild(loading);
    await loading.present().then(async()=> {
      await this.getDonations();
    });
      setTimeout(async()=>{
    }, 1000);

    loading.dismiss();
  

  }

  pushZakat() {
    this.btnhide = false;
    const output1 = document.getElementById('ZakatBut');
    const url1 =''
    if (output1) output1.innerHTML = url1.toString()
    const output2 = document.getElementById('DonasiBut');
    const url2 =''
    if (output2) output2.innerHTML = url2.toString()
    // document.getElementById('ZakatBut')?.style.backgroundColor = 'var(--color-primary)';
    // document.getElementById('DonasiBut').style.backgroundColor = 'var(--ion-color-rythim)';
  }

  async pushDonasi() {
    const loading = document.createElement('ion-loading');
    loading.message = 'Loading...',
  
    document.body.appendChild(loading);
     await loading.present();
    setTimeout(() => {

      this.btnhide = true;
      const output2 = document.getElementById('DonasiBut');
      const url2 =''
      if (output2) output2.innerHTML = url2.toString()
      const output1 = document.getElementById('ZakatBut');
      const url1=''
      if (output1) output1.innerHTML = url1.toString()
      // document.getElementById('DonasiBut').style.backgroundColor = 'var(--ion-color-primary)';
      // document.getElementById('ZakatBut').style.backgroundColor = 'var(--ion-color-rythim)';
    }, 1000);
  
    loading.dismiss();
  }

  formatDate(date: any) {
    let dt = new Date(date);
    let a = dt.getDate().toString();
    let b:any = dt.getMonth().toString();
    let bMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember'];
  
    let c = dt.getFullYear().toString();
    return a + ' ' + bMonth[b] + ' ' + c;
  }

  formatMoney(money: any) {
    let m = money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    return m;
  }

  async infiniteScrollData(ev: any){
    const loading = document.createElement('ion-loading');
    loading.message = 'Loading...',
    // loading.duration = 2000;

    document.body.appendChild(loading);
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    setTimeout(() => {
      this.pageDonations++;
      if(this.statusSearchHistory == 0){
        CrudService.getData(cfg.donation.donations,'desc', this.pageDonations).then(rs => {
          if(rs){
            this.Donations = this.Donations.concat(rs);
          }else{
            this.pageDonations--;
          }
        });
      }else{
        CrudService.searchData(cfg.donation.donations, 'donationDate.equals', this.valueSearchHistory +'&page='+this.pageDonations).then(ds => {
          if(ds){
            this.Donations = this.Donations.concat(ds);
          }else{
            this.pageDonations--;
          }

        });
      }
    

    ev.target.complete();
    }, 500);
    loading.dismiss();

  }

 async changeValue(ev:any) {
    const loading = document.createElement('ion-loading');
    loading.message = 'Loading...',
    // loading.duration = 2000;
  
    document.body.appendChild(loading);
    await loading.present();

setTimeout(() => {
  const value = ev.target.value.substring(0, 10);
  switch (ev.target.name) {

    case 'searchEngine': {
        if(value == null || value == '' || value == ' ' || value.length < 1){
          this.pageDonations = 0;
          this.statusSearchHistory = 0;
          this.getDonations();
        }else{
          this.pageDonations = 0;
          this.valueSearchHistory = value;
          
          CrudService.searchData(cfg.donation.donations, 'donationDate.equals', this.valueSearchHistory +'&page='+this.pageDonations).then(ds => {
            this.statusSearchHistory = 1;
            this.Donations = ds;
            if(ds.totalElements == 0){
              UtilService.presentToastWithOptions('Data tidak ditemukan');
            }
          });
        }
      
      break;
    }
}
  
}, 500);
loading.dismiss();

}

pushConfirm(ds:any) {
  this.history?.replace('/checkout-confirm/'+ ds.programName,{nominal:ds.nominal,title:ds.programName, data: ds, info:ds.additionalInfo, bankName:ds.bankName, bankNo:ds.accountNo});
}

  render() {
    return (
      <div class="container">
        <div class="div-login">
        <p class="p-login">Riwayat Donasi</p>
        
        <ion-item lines="none" class="itemglobal" >
          <ion-icon name="search" class="icoSearchglobal"></ion-icon>
          <ion-datetime class="inputSearchglobal" display-format="DD-MMMM-YYYY" placeholder="Cari Tanggal Donasi.." name="searchEngine" onIonChange={(event) => this.changeValue(event)}></ion-datetime>
        </ion-item>

        {this.Donations?.map((ds: { programName: any; donationDate: any; desc: any; nominal: null; receipt: any; image:any; additionalInfo:any; bankName:any; accountNo:any}) => 
        <div class="div-item" onClick={() => this.pushConfirm(ds)}>
          <ion-row>
            <ion-col class="divImg"  size="2" size-xs="12" size-sm="12" size-md="2" size-lg="2">
            {/* {ds.image != null || undefined
                ?<img src={'data:image/jpeg;base64,'+ds.image} alt=""/>
                :<img src="../../assets/images/noimage.jpg" alt=""/>
            }   */}
                    {ds.additionalInfo == "Mandiri Syariah"
                    ?<img src="../../assets/images/mandirisya.png" alt=""/>
                    :''
                    }
                    {ds.additionalInfo == "BCA"
                    ?<img src="../../assets/images/bca.png" alt=""/>
                    :''
                    }

                    {ds.additionalInfo == "BNI"
                    ?<img src="../../assets/images/bni.png" alt=""/>
                    :''
                    }

                    {ds.additionalInfo == "BRI"
                    ?<img src="../../assets/images/bri.png" alt=""/>
                    :''
                    }

                    {ds.additionalInfo == "Mandiri"
                    ?<img src="../../assets/images/mandiri.png" alt=""/>
                    :''
                    }

                              {ds.additionalInfo != "Mandiri Syariah" && ds.additionalInfo !=  "BCA" && ds.additionalInfo != "BNI" && ds.additionalInfo != "Mandiri" && ds.additionalInfo != "BRI"
                              ?<img src="../../assets/images/credit-card.svg" class="img-nobank" alt=""/>
                              :''
                              }


                    


            </ion-col>
            <ion-col class="divInfo"  size="10" size-xs="12" size-sm="12" size-md="10" size-lg="10">
            {ds.programName != null 
                ?<p class="p-title2">{ds.programName}</p>
                :<p class="p-title2">Sedekah</p>
            }
                <p class="p-norek-donasi"><b>A/N {ds.bankName} -</b> Rek {ds.accountNo}</p>
            
                <p class="p-date-donasi">{this.formatDate(ds.donationDate)} - <b>Rp {this.formatMoney(ds.nominal || 0)}</b></p>
            </ion-col>
          </ion-row>
          {ds.receipt != null
            ? <p class="status-success">Sukses</p>
            :  <p class="status-pending">Pending</p>
          }
        </div>
        )}
        {/* <div class="div-item" onClick={() => this.pushPage('/checkout-confirm/Bantuan Obat-obatan Bagi Warga Terkena Banjir')}>
          <ion-row>
          <ion-col class="divImg"  size="2" size-xs="12" size-sm="12" size-md="2" size-lg="2">
                <img src="../../assets/images/contoh-kegiatan.png" alt=""/>
              </ion-col>
              <ion-col class="divInfo"  size="10" size-xs="12" size-sm="12" size-md="10" size-lg="10">
                  <p class="p-title2">BANTUAN OBAT-OBATAN BAGI WARGA TERKENA BANJIR</p>
                  <p class="p-date-donasi">Januari 14, 2019 10.00 am - <b>Rp 1.000.000</b></p>
              </ion-col>
          </ion-row>
          <p class="status-pending">Pending</p>
        </div>
        <div class="div-item" onClick={() => this.pushPage('/checkout-confirm/Bantuan Obat-obatan Bagi Warga Terkena Banjir')}>
          <ion-row>
          <ion-col class="divImg"  size="2" size-xs="12" size-sm="12" size-md="2" size-lg="2">
                <img src="../../assets/images/contoh-kegiatan2.png" alt=""/>
              </ion-col>
              <ion-col class="divInfo"  size="10" size-xs="12" size-sm="12" size-md="10" size-lg="10">
                  <p class="p-title2">BANTUAN OBAT-OBATAN BAGI WARGA TERKENA BANJIR</p>
                  <p class="p-date-donasi">Januari 14, 2019 10.00 am - <b>Rp 19.800.000</b></p>
              </ion-col>
          </ion-row>
          <p class="status-failed">Failed</p>
        </div> */}
        <div class="div-infinite">
              <p class="p-more" onClick={(event)=> this.infiniteScrollData(event)}>
                  <a href="#">
                  View More
                  </a>
                </p>
        </div>

        </div>

      </div>
    );
  }

}
