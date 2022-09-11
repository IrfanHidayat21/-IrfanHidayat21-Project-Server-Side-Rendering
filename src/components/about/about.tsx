import { Component, h, State, Listen } from '@stencil/core';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';

@Component({
  tag: 'app-about',
  styleUrl: 'about.css',

})
export class About {
  @State() about:any=[];
  @State() pageAbout:number=0;

  @State() callUs: string = 'HUBUNGI KAMI';
  @Listen('resize', { target: 'window' })
  
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768) {
        this.callUs = 'HUBUNGI KAMI';
      }
    });
  }
  constructor() {
    document.title = `Tentang-kami - ICare Kaltim`;
    
  }

  componentDidLoad(){
    this.getAbout();
  }

  checkContact(text: string) {
    if (window.innerWidth <= 768) {
      this.callUs = text;
      setTimeout(() => {
        this.callUs = 'HUBUNGI KAMI';
      },5000);
    }else {
      this.callUs = 'HUBUNGI KAMI';
    }
  }

  getAbout() {
    CrudService.getData(cfg.about.about,'desc', this.pageAbout).then(rs => {

        this.about = rs;

    });
  }


  render() {
    return [

      <div class="container con-about">
      {this.about?.map((ds: { title: any; description:any; }) =>[
        <p class="p-list-title2">TENTANG {ds.title}</p>
      ]
      )}
        <div class="list">
        <ion-row>

        <ion-col class="list-kiri" size="2.5" size-xs="12" size-sm="12" size-md="2.5" size-lg="2.5">
          <img src="../../assets/images/logo-icare2.png" class="img-logo" alt=""/>
        </ion-col>
        <ion-col class="list-kanan" size="9.5" size-xs="12" size-sm="12" size-md="9.5" size-lg="9.5">
        {this.about?.map((ds: { title: any; description:any; }) =>[
        <p class="p-list-title">TENTANG {ds.title}</p>,
          <p class="p-list-detail">{ds.description}</p>
        ]
        )}
        </ion-col>
            
        </ion-row>
      </div>

      {/* <div class="div-btn">
        <ion-button fill="solid" size="large" color="putih" class="btn-maps">
            <img src="../../assets/images/maps.png" class="img-maps" alt=""/>
            Open Google Maps
        </ion-button>
      </div> */}
      <div class="div-map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6910317113093!2d117.1376182140974!3d-0.45767483541099546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df6797f0437bb83%3A0x95219789a54ea599!2siCare%20Kaltim%20(Head%20Office)!5e0!3m2!1sid!2sid!4v1585378896256!5m2!1sid!2sid" width="100%" height="400px" frameborder="0" aria-hidden="false" tabindex="0"></iframe>
      </div>

      <div class="div-head-title">
          <p class="p-head-title">{this.callUs}</p>
          
      </div>
      <ion-grid class="grid-contact">
          <ion-row>
              <ion-col class="col-1" size="3" size-xs="3" size-sm="3" size-md="3" size-lg="3">
                  <div class="center">
                  {this.about?.map((ds: { address: any; }) =>
                    <div class="flex center">
                      <div class="div-logo">
                      <img src="../../assets/images/fb.png" class="img-logo-contact" alt={ds.address} onClick={() => this.checkContact(ds.address) }/>
                      </div>
                        <p class="p-contact">{ds.address}</p> 
                    </div>
                     )}
                  </div>
              </ion-col>
              <ion-col class="col-3" size="3" ssize-xs="3" size-sm="3" size-md="3" size-lg="3">
              {this.about?.map((ds: { telp: any; }) =>
              <div class="flex center">
                    <div class="div-logo">
                    <img src="../../assets/images/wa.png" class="img-logo-contact" alt={ds.telp} onClick={() => this.checkContact(ds.telp) }/>
                    </div>
                 
                      <p class="p-contact">{ds.telp}</p>

                    
                  </div>
                  )}
              </ion-col>
              <ion-col class="col-3" size="3" size-xs="3" size-sm="3" size-md="3" size-lg="3">
              {this.about?.map((ds: { fax: any; }) =>
              <div class="flex center">
                
                    <div class="div-logo">
                    <img src="../../assets/images/email.png" class="img-logo-contact" onClick={() => this.checkContact(ds.fax) } alt={ds.fax}/>
                    </div>

                        <p class="p-contact">{ds.fax}</p>
                    
                  </div>
              )}
              </ion-col>
              <ion-col class="col-2" size="3" size-xs="3" size-sm="3" size-md="3" size-lg="3">
                  <div  class="center">
                  {this.about?.map((ds: { address2: any; }) =>
                    <div class="flex">
                      <div class="div-logo">
                      <img src="../../assets/images/ig.png" class="img-logo-contact" alt={ds.address2} onClick={() => this.checkContact(ds.address2) } />
                      </div>
                      

                        <p class="p-contact">{ds.address2}</p>
                      
                     
                    </div>
                     )}
                  </div>
              </ion-col>
             
          </ion-row>
    </ion-grid>
    <div class="clear-about"></div>
     
    </div>
    ]
  }

}
