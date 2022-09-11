import { Component, h, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { cfg } from '../../config/config';
import { CrudService } from '../../services/crud-service';
import { UtilService } from '../../services/util-service';

@Component({
  tag: 'resources-page',
  styleUrl: 'resources-page.css'
})
export class ResourcesPage {
  @Prop() history?: RouterHistory;
  @State() News:any=[];
  @State() pageNews:number=0;


  @State() statusSearchLanding = 0;
  @State() valueSearchLanding: string | undefined;
  constructor() {
    document.title = `Berita - ICare Kaltim`;
    localStorage.removeItem('stories');   
  }

  getNews() {
      CrudService.getDataNew4(cfg.news.news,'publishDate,desc','4', this.pageNews).then(rs => {
        if(rs){
          this.News = rs;
        }
 
      });

  }


  async componentWillLoad(){
    await this.getNews();
  }

 async pushNews(ds:any){
  const loading = document.createElement('ion-loading');
  loading.message = 'Loading...',

  document.body.appendChild(loading);
   await loading.present();
  setTimeout(() => {
    localStorage.setItem('stories',JSON.stringify(ds));
    this.history?.push('/berita/'+ds.title);
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

  async push(page: any){
    const loading = document.createElement('ion-loading');
    loading.message = 'Loading...',
  
    document.body.appendChild(loading);
     await loading.present();
    setTimeout(() => {
      this.history?.push(page);
    }, 1000);
  
    loading.dismiss();

  }

  async infiniteScrollData(ev: any){
    const loading = document.createElement('ion-loading');
    loading.message = 'Loading...',
    // loading.duration = 2000;

    document.body.appendChild(loading);
    await loading.present();
    // const { role, data } = await loading.onDidDismiss();
    setTimeout(() => {
      this.pageNews++;
      if(this.statusSearchLanding == 0){
        CrudService.getDataNew4(cfg.news.news,'publishDate,desc', '4', this.pageNews).then(rs => {
          if(rs){
            this.News = this.News.concat(rs);
          }else{
            this.pageNews--;
          }
        });
      }else{
        CrudService.searchData(cfg.news.news, 'title.contains', this.valueSearchLanding +'&page='+this.pageNews).then(ds => {
          if(ds){
            this.News = this.News.concat(ds);
          }else{
            this.pageNews--;
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
                this.pageNews = 0;
                this.statusSearchLanding = 0;
                this.getNews();
              }else{
                this.pageNews = 0;
                this.valueSearchLanding = value;
                
                CrudService.searchData(cfg.news.news, 'title.contains', this.valueSearchLanding +'&page='+this.pageNews).then(ds => {
                  this.statusSearchLanding = 1;
                  this.News = ds;
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
      <div class="container">
        {/* <h1 class="headline">Berita ICare</h1> */}
          <div class="div-head-title">
              <p class="p-head-title">Berita ICare</p>
          </div>
          <div class="div-list">
          <ion-item lines="none" class="itemglobal" >
                <ion-icon name="search" class="icoSearchglobal"></ion-icon>
                <ion-input class="inputSearchglobal" placeholder="Cari Berita..."  name="searchEngine" onChange={(event) => this.changeValue(event)}></ion-input>
                <ion-button class="btn-search" onChange={(event) => this.changeValue(event)}>Cari</ion-button>
              </ion-item>

         
            <div class="list">
            {this.News?.map((ds: { title: any; publishDate: any; description: any; content:any; image:any; }) => 
              <ion-row class="row-list">
                <ion-col class="list-kiri" size="3" size-xs="12" size-sm="12" size-md="4" size-lg="2.5">
                <p class="p-list-title2" onClick={() => this.pushNews(ds)}>{ds.title}</p>
                <div class="div-img">
                {ds.image == null || undefined
                ?<img src="../../assets/images/noimage.jpg" class="img-square2" alt="" onClick={() => this.pushNews(ds)}/>
                 
                :<img src={'data:image/jpeg;base64,'+ds.image} class="img-square" alt="" onClick={() => this.pushNews(ds)}/>
                }
                </div>
                </ion-col>
                <ion-col class="list-kanan" size="9" size-xs="12" size-sm="12" size-md="8" size-lg="9.5">
                  <p class="p-list-title" onClick={() => this.pushNews(ds)}>{ds.title}</p>
                  <p class="p-list-date">Postingan Tanggal <b>{this.formatDate(ds.publishDate)}</b></p>
                   <div class="p-list-detail">{ds.content}</div>
                </ion-col>
              </ion-row>
              )}
            </div>
            {/* <div class="list">
              <ion-row>
                <ion-col class="list-kiri" size="4" size-xs="12" size-sm="12" size-md="4" size-lg="4">
                <p class="p-list-title2">Posko di depan SMK 16 Bengkuring</p>
                <img src="../../assets/images/contoh-kegiatan2.png" class="img-square" alt="" />
                </ion-col>
                <ion-col class="list-kanan" size="8" size-xs="12" size-sm="12" size-md="8" size-lg="8">
                  <p class="p-list-title">Posko di depan SMK 16 Bengkuring</p>
                  <p class="p-list-date">Januari 14, 2019 10.00 am</p>
                  <div class="p-list-detail">Saat ini Icare Kaltim beserta icare Samarinda sudah mendirikan Posko di depan SMK 16 Bengkuring. Kita berdoa dan berharap banjir cepat surut, namun klu banjir ini ternyata berlangsung lama, Kita berdoa dan berharap banjir cepat surut, namun klu banjir ini ternyata berlangsung lama dan berharap banjir cepat surut.</div>
                  </ion-col>
              </ion-row>
            </div> */}
          </div>
          <p class="p-more"  onClick={(event)=> this.infiniteScrollData(event)}>
            <a href="#">
            View More
            </a>
          </p>

      </div>
    ];
  }
}


