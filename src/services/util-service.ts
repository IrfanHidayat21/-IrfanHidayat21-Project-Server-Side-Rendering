class UtilController {
  public loading = document.createElement('ion-loading');

  async presentToastWithOptions(msg: string | undefined) {
    const toast = document.createElement('ion-toast');
    toast.message = msg;
    toast.duration = 2000;
    toast.position = 'bottom';
    toast.cssClass = 'toastRegis';

    document.body.appendChild(toast);
    return toast.present();
  }
  async presentAlertQuestion(msgHeader: string | undefined, msg: string | undefined) {
    const alertSesi = document.createElement('ion-alert');
    alertSesi.backdropDismiss = true;

    alertSesi.header = msgHeader;
    alertSesi.subHeader = msg;
    alertSesi.cssClass = 'alertBackQuesImg';

    document.body.appendChild(alertSesi);
    alertSesi.present();
    return alertSesi;


  }
  async presentLoading(){
    this.loading.message = 'Please wait...';
    this.loading.spinner = 'lines';
    this.loading.showBackdrop = false;
    this.loading.cssClass = 'loadingHttpMonev';
    document.body.appendChild(this.loading);
    await this.loading.present();
    return this.loading;
  }
  async convertDate(rawDate: string){

    let dd =    rawDate.substring(0, 4);
    let mm =    rawDate.substring(5, 7);
    let yyyy =  rawDate.substring(8, 10);

    let result = yyyy + '-' + mm + '-' + dd;

    console.log('resss',result);

    return result;
  }

}


export const UtilService = new UtilController();
