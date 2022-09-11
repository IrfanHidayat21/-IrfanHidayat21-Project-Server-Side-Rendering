import { Component, h, State } from '@stencil/core';
import { cfg } from '../../config/config';
import { CrudService } from '../../services/crud-service';


@Component({
  tag: 'app-banner',
  styleUrl: 'banner.css',
  

})
export class Banner {
 @State() slideIndex = 1;
 
 @State() Banner:any=[];
 @State() pageBanner:number=0;
 @State() loadBanner: any = 0;

 componentWillLoad(){
  this.getBanner();
 }
 componentDidLoad(){
  
  // this.showSlides(this.slideIndex);
  }


  plusSlides (n: any) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: any) {
    this.showSlides(this.slideIndex += n);
  }
  showSlides(n: any) {
    
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {this.slideIndex = 1}    
    if (n < 1) {this.slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.add('noneSlide');
        slides[i].classList.remove('blockSlide');
    }
    slides[this.slideIndex-1].classList.remove('noneSlide'); 
    slides[this.slideIndex-1].classList.add('blockSlide'); 
  }

  getBanner() {
    CrudService.getData(cfg.banner.banners,'desc', this.pageBanner).then(rs => {
      if(rs.length > 0 ){
        
        this.Banner = rs;
        this.loadBanner = 1;
        setTimeout(() => {
          this.showSlides(this.slideIndex);
        }, 50);
        
      }

    });
  }

  formatDate(date: any) {
    let dt = new Date(date);
    let a = dt.getDate().toString();
    let b:any = dt.getMonth().toString();
    let bMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember'];
  
    let c = dt.getFullYear().toString();
    return a + ' ' + bMonth[b] + ' ' + c;
  }

  render() {
    return [
        <div class="slideshow-container">

          {this.Banner?.map((ds: { name: any; publishDate: any; image:any; }) => 
           this.loadBanner == 1
           ? <div class="mySlides fade">
            {/* <div class="numbertext">1 / 2</div> */}
            
              {ds.image == null || undefined 
              ?<img src="../../assets/images/no-ex-banner.png" class="img-banner" />
              :<img src={'data:image/jpeg;base64,'+ds.image} class="img-banner" />
              }
              <div class="div-text-banner">
                <div class="text">
                  {this.formatDate(ds.publishDate)}
                  <stencil-route-link class="route-title" >
                      <p class="p-title">
                        {ds.name}
                      </p>
                  </stencil-route-link>
                  
                </div>
              </div>
            </div>
            :''
          )}

          {/* <div class="mySlides fade">
            <div class="numbertext">2 / 2</div>
            <img src="../../assets/images/contoh-kegiatan2.png" class="img-banner" />
            <div class="div-text-banner">
              
              <div class="text">
                Januari 16, 10.00 am
                <stencil-route-link class="route-title" url="/donasi/Bantuan Obat-obatan Bagi Warga Terkena Banjir">
                    <p class="p-title">
                      Satu Sedekah yang Tulus Sama Dengan Seribu Langkah Menuju Surga
                    </p>
                </stencil-route-link>
                
              </div>
            </div>
          </div> */}


          <a class="prev" onClick={() => this.currentSlide(-1)}>&#10094;</a>
          <a class="next" onClick={() => this.plusSlides(1)}>&#10095;</a>

          </div>
      
//       <div class="container-banner">

//       <ion-slides  class="div-slide">
//       <ion-slide>
//       <img src="../../assets/images/ex-banner.png" class="img-banner" alt=""/>
//       <div class="div-flex">
//         <div class="div-left">
//             <ion-button fill="clear" class="btn-left">
//                 <ion-icon class="icon-arrow" name="ios-arrow-back"></ion-icon>
//             </ion-button>
//         </div>
//         <div class="div-text-slide" > 

//         <p class="p-date">Januari 16, 10.00 am</p>
//           <p class="p-title">Satu Sedekah yang Tulus Sama Dengan 
// Seribu Langkah Menuju Surga</p>

//         </div>
//         <div class="div-right">
//             <ion-button fill="clear" class="btn-right">
//                 <ion-icon class="icon-arrow" name="ios-arrow-forward"></ion-icon>
//             </ion-button>
//         </div>
//       </div>
//       </ion-slide>
//       <ion-slide>
//       <h1>Slide 2</h1>
//       </ion-slide>
//       <ion-slide>
//       <h1>Slide 3</h1>
//       </ion-slide>     
//       </ion-slides>
//       </div>
    ];
  }

}
