import { Component, h, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';
import { UtilService } from '../../services/util-service';
// import copy from 'copy-text-to-clipboard';
@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.css'
})
export class LandingPage {
  // private timer: any;
  // @Element() el!: Element;
  // @State() copiedState = 0;
  @Prop() history?: RouterHistory;

  @State() Stories:any=[];
  @State() pageStories:number=0;

  @State() statusSearchLanding = 0;
  @State() valueSearchLanding: string | undefined;

  @State() News:any=[];
  @State() pageNews:number=0;
  // @State() storiesData : any;
  constructor() {
    document.title = `ICare Kaltim`;
    localStorage.removeItem('stories');
    
  }

  getStories() {

    CrudService.getDataTop4(cfg.program.programs,'desc', '3', this.pageStories).then(rs => {
        if (rs){
          this.Stories = rs;
        }
    });
  }


 async componentWillLoad(){
  // const loading = document.createElement('ion-loading');
  // loading.message = 'Loading...',

  // document.body.appendChild(loading);
  //  await loading.present();
  await Promise.all([this.getNews(), this.getStories()]);


    //  loading.dismiss();
   

  }

  getNews() {
    CrudService.getDataNew4(cfg.news.news,'publishDate,desc','4', this.pageNews).then(rs => {
      if(rs){
        this.News = rs;
      }
    });

}

async pushDonasi(ds:any){
  const loading = document.createElement('ion-loading');
  loading.message = 'Loading...',

  document.body.appendChild(loading);
   await loading.present();
  setTimeout(() => {
    let strgLogin = localStorage.getItem('login');
    localStorage.setItem('stories',JSON.stringify(ds));
      if(strgLogin){
      
        //this.history?.push(page);
        this.history?.push('/checkout/'+ ds.name,{donationId:ds.id, donationName:ds.categoryName});
      }else{
        this.history?.replace('/login');
      }
  }, 1000);

  loading.dismiss();
 }
 
