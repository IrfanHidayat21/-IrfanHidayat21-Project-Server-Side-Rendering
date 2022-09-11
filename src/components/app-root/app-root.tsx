import '@stencil/router';
import { LocationSegments, RouterHistory } from '@stencil/router';
import { Component, Element, Listen, State, h } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';
import { CrudService } from '../../services/crud-service';
import { cfg } from '../../config/config';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  history?: RouterHistory;
  @State() about:any=[];
  @State() pageAbout:number=0;

  elements = [
    'site-header',
    'site-menu',
    'app-burger',
    'main'
  ];
  
  @Element() el!: HTMLElement;

  @State() isLeftSidebarIn: boolean = false;

  @Listen('resize', { target: 'window' })
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768 && this.isLeftSidebarIn) {
        this.isLeftSidebarIn = false;
        document.body.classList.remove('no-scroll');
        this.elements.forEach((el) => {
          this.el.querySelector(el)!.classList.remove('left-sidebar-in');
        });
      }
    });
  }

  
  private setHistory = ({ history }: { history: RouterHistory }) => {
    if (!this.history) {
      this.history = history;
      this.history.listen((location: LocationSegments) => {
        // Google Analytics
        (window as any).gtag('config', 'UA-44023830-34', { 'page_path': location.pathname + location.search });

        // Hubspot
        // (window as any)._hsq.push(['setPath', location.pathname + location.search ]);
        // (window as any)._hsq.push(['trackPageView']);
      });
    }
  }

  getAbout() {
    CrudService.getData(cfg.about.about,'desc', this.pageAbout).then(rs => {

        this.about = rs;

    });
  }

  componentDidLoad() {
    this.getAbout();
    this.isLeftSidebarIn = false;
   
  }

  private toggleLeftSidebar = () => {
    if (window.innerWidth >= 768) {
      return;
    }
    const elements = this.elements
      .map(el => this.el.querySelector(el))
      .filter(el => !!el) as Element[];

    if (this.isLeftSidebarIn) {
      this.isLeftSidebarIn = false;
      document.body.classList.remove('no-scroll');
      elements.forEach(el => {
        el.classList.remove('left-sidebar-in');
        el.classList.add('left-sidebar-out');
      });
    } else {
      this.isLeftSidebarIn = true;
      document.body.classList.add('no-scroll');
      elements.forEach(el => {
        el.classList.add('left-sidebar-in');
        el.classList.remove('left-sidebar-out');
      });
    }
  }

  render() {
    const siteState: SiteState = {
      isLeftSidebarIn: this.isLeftSidebarIn,
      toggleLeftSidebar: this.toggleLeftSidebar
    };

    return (
      <SiteProviderConsumer.Provider state={siteState}>
        <div id="up"></div>
        <site-header />
        
        <main>
          <stencil-router scrollTopOffset={0}>
            <stencil-route style={{ display: 'none' }} routeRender={this.setHistory}/>
            <stencil-route-switch>
              
              <stencil-route url="/" component="landing-page" exact={true} />
              
              <stencil-route url="/donasi/:pageName" routeRender={({ match }) => (
                <blog-component page={match!.url}></blog-component>
              )}/>
              <stencil-route url="/berita/:pageName" routeRender={({ match }) => (
                <blog-component page={match!.url} ></blog-component>
              )}/>
              <stencil-route url="/checkout/:pageName" component="app-donasi-checkout" />
              <stencil-route url="/checkout-confirm/:pageName" component="app-donasi-success" />
              <stencil-route url="/riwayat" component="app-donasi-riwayat" />

              {/* <stencil-route url="/docs/:pageName" routeRender={({ match }) => (
                <doc-component page={match!.url}></doc-component>
              )}/> */}

              {/* <stencil-route url="/blog" component="blog-list" exact={true}/>

              <stencil-route url="/blog/:pageName" routeRender={({ match }) => (
                <blog-component page={match!.url}></blog-component>
              )}/> */}
              <stencil-route url="/tentang-kami" component="app-about" />
              <stencil-route url="/login" component="app-login" />
              <stencil-route url="/account" component="my-account" />
              <stencil-route url="/register" component="register-app" />
              <stencil-route url="/berita" component="resources-page"  />
              <stencil-route url="/upload-bukti-pembayaran" component="receipt"  />
              <stencil-route url="/change-password" component="app-change-password"  />
              <stencil-route url="/forgot-password" component="app-reset-password"  />
              <stencil-route url="/new-password" component="app-reset-password-2"  />
              <stencil-route url="/niat-zakat" component="app-modal-doa"  />
              <stencil-route component='notfound-page'></stencil-route>
            </stencil-route-switch>
          </stencil-router>
         <footer>
              <div class="container">
                <div class="footer-col">
                  <app-icon name="logo"/>
                  <p>Copyright ©2020 I CARE KALTIM</p>
                  <ul class="external-links list--unstyled">
                    <li>
                      <a rel="noopener" class="link--external" target="_blank" href="https://www.facebook.com/icare.icare.186" aria-label="Facebook">
                        <app-icon name="facebook"></app-icon>
                      </a>
                    </li>
                    <li>
                      
                    {this.about?.map((ds: { address2: any; }) =>
                      <a rel="noopener" class="link--external" target="_blank" href={"http://instagram.com/"+ds.address2} aria-label="Instagram">
                        <app-icon name="ig"></app-icon>
                      </a>
                    )}
                    </li>
                    <li>
                    {this.about?.map((ds: { telp: any; }) =>
  
                      <a rel="noopener" class="link--external" target="_blank" href={"https://api.whatsapp.com/send?phone="+ds.telp} aria-label="Whatsapp">
                        <app-icon name="wa"></app-icon>
                      </a>

                    )}
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
         
        </main>
      </SiteProviderConsumer.Provider>
    );
  }
}
