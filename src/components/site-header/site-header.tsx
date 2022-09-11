import { Component, Element, Listen, State, h } from '@stencil/core';

@Component({
  tag: 'site-header',
  styleUrl: 'site-header.css'
})
export class SiteHeader {
  @Element() el!: Element;

  @State() isMobileMenuShown: boolean = false;
  @State() menuUser: string = 'Login';
  @State() urlUser: string = '/login';

  @Listen('loginCompleted', {target: 'window'})
  loginCompletedHandler(event: CustomEvent) {

    if(event.detail == 'login'){
      this.menuUser = "Account";
      this.urlUser = "/account";
      localStorage.setItem('login', 'true');
    }else{
      this.menuUser = "Login";
      this.urlUser = "/login";
      localStorage.removeItem('login');
    }
    
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768) {
        const menu = (this.el.querySelector('.header-menu') as HTMLElement);
        menu.style.display = '';
        this.el.classList.remove('show-mobile-menu');
        document.body.classList.remove('no-scroll');
        this.isMobileMenuShown = false;
      }
    });
  }
  componentWillLoad(){
    let strgLogin = localStorage.getItem('login');
    if(strgLogin){
      this.menuUser = "Account";
      this.urlUser = "/account";
    }else{
      this.menuUser = "Login";
      this.urlUser = "/login";
    }
  }
  componentDidLoad() {
    this.isMobileMenuShown = false;
    
  }

  showNav () {
    if (this.isMobileMenuShown) return;
    this.isMobileMenuShown = true;

    const menu = (this.el.querySelector('.header-menu') as HTMLElement);

    menu.style.display = "flex";
    setTimeout(() => {
      this.el.classList.add('show-mobile-menu');
      document.body.classList.add('no-scroll');
    }, 1)
  }

 async hideNav () {
    const loading = document.createElement('ion-loading');
    loading.message = 'Loading...',
  
    document.body.appendChild(loading);
     await loading.present();
    setTimeout(() => {
      if (!this.isMobileMenuShown) return;
      this.isMobileMenuShown = false;
  
      const menu = (this.el.querySelector('.header-menu') as HTMLElement);
  
      this.el.classList.remove('show-mobile-menu');
      setTimeout(() => {
        menu.style.display = "none";
        document.body.classList.remove('no-scroll');
      }, 300)
    }, 1000);
  
    loading.dismiss();
  
  }

  render() {
    return (
      <div class="container">
        <stencil-route-link url="/" class="logo-link" anchorTitle="ICare logo">
          <app-icon name="logo"/>
        </stencil-route-link>

        <div class="header-menu">
        {/* <stencil-route-link urlMatch="/docs" url="/docs/introduction" onClick={() => { this.hideNav() }}>
            Beranda
          </stencil-route-link> */}
          <stencil-route-link url="/" exact={true} onClick={() => { this.hideNav() }}>
            Beranda
           
          </stencil-route-link>
          <stencil-route-link url="/berita" onClick={() => { this.hideNav() }}>
            Berita
          </stencil-route-link>
          <stencil-route-link url="/tentang-kami" onClick={() => { this.hideNav() }}>
            Tentang Kami
          </stencil-route-link>
          <stencil-route-link url={this.urlUser} onClick={() => { this.hideNav() }}>
            {this.menuUser}
          </stencil-route-link>
          {/* <stencil-route-link url="/blog" onClick={() => { this.hideNav() }}>
            blog
          </stencil-route-link> */}

          {/* <ul class="external-links list--unstyled">
            <li>
              <a rel="noopener" class="link--external" target="_blank" href="https://www.facebook.com/icare.icare.186" aria-label="Facebook">
                <app-icon name="facebook"></app-icon>
              </a>
            </li>
            <li>
              <a rel="noopener" class="link--external" target="_blank" href="http://instagram.com/iCare.Kaltim" aria-label="Instagram">
                <app-icon name="ig"></app-icon>
              </a>
            </li>
            <li>
              <a rel="noopener" class="link--external" target="_blank" href="https://api.whatsapp.com/send?phone=628115577300" aria-label="Whatsapp">
                <app-icon name="wa"></app-icon>
              </a>
            </li>
          </ul> */}

          <button class="header-close" onClick={() => { this.hideNav() }}>
            <app-icon name="close"></app-icon>
          </button>
        </div>

        <button class="header-overflow" onClick={() => { this.showNav() }} aria-label="Open menu">
          <app-icon name="menu"></app-icon>
        </button>
      </div>
    );
  }
}