 async pushStories(ds:any){
  const loading = document.createElement('ion-loading');
  loading.message = 'Loading...',

  document.body.appendChild(loading);
   await loading.present();
  setTimeout(() => {
    localStorage.setItem('stories',JSON.stringify(ds));
    this.history?.push('/donasi/'+ds.name);  
  }, 1000);

  loading.dismiss();

}

async pushNews(rs:any){
  const loading = document.createElement('ion-loading');
  loading.message = 'Loading...',

  document.body.appendChild(loading);
   await loading.present();
  setTimeout(() => {
    localStorage.setItem('stories',JSON.stringify(rs));
    this.history?.push('/berita/'+rs.title);    
  }, 1000);

  loading.dismiss();
}


formatDate(date:any) {
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

formatNumber(n : any) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


async infiniteScrollData(ev: any){
  const loading = document.createElement('ion-loading');
  loading.message = 'Loading...',
  // loading.duration = 2000;

  document.body.appendChild(loading);
  await loading.present();


  // const { role, data } = await loading.onDidDismiss();
setTimeout(() => {
  this.pageStories++;
  if(this.statusSearchLanding == 0){
    CrudService.getDataTop4(cfg.program.programs,'desc','3', this.pageStories).then(rs => {
      if(rs){
        this.Stories = this.Stories.concat(rs);
      }else{
        this.pageStories--;
      }
    });
  }else{
    CrudService.searchData(cfg.program.programs, 'name.contains', this.valueSearchLanding +'&page='+this.pageStories).then(ds => {
      if(ds){
        this.Stories = this.Stories.concat(ds);
      }else{
        this.pageStories--;
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
      const value = ev.target.value;
      switch (ev.target.name) {

      case 'searchEngine': {
          if(value == null || value == '' || value == ' ' || value.length < 1){
            this.pageStories = 0;
            this.statusSearchLanding = 0;
            this.getStories();
          }else{
            this.pageStories = 0;
            this.valueSearchLanding = value;
            
            CrudService.searchData(cfg.program.programs, 'name.contains', this.valueSearchLanding +'&page='+this.pageStories).then(ds => {
              this.statusSearchLanding = 1;
              this.Stories = ds;
              if(ds.totalElements == 0){
                UtilService.presentToastWithOptions('Data tidak ditemukan');
              }
            });
          }
        }
        break;

      }
      
    }, 500);
    loading.dismiss();
    
}
  render() {
    return [
      <div class="div-banner">
        <app-banner />
      </div>,
      <div class="ab-landing-mobile">
        <div class="companies">
          <div class="container">
          <div class="div-head-title">
              <p class="p-head-title">Berita Terbaru</p>
            </div>
            <div class="div-list-berita">
            
            <ion-row class="row-list-berita">
            {this.News?.map((rs: { title: any; publishDate: any; description: any; content:any; image:any; }) => 

                  <ion-col class="list-kiri-berita" size="2.8" size-xs="12" size-sm="6" size-md="6" size-lg="2.8">
                    <div class="div-img-berita">
                    {rs.image == null || undefined
                          ?<img src="../../assets/images/noimage.jpg" class="img-berita" alt=""  onClick={() => this.pushNews(rs)} />
                          :<img src={'data:image/jpeg;base64,'+rs.image} class="img-berita" alt=""  onClick={() => this.pushNews(rs)} />
                    }

                    </div>
                    <div>
                      <p class="text-primary" onClick={() => this.pushNews(rs)}><b>{rs.title}</b></p>
                      <div class ="div-flex">
                        <p class="text-gray"><b>Berita</b></p>
                        <p class="text-gray between">{this.formatDate(rs.publishDate)}</p>
                      </div>
                    </div>
                  </ion-col>
                  )}
            </ion-row>
            </div>

            <div class="div-head-title">
              <p class="p-head-title">Daftar Donasi</p>
            </div>

            <div class="div-list">
              <ion-item lines="none" class="itemglobal" >
                <ion-icon name="search" class="icoSearchglobal"></ion-icon>
                <ion-input class="inputSearchglobal" placeholder="Cari Yang Ingin Kamu Bantu?"  name="searchEngine" onChange={(event) => this.changeValue(event)}></ion-input>
                <ion-button class="btn-search" onChange={(event) => this.changeValue(event)}>Cari</ion-button>
              </ion-item>
              <div class="list">
              {this.Stories?.map((ds: { name: any; dateStart: any; desc: any; collected: null; dateEnd: any; image:any; }) =>
                <ion-row class="row-list">
                  <ion-col class="list-kiri" size="4" size-xs="12" size-sm="12" size-md="4" size-lg="4">
                    <p class="p-list-title2" onClick={() => this.pushStories(ds)}>{ds.name}</p>
                    <div class="div-img">
                    {ds.image == null || undefined
                    ?<img src="../../assets/images/noimage.jpg" class="img-square2" alt="" onClick={() => this.pushStories(ds)} />
                    :<img src={'data:image/jpeg;base64,'+ds.image} class="img-square" alt="" onClick={() => this.pushStories(ds)} />
                    }
                    </div>
                    <ion-button fill="clear" class="btn-donasi2" onClick={() => this.pushDonasi(ds)}>DONASI</ion-button>
                  </ion-col>
                  <ion-col class="list-kanan" size="8" size-xs="12" size-sm="12" size-md="8" size-lg="8">
                    <p class="p-list-title" onClick={() => this.pushStories(ds)}>{ds.name}</p>
                    <p class="p-list-date">Postingan Tanggal <b>{this.formatDate(ds.dateStart)}</b></p>
                 <div class="p-list-detail">{ds.desc}</div>
                    <div class="div-ket flex">
                      <div class="div-terkumpul">
                        <p class="p-list-ket">Terkumpul</p>
                        {ds.collected != null
                        ?<p class="p-list-donate"><b>Rp {this.formatMoney(ds.collected)}</b></p>

                        :<p class="p-list-donate"><b>Rp 0</b></p>
                      }
                      </div>
                      <div class="div-sisa">
                        <p class="p-list-ket">Tgl. Berakhir</p>
                        <p class="p-list-donate"><b>{this.formatDate(ds.dateEnd)}</b></p>
                      </div>
                    </div>
                    <ion-button fill="clear" class="btn-donasi" onClick={() => this.pushDonasi(ds)}>DONASI</ion-button>
                    <br/>
                  </ion-col>
                  </ion-row>
                  )}

              </div>

  
            </div>
          </div>
          <div class="div-infinite">
            <p class="p-more" onClick={(event)=> this.infiniteScrollData(event)}>
                <a href="#">
                View More
                </a>
              </p>
        </div>
        </div>
       
      </div>
    ];
  }
}
