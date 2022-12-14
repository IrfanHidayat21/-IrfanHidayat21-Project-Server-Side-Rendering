/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  RouterHistory,
} from '@stencil/router';
import {
  MarkdownHeading,
  SiteStructureItem,
} from './global/definitions';

export namespace Components {
  interface AnnouncementBar {}
  interface AppAbout {}
  interface AppBanner {}
  interface AppBurger {
    'toggleLeftSidebar': () => void;
  }
  interface AppChangePassword {
    'history'?: RouterHistory;
  }
  interface AppDonasiCheckout {
    'history'?: RouterHistory;
  }
  interface AppDonasiRiwayat {
    'history'?: RouterHistory;
  }
  interface AppDonasiSuccess {
    'history'?: RouterHistory;
  }
  interface AppIcon {
    'name'?: string;
  }
  interface AppLogin {
    'history'?: RouterHistory;
  }
  interface AppModalDoa {}
  interface AppResetPassword {
    'history'?: RouterHistory;
  }
  interface AppResetPassword2 {
    'history'?: RouterHistory;
  }
  interface AppRoot {}
  interface BlogComponent {
    'page'?: string;
  }
  interface BlogList {}
  interface ContributorList {
    'contributors'?: string[];
  }
  interface DemoCard {
    'SourceBufferList'?: string;
    'demoUrl'?: string;
    'description'?: string;
    'imgPath'?: string;
    'name'?: string;
    'sourceUrl'?: string;
  }
  interface DocComponent {
    'page'?: string;
  }
  interface DonasiReceipt {
    'Mydata': any;
    'history'?: RouterHistory;
  }
  interface HighlightCode {}
  interface InPageNavigation {
    'currentPageUrl': string;
    'pageLinks': MarkdownHeading[];
    'srcUrl': string;
  }
  interface LandingPage {
    'history'?: RouterHistory;
  }
  interface LowerContentNav {
    'next'?: SiteStructureItem;
    'prev'?: SiteStructureItem;
  }
  interface MyAccount {
    'history'?: RouterHistory;
  }
  interface NewsletterSignup {}
  interface NotfoundPage {}
  interface PreFooter {}
  interface ProGlshader {
    'frag': string;
    'media'?: string;
    'ready': boolean;
    'retina': boolean;
    'uniforms': any;
    'vert': string;
  }
  interface PwasPage {}
  interface RegisterApp {
    'history'?: RouterHistory;
  }
  interface ResourcesPage {
    'history'?: RouterHistory;
  }
  interface SiteHeader {}
  interface SiteMenu {
    'selectedParent'?: SiteStructureItem;
    'siteStructureList': SiteStructureItem[];
  }
  interface SiteTopBar {}
}

declare global {


  interface HTMLAnnouncementBarElement extends Components.AnnouncementBar, HTMLStencilElement {}
  var HTMLAnnouncementBarElement: {
    prototype: HTMLAnnouncementBarElement;
    new (): HTMLAnnouncementBarElement;
  };

  interface HTMLAppAboutElement extends Components.AppAbout, HTMLStencilElement {}
  var HTMLAppAboutElement: {
    prototype: HTMLAppAboutElement;
    new (): HTMLAppAboutElement;
  };

  interface HTMLAppBannerElement extends Components.AppBanner, HTMLStencilElement {}
  var HTMLAppBannerElement: {
    prototype: HTMLAppBannerElement;
    new (): HTMLAppBannerElement;
  };

  interface HTMLAppBurgerElement extends Components.AppBurger, HTMLStencilElement {}
  var HTMLAppBurgerElement: {
    prototype: HTMLAppBurgerElement;
    new (): HTMLAppBurgerElement;
  };

  interface HTMLAppChangePasswordElement extends Components.AppChangePassword, HTMLStencilElement {}
  var HTMLAppChangePasswordElement: {
    prototype: HTMLAppChangePasswordElement;
    new (): HTMLAppChangePasswordElement;
  };

  interface HTMLAppDonasiCheckoutElement extends Components.AppDonasiCheckout, HTMLStencilElement {}
  var HTMLAppDonasiCheckoutElement: {
    prototype: HTMLAppDonasiCheckoutElement;
    new (): HTMLAppDonasiCheckoutElement;
  };

  interface HTMLAppDonasiRiwayatElement extends Components.AppDonasiRiwayat, HTMLStencilElement {}
  var HTMLAppDonasiRiwayatElement: {
    prototype: HTMLAppDonasiRiwayatElement;
    new (): HTMLAppDonasiRiwayatElement;
  };

  interface HTMLAppDonasiSuccessElement extends Components.AppDonasiSuccess, HTMLStencilElement {}
  var HTMLAppDonasiSuccessElement: {
    prototype: HTMLAppDonasiSuccessElement;
    new (): HTMLAppDonasiSuccessElement;
  };

  interface HTMLAppIconElement extends Components.AppIcon, HTMLStencilElement {}
  var HTMLAppIconElement: {
    prototype: HTMLAppIconElement;
    new (): HTMLAppIconElement;
  };

  interface HTMLAppLoginElement extends Components.AppLogin, HTMLStencilElement {}
  var HTMLAppLoginElement: {
    prototype: HTMLAppLoginElement;
    new (): HTMLAppLoginElement;
  };

  interface HTMLAppModalDoaElement extends Components.AppModalDoa, HTMLStencilElement {}
  var HTMLAppModalDoaElement: {
    prototype: HTMLAppModalDoaElement;
    new (): HTMLAppModalDoaElement;
  };

  interface HTMLAppResetPasswordElement extends Components.AppResetPassword, HTMLStencilElement {}
  var HTMLAppResetPasswordElement: {
    prototype: HTMLAppResetPasswordElement;
    new (): HTMLAppResetPasswordElement;
  };

  interface HTMLAppResetPassword2Element extends Components.AppResetPassword2, HTMLStencilElement {}
  var HTMLAppResetPassword2Element: {
    prototype: HTMLAppResetPassword2Element;
    new (): HTMLAppResetPassword2Element;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLBlogComponentElement extends Components.BlogComponent, HTMLStencilElement {}
  var HTMLBlogComponentElement: {
    prototype: HTMLBlogComponentElement;
    new (): HTMLBlogComponentElement;
  };

  interface HTMLBlogListElement extends Components.BlogList, HTMLStencilElement {}
  var HTMLBlogListElement: {
    prototype: HTMLBlogListElement;
    new (): HTMLBlogListElement;
  };

  interface HTMLContributorListElement extends Components.ContributorList, HTMLStencilElement {}
  var HTMLContributorListElement: {
    prototype: HTMLContributorListElement;
    new (): HTMLContributorListElement;
  };

  interface HTMLDemoCardElement extends Components.DemoCard, HTMLStencilElement {}
  var HTMLDemoCardElement: {
    prototype: HTMLDemoCardElement;
    new (): HTMLDemoCardElement;
  };

  interface HTMLDocComponentElement extends Components.DocComponent, HTMLStencilElement {}
  var HTMLDocComponentElement: {
    prototype: HTMLDocComponentElement;
    new (): HTMLDocComponentElement;
  };

  interface HTMLDonasiReceiptElement extends Components.DonasiReceipt, HTMLStencilElement {}
  var HTMLDonasiReceiptElement: {
    prototype: HTMLDonasiReceiptElement;
    new (): HTMLDonasiReceiptElement;
  };

  interface HTMLHighlightCodeElement extends Components.HighlightCode, HTMLStencilElement {}
  var HTMLHighlightCodeElement: {
    prototype: HTMLHighlightCodeElement;
    new (): HTMLHighlightCodeElement;
  };

  interface HTMLInPageNavigationElement extends Components.InPageNavigation, HTMLStencilElement {}
  var HTMLInPageNavigationElement: {
    prototype: HTMLInPageNavigationElement;
    new (): HTMLInPageNavigationElement;
  };

  interface HTMLLandingPageElement extends Components.LandingPage, HTMLStencilElement {}
  var HTMLLandingPageElement: {
    prototype: HTMLLandingPageElement;
    new (): HTMLLandingPageElement;
  };

  interface HTMLLowerContentNavElement extends Components.LowerContentNav, HTMLStencilElement {}
  var HTMLLowerContentNavElement: {
    prototype: HTMLLowerContentNavElement;
    new (): HTMLLowerContentNavElement;
  };

  interface HTMLMyAccountElement extends Components.MyAccount, HTMLStencilElement {}
  var HTMLMyAccountElement: {
    prototype: HTMLMyAccountElement;
    new (): HTMLMyAccountElement;
  };

  interface HTMLNewsletterSignupElement extends Components.NewsletterSignup, HTMLStencilElement {}
  var HTMLNewsletterSignupElement: {
    prototype: HTMLNewsletterSignupElement;
    new (): HTMLNewsletterSignupElement;
  };

  interface HTMLNotfoundPageElement extends Components.NotfoundPage, HTMLStencilElement {}
  var HTMLNotfoundPageElement: {
    prototype: HTMLNotfoundPageElement;
    new (): HTMLNotfoundPageElement;
  };

  interface HTMLPreFooterElement extends Components.PreFooter, HTMLStencilElement {}
  var HTMLPreFooterElement: {
    prototype: HTMLPreFooterElement;
    new (): HTMLPreFooterElement;
  };

  interface HTMLProGlshaderElement extends Components.ProGlshader, HTMLStencilElement {}
  var HTMLProGlshaderElement: {
    prototype: HTMLProGlshaderElement;
    new (): HTMLProGlshaderElement;
  };

  interface HTMLPwasPageElement extends Components.PwasPage, HTMLStencilElement {}
  var HTMLPwasPageElement: {
    prototype: HTMLPwasPageElement;
    new (): HTMLPwasPageElement;
  };

  interface HTMLRegisterAppElement extends Components.RegisterApp, HTMLStencilElement {}
  var HTMLRegisterAppElement: {
    prototype: HTMLRegisterAppElement;
    new (): HTMLRegisterAppElement;
  };

  interface HTMLResourcesPageElement extends Components.ResourcesPage, HTMLStencilElement {}
  var HTMLResourcesPageElement: {
    prototype: HTMLResourcesPageElement;
    new (): HTMLResourcesPageElement;
  };

  interface HTMLSiteHeaderElement extends Components.SiteHeader, HTMLStencilElement {}
  var HTMLSiteHeaderElement: {
    prototype: HTMLSiteHeaderElement;
    new (): HTMLSiteHeaderElement;
  };

  interface HTMLSiteMenuElement extends Components.SiteMenu, HTMLStencilElement {}
  var HTMLSiteMenuElement: {
    prototype: HTMLSiteMenuElement;
    new (): HTMLSiteMenuElement;
  };

  interface HTMLSiteTopBarElement extends Components.SiteTopBar, HTMLStencilElement {}
  var HTMLSiteTopBarElement: {
    prototype: HTMLSiteTopBarElement;
    new (): HTMLSiteTopBarElement;
  };
  interface HTMLElementTagNameMap {
    'announcement-bar': HTMLAnnouncementBarElement;
    'app-about': HTMLAppAboutElement;
    'app-banner': HTMLAppBannerElement;
    'app-burger': HTMLAppBurgerElement;
    'app-change-password': HTMLAppChangePasswordElement;
    'app-donasi-checkout': HTMLAppDonasiCheckoutElement;
    'app-donasi-riwayat': HTMLAppDonasiRiwayatElement;
    'app-donasi-success': HTMLAppDonasiSuccessElement;
    'app-icon': HTMLAppIconElement;
    'app-login': HTMLAppLoginElement;
    'app-modal-doa': HTMLAppModalDoaElement;
    'app-reset-password': HTMLAppResetPasswordElement;
    'app-reset-password-2': HTMLAppResetPassword2Element;
    'app-root': HTMLAppRootElement;
    'blog-component': HTMLBlogComponentElement;
    'blog-list': HTMLBlogListElement;
    'contributor-list': HTMLContributorListElement;
    'demo-card': HTMLDemoCardElement;
    'doc-component': HTMLDocComponentElement;
    'donasi-receipt': HTMLDonasiReceiptElement;
    'highlight-code': HTMLHighlightCodeElement;
    'in-page-navigation': HTMLInPageNavigationElement;
    'landing-page': HTMLLandingPageElement;
    'lower-content-nav': HTMLLowerContentNavElement;
    'my-account': HTMLMyAccountElement;
    'newsletter-signup': HTMLNewsletterSignupElement;
    'notfound-page': HTMLNotfoundPageElement;
    'pre-footer': HTMLPreFooterElement;
    'pro-glshader': HTMLProGlshaderElement;
    'pwas-page': HTMLPwasPageElement;
    'register-app': HTMLRegisterAppElement;
    'resources-page': HTMLResourcesPageElement;
    'site-header': HTMLSiteHeaderElement;
    'site-menu': HTMLSiteMenuElement;
    'site-top-bar': HTMLSiteTopBarElement;
  }
}

declare namespace LocalJSX {
  interface AnnouncementBar {
    'onToggleModal'?: (event: CustomEvent<any>) => void;
  }
  interface AppAbout {}
  interface AppBanner {}
  interface AppBurger {
    'toggleLeftSidebar'?: () => void;
  }
  interface AppChangePassword {
    'history'?: RouterHistory;
  }
  interface AppDonasiCheckout {
    'history'?: RouterHistory;
  }
  interface AppDonasiRiwayat {
    'history'?: RouterHistory;
  }
  interface AppDonasiSuccess {
    'history'?: RouterHistory;
  }
  interface AppIcon {
    'name'?: string;
  }
  interface AppLogin {
    'history'?: RouterHistory;
    'onLoginCompleted'?: (event: CustomEvent<any>) => void;
  }
  interface AppModalDoa {}
  interface AppResetPassword {
    'history'?: RouterHistory;
  }
  interface AppResetPassword2 {
    'history'?: RouterHistory;
  }
  interface AppRoot {}
  interface BlogComponent {
    'page'?: string;
  }
  interface BlogList {}
  interface ContributorList {
    'contributors'?: string[];
  }
  interface DemoCard {
    'SourceBufferList'?: string;
    'demoUrl'?: string;
    'description'?: string;
    'imgPath'?: string;
    'name'?: string;
    'sourceUrl'?: string;
  }
  interface DocComponent {
    'page'?: string;
  }
  interface DonasiReceipt {
    'Mydata'?: any;
    'history'?: RouterHistory;
    'onUploadCompleted'?: (event: CustomEvent<Blob>) => void;
  }
  interface HighlightCode {}
  interface InPageNavigation {
    'currentPageUrl'?: string;
    'pageLinks'?: MarkdownHeading[];
    'srcUrl'?: string;
  }
  interface LandingPage {
    'history'?: RouterHistory;
  }
  interface LowerContentNav {
    'next'?: SiteStructureItem;
    'prev'?: SiteStructureItem;
  }
  interface MyAccount {
    'history'?: RouterHistory;
    'onLoginCompleted'?: (event: CustomEvent<any>) => void;
  }
  interface NewsletterSignup {}
  interface NotfoundPage {}
  interface PreFooter {}
  interface ProGlshader {
    'frag'?: string;
    'media'?: string;
    'ready'?: boolean;
    'retina'?: boolean;
    'uniforms'?: any;
    'vert'?: string;
  }
  interface PwasPage {}
  interface RegisterApp {
    'history'?: RouterHistory;
  }
  interface ResourcesPage {
    'history'?: RouterHistory;
  }
  interface SiteHeader {}
  interface SiteMenu {
    'selectedParent'?: SiteStructureItem;
    'siteStructureList'?: SiteStructureItem[];
  }
  interface SiteTopBar {}

  interface IntrinsicElements {
    'announcement-bar': AnnouncementBar;
    'app-about': AppAbout;
    'app-banner': AppBanner;
    'app-burger': AppBurger;
    'app-change-password': AppChangePassword;
    'app-donasi-checkout': AppDonasiCheckout;
    'app-donasi-riwayat': AppDonasiRiwayat;
    'app-donasi-success': AppDonasiSuccess;
    'app-icon': AppIcon;
    'app-login': AppLogin;
    'app-modal-doa': AppModalDoa;
    'app-reset-password': AppResetPassword;
    'app-reset-password-2': AppResetPassword2;
    'app-root': AppRoot;
    'blog-component': BlogComponent;
    'blog-list': BlogList;
    'contributor-list': ContributorList;
    'demo-card': DemoCard;
    'doc-component': DocComponent;
    'donasi-receipt': DonasiReceipt;
    'highlight-code': HighlightCode;
    'in-page-navigation': InPageNavigation;
    'landing-page': LandingPage;
    'lower-content-nav': LowerContentNav;
    'my-account': MyAccount;
    'newsletter-signup': NewsletterSignup;
    'notfound-page': NotfoundPage;
    'pre-footer': PreFooter;
    'pro-glshader': ProGlshader;
    'pwas-page': PwasPage;
    'register-app': RegisterApp;
    'resources-page': ResourcesPage;
    'site-header': SiteHeader;
    'site-menu': SiteMenu;
    'site-top-bar': SiteTopBar;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'announcement-bar': LocalJSX.AnnouncementBar & JSXBase.HTMLAttributes<HTMLAnnouncementBarElement>;
      'app-about': LocalJSX.AppAbout & JSXBase.HTMLAttributes<HTMLAppAboutElement>;
      'app-banner': LocalJSX.AppBanner & JSXBase.HTMLAttributes<HTMLAppBannerElement>;
      'app-burger': LocalJSX.AppBurger & JSXBase.HTMLAttributes<HTMLAppBurgerElement>;
      'app-change-password': LocalJSX.AppChangePassword & JSXBase.HTMLAttributes<HTMLAppChangePasswordElement>;
      'app-donasi-checkout': LocalJSX.AppDonasiCheckout & JSXBase.HTMLAttributes<HTMLAppDonasiCheckoutElement>;
      'app-donasi-riwayat': LocalJSX.AppDonasiRiwayat & JSXBase.HTMLAttributes<HTMLAppDonasiRiwayatElement>;
      'app-donasi-success': LocalJSX.AppDonasiSuccess & JSXBase.HTMLAttributes<HTMLAppDonasiSuccessElement>;
      'app-icon': LocalJSX.AppIcon & JSXBase.HTMLAttributes<HTMLAppIconElement>;
      'app-login': LocalJSX.AppLogin & JSXBase.HTMLAttributes<HTMLAppLoginElement>;
      'app-modal-doa': LocalJSX.AppModalDoa & JSXBase.HTMLAttributes<HTMLAppModalDoaElement>;
      'app-reset-password': LocalJSX.AppResetPassword & JSXBase.HTMLAttributes<HTMLAppResetPasswordElement>;
      'app-reset-password-2': LocalJSX.AppResetPassword2 & JSXBase.HTMLAttributes<HTMLAppResetPassword2Element>;
      'app-root': LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
      'blog-component': LocalJSX.BlogComponent & JSXBase.HTMLAttributes<HTMLBlogComponentElement>;
      'blog-list': LocalJSX.BlogList & JSXBase.HTMLAttributes<HTMLBlogListElement>;
      'contributor-list': LocalJSX.ContributorList & JSXBase.HTMLAttributes<HTMLContributorListElement>;
      'demo-card': LocalJSX.DemoCard & JSXBase.HTMLAttributes<HTMLDemoCardElement>;
      'doc-component': LocalJSX.DocComponent & JSXBase.HTMLAttributes<HTMLDocComponentElement>;
      'donasi-receipt': LocalJSX.DonasiReceipt & JSXBase.HTMLAttributes<HTMLDonasiReceiptElement>;
      'highlight-code': LocalJSX.HighlightCode & JSXBase.HTMLAttributes<HTMLHighlightCodeElement>;
      'in-page-navigation': LocalJSX.InPageNavigation & JSXBase.HTMLAttributes<HTMLInPageNavigationElement>;
      'landing-page': LocalJSX.LandingPage & JSXBase.HTMLAttributes<HTMLLandingPageElement>;
      'lower-content-nav': LocalJSX.LowerContentNav & JSXBase.HTMLAttributes<HTMLLowerContentNavElement>;
      'my-account': LocalJSX.MyAccount & JSXBase.HTMLAttributes<HTMLMyAccountElement>;
      'newsletter-signup': LocalJSX.NewsletterSignup & JSXBase.HTMLAttributes<HTMLNewsletterSignupElement>;
      'notfound-page': LocalJSX.NotfoundPage & JSXBase.HTMLAttributes<HTMLNotfoundPageElement>;
      'pre-footer': LocalJSX.PreFooter & JSXBase.HTMLAttributes<HTMLPreFooterElement>;
      'pro-glshader': LocalJSX.ProGlshader & JSXBase.HTMLAttributes<HTMLProGlshaderElement>;
      'pwas-page': LocalJSX.PwasPage & JSXBase.HTMLAttributes<HTMLPwasPageElement>;
      'register-app': LocalJSX.RegisterApp & JSXBase.HTMLAttributes<HTMLRegisterAppElement>;
      'resources-page': LocalJSX.ResourcesPage & JSXBase.HTMLAttributes<HTMLResourcesPageElement>;
      'site-header': LocalJSX.SiteHeader & JSXBase.HTMLAttributes<HTMLSiteHeaderElement>;
      'site-menu': LocalJSX.SiteMenu & JSXBase.HTMLAttributes<HTMLSiteMenuElement>;
      'site-top-bar': LocalJSX.SiteTopBar & JSXBase.HTMLAttributes<HTMLSiteTopBarElement>;
    }
  }
}


